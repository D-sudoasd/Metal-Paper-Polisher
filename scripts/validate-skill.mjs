#!/usr/bin/env node
// Structural validator for this skill package.
// Checks that SKILL.md has well-formed frontmatter and that every
// cross-reference (backtick `references/*.md` mentions and relative
// markdown links) points at a file that actually exists on disk.
//
// Uses only the Node standard library so `install` stays dependency-free
// for this check and it can run in any environment.

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const errors = [];
const warnings = [];
const info = [];

function err(msg) {
  errors.push(msg);
}
function warn(msg) {
  warnings.push(msg);
}

/** Recursively collect every *.md file, skipping node_modules and .git. */
function collectMarkdown(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...collectMarkdown(full));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      out.push(full);
    }
  }
  return out;
}

/** Minimal YAML frontmatter parser for the flat key: value block we use. */
function parseFrontmatter(text) {
  if (!text.startsWith("---")) return null;
  const end = text.indexOf("\n---", 3);
  if (end === -1) return null;
  const block = text.slice(3, end).trim();
  const data = {};
  let currentKey = null;
  for (const rawLine of block.split("\n")) {
    const line = rawLine.replace(/\s+$/, "");
    if (!line.trim()) continue;
    const m = line.match(/^([A-Za-z0-9_-]+):\s?(.*)$/);
    if (m) {
      currentKey = m[1];
      data[currentKey] = m[2];
    } else if (currentKey && /^\s+/.test(rawLine)) {
      // Continuation of a folded/wrapped value.
      data[currentKey] += " " + line.trim();
    }
  }
  return data;
}

// --- 1. Validate SKILL.md frontmatter -----------------------------------
const skillPath = join(root, "SKILL.md");
if (!existsSync(skillPath)) {
  err("SKILL.md is missing at the repository root.");
} else {
  const fm = parseFrontmatter(readFileSync(skillPath, "utf8"));
  if (!fm) {
    err("SKILL.md has no parseable YAML frontmatter block (--- ... ---).");
  } else {
    for (const key of ["name", "description", "version"]) {
      if (!fm[key] || !String(fm[key]).trim()) {
        err(`SKILL.md frontmatter is missing required key: "${key}".`);
      }
    }
    if (fm.version && !/^\d+\.\d+\.\d+$/.test(fm.version.trim())) {
      warn(`SKILL.md version "${fm.version}" is not semver (x.y.z).`);
    }
    if (fm.name) info.push(`skill name: ${fm.name}`);
    if (fm.version) info.push(`skill version: ${fm.version}`);
  }
}

// --- 2. Validate cross-references ---------------------------------------
const markdownFiles = collectMarkdown(root);
const referencedTargets = new Set();
let checkedLinks = 0;

const backtickRef = /`(references\/[^`]+\.md)`/g;
const mdLink = /\]\(([^)]+)\)/g;

for (const file of markdownFiles) {
  const text = readFileSync(file, "utf8");
  const rel = relative(root, file);

  for (const match of text.matchAll(backtickRef)) {
    const target = match[1];
    checkedLinks++;
    const abs = join(root, target);
    referencedTargets.add(resolve(abs));
    if (!existsSync(abs)) {
      err(`${rel}: references "${target}" but that file does not exist.`);
    }
  }

  for (const match of text.matchAll(mdLink)) {
    const href = match[1].trim().split(/\s+/)[0];
    if (/^[a-z]+:\/\//i.test(href) || href.startsWith("#") || href.startsWith("mailto:")) {
      continue; // external URL or in-page anchor
    }
    const cleanHref = href.split("#")[0];
    if (!cleanHref) continue;
    checkedLinks++;
    const abs = resolve(dirname(file), cleanHref);
    if (!existsSync(abs)) {
      err(`${rel}: relative link "${href}" does not resolve to a file.`);
    }
  }
}

// --- 3. Warn on orphaned reference files --------------------------------
const referencesDir = join(root, "references");
if (existsSync(referencesDir) && statSync(referencesDir).isDirectory()) {
  for (const entry of readdirSync(referencesDir)) {
    if (!entry.toLowerCase().endsWith(".md")) continue;
    const abs = resolve(join(referencesDir, entry));
    if (!referencedTargets.has(abs)) {
      warn(`references/${entry} exists but is not referenced by any Markdown file.`);
    }
  }
}

// --- Report --------------------------------------------------------------
console.log(`Scanned ${markdownFiles.length} Markdown files, checked ${checkedLinks} cross-references.`);
for (const line of info) console.log(`  - ${line}`);

if (warnings.length) {
  console.log(`\nWarnings (${warnings.length}):`);
  for (const w of warnings) console.log(`  ! ${w}`);
}

if (errors.length) {
  console.error(`\nFAILED with ${errors.length} error(s):`);
  for (const e of errors) console.error(`  x ${e}`);
  process.exit(1);
}

console.log("\nOK: skill structure and all cross-references are valid.");
