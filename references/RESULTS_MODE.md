# Results section mode contract

本文件是 `section_mode=results` 的薄契约。它只声明 Results 与共享路由、证据和
质量门之间的差异；科学不变量、证据等级和全文架构规则分别以
[`SECTION_MODE_ROUTER.md`](SECTION_MODE_ROUTER.md)、
[`CLAIM_EVIDENCE_MATRIX.md`](CLAIM_EVIDENCE_MATRIX.md)、
[`RESULTS_DISCUSSION_LOGIC.md`](RESULTS_DISCUSSION_LOGIC.md)、
[`ARCHITECTURE_RULES.md`](ARCHITECTURE_RULES.md) 和
[`QUALITY_CHECKLIST.md`](QUALITY_CHECKLIST.md) 为准。本文件不复制这些文件的
完整规则。

## 1. 路由身份

| 字段 | 规范值 |
| --- | --- |
| `section_mode` | `results` |
| `operation` | `polish` / `rewrite` / `diagnose` / `restructure` / `consistency` |
| `context_level` | `local` / `partial` / `full` |
| 证据角色 | 观察、比较、趋势、时序和证据邻近的局部判断 |
| 结果边界 | 写到当前证据组能够直接支持的最强局部结论 |

`Results and Discussion`、`Results–Discussion` 和“结果与讨论分工”是兼容
别名，不是第七种独立模式。路由器应将其规范化为 Results 与 Discussion 的
配对请求，并分别套用两个 section contract；配对不会降低任一科学门，也不
会把局部证据自动升级为完整机制。

## 2. 输入契约

所有操作至少需要待处理的 Results 文本。输入还应提供语言、操作、改写权限
和保留科学信息的约束；旧字段的映射见第 8 节。以下输入决定能做什么，而不
是自动授予更高的证据等级。

| `context_level` | 最低输入 | 可选或条件输入 | 缺失时的处理 |
| --- | --- | --- | --- |
| `local` | Results 文本、段落边界或可识别的句子边界 | 图/表编号、原始数值、比较对象、测试条件 | 可以做语言和局部结构工作；缺图表、条件或基准时不得新写高层局部判断 |
| `partial` | Results 文本；拟保留或改写的图/表/数据引用；对应条件和比较基准 | 摘要、引言末段、相关方法、局部 `ClaimRecord` / `EvidenceRecord` | 可以审计指定证据范围；未提供的图表、条件和证据标记为 `not_checked` |
| `full` | 全文可用部分、图表—主张映射和可追踪的主张/证据清单 | 完整 `ClaimRecord`、`EvidenceRecord`、术语/条件清单 | 可以做全文闭合检查，但仍不能补造证据；缺清单的门必须报告为未检查 |

以下操作有额外最低条件：

- `polish`：只有 Results 文本也可执行，但只能改变表达，不得改变科学主张。
- `rewrite`：若改写涉及观察、比较或局部判断，至少应有相应图/表、条件和
  基准；缺任一项时只能做受限语言改写或列出阻断项。
- `diagnose`：可在 `local` 运行；跨图表、跨章节或主张覆盖诊断至少需要
  `partial`，全文一致性诊断需要 `full`。
- `restructure`：需要段落边界和“允许段内/跨段移动”的权限；跨 section 移动
  还需要对应 section 文本或明确的目标位置。
- `consistency`：需要可追踪的主张—证据范围；没有全文清单时只能声明指定
  范围的一致性结果，不能宣布全文一致。

## 3. 按上下文的能力边界

| 上下文 | 允许的结果 | 明确不允许 |
| --- | --- | --- |
| `local` | 语法、术语、句序、证据邻近表达；在已有证据旁写直接观察或受限比较 | 用缺失的图表、条件或基准补出局部结论；跨图构造机制；宣称已完成跨章节审计 |
| `partial` | 在给定证据范围内组织“条件 → 观察 → 比较/趋势 → 局部判断”；标注 Results/Discussion 边界 | 把未提供的证据当作存在；把多证据综合机制写入 Results；将局部结果推广到其他材料或条件 |
| `full` | 按证明依赖顺序核对 Results 与引言承诺、摘要主张、Discussion 和 Conclusion 的覆盖；建立或核对 claim/evidence map | 以“全文已提供”为理由新增数据、机制、推广或 `L6/L7` 主张；代替 Discussion 完成跨尺度解释 |

即使是 `full`，Results 的生成目标仍是证据邻近的局部结果。需要多幅图、
多个尺度、模型、文献或替代机制比较才能成立的解释，应进入 Discussion，或
在诊断中标为“应移至 Discussion”。

## 4. 加载策略

路由器先加载本契约和共享路由，再按操作与上下文加载以下规则：

1. 必载：[`SECTION_MODE_ROUTER.md`](SECTION_MODE_ROUTER.md)、
   [`CLAIM_EVIDENCE_MATRIX.md`](CLAIM_EVIDENCE_MATRIX.md) 和
   [`RESULTS_DISCUSSION_LOGIC.md`](RESULTS_DISCUSSION_LOGIC.md)。
2. `full` 或 `consistency` 时加载
   [`ARCHITECTURE_RULES.md`](ARCHITECTURE_RULES.md)，用于证明依赖、主线和
   跨 section 闭合；`local` 只在诊断明确涉及架构时加载。
3. 输出前按需加载
   [`QUALITY_CHECKLIST.md`](QUALITY_CHECKLIST.md) 的 Results、Discussion、
   主张—证据和全文主线项目；清单是验收表，不是新的科学规则。
4. 配对别名同时加载 Discussion contract，但每条事实仍保留 Results 或
   Discussion 的归属。未加载的检查写入 `not_checked`，不能默认为通过。

## 5. 允许与禁止

### 5.1 允许

- 将图表、条件、比较对象和直接观察放在读者可核查的顺序中。
- 保留或降级原文动词，使其不超过对应 `EvidenceRecord` 的证据上限。
- 在受控干预、明确时序、中间变量或独立验证已直接给出的情况下，写局部
  因果判断，并限定材料、阶段、区间和测试条件。
- 压缩重复数值、调整段内顺序，或在获得权限后建议段落归属变化。
- 输出缺失基准、条件、图表映射和需作者确认的具体问题。

### 5.2 禁止

- 编造图、表、数值、误差、基准、测试条件、引用或未提供的中间变量。
- 将空间相邻、同步变化或不同样品快照自动写成时序、来源或完整因果链。
- 用 Results 的单项证据跨图、跨尺度或跨文献构造完整机制；这类内容只能
  保留为受限局部判断并移交 Discussion 诊断。
- 将 `associated with`、`consistent with` 等证据写成 `controlled`、
  `governed`、`dominated` 或普适设计准则。
- 因为开启 `full` 就新增 Results 结果，或把未检查的章节标成一致。
- 未获权限时跨 section 移动数据、引用或结论；不以语言精修掩盖归属变化。

## 6. 证据等级上限与 fail-closed 门

Results 的 gate 集合固定为 `context_sufficiency / core_claim_identity / evidence_proximity / evidence_strength_monotonicity / condition_term_lock / local_causality / no_new_claims / section_role_boundary / figure_table_mapping`。名称与失败动作统一见 [`SECTION_MODE_ROUTER.md`](SECTION_MODE_ROUTER.md)。

证据等级定义、最低证据组合和动词梯度以
[`CLAIM_EVIDENCE_MATRIX.md`](CLAIM_EVIDENCE_MATRIX.md) 为唯一规范。下表是
Results 生成时的上限提示，不是自动升级规则：

| 证据条件 | Results 新生成或强化主张的上限 |
| --- | --- |
| 只有文本，缺图表、条件或基准 | L0–L1；可修正语言，不能新写高层局部判断 |
| 有图/表、可比条件和基准 | 通常不超过 L2；只有在关联被直接测量时才可到 L3 |
| 同一局部过程有受控干预、可靠时序或直接中间变量 | 可保留至 L4；不能仅凭本表生成跨证据完整机制 |
| 原文已有局部机制且 `ClaimRecord` 明确映射独立支持 | 可按原证据保留受限 L5，但不得在改写中扩大范围 |
| 需要排除主要替代解释、跨材料推广或控制性结论 | Results 不生成 L6/L7，转入 Discussion 或作者确认 |

这些上限约束新增或实质改写的科学判断，不授权删除、降级或改写作者原有主张。现有高等级句缺少可核查证据时，语言层可原样保留并标记“未验证”，或在作者明确要求证据校准时给出建议版本；不得静默改变科学结论。

任何输出主张的证据等级都不得高于其映射证据；证据冲突时取较低等级或阻断。
下列任一条件触发 `blocked` 或 `author_confirmation_required`，不得静默补齐：

1. 目标句缺少可定位的图/表/数据来源，或条件、基准、单位不明。
2. 观察、比较和局部判断的对象不能唯一对应，或同一 `claim_id` 有冲突版本。
3. 需要跨图、跨尺度、模型或文献才能闭合的箭头被要求在 Results 中完成。
4. 原文的强动词没有达到相应 L 等级，且用户未授权只保留原文待确认标记。
5. 术语、相名、变量、样品或测试条件冲突，无法由原文证据判定优先版本。
6. 请求跨段、跨小节或跨 section 重排，但权限或目标位置未提供。
7. `full`/`consistency` 请求缺少所需上下文，却要求输出“全文已核验”。

## 7. 固定输出契约

每次结果模式输出都要先给路由覆盖，再给结果。字段名固定如下；`revision` 与
`diagnosis` 按 operation 二选一或同时提供，不得省略覆盖和未检查范围：

```yaml
route_decision:
  section_mode: results
  requested_operation: polish|rewrite|diagnose|restructure|consistency
  operation: polish|rewrite|diagnose|restructure|consistency
  paired_modes: []|[results, discussion]
  journal_overlay: off|on
  output_detail: text_only|with_notes|mode_full|diagnostic
  requested_context_level: local|partial|full|auto
  context_level: local|partial|full
  required_inputs: []
  loaded_refs: []
  skipped_checks: []
  coverage: local|partial|full
  not_checked: []
  status: ok|partial|fallback|author_confirmation_required|blocked
  blockers: []
revision: null
diagnosis: null
claim_evidence_map: []
author_confirmation: []
```

`claim_evidence_map` 至少记录：`claim_id`、主张文本、`evidence_refs`、
`evidence_level`、条件、允许动词、Results/Discussion 归属和状态。没有现成
ID 时可用临时标签追踪段内主张，但必须标明它不是新证据。`diagnosis` 至少
报告：证据邻近性、Results 停止点、缺失基准/条件、过强动词、应移交
Discussion 的句子和阻断项。`author_confirmation` 逐条写明作者需要确认的
事实、权限或外部证据，不用泛化的“请检查”。

## 8. 旧字段兼容别名

旧输入仍可使用，但路由后必须显示规范化结果：

| 旧字段 | 值 | 规范化 |
| --- | --- | --- |
| `文本所属部分` | `结果` / `Results` | `section_mode=results` |
| `文本所属部分` | `Results and Discussion` / `结果与讨论` | Results + Discussion 配对别名 |
| `任务类型` | `语言精修` | `operation=polish` |
| `任务类型` | `Results–Discussion 分工` | `operation=diagnose`、`paired_modes=[results, discussion]`；只有明确允许重新分配时才升级为 `restructure` |
| `任务类型` | `证据审计` | `operation=diagnose`；显式要求跨章节一致性时才使用 `consistency` |
| `任务类型` | `全文架构审阅` | `operation=diagnose`；没有 full 输入时不得伪报 full |
| `输出模式` | `仅精修稿` | 只显示 `revision`；内部仍记录 `coverage` 与 `not_checked`，发生降级或阻断时必须显示 |
| `输出模式` | `架构审阅模式` | 输出 `diagnosis` 和 `claim_evidence_map` |
| `输出模式` | `完整模式` | 仅表示输出详细度，不等于 `context_level=full` |

旧字段不足以确定上下文时，默认 `coverage=local`，并把未提供的图表、条件、
基准和跨 section 检查列入 `not_checked`。
