# Conclusion section mode（v5）

本文件只定义 `section_mode=conclusion` 的差异契约。通用路由、输入信封、状态值和加载优先级遵循 [`SECTION_MODE_ROUTER.md`](SECTION_MODE_ROUTER.md)；证据等级与动词上限遵循 [`CLAIM_EVIDENCE_MATRIX.md`](CLAIM_EVIDENCE_MATRIX.md)；全文顺序和主张关系遵循 [`ARCHITECTURE_RULES.md`](ARCHITECTURE_RULES.md)；交付前核查使用 [`QUALITY_CHECKLIST.md`](QUALITY_CHECKLIST.md)。本文件不重复这些文件的共享条文。

## 1. 模式目的与边界

Conclusion 的任务是按正文已经建立的主张顺序回收结果、机制或设计认识，并压缩适用条件。它是“已建立内容的恢复层”，不是新增结果、机制或应用愿景的入口。

统一路由轴为：

```text
section_mode = conclusion
operation    = polish | rewrite | diagnose | restructure | consistency
context_level = local | partial | full
```

`coverage` 只能报告实际可核查的范围：`local`、`partial` 或 `full`。即使用户把任务称为“全文结论检查”，缺少相应正文和证据时也不得宣称全文一致性。

## 2. 输入契约与能力矩阵

### 2.1 最低输入

所有操作均需要：

- 当前 Conclusion 文本；
- 明确的 `operation`，或能由旧字段可靠映射；
- 原文中的术语、数值、单位、方向和必须保留项；
- 若要求移动、删除或重排，需给出对应编辑权限。

以下输入不是语言精修的最低要求，但在相应操作中是必要的：

| 操作 | 可执行的最低上下文 | 不能据此声称 |
|---|---|---|
| `polish` | Conclusion | 跨章节主张闭合或全文一致性 |
| `diagnose` | Conclusion；若诊断主张覆盖，另需 Abstract、Results、Discussion 或完整 `ClaimRecord` | 未提供章节的证据、顺序和覆盖状态 |
| `rewrite` | Conclusion + Abstract + Results + Discussion，或完整 `ClaimRecord/EvidenceRecord` ledger | 缺少来源章节时的完整回收 |
| `restructure` | `rewrite` 的输入 + 明确的重排权限；若涉及全文顺序，需 `context_level=full` | 未授权的跨章节移动 |
| `consistency` | Abstract + Results + Discussion，或完整 ledger；要检查全文承诺、术语和结论闭合，需 `full` 核心章节 | 缺失章节的全局一致性 |

### 2.2 `context_level` 能力

| 级别 | 可做 | 必须标为未检查或降级的内容 |
|---|---|---|
| `local` | 句法、段落顺序和完全重复压缩；保持原有主张与动词强度并标记其未被正文上下文验证 | Abstract/Results/Discussion 对齐、主张来源、图表映射、全文覆盖；不得凭 Conclusion 单段静默降级科学含义 |
| `partial` | 对已提供的 Abstract–Results–Discussion 或 ledger 做有限回收和条件核查 | 缺失 Introduction、Methods、图表/引文或其他核心章节的检查 |
| `full` | 按完整主张—证据 ledger 核查回收顺序、覆盖、条件、术语、数值、方向和跨章节闭合 | 仍须把缺失的图表、引文或作者确认项列为阻断/未检查 |

只有满足输入表中的核心上下文时，`rewrite`、`restructure` 或 `consistency` 才能升级到相应覆盖度。否则可保留语言层工作，但状态必须是 `fallback`、`partial` 或 `author_confirmation_required`，不能静默扩大检查范围。

## 3. 允许与禁止的编辑

### 3.1 允许

- 以 `ClaimRecord` 的 `claim_id` 为单位，按 Results 的证明顺序或作者指定顺序回收已建立主张；
- 压缩已在正文证明的重复数字、方法细节和过程描述；
- 保留或降低证据相称的动词强度，不得提高证据等级；
- 补回原文已经明确的适用条件、比较对象、方向、单位和边界；
- 把“本文结果表明/支持/与……一致”等表达调整到与 [`CLAIM_EVIDENCE_MATRIX.md`](CLAIM_EVIDENCE_MATRIX.md) 相称的强度；
- 在有权限时调整结论中主要结论的顺序，使其与 Abstract 和 Results 的主张顺序对应。

### 3.2 禁止

- 新增数据、数值、统计显著性、图表、引文、机制步骤或应用场景；
- 把 Discussion 的推测写成已证明结论，或把 L2/L3 证据升级为 L5–L7；
- 把一个未在正文建立的 claim 伪装为结论中的“总结”；
- 删除唯一的条件、比较基准、限制或不确定性，使主张看起来更普遍；
- 在 `local` 或 `partial` 覆盖下声称已完成全文一致性；
- 未经权限把内容移入补充材料、把 Results 与 Discussion 重新分配，或改变作者的主张归属。

## 4. 结论专用核查门

Conclusion 的 gate 集合固定为 `context_sufficiency / core_claim_identity / established_claim_recovery / claim_order / evidence_strength_monotonicity / no_new_claims / scope_boundary / condition_term_lock / section_role_boundary`。名称与失败动作统一见 [`SECTION_MODE_ROUTER.md`](SECTION_MODE_ROUTER.md)。

对每个结论句建立或读取以下最小记录：

```text
claim_id → established claim → source section/figure/table
         → evidence level → allowed verb
         → conditions/terms/numbers → boundary/status
```

至少检查：

1. **顺序**：主要结论按正文证明顺序回收，或明确说明作者指定的不同顺序；
2. **覆盖**：每个保留的主要结论都能指向 Results/Discussion 的来源，每个核心来源结论的省略都可解释；
3. **证据上限**：Conclusion 的动词不超过来源 `evidence_level`，且不得因压缩而消除限定词；
4. **条件锁定**：材料、组织、温度、应变率、环境、尺度、比较对象、单位、数值和方向与来源一致；
5. **新主张门**：未在 ledger 中存在的机制、性能、普适性、设计准则或应用意义必须停止并请求作者确认；
6. **跨章闭合**：在提供相应上下文时，核对 Introduction 的承诺、Results 的证据、Discussion 的解释与 Conclusion 的回收是否属于同一主张集合。

## 5. 输出契约

除用户明确选择“仅精修稿”外，最外层都先给出统一 `route_decision`；仅精修稿内部保留同一对象，发生降级或阻断时必须显示：

```yaml
route_decision:
  section_mode: conclusion
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

根据操作补充：

- `revision`：可直接使用的 Conclusion；
- `recovery_order`：`claim_id`、回收句、来源、证据等级、条件和允许动词；
- `coverage_audit`：顺序、覆盖、遗漏和重复；
- `scope_audit`：术语、数值、单位、方向和适用条件；
- `new_claim_audit`：新增或疑似新增主张；
- `author_confirmation_questions`：无法由现有材料确认的问题。

不得用“无明显问题”替代未提供材料的检查；`not_checked` 和 `blockers` 必须反映真实输入覆盖。

## 6. Fail-closed 规则

- 缺少 Conclusion 文本：`status=blocked`，不生成伪造的结论稿；
- `polish` 以外的操作缺少必要来源章节和 ledger：允许语言层回退时标为 `fallback`，涉及主张重构或一致性声明时标为 `author_confirmation_required`；
- 请求 `full` 但缺少 Abstract、Results、Discussion 或核心 ledger：不得返回 `coverage=full`；
- 发现新 claim、条件冲突、数值/方向冲突、证据等级不明或跨章顺序无法确定：停止该项高层改写，列入 `blockers` 或 `author_confirmation_questions`；
- 发现用户要求的编辑会改变主张归属或跨章节位置，但没有对应权限：只输出诊断和建议，状态至少为 `author_confirmation_required`。

## 7. 旧调用兼容

旧输入字段继续有效，由路由器归一化：

| 旧字段 | 映射 |
|---|---|
| `文本所属部分=结论/Conclusion` | `section_mode=conclusion` |
| `任务类型=语言精修` | `operation=polish` |
| `任务类型=全文架构审阅` 或 `证据审计` | `operation=diagnose`；即使提供完整 ledger 也不自动改写用户请求，只有显式要求一致性审计时才使用 `consistency` |
| `架构干预=仅诊断/在原文证据链内重排` | 分别限制为诊断，或允许有权限的 `restructure` |
| `输出模式=仅精修稿/精修稿与关键说明/完整模式/架构审阅模式` | 分别控制 `revised_text`、审计字段和诊断深度，不改变真实 `coverage` |

旧调用没有明确 `section_mode` 时，可从“文本所属部分”推断；若只提供 Conclusion，却要求“全文/完整模式”，必须按 `local` 或 `fallback` 处理并报告缺口，不能把旧的“完整模式”当作完整上下文。
