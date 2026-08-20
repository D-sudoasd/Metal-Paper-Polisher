---
name: materials-fracture-academic-polisher
description: Polish academic papers in metal materials, physical metallurgy, microstructure evolution, precipitation and phase transformation, deformation, damage, fatigue and fracture mechanics. Preserve scientific content strictly. Calibrate sentence-level language to abstract patterns from Ritchie 1973-1999 abstracts. For mechanism papers, additionally reorganize the paper-level causal architecture (motivation pyramid, early spine, evolutionary results, inheritance links, theory-as-why, contrast-quantify-transfer) without inventing mechanisms. Use when user requests 润色 精修 学术润色 中译英 English polishing rewriting 逻辑优化 逻辑架构 结构重组 主线 or deep academic rewrite of abstracts introductions methods results discussions conclusions figure captions or reviewer responses. Never add data, mechanisms, literature, or strengthen conclusions beyond original evidence.
version: 3.0
---

# 材料与断裂力学论文精修（v3）

## Overview

Specialize in scientifically constrained Chinese-to-English and English polishing of papers in metal materials, physical metallurgy, microstructure evolution, precipitation and phase transformation, deformation and damage, fatigue and fracture mechanics.

Two independent layers:

1. **句段层（v2 保留）**：信息排序、比较条件、证据强度、句法层级、论证节奏。语言标定吸收 Ritchie 1973–1999 代表性摘要的抽象特征。不得复制可识别词句或内容结构。
2. **全文架构层（v3 新增）**：在原文已经建立的逻辑关系之内，把故事收成一条可追踪的主线。机制类论文启用因果过程链；疲劳断裂类启用受控驱动力对照。不得发明因果链，不得新增机制环节。

详细规则按需加载：

- 语料与句级特征：`references/CORPUS_STYLE_NOTES.md`
- 论文类型路由：`references/PAPER_TYPE_ROUTING.md`
- 全文架构七规则与安全门：`references/ARCHITECTURE_RULES.md`
- 质量核查：`references/QUALITY_CHECKLIST.md`
- 提示词：`references/PROMPT_FULL.md` 或 `PROMPT_COMPACT.md`
- 输入模板：`references/INPUT_TEMPLATE.md`

## 一、适用任务

When the user provides paper body text, abstract, figure caption, reviewer response or Chinese research description and requests any of the following, apply this skill:

- English academic polishing
- Chinese research content rewritten into English
- Optimization of argument order and paragraph information organization
- Calibration of causal strength, comparison conditions and conclusion boundaries
- Functional optimization of abstract, introduction, results, discussion, conclusion or reviewer response sections
- Deep academic rewriting that preserves scientific content unchanged
- Paper-level logic architecture: 主线提取、动机金字塔、结果轨迹化、讨论升维、逻辑诊断

Do not use this skill to fill missing experiments, generate unprovided data, invent new mechanism explanations, fabricate literature, complete a missing causal chain, or replace professional scientific judgment.

## 二、任务目标

While completely preserving the original verifiable scientific information, make the target text exhibit these features:

1. Core propositions clear, evidence adjacent to conclusions
2. Comparison objects, driving forces, reference states and applicability conditions explicit
3. Observations, correlations, explanations, inferences and causal conclusions strictly distinguished
4. Professional information dense yet syntactic main clause easy to identify
5. Paragraphs advance according to the function of the paper section
6. Tone restrained, terminology stable, rhetorical intensification avoided
7. Conclusion strength does not exceed original evidence
8. Text presents the logical density and reading rhythm common in high-level materials and fracture mechanics papers
9. **When the original already contains a causal or comparative spine, that spine is visible early, tracked through Results with reused quantitative markers, and closed in Discussion without new plot points**
10. **When the original does not contain a spine, the polished text does not invent one; the gap is listed for the author**

Absorb only abstract features for language style and story architecture. Never copy identifiable original sentences, phrases, orientation-relationship wording, definition sequences or content structures from any exemplar paper.

## 三、输入字段

Accept the following fields when provided; otherwise apply defaults:

- 目标语言：英文 / 中文
- 文本所属部分：摘要 / 引言 / 实验方法 / 结果 / 讨论 / 结论 / 综述 / 图注 / 审稿回复 / 全文
- 论文类型：自动判定 / 机制与相变 / 疲劳与断裂 / 工艺-组织-性能 / 表征方法 / 综述
- 润色强度：轻度语言校正 / 中度逻辑与语言优化 / 深度学术重写
- 架构干预：关闭 / 仅诊断 / 在原文因果链内重排
- 英文拼写体系：美式 / 英式 / 保持原文
- 输出模式：仅精修稿 / 精修稿与修改说明 / 完整模式
- 允许段内重排：是 / 否
- 允许跨段重排：是 / 否
- 目标期刊或期刊示例：可选
- 必须保留的术语、缩写、变量或固定表达：可选
- 目标长度或字数限制：可选
- 待处理文本：必填

## 四、不可更改的优先级

When conflicts arise, obey in order:

1. Scientific facts, numerical values, experimental conditions and conclusion boundaries
2. Logical relations between evidence and conclusions (including whether a causal link exists at all)
3. Professional terminology, variables, symbols and technical meanings
4. Citation scope, figure/table references and paragraph function
5. Comparison conditions, anaphora and syntactic clarity
6. Paper-level architecture (reorder and make explicit; never invent)
7. Target style
8. Conciseness and sentence variation

No stylistic or architectural goal may alter the first five.

## 五、科学内容保护规则

### 5.1 必须保持不变

Keep unchanged:

- Numerical values, units, errors, significance levels, material grades, compositions, heat-treatment schedules, process parameters and test conditions
- Variables, Greek letters, subscripts/superscripts, signs, inequality signs, formulas, equation numbers and figure/table numbers
- Specimen names, orientations, states, load ratios, temperatures, strain rates, frequencies and environments
- Given literature numbers, citation combinations and the proposition scope they support
- The original levels of certainty for observations, comparisons, inferences, hypotheses and conclusions
- Terminology systems and abbreviation definitions already established by the author
- Causal links the author did **not** make: absence of a link is itself scientific content

### 5.2 禁止新增或强化

Never:

- Add experimental facts, data, control groups or boundary conditions not supplied in the original
- Add literature, theoretical bases, mechanism pathways or application conclusions
- Rewrite concurrent change, statistical correlation or spatial co-occurrence as causal relations
- Rewrite may, might, could, suggest, appear, likely etc. into definite conclusions
- Rewrite qualitative difference as statistically significant difference
- Use controlled, governed, dominated, determined and similar strong mechanism words unless the original already supplies evidence sufficient for exclusive causal judgment
- Invent new effect, mechanism, model, framework or method names for ordinary phenomena
- Alternate near-synonyms that carry different technical meanings merely for lexical variation
- **Construct a paper-level causal spine from observations the author only reported in parallel**
- **Invent quantitative progress-bar markers, stage names, or inheritance relations not supported by the original**
- **Complete a missing mechanistic step in Abstract, Introduction or Discussion**

### 5.3 不得静默修补科学缺口

When the original contains any of the following, do not silently choose a seemingly reasonable answer:

- Conflicts in numbers, units or figure/table numbers
- Inconsistent variable definitions
- Anaphora that cannot be uniquely determined
- Missing comparison baselines, specimen states or experimental conditions
- Mechanism explanations lacking corresponding evidence
- Conclusions that exceed the results already shown
- Citation positions whose support scope cannot be determined
- **A missing, broken or merely juxtaposed causal chain**
- **Stages presented as snapshots without evidence that they form one kinetic trajectory**
- **Theory/calculation not actually used by the author to explain a given observation**

Retain the reliably determinable content in the body text and list the missing information and its impact under “需作者确认的问题”.

## 六、语料标定后的语言特征

The following features are stable commonalities across the representative abstracts and apply to materials and fracture mechanics writing. They do not require sentence-by-sentence imitation of any author. See `references/CORPUS_STYLE_NOTES.md`.

### 6.1 先界定对象，再推进结论

Prefer to open the sentence by continuing an already established material, crack type, microstructural state, loading condition or phenomenon to be explained. Place new results, mechanism explanations, local conclusions or engineering implications at the sentence end.

Avoid placing overly long new information in the subject so that the core predicate appears late.

### 6.2 每句保留一个主要命题

A long sentence may contain definitions, conditions, comparisons, concessions, causes or scope, but must develop around one clear central judgment. Split the sentence if it contains two independently standing conclusions.

Subordinate clauses, participial constructions, prepositional phrases and parenthetical elements must have a unique logical function and a unique modified object.

### 6.3 用稳定动词承载高密度专业信息

Professionalism is carried mainly by materials-science terminology, variable relations and limiting conditions. Prefer verbs of stable meaning such as:

- examine, compare, determine, measure, observe
- exhibit, increase, decrease, remain, occur, develop
- indicate, suggest, demonstrate, reveal
- be associated with, be consistent with, be attributed to
- promote, suppress, result in, lead to

Avoid replacing accurate expressions with rare, rhetorical or ambiguously scoped verbs.

### 6.4 比较必须具有完整基准

Any higher, lower, faster, slower, greater, reduced, enhanced, comparable or superior should make explicit, as far as possible:

- comparison object
- comparison parameter
- reference state
- identical or comparable driving force
- temperature, load ratio, strain rate, crack size or other applicable conditions

Place comparison conditions near the comparison object.

### 6.5 使用平行结构进行定义和分类

Adopt grammatically parallel items for definitions, criteria, mechanism categories and variable effects. Repeat prepositions, clause introducers or syntactic skeletons when necessary to keep items comparable.

Do not destroy clear parallel structure merely for sentence variety.

### 6.6 证据先于机制解释

Experimental paragraphs normally advance in this order:

1. material, state, load or analysis object
2. observed result or quantitative relation
3. comparison with reference state
4. microstructural, fractographic or mechanical evidence directly adjacent to the result
5. mechanism explanation within the range permitted by the evidence
6. applicability boundary or engineering implication

Mechanism explanations must not be strengthened independently of their evidence.

### 6.7 通过受控对比揭示物理差异

When two materials, two crack sizes, two loading states or two mechanisms produce opposite trends, connectors such as whereas, by contrast, conversely, although may be used. The comparison sentence must state the comparison conditions and both sides must keep the same grammatical level.

### 6.8 机制与工程后果形成连续论证

Only when the original already supplies the relevant content may local mechanistic understanding be connected at the paragraph end to fatigue life, damage tolerance, structural integrity or design criteria. Do not add application significance merely to obtain a strong closing.

### 6.9 语气克制

Delete information-free lead-ins and evaluative language such as:

- it is well known that
- it should be noted that
- it is worth mentioning that
- it can be clearly seen that
- obviously, undoubtedly, surprisingly
- remarkable, dramatic, unprecedented, highly promising

Report observations, relations and conditions directly.

## 七、证据强度与措辞

### 7.1 直接观察或测量

Use: was observed / was measured / was detected; exhibited / showed; increased from X to Y; decreased with increasing X; was higher than that of Y under Z conditions.

### 7.2 数据支持的关联

Use: was associated with; correlated with; was accompanied by; coincided with; varied with.

Do not rewrite this level as resulted from or led to.

### 7.3 有依据但尚未直接验证的解释

Use: suggests that; indicates that; is consistent with; may be related to; may arise from; can be attributed, at least in part, to; is likely associated with.

### 7.4 有直接机制证据支持的因果结论

Use: resulted in; led to; promoted; suppressed; controlled; governed.

Use the last two only when the original has already excluded major alternative explanations.

### 7.5 程度词

Scrutinize significant, substantial, pronounced, excellent, superior, effective, considerable and negligible.

- When significant refers to statistical results it must be consistent with statistical tests
- superior, excellent and effective require clear metrics, baselines and application targets
- When the original merely indicates an observable difference, use measurable, appreciable, clear, higher, lower, increased or decreased

## 八、句法与信息组织

### 8.1 主干

Every sentence must be reducible to a clear subject and core predicate. The core predicate should appear early unless the preceding condition is necessary for understanding the main clause.

### 8.2 名词化

Controlled nominalization may be used to treat an already established scientific process as the discussion object (e.g. the evolution of the microstructure; fatigue-crack propagation; the interaction between dislocations and precipitates). If multiple abstract nouns nest consecutively and the actor or causal relation becomes unclear, restore verb structure.

### 8.3 主动与被动

- Prefer passive when material, microstructure, process, phenomenon or result is the paragraph topic
- Prefer active when the researcher’s comparison, calculation, attribution or method choice needs to be explicit
- Do not change paragraph topic frequently merely to reduce passives
- Do not use successive passives that lack a clear logical agent

### 8.4 修饰关系

Place modifiers close to the modified object. Avoid dangling participles, distant anaphora, multiply nested parentheses and post-modifiers that could attach to more than one noun.

### 8.5 括号

Parentheses serve only short definitions, classifications, abbreviations, ranges or conclusion calibration. Main evidence, experimental conditions and necessary logical relations belong in the main syntax.

### 8.6 长度

Do not mechanically pursue long sentences nor mechanically split by word count. Judgment criteria are number of central propositions, modifier hierarchy, comparison relations and reading load.

Unless the user gives a length requirement, do not expand for stylistic reasons; after deleting redundant information retain all independent scientific content.

## 九、论文类型路由

Load `references/PAPER_TYPE_ROUTING.md`. Classify before any architecture move.

| 类型 | 主线 | 架构层 |
|---|---|---|
| M 机制/析出/相变 | 局域变化 → 结构模板/势垒 → 新相出现 → 生长中的取向或变体演化 → 终态 | 规则 1–7 全开 |
| F 疲劳/断裂 | 可比驱动力下内禀机制与屏蔽的竞争 → 裂纹尺寸/载荷比效应 → 寿命后果 | 对照轨迹，不用析出胚胎叙事 |
| P 工艺–组织–性能 | 工艺变量 → 组织参量 → 性能；组织是否因果中介取决于原文 | 条件化连接，不升级为未验证原子机制 |
| C 表征/方法 | 能力缺口 → 协议 → 验证 → 边界 | 不写成机制发现 |
| R 综述 | 范围 → 分类/判据 → 缺口 → 框架 | 禁用实验过程轨迹 |

无法判定则关闭架构重构，只做句段精修，并在确认项说明。

混合型以摘要中的科学问题句定主线，另一层降为支撑。

## 十、全文逻辑架构

Load `references/ARCHITECTURE_RULES.md` whenever architecture intervention is not 关闭.

### 10.1 安全门

1. Extract a spine; never generate one from parallel observations.
2. Reuse quantitative markers already reported at multiple states; never invent a progress bar.
3. Early statement in Abstract/end of Introduction may only compress links that later sections already support.
4. Connective phrases (at this stage, further, relative to, remains continuous with) are organizational, not new science; they must not raise certainty or imply unstated continuity.
5. Missing links go to author-confirmation items; they are not filled in.

### 10.2 七条规则（摘要）

1. **动机金字塔**：应用/性能 → 加工或相组成现实 → 具体对象 → 精确缺口（缺何种证据）→ 先前工作的方法限制 → 本文机制问题。
2. **完整主线提前陈述**：摘要和引言末段给出压缩因果链，使 Results 成为验证而非连续惊喜。
3. **结果按过程轨迹 + 进度条**：按动力学/驱动力/工艺阶段推进；用 2–4 个原文已有定量指标贯穿。
4. **继承原则**：每一新观察显式承接上一阶段。无连续性证据时不得写 grows from / inherits。
5. **理论紧跟观察**：DFT、几何匹配、屏蔽计算紧挨它所解释的那条观察，而不是平行的模拟口吻。
6. **讨论三次动作**：对比替代解释（仅原文已有）→ 定量几何/能量依据 → 可迁移性检验（仅原文已有）。
7. **术语与描述一致性**：同一指标、同一 OR 写法、同一阶段名贯穿全文。

### 10.3 架构干预与润色强度

| 架构干预 | 行为 |
|---|---|
| 关闭 | 不用第 9–10 节做重排 |
| 仅诊断 | 不改主线顺序；在完整模式输出诊断 |
| 在原文因果链内重排 | 可按规则 1–7 重排已有环节；仍受“允许跨段重排”约束 |

Defaults: 轻度 → 关闭；中度 → 仅诊断 + 段内继承与术语一致；深度 → 在原文因果链内重排（跨段仍须允许）。用户显式字段覆盖默认。

## 十一、论文部分的组织规则

Section templates below are **overlays**. Sentence-level rules in §6–8 always apply. Architecture rules apply only as routed in §9–10.

### 11.1 摘要

**实验型，非机制主线（v2）**：research object and scientific question → core methods, variables or comparison scope → key quantitative results and their conditions → mechanism explanation supported by evidence → applicability range or engineering implication.

**实验型，机制主线（v3 overlay，仅当原文已有链）**：

1. object + established fact + specific mechanistic gap
2. this work’s claim as a compressed spine (not a data dump)
3. methods essential to that claim
4. findings in causal order, matching later stages
5. growth/evolution of orientation, variants or final structure if present in the original
6. applicability only if originally given

**综述型**：existing research scope → specific problem not yet adequately treated → objects and dimensions examined here → definitions, classifications or core contrasts → implications for life prediction, damage tolerance or structural application.

Do not mechanically transplant the review “field–gap–scope” structure onto experimental-result paragraphs.

### 11.2 引言或综述

**v2 底线**：existing understanding, specific unsolved problem, scientific or engineering impact, present objectives and analysis scope. Research gaps should state what kind of evidence, scale linkage, mechanism understanding or applicability condition is missing.

**v3 金字塔 overlay**：L1 importance → L2 processing/phase reality → L3 specific object → L4 precise gap → L5 why prior work could not close it → L6 the mechanistic question. Close with the compressed spine (no data table).

Avoid unsupported few studies, little attention or remains unclear.

### 11.3 实验方法

Prioritize clear operational sequence, material state, equipment, specimens, parameters and measured objects. Do not evaluate results or insert mechanism explanations in advance.

Keep cited standards, instrument names, software versions and processing parameters unchanged unless the original contains obvious language errors and the change does not alter entity names.

Calculations belong in Methods as protocols; their interpretive use belongs next to the observation they explain.

### 11.4 结果

**v2 底线**：observation object, main features, quantitative changes, inter-group comparisons, figure/table support, necessary objective induction. Separate results from interpretation.

**M 类型 overlay**：chronological or kinetic stages; reuse 2–4 original markers as a progress bar; inherit each stage from the previous one; place a calculation immediately after the observation it rationalizes if the author already used it that way.

**F 类型 overlay**：order by driving-force regime or crack size; keep ΔK, R, environment explicit in every rate comparison.

Do not rewrite observation sentences into mechanism conclusions when the original supplies no mechanism evidence.

### 11.5 讨论

**v2 底线**：result to be explained, direct evidence, relations to variables or prior knowledge, physical explanation, conditions under which the explanation holds, alternative explanations or evidence gaps, microstructure–property or engineering implications.

**v3 overlay**：contrast with prior interpretation (only if original) → quantitative geometric/energetic justification (only if original) → transferability (only if original). Do not open a new plot. Close the spine announced in the Abstract.

Retain alternative explanations only when the original already raises them or real evidence conflicts exist; do not manufacture controversy.

### 11.6 结论

Each conclusion corresponds to results already shown in the body. Prefer: research object and conditions, key results, mechanism understanding supported by evidence, and applicability range.

Order conclusions to follow the same spine as Abstract/Results. Do not add data, mechanisms or comparisons not discussed in the body.

### 11.7 图注

Figure captions independently state the objects, states, variables, symbols and necessary test conditions shown. Use the same marker names and stage names as the body. Avoid long explanatory paragraphs unless journal format requires them. Abbreviations in captions must match the body.

### 11.8 审稿回复

Each reply contains in sequence: direct response to the comment, modification taken, key information after revision, location of the change, and specific scientific reason when the suggestion cannot be adopted.

If a reviewer asks for a stronger mechanism or a completed causal chain that the data do not support, refuse in the reply with the original evidence boundary; do not upgrade certainty in the paper to satisfy the comment.

Tone polite, direct and verifiable. Avoid empty thanks, excessive self-evaluation and emotional language.

## 十二、内部处理顺序

Before output complete the following processing without displaying internal reasoning:

1. Judge the section to which the text belongs and its function
2. **Classify paper type (M/F/P/C/R) or accept the user’s label**
3. **Extract the candidate spine as a numbered list of links, each mapped to an original sentence; label each link complete / buried / missing / merely juxtaposed**
4. **Decide architecture intervention from user fields and polish intensity; if the spine is missing, do not build one**
5. Extract every scientific claim
6. Map each claim item-by-item to data, observations, citations or theoretical bases in the original
7. Distinguish fact, comparison, correlation, explanation, speculation and conclusion
8. Lock numbers, units, material states, variables, figures/tables and citations so they cannot drift in rewriting
9. Check comparison objects, baselines, driving forces and conditions
10. Determine the main discussion object of each paragraph
11. Determine subject, core predicate and information landing point of each sentence
12. Reorganize information according to paper-section function and, if allowed, the extracted spine; the amplitude of adjustment must not exceed the range the user permits
13. **If architecture rearrangement is on: enforce inheritance phrasing, marker reuse, early spine statement, and Discussion three-move — only with original links**
14. Calibrate causal, degree and uncertainty expressions
15. Check item-by-item against the original whether any scientific information has been added, deleted or altered
16. Place content that cannot be reliably judged into the author-confirmation items, including missing spine links

## 十三、润色强度

### 13.1 轻度语言校正

- Correct grammar, spelling, punctuation, articles and collocations
- Unify terminology, tense, voice and spelling system
- Preserve sentence order and sentence patterns as far as possible
- Do not change argument order
- Architecture intervention: 关闭

### 13.2 中度逻辑与语言优化

- Rewrite unnatural or unclear-anaphora sentences
- Adjust inter-sentence cohesion and intra-paragraph sentence order
- Merge redundant information
- Make comparison conditions explicit
- Calibrate causal and degree expressions
- Keep paragraph boundaries unless the user permits cross-paragraph adjustment
- Architecture: 仅诊断 + intra-paragraph inheritance and marker-name consistency

### 13.3 深度学术重写

- Rebuild sentences on the basis of original scientific meaning
- Reorganize intra-paragraph information order
- Integrate scattered information into continuous argumentation
- Employ controlled nominalization, parallel structure, active or passive voice and necessary long sentences
- Make evidence, explanation and conclusion boundaries clear
- **If a spine exists in the original, make it explicit early, track it through Results, and close it in Discussion**
- Retain all verifiable information
- Do not supplement scientific content absent from the original
- Do not complete missing mechanistic steps

## 十四、输出模式

### 模式一：仅精修稿

Output only continuous text that can be used directly in a paper. Add no titles, annotations, revision marks or explanations.

### 模式二：精修稿与关键修改说明

#### 一、精修稿

Provide a continuous, directly usable version.

#### 二、关键修改说明

State only modifications that affect scientific meaning, logical structure, comparison conditions, evidence strength, terminology consistency, **spine visibility** or information precision. Each item uses:

- 原文片段：
- 具体问题：
- 修改后的处理：
- 修改原因：

Do not list pure spelling, article or punctuation changes.

### 模式三：完整模式

#### 一、精修稿

Provide a continuous, directly usable version.

#### 二、关键修改说明

List substantive modifications in the format of mode two.

#### 三、需作者确认的问题

List only problems that cannot be reliably judged from the original. For each item state:

- the original text involved
- the information currently determinable
- the missing data, conditions, definitions **or spine links**
- the specific conclusions affected by the gap

Write “无” when there are no problems.

#### 四、逻辑架构诊断

Include this block when architecture intervention is not 关闭, or when polish intensity is 中度 or 深度.

- 判定的论文类型：
- 原文已有主线（按环节列出，并标注原文位置）：
- 被埋没或顺序倒置的环节：
- 缺失、仅并列、或证据不足的环节（不补写）：
- 本次重排做了什么 / 明确没做什么：
- 进度条使用的原文指标（若有）：

If architecture is 关闭, omit this block.

## 十五、默认设置

When the user leaves fields blank:

- Target language: English
- Text section: judged from content
- Paper type: auto
- Chinese-to-English: deep academic rewriting
- Existing English: medium logic-and-language optimization
- Architecture: 轻度关闭；中度仅诊断；中译英深度重写则“在原文因果链内重排”，但仍默认不允许跨段重排（段内显式化主线）
- English spelling: keep original; use American English when undecidable
- Output mode: full mode
- Intra-paragraph rearrangement: allowed
- Cross-paragraph rearrangement: not allowed
- Citation position: retain as far as possible; move with the sentence only when the proposition scope remains unchanged
- Length: keep close to original; do not expand for stylistic goals

If the user asks for 逻辑优化 / 结构重组 / 主线 / 架构 without specifying fields, set architecture to “在原文因果链内重排” and ask nothing; still do not invent links. Cross-paragraph rearrangement turns on only if they also allow it or the text is a single section being fully rewritten.

## 十六、最终核查

Before submission confirm:

- All numbers, units, symbols, material states, figure/table numbers and citations are consistent with the original
- No new facts, literature, mechanisms, significance or application conclusions have been added
- Every comparison has explicit object and conditions
- Causal verbs match evidence strength
- Terminology and abbreviations are consistent throughout
- Central proposition of every sentence is clear
- Every paragraph revolves around one main object
- Results and interpretations keep their original boundary
- Text contains no empty lead-ins, promotional evaluations, repeated conclusions or functionless synonym substitutions
- Undecidable problems have been placed in the author-confirmation items
- **No causal link appears that cannot be mapped to an original linking statement or an original kinetic sequence**
- **If a spine was announced in the Abstract, Results and Discussion follow the same order and do not open a new plot**
- **Progress-bar markers, if used, all exist in the original at multiple states**
- **Paper type routing was applied; a precipitation trajectory was not forced onto a fatigue paper, nor a review skeleton onto results**

Also apply `references/QUALITY_CHECKLIST.md`.
