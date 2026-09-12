#!/usr/bin/env node
// Structural validator for this skill package.
// Checks SKILL.md metadata, Markdown cross-references, the six-mode manifest,
// legacy alias normalization, route-decision fields, and routing fixtures.
// It intentionally does not claim to validate scientific manuscript semantics.
//
// Uses only the Node standard library so `install` stays dependency-free
// for this check and it can run in any environment.

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname, resolve, relative, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const errors = [];
const warnings = [];
const info = [];

const SECTION_MODE_MANIFEST_REL = "references/SECTION_MODE_MANIFEST.json";
const SECTION_MODE_FIXTURES_REL = "tests/section-mode-fixtures.json";
const SECTION_MODES = ["abstract", "introduction", "results", "discussion", "conclusion", "full"];
const OPERATIONS = ["polish", "rewrite", "diagnose", "restructure", "consistency"];
const CONTEXT_LEVELS = ["local", "partial", "full"];
// The router contract defines this status vocabulary.  Keeping it here makes
// malformed manifests fail closed instead of silently introducing a new
// routing state.
const STATUS_VALUES = ["ok", "partial", "fallback", "author_confirmation_required", "blocked"];
const FIXTURE_ROUTE_DIMENSIONS = ["section_mode", "operation", "context_level"];
const ROUTE_DECISION_FIELDS = [
  "section_mode",
  "requested_operation",
  "operation",
  "context_level",
  "requested_context_level",
  "paired_modes",
  "required_inputs",
  "loaded_refs",
  "skipped_checks",
  "coverage",
  "not_checked",
  "status",
  "blockers",
  "journal_overlay",
  "output_detail",
];
const MODE_CONTRACTS = {
  abstract: {
    file: "references/ABSTRACT_MODE.md",
    outputs: ["core_claim"],
    gates: [
      "context_sufficiency",
      "core_claim_identity",
      "evidence_strength_monotonicity",
      "condition_term_lock",
      "no_new_claims",
      "section_role_boundary",
      "citation_permission",
    ],
  },
  introduction: {
    file: "references/INTRODUCTION_MODE.md",
    outputs: ["variable_map", "gap_statement"],
    gates: [
      "context_sufficiency",
      "gap_precision",
      "core_claim_identity",
      "evidence_strength_monotonicity",
      "promise_evidence_closure",
      "citation_permission",
      "condition_term_lock",
      "no_new_claims",
      "section_role_boundary",
    ],
  },
  results: {
    file: "references/RESULTS_MODE.md",
    outputs: ["claim_evidence_map"],
    gates: [
      "context_sufficiency",
      "core_claim_identity",
      "evidence_proximity",
      "evidence_strength_monotonicity",
      "condition_term_lock",
      "local_causality",
      "no_new_claims",
      "section_role_boundary",
      "figure_table_mapping",
    ],
  },
  discussion: {
    file: "references/DISCUSSION_MODE.md",
    outputs: ["evidence_arrow_ledger"],
    gates: [
      "context_sufficiency",
      "core_claim_identity",
      "evidence_arrow_closure",
      "alternative_explanations",
      "boundary_statement",
      "evidence_strength_monotonicity",
      "condition_term_lock",
      "no_new_claims",
      "section_role_boundary",
    ],
  },
  conclusion: {
    file: "references/CONCLUSION_MODE.md",
    outputs: ["recovery_order", "new_claim_audit"],
    gates: [
      "context_sufficiency",
      "core_claim_identity",
      "established_claim_recovery",
      "claim_order",
      "evidence_strength_monotonicity",
      "no_new_claims",
      "scope_boundary",
      "condition_term_lock",
      "section_role_boundary",
    ],
  },
  full: {
    file: "references/FULL_TEXT_MODE.md",
    outputs: ["claim_evidence_ledger", "ownership_map"],
    gates: [
      "context_sufficiency",
      "core_claim_identity",
      "claim_coverage_order",
      "canonical_owner",
      "evidence_arrow_closure",
      "evidence_strength_monotonicity",
      "condition_term_lock",
      "title_abstract_conclusion_alignment",
      "no_new_claims",
      "section_role_boundary",
      "citation_permission",
    ],
  },
};
const FIXTURE_FIELD_KEYS = {
  section_mode: [
    "section_mode",
    "sectionMode",
    "文本所属部分",
    "文本所属章节",
    "text_section",
    "section",
  ],
  operation: ["operation", "操作", "任务类型", "task_type", "task", "任务"],
  context_level: [
    "requested_context_level",
    "requestedContextLevel",
    "context_level",
    "contextLevel",
    "上下文覆盖",
    "上下文级别",
    "context_scope",
    "coverage",
    "context",
    "覆盖范围",
  ],
};

function err(msg) {
  errors.push(msg);
}
function warn(msg) {
  warnings.push(msg);
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function normalizeToken(value) {
  return String(value).trim().toLocaleLowerCase();
}

function sameSet(actual, expected) {
  return (
    Array.isArray(actual) &&
    Array.isArray(expected) &&
    actual.length === expected.length &&
    expected.every((value) => actual.includes(value))
  );
}

function dimensionValues(dimensions, name) {
  const raw = dimensions?.[name];
  if (Array.isArray(raw)) return raw;
  if (isPlainObject(raw) && Array.isArray(raw.values)) return raw.values;
  return null;
}

function readJson(path, label) {
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    err(`${label} is not valid JSON: ${error.message}`);
    return null;
  }
}

function nonEmptyStringArray(value, label) {
  if (!Array.isArray(value) || value.length === 0) {
    err(`${label} must be a non-empty array.`);
    return false;
  }
  let valid = true;
  const seen = new Set();
  for (const item of value) {
    if (typeof item !== "string" || !item.trim()) {
      err(`${label} must contain only non-empty strings.`);
      valid = false;
      continue;
    }
    if (seen.has(item)) warn(`${label} contains duplicate value "${item}".`);
    seen.add(item);
  }
  return valid;
}

function validateLoadEntries(value, label) {
  if (Array.isArray(value)) {
    nonEmptyStringArray(value, label);
    if (Array.isArray(value)) {
      for (const target of value) repositoryPath(target, label);
    }
    return;
  }
  // A conditional load table is also accepted: every branch remains an
  // explicit, non-empty path array and is checked exactly like a flat list.
  if (isPlainObject(value)) {
    let branchCount = 0;
    if ("always" in value) {
      branchCount += 1;
      if (nonEmptyStringArray(value.always, `${label}.always`)) {
        for (const target of value.always) repositoryPath(target, `${label}.always`);
      }
    }
    if ("conditional" in value) {
      if (!isPlainObject(value.conditional) || Object.keys(value.conditional).length === 0) {
        err(`${label}.conditional must be a non-empty object.`);
      } else {
        branchCount += Object.keys(value.conditional).length;
        for (const [condition, targets] of Object.entries(value.conditional)) {
          if (nonEmptyStringArray(targets, `${label}.conditional.${condition}`)) {
            for (const target of targets) {
              repositoryPath(target, `${label}.conditional.${condition}`);
            }
          }
        }
      }
    }
    if (branchCount === 0) err(`${label} must contain a non-empty path array or load branches.`);
    return;
  }
  err(`${label} must be a non-empty path array or load table.`);
}

function validateConditionalLoad(value, label) {
  if (!isPlainObject(value) || Object.keys(value).length === 0) {
    err(`${label} must be a non-empty condition-to-path map.`);
    return;
  }
  for (const [condition, targets] of Object.entries(value)) {
    if (nonEmptyStringArray(targets, `${label}.${condition}`)) {
      for (const target of targets) repositoryPath(target, `${label}.${condition}`);
    }
  }
}

function repositoryPath(target, label) {
  if (typeof target !== "string" || !target.trim()) {
    err(`${label} must be a non-empty repository-relative path.`);
    return null;
  }
  const abs = resolve(root, target);
  const rel = relative(root, abs);
  if (rel === ".." || rel.startsWith(`..${requirePathSeparator()}`) || isAbsolute(rel)) {
    err(`${label} escapes the repository root: "${target}".`);
    return null;
  }
  if (!existsSync(abs) || !statSync(abs).isFile()) {
    err(`${label} points to a missing file: "${target}".`);
    return null;
  }
  return abs;
}

// `path.sep` is kept behind this tiny helper so the validator remains easy to
// read while handling both Windows and POSIX checkouts.
function requirePathSeparator() {
  return root.includes("\\") ? "\\" : "/";
}

function validateDimensionArray(value, label, expected = null) {
  if (!nonEmptyStringArray(value, label)) return false;
  const duplicates = new Set();
  for (const item of value) {
    if (duplicates.has(item)) err(`${label} contains duplicate enum value "${item}".`);
    duplicates.add(item);
  }
  if (expected && !sameSet(value, expected)) {
    err(`${label} must exactly contain: ${expected.join(", ")}.`);
    return false;
  }
  return true;
}

function buildAliasMap(manifest) {
  if (!isPlainObject(manifest.aliases)) {
    err("SECTION_MODE_MANIFEST.json must define an aliases object.");
    return null;
  }

  const maps = {};
  for (const dimension of FIXTURE_ROUTE_DIMENSIONS) {
    const group = manifest.aliases[dimension];
    const allowed = dimensionValues(manifest.dimensions, dimension);
    if (!Array.isArray(allowed)) continue;
    if (!isPlainObject(group)) {
      err(`aliases.${dimension} must be an alias-to-canonical object.`);
      continue;
    }
    const allowedSet = new Set(allowed);
    const map = new Map();
    const seenCanonical = new Set();

    for (const [alias, canonical] of Object.entries(group)) {
      if (!alias.trim() || typeof canonical !== "string" || !allowedSet.has(canonical)) {
        err(`aliases.${dimension} maps "${alias}" to an unknown canonical value "${canonical}".`);
        continue;
      }
      seenCanonical.add(canonical);
      const aliasKey = normalizeToken(alias);
      const previous = map.get(aliasKey);
      if (previous && previous !== canonical) {
        err(
          `aliases.${dimension} has a conflicting alias "${alias}" for "${previous}" and "${canonical}".`,
        );
      } else {
        map.set(aliasKey, canonical);
      }
      // Canonical values are always routable, even when the manifest only
      // lists their legacy/English aliases.
      const canonicalKey = normalizeToken(canonical);
      const canonicalPrevious = map.get(canonicalKey);
      if (canonicalPrevious && canonicalPrevious !== canonical) {
        err(
          `aliases.${dimension} has a conflicting canonical token "${canonical}" for "${canonicalPrevious}".`,
        );
      } else {
        map.set(canonicalKey, canonical);
      }
    }

    for (const canonical of allowed) {
      if (!seenCanonical.has(canonical)) {
        err(`aliases.${dimension} is missing canonical value "${canonical}".`);
      }
    }
    maps[dimension] = map;
  }
  return maps;
}

function validateLegacyFieldMappings(manifest) {
  const legacyFields = manifest.legacy_fields;
  if (!isPlainObject(legacyFields)) {
    err("SECTION_MODE_MANIFEST.json must define a legacy_fields object.");
    return;
  }
  for (const field of ["输出模式", "output_mode"]) {
    if (legacyFields[field] === "context_level") {
      err(`legacy_fields.${field} must not map to context_level; use output_detail.`);
    }
    if (legacyFields[field] !== "output_detail") {
      err(`legacy_fields.${field} must map to output_detail.`);
    }
  }
  for (const [field, target] of Object.entries(legacyFields)) {
    if (/(上下文|context_scope|context_level)/i.test(field) && target !== "requested_context_level") {
      err(`legacy_fields.${field} must map to requested_context_level.`);
    }
  }
}

function validateRouteDecisionFields(manifest) {
  const fields = manifest.route_decision_fields;
  if (!validateDimensionArray(fields, "route_decision_fields", ROUTE_DECISION_FIELDS)) {
    return;
  }
}

function validateJournalOverlay(manifest) {
  const overlay = manifest.journal_overlay;
  if (!isPlainObject(overlay)) {
    err("SECTION_MODE_MANIFEST.json must define a journal_overlay object.");
    return;
  }
  if (overlay.default !== "off") {
    err('journal_overlay.default must be "off".');
  }
  if (!sameSet(overlay.allowed_values ?? [], ["off", "on"]) || (overlay.allowed_values ?? []).length !== 2) {
    err('journal_overlay.allowed_values must be exactly ["off", "on"].');
  }
  if (!Array.isArray(overlay.requires) || !overlay.requires.includes("target_journal") || !overlay.requires.includes("adaptation_permission")) {
    err("journal_overlay.requires must include target_journal and adaptation_permission.");
  }
  if (overlay.implicit_elsevier !== false) {
    err("journal_overlay.implicit_elsevier must be false.");
  }
}

function validateContextPolicy(manifest) {
  const policy = manifest.context_policy;
  if (!isPlainObject(policy)) {
    err("SECTION_MODE_MANIFEST.json must define a context_policy object.");
    return;
  }
  if (policy.declared_value_is_request_only !== true) {
    err("context_policy.declared_value_is_request_only must be true.");
  }
  const levels = policy.levels;
  if (!isPlainObject(levels) || !sameSet(Object.keys(levels), CONTEXT_LEVELS)) {
    err("context_policy.levels must exactly contain local, partial, and full.");
  } else {
    for (const level of CONTEXT_LEVELS) {
      nonEmptyStringArray(levels[level], `context_policy.levels.${level}`);
    }
  }
  if (!sameSet(policy.full_core_sections ?? [], [
    "title",
    "abstract",
    "introduction",
    "methods",
    "results",
    "discussion_or_results_and_discussion",
    "conclusion",
  ])) {
    err("context_policy.full_core_sections must contain the complete core-section set.");
  }
  if (policy.on_overclaim !== "downgrade_and_report_blocker") {
    err('context_policy.on_overclaim must be "downgrade_and_report_blocker".');
  }
}

function validateOutputDetail(manifest) {
  const outputDetail = manifest.output_detail;
  const allowed = ["text_only", "with_notes", "mode_full", "diagnostic"];
  if (!isPlainObject(outputDetail)) {
    err("SECTION_MODE_MANIFEST.json must define an output_detail object.");
    return;
  }
  if (outputDetail.default !== "mode_full") {
    err('output_detail.default must be "mode_full".');
  }
  if (!sameSet(outputDetail.allowed_values ?? [], allowed) || (outputDetail.allowed_values ?? []).length !== allowed.length) {
    err("output_detail.allowed_values must exactly contain the four canonical rendering values.");
  }
  if (!isPlainObject(outputDetail.aliases) || Object.keys(outputDetail.aliases).length === 0) {
    err("output_detail.aliases must be a non-empty object.");
  } else {
    for (const [alias, canonical] of Object.entries(outputDetail.aliases)) {
      if (!alias.trim() || !allowed.includes(canonical)) {
        err(`output_detail.aliases.${alias} must map to a canonical output_detail value.`);
      }
    }
    if (outputDetail.aliases["完整模式"] !== "mode_full") {
      err('output_detail.aliases["完整模式"] must map to mode_full.');
    }
  }
  if (outputDetail.affects !== "rendering_only") {
    err('output_detail.affects must be "rendering_only".');
  }
}

function buildOutputDetailMap(manifest) {
  const map = new Map();
  const outputDetail = manifest.output_detail;
  if (!isPlainObject(outputDetail)) return map;
  for (const value of outputDetail.allowed_values ?? []) map.set(normalizeToken(value), value);
  for (const [alias, value] of Object.entries(outputDetail.aliases ?? {})) {
    if (typeof value === "string") map.set(normalizeToken(alias), value);
  }
  return map;
}

function validatePairedSectionAliases(manifest) {
  const aliases = manifest.paired_section_aliases;
  if (!isPlainObject(aliases) || Object.keys(aliases).length === 0) {
    err("SECTION_MODE_MANIFEST.json must define a non-empty paired_section_aliases object.");
    return null;
  }
  const pairedModes = ["results", "discussion"];
  const route = new Map();
  for (const [alias, values] of Object.entries(aliases)) {
    if (!alias.trim() || !Array.isArray(values) || values.length !== pairedModes.length || !sameSet(values, pairedModes)) {
      err(`paired_section_aliases.${alias} must be exactly [results, discussion].`);
      continue;
    }
    if (new Set(values).size !== values.length) {
      err(`paired_section_aliases.${alias} must not contain duplicate section modes.`);
      continue;
    }
    route.set(normalizeToken(alias), values);
  }
  return route;
}

function journalOverlayValues(manifest) {
  const values = manifest.journal_overlay?.allowed_values;
  return Array.isArray(values) && values.length > 0 ? values : ["off", "on"];
}

function validateTaskAliases(manifest) {
  const taskAliases = manifest.task_aliases;
  if (!isPlainObject(taskAliases)) {
    err("SECTION_MODE_MANIFEST.json must define a task_aliases object.");
    return null;
  }

  const sectionValues = new Set(dimensionValues(manifest.dimensions, "section_mode") ?? []);
  const operationValues = new Set(dimensionValues(manifest.dimensions, "operation") ?? []);
  const overlayValues = new Set(journalOverlayValues(manifest));
  const route = new Map();
  const allowedKeys = new Set(["section_mode", "operation", "journal_overlay", "paired_modes"]);

  for (const [task, mapping] of Object.entries(taskAliases)) {
    if (!task.trim()) {
      err("task_aliases contains an empty task alias.");
      continue;
    }
    if (!isPlainObject(mapping)) {
      err(`task_aliases.${task} must be an object.`);
      continue;
    }
    const unknownKeys = Object.keys(mapping).filter((key) => !allowedKeys.has(key));
    for (const key of unknownKeys) {
      err(`task_aliases.${task} contains unsupported field "${key}".`);
    }
    if (!("section_mode" in mapping) && !("operation" in mapping)) {
      err(`task_aliases.${task} must define section_mode or operation.`);
    }
    if (mapping.section_mode !== undefined && !sectionValues.has(mapping.section_mode)) {
      err(`task_aliases.${task}.section_mode is not a canonical section_mode value.`);
    }
    if (mapping.operation !== undefined && !operationValues.has(mapping.operation)) {
      err(`task_aliases.${task}.operation is not a canonical operation value.`);
    }
    if (mapping.paired_modes !== undefined) {
      if (!Array.isArray(mapping.paired_modes) || mapping.paired_modes.length === 0) {
        err(`task_aliases.${task}.paired_modes must be a non-empty array.`);
      } else {
        const pairedModes = new Set(mapping.paired_modes);
        if (pairedModes.size !== mapping.paired_modes.length) {
          err(`task_aliases.${task}.paired_modes must not contain duplicates.`);
        }
        for (const pairedMode of mapping.paired_modes) {
          if (!sectionValues.has(pairedMode)) {
            err(`task_aliases.${task}.paired_modes contains a non-canonical section_mode.`);
          }
        }
      }
    }
    if (mapping.journal_overlay !== undefined && !overlayValues.has(mapping.journal_overlay)) {
      err(`task_aliases.${task}.journal_overlay is not an allowed journal_overlay value.`);
    }
    if (
      ["期刊格式适配", "journal adaptation"].includes(task) &&
      mapping.journal_overlay !== "on"
    ) {
      err(`task_aliases.${task} must request journal_overlay=on; runtime input gates still require target and permission.`);
    }

    const key = normalizeToken(task);
    const previous = route.get(key);
    if (previous && JSON.stringify(previous) !== JSON.stringify(mapping)) {
      err(`task_aliases has conflicting mappings for task alias "${task}".`);
    } else {
      route.set(key, mapping);
    }
  }
  return route;
}

function validateSectionModeManifest() {
  const manifestPath = join(root, SECTION_MODE_MANIFEST_REL);
  if (!existsSync(manifestPath)) {
    err(`${SECTION_MODE_MANIFEST_REL} is missing.`);
    return {
      manifest: null,
      aliasMaps: null,
      taskAliasMap: null,
      pairedSectionAliasMap: null,
      outputDetailMap: null,
      modeCount: 0,
    };
  }

  const manifest = readJson(manifestPath, SECTION_MODE_MANIFEST_REL);
  if (!isPlainObject(manifest)) {
    err(`${SECTION_MODE_MANIFEST_REL} must contain a JSON object.`);
    return {
      manifest: null,
      aliasMaps: null,
      taskAliasMap: null,
      pairedSectionAliasMap: null,
      outputDetailMap: null,
      modeCount: 0,
    };
  }

  validateLegacyFieldMappings(manifest);
  validateRouteDecisionFields(manifest);
  validateJournalOverlay(manifest);
  validateContextPolicy(manifest);
  validateOutputDetail(manifest);
  const pairedSectionAliasMap = validatePairedSectionAliases(manifest);
  const taskAliasMap = validateTaskAliases(manifest);

  const dimensions = manifest.dimensions;
  if (!isPlainObject(dimensions)) {
    err(`${SECTION_MODE_MANIFEST_REL} must define a dimensions object.`);
  } else {
    validateDimensionArray(dimensionValues(dimensions, "section_mode"), "dimensions.section_mode", SECTION_MODES);
    validateDimensionArray(dimensionValues(dimensions, "operation"), "dimensions.operation", OPERATIONS);
    validateDimensionArray(
      dimensionValues(dimensions, "context_level"),
      "dimensions.context_level",
      CONTEXT_LEVELS,
    );
    const statuses = dimensionValues(dimensions, "status");
    if (validateDimensionArray(statuses, "dimensions.status", STATUS_VALUES)) {
      for (const status of statuses) {
        if (!STATUS_VALUES.includes(status)) {
          err(`dimensions.status contains unsupported enum value "${status}".`);
        }
      }
    }
  }

  const modes = manifest.modes;
  let modeCount = 0;
  if (!isPlainObject(modes)) {
    err(`${SECTION_MODE_MANIFEST_REL} must define a modes object.`);
  } else {
    const modeNames = Object.keys(modes);
    modeCount = modeNames.length;
    if (!sameSet(modeNames, SECTION_MODES)) {
      err(`modes must exactly cover: ${SECTION_MODES.join(", ")}.`);
    }

    const requiredModeFields = [
      "file",
      "required_inputs",
      "conditional_inputs",
      "load",
      "outputs",
      "gates",
    ];
    const requiredOutputs = ["route_decision"];
    for (const modeName of SECTION_MODES) {
      const mode = modes[modeName];
      if (!isPlainObject(mode)) {
        err(`modes.${modeName} must be an object.`);
        continue;
      }
      for (const field of requiredModeFields) {
        if (!(field in mode)) err(`modes.${modeName} is missing required field "${field}".`);
      }

      const contract = MODE_CONTRACTS[modeName];
      if (mode.file !== contract.file) {
        err(`modes.${modeName}.file must be exactly "${contract.file}".`);
      }
      repositoryPath(mode.file, `modes.${modeName}.file`);
      for (const field of ["required_inputs", "conditional_inputs", "outputs", "gates"]) {
        nonEmptyStringArray(mode[field], `modes.${modeName}.${field}`);
      }
      if (Array.isArray(mode.required_inputs)) {
        const requiredInputSet = new Set(mode.required_inputs);
        for (const axis of ["section_mode", "operation", "context_level"]) {
          if (requiredInputSet.has(axis)) {
            err(`modes.${modeName}.required_inputs must not treat ${axis} as content.`);
          }
        }
        if (modeName === "full" && !requiredInputSet.has("section_manifest")) {
          err("modes.full.required_inputs must include section_manifest.");
        }
        if (modeName !== "full" && !requiredInputSet.has("text")) {
          err(`modes.${modeName}.required_inputs must include text.`);
        }
      }
      validateLoadEntries(mode.load, `modes.${modeName}.load`);
      if (mode.conditional_load !== undefined) {
        validateConditionalLoad(mode.conditional_load, `modes.${modeName}.conditional_load`);
      }
      if (Array.isArray(mode.outputs)) {
        for (const output of requiredOutputs) {
          if (!mode.outputs.includes(output)) {
            err(`modes.${modeName}.outputs must include "${output}".`);
          }
        }
        for (const output of contract.outputs) {
          if (!mode.outputs.includes(output)) {
            err(`modes.${modeName}.outputs must include specialized output "${output}".`);
          }
        }
      }
      if (Array.isArray(mode.gates)) {
        if (!sameSet(mode.gates, contract.gates)) {
          err(
            `modes.${modeName}.gates must exactly match its canonical gate contract: ${contract.gates.join(", ")}.`,
          );
        }
      }
      if (mode.status !== undefined) {
        if (typeof mode.status !== "string" || !STATUS_VALUES.includes(mode.status)) {
          err(`modes.${modeName}.status must be one of the declared status enum values.`);
        }
      }
    }
  }

  if (!nonEmptyStringArray(manifest.shared_refs, "shared_refs")) {
    // The array diagnostic above is sufficient; avoid iterating malformed data.
  } else {
    for (const target of manifest.shared_refs) repositoryPath(target, "shared_refs");
  }

  const aliasMaps = dimensions && isPlainObject(dimensions) ? buildAliasMap(manifest) : null;
  if (aliasMaps?.context_level?.has(normalizeToken("完整模式"))) {
    err('"完整模式" must not be a context_level alias; it is an output-detail legacy label.');
  }
  return {
    manifest,
    aliasMaps,
    taskAliasMap,
    pairedSectionAliasMap,
    outputDetailMap: buildOutputDetailMap(manifest),
    modeCount,
  };
}

function extractFixtureRequest(fixture) {
  if (isPlainObject(fixture.request)) return fixture.request;
  if (isPlainObject(fixture.input)) return fixture.input;
  return null;
}

function hasContent(value) {
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (isPlainObject(value)) return Object.keys(value).length > 0;
  return value !== undefined && value !== null && value !== false;
}

function suppliedSectionNames(request, sectionMode) {
  const names = new Set();
  if (isPlainObject(request.sections)) {
    for (const [name, value] of Object.entries(request.sections)) {
      if (hasContent(value)) names.add(normalizeToken(name));
    }
  }
  for (const name of [
    "title",
    "abstract",
    "introduction",
    "methods",
    "results",
    "discussion",
    "results_and_discussion",
    "conclusion",
  ]) {
    if (hasContent(request[name])) names.add(name);
  }
  if (sectionMode !== "full" && hasContent(request.text)) names.add(sectionMode);
  return names;
}

function hasFullSectionSet(names) {
  return (
    ["title", "abstract", "introduction", "methods", "results", "conclusion"].every((name) =>
      names.has(name),
    ) &&
    (names.has("discussion") || names.has("results_and_discussion"))
  );
}

function hasCompleteSectionManifest(sectionManifest) {
  if (!isPlainObject(sectionManifest) || !Array.isArray(sectionManifest.provided)) return false;
  const provided = new Set(sectionManifest.provided.map(normalizeToken));
  const missing = Array.isArray(sectionManifest.missing)
    ? sectionManifest.missing.filter((name) => typeof name === "string" && name.trim())
    : [];
  return missing.length === 0 && hasFullSectionSet(provided);
}

function evidenceArray(request, name) {
  const nested = isPlainObject(request.evidence) ? request.evidence[name] : undefined;
  return Array.isArray(nested) ? nested : Array.isArray(request[name]) ? request[name] : [];
}

function computeContextLevel(request, sectionMode) {
  const sectionNames = suppliedSectionNames(request, sectionMode);
  const claimRecords = evidenceArray(request, "claim_records");
  const evidenceRecords = evidenceArray(request, "evidence_records");
  const completeManifest = hasCompleteSectionManifest(request.section_manifest);
  if (
    completeManifest &&
    hasFullSectionSet(sectionNames) &&
    claimRecords.length > 0 &&
    evidenceRecords.length > 0
  ) {
    return "full";
  }

  const suppliedDependencies = [...sectionNames].filter((name) => name !== sectionMode);
  if (
    suppliedDependencies.length > 0 ||
    completeManifest ||
    claimRecords.length > 0 ||
    evidenceRecords.length > 0
  ) {
    return "partial";
  }
  return "local";
}

function baseModeLoadRefs(manifest, route) {
  const refs = new Set(["references/SECTION_MODE_ROUTER.md"]);
  const modeNames = [route.section_mode, ...(route.paired_modes ?? [])];
  for (const modeName of modeNames) {
    const mode = manifest?.modes?.[modeName];
    if (!isPlainObject(mode)) continue;
    if (typeof mode.file === "string") refs.add(mode.file);
    if (Array.isArray(mode.load)) {
      for (const target of mode.load) {
        if (typeof target === "string") refs.add(target);
      }
    }
    if (route.journal_overlay === "on") {
      const journalLoads = mode.conditional_load?.["journal_overlay=on"];
      if (Array.isArray(journalLoads)) {
        for (const target of journalLoads) {
          if (typeof target === "string") refs.add(target);
        }
      }
    }
  }
  return [...refs];
}

function routeFixture(
  request,
  aliasMaps,
  taskAliasMap,
  pairedSectionAliasMap,
  outputDetailMap,
  manifest,
  fixtureLabel,
  fixture = null,
) {
  const route = { journal_overlay: "off", output_detail: "mode_full", paired_modes: [] };
  const taskRoute = {};
  const taskFields = new Set(["任务类型", "task_type", "task", "任务"]);
  const taskCandidates = [];
  const sectionPairedModes = [];

  if (pairedSectionAliasMap) {
    for (const field of FIXTURE_FIELD_KEYS.section_mode) {
      if (!(field in request) || typeof request[field] !== "string") continue;
      const pairedModes = pairedSectionAliasMap.get(normalizeToken(request[field]));
      if (pairedModes) sectionPairedModes.push(pairedModes);
    }
    const distinctSectionPairs = [...new Set(sectionPairedModes.map((value) => JSON.stringify(value)))];
    if (distinctSectionPairs.length > 1) {
      err(`${fixtureLabel} has conflicting paired section aliases.`);
    } else if (sectionPairedModes.length > 0) {
      route.paired_modes = sectionPairedModes[0];
    }
  }

  const outputDetailCandidates = [];
  for (const field of ["output_detail", "输出模式", "output_mode"]) {
    if (!(field in request)) continue;
    const raw = request[field];
    if (typeof raw !== "string" || !raw.trim()) {
      err(`${fixtureLabel}.${field} must be a non-empty string.`);
      continue;
    }
    const canonical = outputDetailMap?.get(normalizeToken(raw));
    if (!canonical) {
      err(`${fixtureLabel}.${field} value "${raw}" is not present in manifest output_detail aliases.`);
      continue;
    }
    outputDetailCandidates.push(canonical);
  }
  const distinctOutputDetails = [...new Set(outputDetailCandidates)];
  if (distinctOutputDetails.length > 1) {
    err(`${fixtureLabel} has conflicting output_detail aliases.`);
  } else if (distinctOutputDetails.length === 1) {
    route.output_detail = distinctOutputDetails[0];
  }

  let explicitJournalOverlay;
  let explicitJournalOverlayInvalid = false;
  if ("journal_overlay" in request) {
    const raw = request.journal_overlay;
    if (typeof raw !== "string" || !raw.trim()) {
      err(`${fixtureLabel}.journal_overlay must be a non-empty string.`);
      explicitJournalOverlayInvalid = true;
    } else {
      const canonical = normalizeToken(raw);
      if (!journalOverlayValues(manifest).includes(canonical)) {
        err(`${fixtureLabel}.journal_overlay value "${raw}" is not an allowed journal_overlay value.`);
        explicitJournalOverlayInvalid = true;
      } else {
        explicitJournalOverlay = canonical;
      }
    }
  }

  if (taskAliasMap) {
    for (const field of taskFields) {
      if (!(field in request)) continue;
      const raw = request[field];
      if (typeof raw !== "string" || !raw.trim()) {
        err(`${fixtureLabel}.${field} must be a non-empty string.`);
        continue;
      }
      const mapping = taskAliasMap.get(normalizeToken(raw));
      if (mapping) taskCandidates.push({ field, raw, mapping });
    }
    for (const dimension of ["section_mode", "operation"]) {
      const values = [
        ...new Set(
          taskCandidates
            .map((candidate) => candidate.mapping[dimension])
            .filter((value) => value !== undefined),
        ),
      ];
      if (values.length > 1) {
        err(`${fixtureLabel} has conflicting task_aliases for ${dimension}: ${values.join(", ")}.`);
      } else if (values.length === 1) {
        taskRoute[dimension] = values[0];
      }
    }
    const journalValues = [
      ...new Set(
        taskCandidates
          .map((candidate) => candidate.mapping.journal_overlay)
          .filter((value) => value !== undefined),
      ),
    ];
    if (journalValues.length > 1) {
      err(`${fixtureLabel} has conflicting task_aliases for journal_overlay: ${journalValues.join(", ")}.`);
    } else if (journalValues.length === 1) {
      taskRoute.journal_overlay = journalValues[0];
    }
    const pairedModes = taskCandidates.map((candidate) => candidate.mapping.paired_modes).filter(Boolean);
    if (pairedModes.length > 0) {
      const serialized = [...new Set(pairedModes.map((value) => JSON.stringify(value)))];
      if (serialized.length > 1) {
        err(`${fixtureLabel} has conflicting task_aliases for paired_modes.`);
      } else {
        taskRoute.paired_modes = pairedModes[0];
      }
    }
  }

  for (const dimension of FIXTURE_ROUTE_DIMENSIONS) {
    const map = aliasMaps?.[dimension];
    if (!map) {
      err(`${fixtureLabel} cannot resolve ${dimension}: manifest aliases are unavailable.`);
      continue;
    }
    const candidates = [];
    for (const field of FIXTURE_FIELD_KEYS[dimension]) {
      if (!(field in request)) continue;
      const raw = request[field];
      if (typeof raw !== "string" || !raw.trim()) {
        err(`${fixtureLabel}.${field} must be a non-empty string.`);
        continue;
      }
      // A composite task alias in a legacy task field supplies section and/or
      // operation.  Treat it as a task alias, not as a competing operation;
      // explicit section_mode/operation fields remain authoritative.
      if (dimension === "operation" && taskFields.has(field) && taskAliasMap?.has(normalizeToken(raw))) {
        continue;
      }
      const canonical =
        map.get(normalizeToken(raw)) ||
        (dimension === "section_mode" && pairedSectionAliasMap?.has(normalizeToken(raw)) ? "results" : null);
      if (!canonical) {
        err(`${fixtureLabel}.${field} value "${raw}" is not present in manifest aliases.${dimension}.`);
        continue;
      }
      candidates.push({ field, canonical });
    }
    const values = [...new Set(candidates.map((candidate) => candidate.canonical))];
    if (values.length > 1) {
      err(`${fixtureLabel} has conflicting ${dimension} aliases: ${values.join(", ")}.`);
      continue;
    }
    if (values.length === 1) {
      // Explicit fields win over task aliases. A context declaration is a
      // request only; actual coverage is computed from supplied content.
      if (dimension === "context_level") {
        route.requested_context_level = values[0];
      } else {
        route[dimension] = values[0];
        if (dimension === "operation") route.requested_operation = values[0];
      }
    } else if (taskRoute[dimension] !== undefined) {
      if (dimension === "context_level") {
        route.requested_context_level = taskRoute[dimension];
      } else {
        route[dimension] = taskRoute[dimension];
        if (dimension === "operation") route.requested_operation = taskRoute[dimension];
      }
    } else if (dimension === "context_level") {
      // No context request is explicit; actual coverage is still computed
      // independently from the supplied sections and evidence below.
      route.requested_context_level = "auto";
    } else {
      err(`${fixtureLabel} has no routable field or task alias for ${dimension}.`);
    }
  }
  if (route.requested_operation === undefined) route.requested_operation = route.operation;
  if (route.requested_context_level === undefined) route.requested_context_level = "auto";
  if (fixture && "actual_coverage" in fixture) {
    err(`${fixtureLabel}.actual_coverage is not allowed; coverage must be computed from request content.`);
  }
  route.context_level = computeContextLevel(request, route.section_mode);
  route.coverage = route.context_level;
  const requestedJournalOverlay = explicitJournalOverlayInvalid
    ? "off"
    : (explicitJournalOverlay ?? taskRoute.journal_overlay ?? "off");
  if (requestedJournalOverlay === "on") {
    const hasTargetJournal = typeof request.target_journal === "string" && request.target_journal.trim();
    const permission = request.adaptation_permission;
    const hasAdaptationPermission =
      permission === true ||
      (typeof permission === "string" && ["true", "yes", "on", "允许", "同意"].includes(normalizeToken(permission)));
    // An alias cannot silently enable journal adaptation.  Both explicit
    // target and permission inputs are required; otherwise the safe default
    // remains off even when the alias metadata mentions on.
    route.journal_overlay = hasTargetJournal && hasAdaptationPermission ? "on" : "off";
  }
  if (taskRoute.paired_modes !== undefined) {
    if (route.paired_modes.length > 0 && JSON.stringify(route.paired_modes) !== JSON.stringify(taskRoute.paired_modes)) {
      err(`${fixtureLabel} has conflicting paired section/task aliases.`);
    } else {
      route.paired_modes = taskRoute.paired_modes;
    }
  }
  route.loaded_refs = baseModeLoadRefs(manifest, route);
  return route;
}

function validateSectionModeFixtures(
  aliasMaps,
  taskAliasMap,
  pairedSectionAliasMap,
  outputDetailMap,
  manifest,
) {
  const fixturePath = join(root, SECTION_MODE_FIXTURES_REL);
  if (!existsSync(fixturePath)) {
    err(`${SECTION_MODE_FIXTURES_REL} is missing.`);
    return 0;
  }
  const data = readJson(fixturePath, SECTION_MODE_FIXTURES_REL);
  if (!isPlainObject(data) || !Array.isArray(data.fixtures)) {
    err(`${SECTION_MODE_FIXTURES_REL} must contain an object with a fixtures array.`);
    return 0;
  }

  const fixtures = data.fixtures;
  if (fixtures.length < 12) {
    err(`${SECTION_MODE_FIXTURES_REL} must contain at least 12 fixtures (found ${fixtures.length}).`);
  }
  const ids = new Set();
  const observedSections = new Set();
  const observedOperations = new Set();
  const observedTags = new Set();
  const taskAliasFixtureSections = new Set();
  let taskAliasFixtureCount = 0;
  let hasRequestedFullLocalNormalization = false;
  let hasLocal = false;
  let hasFullConsistency = false;

  for (const [index, fixture] of fixtures.entries()) {
    const label = `${SECTION_MODE_FIXTURES_REL} fixture ${index + 1}`;
    if (!isPlainObject(fixture)) {
      err(`${label} must be an object.`);
      continue;
    }
    if (typeof fixture.id !== "string" || !fixture.id.trim()) {
      err(`${label} is missing a non-empty id.`);
    } else if (ids.has(fixture.id)) {
      err(`${label} duplicates id "${fixture.id}".`);
    } else {
      ids.add(fixture.id);
    }
    if (Array.isArray(fixture.tags)) {
      for (const tag of fixture.tags) {
        if (typeof tag === "string") observedTags.add(tag.toLocaleLowerCase());
      }
    } else {
      err(`${label}.tags must be an array.`);
    }

    const request = extractFixtureRequest(fixture);
    if (!request) {
      err(`${label} must define a request or input object.`);
      continue;
    }
    const expected = fixture.expected_route ?? fixture.expected;
    if (!isPlainObject(expected)) {
      err(`${label} must define expected_route (or expected).`);
      continue;
    }
    const fixtureTags = new Set(
      Array.isArray(fixture.tags)
        ? fixture.tags.filter((tag) => typeof tag === "string").map((tag) => tag.toLocaleLowerCase())
        : [],
    );
    if (fixtureTags.has("semantic-not-coverage")) {
      hasRequestedFullLocalNormalization = true;
      if (
        expected.requested_context_level !== "full" ||
        expected.context_level !== "local" ||
        expected.coverage !== "local"
      ) {
        err(`${label} must distinguish requested full from actual local coverage.`);
      }
    }
    for (const dimension of FIXTURE_ROUTE_DIMENSIONS) {
      const value = expected[dimension];
      const allowed = dimension === "section_mode" ? SECTION_MODES : dimension === "operation" ? OPERATIONS : CONTEXT_LEVELS;
      if (typeof value !== "string" || !allowed.includes(value)) {
        err(`${label}.expected_route.${dimension} must be a canonical enum value.`);
      }
      if (dimension === "section_mode" && allowed.includes(value)) observedSections.add(value);
      if (dimension === "operation" && allowed.includes(value)) observedOperations.add(value);
      if (dimension === "context_level" && value === "local") hasLocal = true;
      if (dimension === "operation" && value === "consistency" && expected.context_level === "full") {
        hasFullConsistency = true;
      }
    }

    const taskFields = ["任务类型", "task_type", "task", "任务"];
    const hasTaskAlias = taskAliasMap
      ? taskFields.some(
          (field) =>
            typeof request[field] === "string" && taskAliasMap.has(normalizeToken(request[field])),
        )
      : false;
    const hasExplicitSection = FIXTURE_FIELD_KEYS.section_mode.some((field) => field in request);
    const hasExplicitOperation = ["operation", "操作"].some((field) => field in request);
    if (hasTaskAlias && (!hasExplicitSection || !hasExplicitOperation)) {
      taskAliasFixtureCount += 1;
      if (SECTION_MODES.includes(expected.section_mode)) taskAliasFixtureSections.add(expected.section_mode);
    }

    if (aliasMaps) {
      const actual = routeFixture(
        request,
        aliasMaps,
        taskAliasMap,
        pairedSectionAliasMap,
        outputDetailMap,
        manifest,
        label,
        fixture,
      );
      for (const dimension of FIXTURE_ROUTE_DIMENSIONS) {
        if (actual[dimension] !== expected[dimension]) {
          err(
            `${label} resolved ${dimension} to "${actual[dimension] ?? "<none>"}"; expected "${expected[dimension]}".`,
          );
        }
      }
      const expectedRequestedOperation = expected.requested_operation ?? expected.operation;
      if (actual.requested_operation !== expectedRequestedOperation) {
        err(
          `${label} resolved requested_operation to "${actual.requested_operation ?? "<none>"}"; expected "${expectedRequestedOperation}".`,
        );
      }
      const expectedOutputDetail = expected.output_detail ?? "mode_full";
      if (actual.output_detail !== expectedOutputDetail) {
        err(
          `${label} resolved output_detail to "${actual.output_detail ?? "<none>"}"; expected "${expectedOutputDetail}".`,
        );
      }
      const hasExplicitContext = FIXTURE_FIELD_KEYS.context_level.some((field) => field in request);
      const expectedRequestedContext =
        expected.requested_context_level ?? (hasExplicitContext ? expected.context_level : "auto");
      if (actual.requested_context_level !== expectedRequestedContext) {
        err(
          `${label} resolved requested_context_level to "${actual.requested_context_level ?? "<none>"}"; expected "${expectedRequestedContext}".`,
        );
      }
      if (expected.coverage !== undefined && actual.coverage !== expected.coverage) {
        err(
          `${label} resolved coverage to "${actual.coverage ?? "<none>"}"; expected "${expected.coverage}".`,
        );
      }
      const expectedJournalOverlay = expected.journal_overlay ?? "off";
      if (actual.journal_overlay !== expectedJournalOverlay) {
        err(
          `${label} resolved journal_overlay to "${actual.journal_overlay ?? "<none>"}"; expected "${expectedJournalOverlay}".`,
        );
      }
      const journalAdaptationRef = "references/JOURNAL_ADAPTATION.md";
      if (expectedJournalOverlay === "on" && !actual.loaded_refs?.includes(journalAdaptationRef)) {
        err(`${label} enabled journal_overlay but did not load "${journalAdaptationRef}".`);
      }
      if (expectedJournalOverlay === "off" && actual.loaded_refs?.includes(journalAdaptationRef)) {
        err(`${label} kept journal_overlay off but loaded "${journalAdaptationRef}".`);
      }
      const expectedPairedModes = expected.paired_modes ?? [];
      if (JSON.stringify(actual.paired_modes ?? []) !== JSON.stringify(expectedPairedModes)) {
        err(
          `${label} resolved paired_modes to ${JSON.stringify(actual.paired_modes ?? [])}; expected ${JSON.stringify(expectedPairedModes)}.`,
        );
      }
      if (expectedPairedModes.includes("results") && expectedPairedModes.includes("discussion")) {
        const requiredPairedRefs = ["results", "discussion"]
          .map((modeName) => manifest?.modes?.[modeName]?.file)
          .filter((target) => typeof target === "string");
        for (const target of requiredPairedRefs) {
          if (!actual.loaded_refs?.includes(target)) {
            err(`${label} paired route loaded_refs must include mode contract "${target}".`);
          }
        }
      }
    }
  }

  if (!sameSet([...observedSections], SECTION_MODES)) {
    err(`section-mode fixtures must cover exactly: ${SECTION_MODES.join(", ")}.`);
  }
  if (!OPERATIONS.every((operation) => observedOperations.has(operation))) {
    err(`section-mode fixtures must cover all operations: ${OPERATIONS.join(", ")}.`);
  }
  for (const tag of ["english", "chinese", "legacy"]) {
    if (!observedTags.has(tag)) err(`section-mode fixtures must include a "${tag}" coverage tag.`);
  }
  if (!observedTags.has("task-alias")) {
    err('section-mode fixtures must include a "task-alias" coverage tag.');
  }
  if (taskAliasFixtureCount < 6) {
    err(`section-mode fixtures must contain at least 6 task-alias fixtures (found ${taskAliasFixtureCount}).`);
  }
  if (!sameSet([...taskAliasFixtureSections], SECTION_MODES)) {
    err(`task-alias fixtures must cover exactly: ${SECTION_MODES.join(", ")}.`);
  }
  if (!hasLocal) err("section-mode fixtures must include a local-context example.");
  if (!hasFullConsistency) {
    err("section-mode fixtures must include a full-context consistency example.");
  }
  if (!hasRequestedFullLocalNormalization) {
    err("section-mode fixtures must include a semantic-not-coverage requested-full/local fixture.");
  }
  return fixtures.length;
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
    for (const key of ["name", "description", "metadata"]) {
      if (!fm[key] || !String(fm[key]).trim()) {
        err(`SKILL.md frontmatter is missing required key: "${key}".`);
      }
    }
    let metadata = null;
    if (fm.metadata) {
      try {
        metadata = JSON.parse(fm.metadata);
      } catch (error) {
        err(`SKILL.md metadata must be an inline JSON object: ${error.message}`);
      }
    }
    const skillVersion = metadata?.version;
    if (!skillVersion || typeof skillVersion !== "string") {
      err('SKILL.md metadata is missing string key "version".');
    } else if (!/^\d+\.\d+\.\d+$/.test(skillVersion.trim())) {
      warn(`SKILL.md metadata.version "${skillVersion}" is not semver (x.y.z).`);
    }
    if (fm.name) info.push(`skill name: ${fm.name}`);
    if (skillVersion) info.push(`skill version: ${skillVersion}`);
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

// --- 4. Validate section-mode contract and forward-routing fixtures -------
const sectionModeValidation = validateSectionModeManifest();
const sectionModeFixtureCount = validateSectionModeFixtures(
  sectionModeValidation.aliasMaps,
  sectionModeValidation.taskAliasMap,
  sectionModeValidation.pairedSectionAliasMap,
  sectionModeValidation.outputDetailMap,
  sectionModeValidation.manifest,
);
info.push(`section mode count: ${sectionModeValidation.modeCount}`);
info.push(`section mode fixture count: ${sectionModeFixtureCount}`);

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
