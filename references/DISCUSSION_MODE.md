# Discussion section mode contract

本文件是 `section_mode=discussion` 的薄契约。它只声明 Discussion 与共享
路由、证据和质量门之间的差异；科学不变量、证据等级和全文架构规则分别以
[`SECTION_MODE_ROUTER.md`](SECTION_MODE_ROUTER.md)、
[`CLAIM_EVIDENCE_MATRIX.md`](CLAIM_EVIDENCE_MATRIX.md)、
[`RESULTS_DISCUSSION_LOGIC.md`](RESULTS_DISCUSSION_LOGIC.md)、
[`ARCHITECTURE_RULES.md`](ARCHITECTURE_RULES.md) 和
[`QUALITY_CHECKLIST.md`](QUALITY_CHECKLIST.md) 为准。本文件不复制这些文件的
完整规则。

## 1. 路由身份

| 字段 | 规范值 |
| --- | --- |
| `section_mode` | `discussion` |
| `operation` | `polish` / `rewrite` / `diagnose` / `restructure` / `consistency` |
| `context_level` | `local` / `partial` / `full` |
| 证据角色 | 跨结果整合、机制箭头、替代解释、定量检验和适用边界 |
| 章节边界 | 解释 Results 已建立的事实，不首次创造决定性结果或证据 |

`Results and Discussion`、`Results–Discussion` 和“结果与讨论分工”是兼容
别名，不是第七种独立模式。路由器应将其规范化为 Results 与 Discussion 的
配对请求，并分别套用两个 section contract；配对不会降低证据门，也不会因
章节合并而允许在 Discussion 中补造缺失的 Results。

## 2. 输入契约

所有操作至少需要待处理的 Discussion 文本。语言精修可以只用该文本；任何
机制、性能归因、跨证据解释或边界扩展都需要可追踪的 Results 和证据上下文。

| `context_level` | 最低输入 | 可选或条件输入 | 缺失时的处理 |
| --- | --- | --- | --- |
| `local` | Discussion 文本、段落边界或可识别句子边界 | 作者已有的主张、限定词和引文 | 只做语言精修或结构诊断；没有 Results/EvidenceRecord 时禁止机制重写 |
| `partial` | Discussion 文本；相关 Results 片段；拟使用的图/表/数据或 `EvidenceRecord`；条件和范围 | 摘要、引言末段、方法、局部 `ClaimRecord`、替代解释来源 | 可在指定证据范围内审计箭头；未提供部分列入 `not_checked` |
| `full` | 全文可用部分、图表—主张映射、`ClaimRecord`/`EvidenceRecord` 和术语/条件清单 | 文献比较、模型假设和作者确认状态 | 可以做全文闭合检查，但不能补造新证据或把未检查项标成已解决 |

以下操作有额外最低条件：

- `polish`：只有 Discussion 文本也可执行，但若没有 Results/EvidenceRecord，
  revision 必须保持事实和机制强度不变。
- `rewrite`：涉及解释、归因或机制箭头时至少需要相关 Results 与证据引用；
  否则只能做不改变主张的语言重写，并报告阻断项。
- `diagnose`：可在 `local` 诊断语言、重复和结构；机制箭头、替代解释和
  跨 section 覆盖至少需要 `partial`，全文一致性需要 `full`。
- `restructure`：需要段落边界和移动权限；涉及“事实应前移 Results”时，需
  有 Results 目标片段或明确列为建议，不得静默移动。
- `consistency`：需要可追踪的主张—证据范围；没有全文清单时只能报告指定
  范围的一致性，不能宣布全文闭合。

## 3. 按上下文的能力边界

| 上下文 | 允许的结果 | 明确不允许 |
| --- | --- | --- |
| `local` | 语法、术语、语气、段落顺序和重复压缩；指出某句像结果报告或缺少证据 | 机制重写、跨证据箭头、性能唯一归因、替代机制排除、跨材料推广 |
| `partial` | 用已提供 Results 和 EvidenceRecord 连接关键结果，生成受限的箭头台账、替代解释和边界 | 把缺失的中间变量、时间顺序或控制实验当作已存在；用文献替代本文证据 |
| `full` | 核对引言承诺—Results 证据—Discussion 解释—Conclusion 回收；检查主张归属和重复 | 在 Discussion 首次引入摘要核心的新数据或决定性机制；以 full 自动提升动词或范围 |

没有 Results 或 `EvidenceRecord` 时，Discussion 只能做语言层精修和结构诊断。
这种情况下必须明确标记“机制重写阻断”，并把需要首先放入 Results 的事实列入
`results_precedence_candidates`；不得用“可能”“合理地”掩盖证据缺失。

## 4. 加载策略

路由器先加载本契约和共享路由，再按操作与上下文加载以下规则：

1. 必载：[`SECTION_MODE_ROUTER.md`](SECTION_MODE_ROUTER.md)、
   [`CLAIM_EVIDENCE_MATRIX.md`](CLAIM_EVIDENCE_MATRIX.md) 和
   [`RESULTS_DISCUSSION_LOGIC.md`](RESULTS_DISCUSSION_LOGIC.md)。后者定义
   Results 的停止点、Discussion 的升维顺序和合并章节的功能边界。
2. `partial`/`full`、`rewrite` 或 `consistency` 时加载
   [`ARCHITECTURE_RULES.md`](ARCHITECTURE_RULES.md)，用于箭头、主张所有权、
   证明依赖、替代解释和适用范围检查。
3. 输出前按需加载
   [`QUALITY_CHECKLIST.md`](QUALITY_CHECKLIST.md) 的 Discussion、
   Results–Discussion、全文主线、证据和作者确认项目；清单是验收表，不是
   新的证据来源。
4. 配对别名同时加载 Results contract，并为每条事实保留章节归属。未加载的
   检查写入 `not_checked`，不能默认为通过。

## 5. 允许与禁止

### 5.1 允许

- 从已建立的关键 Results 出发，按“结果 → 多类证据 → 中间过程 → 定量检验
  → 替代解释 → 边界”组织段落。
- 在证据明确时降低或保留动词强度，区分 `associated with`、`consistent
  with`、`suggests`、`contributed to` 和更强因果词。
- 建立 `mechanism_arrow_ledger`，逐箭头记录起点、终点、中间过程、证据、
  条件、替代解释、边界和状态。
- 标出 Results 中首次出现的事实、关键数值或决定性证据，并提出前移建议。
- 压缩对 Results 的逐图复述，保留支撑机制或边界所必需的结果和条件。

### 5.2 禁止

- 没有 Results/EvidenceRecord 时重写完整机制、性能归因或跨尺度因果链。
- 在 Discussion 首次补入决定摘要主张的新数据、图表、数值、实验观察、
  中间变量或未提供的文献结论。
- 用领域常识或文献“证明”本文缺失的箭头，用合理性替代可追踪证据。
- 将相关、同步变化、断口形貌或单项模型一致性写成唯一机制、控制机制或
  普适设计准则。
- 未获权限时把 Discussion 事实静默移动到 Results，或把结果重复伪装成新解释。
- 因为 `context_level=full` 就声称所有替代解释均已排除；未检查项必须显式列出。

## 6. 证据等级上限与 fail-closed 门

Discussion 的 gate 集合固定为 `context_sufficiency / core_claim_identity / evidence_arrow_closure / alternative_explanations / boundary_statement / evidence_strength_monotonicity / condition_term_lock / no_new_claims / section_role_boundary`。名称与失败动作统一见 [`SECTION_MODE_ROUTER.md`](SECTION_MODE_ROUTER.md)。

证据等级定义、最低证据组合和动词梯度以
[`CLAIM_EVIDENCE_MATRIX.md`](CLAIM_EVIDENCE_MATRIX.md) 为唯一规范。下表是
Discussion 生成时的上限提示，不是自动升级规则：

| 证据条件 | Discussion 新生成或强化主张的上限 |
| --- | --- |
| 只有 Discussion 文本，没有 Results/EvidenceRecord | L0–L1 的语言层处理；不得新写机制或归因 |
| 有相关 Results，但没有可定位的条件、图表或证据记录 | 通常不超过 L2；机制句只能保留为作者原文并标为待确认 |
| 有 Results、条件和可定位证据，箭头由同一局部过程支持 | 可到 L3–L4；必须在台账中写明范围和未排除项 |
| 多类独立证据、时序/中间变量和替代解释处理均有记录 | 可按原证据保留受限 L5；不得扩大材料、条件或时间范围 |
| 控制/主导或跨材料推广需要额外排他性和多状态证据 | 不在普通 Discussion 改写中生成 L6/L7，转作者确认或专门全文审计 |

这些上限约束新增或实质改写的机制判断。只有 Discussion 文本时，原有较强主张可以在纯语言精修中原样保留，但必须标记为“未由所给上下文验证”；不得擅自升级，也不得在没有作者授权和证据的情况下静默降级其科学含义。

任何箭头的输出等级都不得高于其最弱关键支撑；证据冲突时降级或阻断。下列
任一条件触发 `blocked` 或 `author_confirmation_required`：

1. Discussion 机制句没有对应 Results 事实或 `EvidenceRecord`。
2. 箭头缺少起点、终点、关键中间过程、条件、证据引用或尺度信息。
3. 要求从单一图表、相关性、快照、断口或模型拟合推出跨证据完整机制。
4. 主要替代解释未被评估，却要求使用 `controls`、`governs`、`dominates`、
   `determines` 或唯一机制表述。
5. 事实、数值、术语、样品、阶段或条件在 Results 与 Discussion 间冲突，
   且无法由来源确定优先版本。
6. 关键事实首次出现在 Discussion，且没有 Results 目标位置或作者授权。
7. 请求全文一致性但上下文不是 `full`，或 `full` 缺少主张/证据清单。
8. 请求跨段、跨小节或跨 section 重排，但权限、目标位置或引文范围未提供。

## 7. 固定输出契约

每次讨论模式输出都要先给路由覆盖，再给结果。字段名固定如下；`revision` 与
`diagnosis` 按 operation 二选一或同时提供，不得省略覆盖和未检查范围：

```yaml
route_decision:
  section_mode: discussion
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
mechanism_arrow_ledger: []
alternatives: []
boundaries: []
results_precedence_candidates: []
claim_evidence_map: []
author_confirmation: []
```

`mechanism_arrow_ledger` 至少记录：`arrow_id`、起点、终点、中间过程、
`evidence_refs`、证据等级、条件/尺度、替代解释、边界、允许动词和状态。
没有 Results/EvidenceRecord 时该字段必须为空，并在 `diagnosis` 中说明机制
重写被阻断。`alternatives` 记录“已检验、部分处理、未评估”，不得把未评估
写成已排除；`boundaries` 至少包括材料、组织、温度、应变率、环境、尺度或
数据范围中实际相关的项目。

`claim_evidence_map` 至少记录：`claim_id`、主张文本、`evidence_refs`、
`evidence_level`、条件、允许动词、canonical owner（Results 或 Discussion）
和状态。`results_precedence_candidates` 要写事实、原因、目标 Results 位置
和是否需要作者授权。没有现成 ID 时可用临时标签追踪段内主张，但必须标明它
不是新证据。`author_confirmation` 逐条写明作者需要确认的事实、权限或外部
证据，不用泛化的“请检查”。

## 8. 旧字段兼容别名

旧输入仍可使用，但路由后必须显示规范化结果：

| 旧字段 | 值 | 规范化 |
| --- | --- | --- |
| `文本所属部分` | `讨论` / `Discussion` | `section_mode=discussion` |
| `文本所属部分` | `Results and Discussion` / `结果与讨论` | Results + Discussion 配对别名 |
| `任务类型` | `语言精修` | `operation=polish` |
| `任务类型` | `Results–Discussion 分工` | `operation=diagnose`、`paired_modes=[results, discussion]`；只有明确允许重新分配时才升级为 `restructure` |
| `任务类型` | `证据审计` | `operation=diagnose`；显式要求跨章节一致性时才使用 `consistency` |
| `任务类型` | `全文架构审阅` | `operation=diagnose`；没有 full 输入时不得伪报 full |
| `输出模式` | `仅精修稿` | 只显示 `revision`；内部仍记录 `coverage` 与 `not_checked`，发生降级或阻断时必须显示 |
| `输出模式` | `架构审阅模式` | 输出 `diagnosis`、`mechanism_arrow_ledger` 和 `claim_evidence_map` |
| `输出模式` | `完整模式` | 仅表示输出详细度，不等于 `context_level=full` |

旧字段不足以确定上下文时，默认 `coverage=local`。缺 Results、图表、条件、
证据记录或跨 section 清单时，必须把相应机制、替代解释、边界和一致性检查列入
`not_checked`，并保持语言层或结构层的受限输出。
