# Introduction section mode

这是引言专用的薄 wrapper。引言的完整变量、段落功能、缺口类型和发现/需求路由只在 [`INTRODUCTION_LOGIC.md`](INTRODUCTION_LOGIC.md) 中维护；本文件只声明输入、输出、上下文边界和加载指针。共同路由见 [`SECTION_MODE_ROUTER.md`](SECTION_MODE_ROUTER.md)，机器元数据见 [`SECTION_MODE_MANIFEST.json`](SECTION_MODE_MANIFEST.json)。

## 1. 入口与旧调用映射

### 必填输入

- `text`：待处理的 Introduction，或明确标记为待生成的 Introduction 输入；
- `section_mode=introduction`；
- `operation`：`polish`、`rewrite`、`diagnose`、`restructure` 或 `consistency`；
- `context_level`：按实际提供的 sections、变量和证据 manifest 判定。

### 条件输入

- `introduction_mode`：`auto`、`discovery` 或 `need_performance`；
- 八项工作变量 `Y`、`A`、`C`、`B`、`X`、`M`、`E`、`G`；`E` 可进一步拆成 `E1`、`E2`、`E3`；
- 题目、摘要、Results、Discussion、Conclusion 和 `claim_records`；
- 每组引文实际支撑的命题、`citation_manifest`、新增检索权限；
- `reverse_generation=true` 时，提供作为依据的其他 section，而不是只给“请生成引言”的空指令。

旧模板中的“文本所属部分=引言/Introduction”映射到 `section_mode=introduction`；“Introduction 重构”映射到 `operation=restructure`，“重写”才映射到 `operation=rewrite`；“Introduction 模式=需求与性能导向”映射到 `introduction_mode=need_performance`。旧的“完整模式”仍不能绕过上下文覆盖判定。

## 2. Introduction dispatch

引言的深层规范和两个主路由只在 [`INTRODUCTION_LOGIC.md`](INTRODUCTION_LOGIC.md) 中维护。

| `introduction_mode` | 规范名称 | 选择依据 |
|---|---|---|
| `auto` | 自动 | 根据主要贡献、题目/摘要承诺、首图任务和证据闭合判断；无法分辨时保留不确定性 |
| `discovery` | 发现导向 | 解释异常现象、缺失机制路径、控制因素或定量关系是首要贡献 |
| `need_performance` | 需求与性能导向 | 在明确材料/制造/服役约束下实现、控制或预测目标能力是首要贡献 |

若机制发现与性能设计不能汇合到同一上位主张，不强行合并；保留主次关系并返回 `author_confirmation_required`，由作者决定引言首要身份。变量 `Y/A/C/B/X/M/E/G` 是工作字段，不是可凭常识填充的事实。

## 3. 输出契约

引言 mode 先输出统一路由对象，再输出 requested operation 的结果。至少包含：

```yaml
route_decision:
  section_mode: introduction
  requested_operation: diagnose
  operation: diagnose
  paired_modes: []
  journal_overlay: off
  output_detail: mode_full
  requested_context_level: full
  context_level: local
  required_inputs: [text]
  loaded_refs: []
  skipped_checks: [introduction_results_promise_closure]
  coverage: local
  status: partial
  blockers: []
  not_checked: [citation_support, title_abstract_conclusion_alignment]
revision: "仅在 operation 允许、授权明确且没有阻断项时给出"
variable_map:
  Y: null
  A: null
  C: null
  B: null
  X: null
  M: null
  E: []
  G: null
gap_statement:
  text: "精确缺口；若无法从输入确认则留空"
  status: missing | provisional | confirmed
paragraph_map: []
promise_audit:
  promise_claim_ids: []
  evidence_routes: []
  unresolved: []
questions: []
```

Introduction mode 负责精确知识/能力缺口、研究承诺和证据路线；这些记录的 `record_kind` 为 `gap_statement` 或 `research_promise`。科学结果仍由 Methods/Results/Discussion 建立。引言末段可以声明本文将回答什么，但不能把未提供的 Results/Discussion 结果写成已证实的机制或性能。

## 4. 允许检查与 fail-closed

| 条件 | 允许 | 必须关闭或降级 |
|---|---|---|
| `context_level=local` | 背景收缩、文献综述功能、缺口句精度、段落推进和局部语言 | 引言对 Results/Discussion/Conclusion 的 promise closure、引文真实性、全文主张一致性 |
| `context_level=partial` 且提供摘要或目标 section | 检查已提供的主张、路由和引言末段承诺是否对齐 | 未提供证据路线的箭头；未提供引文支撑的文献结论 |
| `context_level=full` 且有 `section_manifest`/ledger | Introduction→Results promise closure、核心 claim ID、条件/术语和跨章顺序 | ledger 中仍为冲突或缺失的记录 |
| `reverse_generation=true` | 根据提供的已建立主张和证据路线生成结构草案 | 没有结果/证据输入时生成具体机制、数值或文献断言 |
| `citation_manifest` 缺失或新增检索未授权 | 标出引用支撑风险并保留作者原引文 | 新增文献、改变引文支撑范围或声称“文献已证明” |

Introduction 的 gate 集合固定为 `context_sufficiency / gap_precision / core_claim_identity / evidence_strength_monotonicity / promise_evidence_closure / citation_permission / condition_term_lock / no_new_claims / section_role_boundary`。名称与失败动作统一见 [`SECTION_MODE_ROUTER.md`](SECTION_MODE_ROUTER.md)。

## 5. 按 operation 的边界

- `polish`：保持缺口、承诺和段落顺序，仅改善语言及衔接；
- `rewrite`：在已确认的 `introduction_mode` 和变量框架内重写引言；缺少主贡献时先诊断；
- `diagnose`：输出 `Y/A/C/B/X/M/E/G` 缺口、段落功能、引文支撑风险和承诺闭合状态；
- `restructure`：在明确权限内重排段落或压缩不服务主线的背景；不替作者改换论文身份；
- `consistency`：只比对已提供的 sections/ledger，明确 `coverage`、`skipped_checks` 和 `not_checked`。

只有引言文本而没有其他 sections 时，结果必须标为 `coverage=local`；可以交付局部修订，但不能宣称“引言已经与全文一致”。
