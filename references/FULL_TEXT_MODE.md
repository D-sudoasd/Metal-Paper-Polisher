# Full-text mode（v5）

本文件只定义 `section_mode=full` 的差异契约。通用路由、输入信封、状态值和加载优先级遵循 [`SECTION_MODE_ROUTER.md`](SECTION_MODE_ROUTER.md)；证据等级与动词上限遵循 [`CLAIM_EVIDENCE_MATRIX.md`](CLAIM_EVIDENCE_MATRIX.md)；全文主线、章节顺序和证据依赖遵循 [`ARCHITECTURE_RULES.md`](ARCHITECTURE_RULES.md)；交付前核查使用 [`QUALITY_CHECKLIST.md`](QUALITY_CHECKLIST.md)。本文件定义全文协调所需的最小数据结构，不复制共享规则。

## 1. 模式目的与路由轴

Full-text mode 用于把各章节放回同一条可追溯的科学主线：识别主张、绑定证据、确定章节归属、核对顺序和边界，并在授权范围内给出局部改写。它不因用户提供了多段文本就自动获得“全文一致性”结论。

```text
section_mode = full
operation    = polish | rewrite | diagnose | restructure | consistency
context_level = local | partial | full
```

`rewrite` 可作为保留旧入口的兼容操作；若它改变结构或归属，应归一化为 `restructure`，否则按保留主张的 `polish` 处理。所有输出必须包含 `coverage`、`not_checked`、`status` 和 `blockers`。

## 2. 输入契约与覆盖度

### 2.1 核心输入

全文一致性至少需要以下核心章节：

- Title；
- Abstract；
- Introduction；
- Methods，或可替代 Methods 的完整实验/计算条件清单；
- Results；
- Discussion，或明确标注为合并的 Results and Discussion；
- Conclusion。

并且需要一个 `section_manifest`，标明每个章节是 `provided`、`missing` 还是 `unknown`；没有 manifest 时不能把“用户说有全文”当作完整上下文。

为把 `consistency` 提升到 `coverage=full`，还需要：

- Figure/Table/Equation/Citation map；
- `ClaimRecord` 与 `EvidenceRecord` ledger，或能从原文逐项建立该 ledger 的完整材料；
- 术语、符号、数值、单位和固定表达锁定项；
- 若 operation 为 `restructure`，还需跨章节移动、Results–Discussion 重分配、移入补充材料的明确权限。

缺少其中非核心材料时可以做有限诊断，但必须把缺失项放入 `not_checked`。缺少核心章节时不能声称 `coverage=full`，即使所有已提供文本都很长。

### 2.2 `context_level` 能力矩阵

| 级别 | 可执行范围 | 状态/声明边界 |
|---|---|---|
| `local` | 对单一章节做语言精修或局部诊断 | `coverage=local`；不得报告全文一致性 |
| `partial` | 对已提供的多个章节做局部主张、顺序、术语或 Results–Discussion 检查 | `coverage=partial`；缺失核心章节和证据映射必须列出 |
| `full` | 核心章节齐全，并有 ledger、条件/术语锁定和所需权限时，执行全文主线与一致性审计 | 才可报告 `coverage=full`；未提供的图表、方法或引文仍须标为未检查 |

请求 `operation=consistency` 但输入低于 `full` 时，路由器只能返回有限的 partial/fallback 诊断；请求 `restructure` 但缺少移动权限时，只能返回建议，不得静默改写章节归属。

## 3. 四类操作

### 3.1 `polish`

在已有章节归属和主张集合不变的前提下，修复语言、重复、段落衔接、术语和证据相称的动词。若发现跨章节冲突，只记录冲突，不把润色变成未经授权的结构重写。

### 3.2 `diagnose`

输出主线、章节功能、主张来源、证据缺口、重复和冲突；默认不移动文本、不新增科学连接。可以给出重排建议，但建议不是已执行的编辑。

### 3.3 `restructure`

在明确权限内调整章节顺序、段落归属或 Results–Discussion 分配。跨章节移动、Results↔Discussion 重分配和移入补充材料都必须有对应授权字段；缺失授权时状态为 `author_confirmation_required`。

### 3.4 `consistency`

建立或审计 Claim/Evidence ledger，检查引言承诺、正文证据、讨论解释、结论回收、摘要压缩和标题强度是否闭合。该操作不等于事实验证或外部文献检索；缺失原始证据时只能报告材料内部一致性缺口。

## 4. 最小追踪数据结构

对需要跨章节判断的内容建立以下记录。字段可由用户提供，也可从完整输入中抽取；抽取不确定时必须请求确认。

### 4.1 `ClaimRecord`

```yaml
claim_id: C1
claim: "可核查的规范化主张"
record_kind: scientific_claim | research_promise | gap_statement | definition
claim_kind: observation | difference | association | contribution | mechanism | performance | generalization | limitation
evidence_level: L0-L7
evidence_refs: [E1, Figure-3, Table-2]
conditions: [material, state, temperature, loading, scale]
source_sections: [introduction, results, discussion, conclusion]
canonical_owner: introduction | methods | results | discussion
occurrences:
  introduction: promise
  results: evidence
  discussion: explanation
  abstract: compression
  conclusion: recovery
allowed_verbs: [observed, associated_with, supports]
status: established | bounded | pending | conflict | author_confirmation_required
```

### 4.2 `EvidenceRecord`

```yaml
evidence_id: E1
source: Figure/Table/Equation/Citation or supplied data
observation: "直接观察或计算输出"
conditions: [same condition keys as ClaimRecord]
scale: local | phase | specimen | system
supports: [C1]
limits: ["未区分的替代解释或缺失条件"]
```

`record_kind=scientific_claim` 时，`canonical_owner` 只能是 Methods、Results 或 Discussion；Introduction 只能拥有 research promise 或 gap statement。其他章节通过 `occurrences` 记录 promise、evidence、explanation、compression 或 recovery，不能在没有新证据时复制成第二个独立主张。证据等级只允许保持或降级，不允许后文、摘要或标题把它升级。

## 5. 全文一致性门

Full 的 gate 集合固定为 `context_sufficiency / core_claim_identity / claim_coverage_order / canonical_owner / evidence_arrow_closure / evidence_strength_monotonicity / condition_term_lock / title_abstract_conclusion_alignment / no_new_claims / section_role_boundary / citation_permission`。名称与失败动作统一见 [`SECTION_MODE_ROUTER.md`](SECTION_MODE_ROUTER.md)。

在 `full` 覆盖下至少执行以下闭合检查：

1. **Introduction → Results/Discussion**：引言末段承诺的每个 `claim_id` 都有结果证据、讨论解释或明确的未闭合状态；
2. **Results → Discussion**：每条跨证据机制箭头都能指向支持它的 `EvidenceRecord`，不能用并列观察自动生成因果链；
3. **Discussion → Conclusion**：结论只回收已建立或明确有界的主张，不引入 Discussion 中未有证据的新分支；
4. **Abstract/Title 压缩**：摘要和标题只能压缩同一主张集合，动词不超过对应 `ClaimRecord` 的证据上限；
5. **canonical owner**：每个主要主张只有一个完整归属，重复出现需标记为短式回收、交叉引用或重复压缩候选；
6. **章节边界**：当前图表可直接核查的内容与跨图、模型、文献和替代解释保持正确的 Results/Discussion 归属；
7. **顺序与覆盖**：主张顺序、图表顺序、证明依赖和结论回收顺序不互相冲突；
8. **条件/术语锁定**：材料、相名、缩写、变量、公式、温度、应变率、环境、单位、数字和方向在各章节一致；
9. **图表/公式/引文映射**：每项高层主张的直接证据、模型、公式和引文范围可定位；缺失映射不得用“通常认为”补齐；
10. **冲突传播**：条件、数字、方向、术语、证据等级或作者意图冲突沿 `claim_id` 传播为 `conflict`，直到作者确认或原文证据解决。

## 6. 允许与禁止的动作

### 6.1 允许

- 在 `polish` 中保持主张、证据、归属和条件不变，改善语言与接力；
- 在 `diagnose` 中生成主线、Claim/Evidence ledger、章节覆盖和冲突报告；
- 在有明确权限时执行段落排序、Results–Discussion 归属调整和重复压缩；
- 把缺失证据、待定动词、条件冲突和作者控制项显式列为问题；
- 根据当前材料把过强动词降级到证据允许范围，并记录降级原因。

### 6.2 禁止

- 发明实验、计算、数值、图表、公式、引文、机制、性能或应用意义；
- 把不同样品的快照写成未经证实的连续时间序列；
- 仅因段落相邻、峰宽变化、强度提高或空间相邻而生成唯一因果关系；
- 把缺少核心章节的 partial 审计报告为 full consistency；
- 未经权限移动跨章节内容、重分配 Results 与 Discussion，或把正文移入补充材料；
- 删除唯一证据、边界、条件、替代解释或不确定性以制造主线闭合；
- 用外部常识或未授权检索替代用户未提供的证据。

## 7. 输出契约

输出应先给路由和覆盖，再给稿件或审计结果：

```yaml
route_decision:
  section_mode: full
  requested_operation: polish | rewrite | diagnose | restructure | consistency
  operation: polish | rewrite | diagnose | restructure | consistency
  paired_modes: []
  journal_overlay: off | on
  output_detail: text_only | with_notes | mode_full | diagnostic
  requested_context_level: local | partial | full | auto
  context_level: local | partial | full
  required_inputs: []
  loaded_refs: []
  skipped_checks: []
  coverage: local | partial | full
  not_checked: []
  status: ok | partial | fallback | author_confirmation_required | blocked
  blockers: []
```

按操作补充以下字段：

- `main_line`：一句核心问题、主要主张和边界；
- `claim_evidence_ledger`：`ClaimRecord` 与 `EvidenceRecord` 列表、canonical owner、证据等级和限制；
- `ownership_map`：各章节写入/读取/验证的主张及唯一主归属；
- `cross_section_consistency`：Introduction→Results/Discussion→Conclusion 与 Abstract/Title 压缩闭合；
- `ordering_audit`：证明顺序、图表顺序、覆盖、重复和遗漏；
- `term_condition_audit`：术语、条件、数值、单位、方向和公式；
- `figure_table_citation_map`：主张与证据来源映射；
- `permission_actions`：已授权、未授权和建议动作；
- `section_revisions`：仅列出实际允许并执行的局部修改；
- `author_confirmation_questions`：作者必须确认的主张、条件、权限或冲突。

不要输出内部逐步推理；输出可复核的记录、判断和修改结果即可。

## 8. Fail-closed 规则

- 缺少核心章节：`coverage` 最高为 `partial`，不得返回 `status=ok` 的 full consistency；
- 缺少 Claim/Evidence ledger 且无法从材料可靠建立：一致性操作至少为 `author_confirmation_required`；
- 关键主张没有 EvidenceRecord、条件不全或证据箭头无法闭合：高层改写停止，列入 `blockers`；
- 发现新 claim、证据等级提升、数字/方向/术语冲突：暂停相关编辑，返回 `author_confirmation_required` 或 `blocked`；
- 未提供跨章节移动权限：不执行移动；仅输出建议并保留原归属；
- 请求 full 但只有单段或单章输入：可执行 `local` 语言层 fallback，必须明确 `not_checked`，不能沿用旧“完整模式”的全局声明。

## 9. 旧调用兼容

旧字段由路由器归一化，保留原入口但不保留其过宽的隐含承诺：

| 旧字段 | 映射 |
|---|---|
| `文本所属部分=全文` | `section_mode=full` |
| `任务类型=语言精修` | `operation=polish` |
| `任务类型=全文架构审阅` | `operation=diagnose` |
| `任务类型=Results–Discussion 分工` | `operation=diagnose`；结合明确权限时才可 `restructure` |
| `任务类型=证据审计` | `operation=diagnose`；显式要求跨章节一致性时才使用 `consistency` |
| `输出模式=仅精修稿/精修稿与关键说明` | 只设置 `output_detail`，不改变显式/已推断的 `operation`；输出范围由真实 `coverage` 决定 |
| `输出模式=完整模式/架构审阅模式` | 只设置 `output_detail=mode_full/diagnostic`，不改变 `operation`，也不自动补齐缺失章节 |
| `Results–Discussion 处理=允许重新分配` | 仅打开 Results↔Discussion 重分配权限，不改变其他跨章节权限 |

旧调用同时提供多个章节时，先建立 `context_level`；未提供核心章节或 evidence map 时降级为 `partial`/`fallback`。旧的“全文”标签、默认论文类型或默认期刊设置均不能覆盖真实输入，也不能隐式开启期刊 overlay。
