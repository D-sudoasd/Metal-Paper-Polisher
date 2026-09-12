# Abstract section mode

这是摘要专用的薄 wrapper。它把三轴路由、共享证据边界和输出契约连接到已有的摘要深层规则；不复制 L0–L7、摘要句子逻辑或论文类型表。共同路由见 [`SECTION_MODE_ROUTER.md`](SECTION_MODE_ROUTER.md)，机器元数据见 [`SECTION_MODE_MANIFEST.json`](SECTION_MODE_MANIFEST.json)。

## 1. 入口与旧调用映射

### 必填输入

- `text`：待处理的摘要文本；
- `section_mode=abstract`；
- `operation`：`polish`、`rewrite`、`diagnose`、`restructure` 或 `consistency`；
- `context_level`：按实际提供的文本和 ledger 判定，不由“摘要重构”一词自动升级。

### 条件输入

- `abstract_mode`：`auto`、`standard`、`discovery` 或 `design`；
- `title`、作者的一句话核心主张、必须保留的定量结果与条件；
- `claim_records`、`evidence_records`；
- 在需要检查承诺闭合时，提供 `introduction`、`results`、`discussion` 或 `conclusion`；
- 新增引文前的 `citation_manifest` 和授权。

旧模板中的“文本所属部分=摘要”映射到 `section_mode=abstract`；“摘要重构”映射到 `operation=restructure`，“摘要重写”映射到 `operation=rewrite`；“摘要精修模式”映射到 `abstract_mode`，而不是 `operation`。旧的“仅精修稿”“精修稿与关键说明”“完整模式”只影响输出详细程度，不能把 `context_level` 声称为 `full`。

## 2. 摘要模式 dispatch

具体路由与规则只在 [`ABSTRACT_MODELS.md`](ABSTRACT_MODELS.md)、[`ABSTRACT_CORE_CLAIM_MODE.md`](ABSTRACT_CORE_CLAIM_MODE.md) 和 [`ABSTRACT_DESIGN_SOLUTION_MODE.md`](ABSTRACT_DESIGN_SOLUTION_MODE.md) 中维护。

| `abstract_mode` | 规范名称 | 深层文件 | 适用的摘要身份 |
|---|---|---|---|
| `auto` | 自动 | [`ABSTRACT_MODELS.md`](ABSTRACT_MODELS.md) | 先判断发现、设计或标准功能型；证据不足时保留不确定性 |
| `standard` | 标准功能型 | [`ABSTRACT_MODELS.md`](ABSTRACT_MODELS.md) | 多条平行结果、方法、综述、数据库或无法安全压成单链 |
| `discovery` | 发现导向单链 | [`ABSTRACT_CORE_CLAIM_MODE.md`](ABSTRACT_CORE_CLAIM_MODE.md) 与专用 prompt | 新现象、机制、定量关系或控制因素是主要新增认识 |
| `design` | 设计/解决导向链 | [`ABSTRACT_DESIGN_SOLUTION_MODE.md`](ABSTRACT_DESIGN_SOLUTION_MODE.md) 与专用 prompt | 可控设计在边界内实现目标能力或性能组合 |

兼容别名“核心发现单链（Mo式逻辑）”归入 `discovery`；“需求与性能导向”不是摘要模式，若它描述的是引言路由，应改为 `section_mode=introduction`、`introduction_mode=need_performance`。

## 3. 输出契约

摘要 mode 先输出统一路由对象，再输出 requested operation 的结果。至少包含：

```yaml
route_decision:
  section_mode: abstract
  requested_operation: diagnose
  operation: diagnose
  paired_modes: []
  journal_overlay: off
  output_detail: mode_full
  requested_context_level: full
  context_level: local
  required_inputs: [text]
  loaded_refs: []
  skipped_checks: [cross_section_promise_closure]
  coverage: local
  status: partial
  blockers: []
  not_checked: [title_abstract_conclusion_alignment]
revision: "仅在 operation 允许且没有阻断项时给出"
core_claim:
  id: "optional ClaimRecord id"
  statement: "作者已确认或从文本保守抽取的核心主张"
  allowed_verbs: []
abstract_audit:
  mode: standard
  sentence_roles: []
  evidence_boundaries: []
  missing_inputs: []
questions: []
```

`core_claim` 由当前摘要声明或已提供的 ClaimRecord 支持；它不是让编辑器替作者发明论文主线。摘要只能压缩已建立的主张：如果摘要动词比正文或 `evidence_level` 更强，先降级动词或标记 `author_confirmation_required`。

## 4. 允许检查与 fail-closed

摘要 mode 负责核心 claim ID 的压缩、句子顺序和摘要动词上限，但 Abstract 不是科学主张的 canonical owner。它只能把既有 claim 记为 `occurrence= compression`；不得产生正文未建立的独立 claim ID。

| 条件 | 允许 | 必须关闭或降级 |
|---|---|---|
| `context_level=local` | 句子功能、信息顺序、方法/数字压缩、局部动词校准 | 题目—摘要—结论对齐、全文机制闭合、研究优先性与推广性 |
| `context_level=partial` 且有 ClaimRecord/EvidenceRecord | 摘要与已提供部分的主张、条件和证据回收 | 未提供部分的闭合；未提供证据的机制解释 |
| `context_level=full` 且有完整 ledger | 核心主张身份、证据强度单调性、跨章顺序和覆盖检查 | 任何缺失/冲突记录仍需作者确认 |
| `abstract_mode=discovery` | 单一发现链的顺序与递进 | 并列主线强行压成单链；没有时序/受控/独立证据的机制升级 |
| `abstract_mode=design` | 需求—设计—中间状态—性能—代价抑制链 | 只凭性能差异声称设计因果；没有基准/条件的“superior” |

Abstract 的 gate 集合固定为 `context_sufficiency / core_claim_identity / evidence_strength_monotonicity / condition_term_lock / no_new_claims / section_role_boundary / citation_permission`。名称与失败动作统一见 [`SECTION_MODE_ROUTER.md`](SECTION_MODE_ROUTER.md)；摘要 mode 不另造一套 L0–L7 规则。

## 5. 按 operation 的边界

- `polish`：保持摘要主线和句子功能，仅改善语言、衔接和证据校准；
- `rewrite`：在选定 `abstract_mode` 内重写摘要链；没有核心主张或证据不足时退回诊断；
- `diagnose`：给出句子角色、主张顺序、重复信息、证据边界和缺失输入；
- `restructure`：只在用户允许的范围内重排摘要句子；不能借此改变全文 canonical owner；
- `consistency`：只比较已提供的 sections/ledger，并输出 `coverage` 和未检查项。

没有提供摘要以外的上下文时，标准结果应标为 `coverage=local`、`status=partial`；即使输出了可用修订，也不能写成“全文已一致”。
