# Section-aware routing contract

本文件是六种文本部分的共同路由契约。它只规定如何识别任务、计算上下文覆盖度、选择加载内容和关闭不能安全执行的检查；具体的摘要、引言、结果、讨论、结论和全文规则由各自的 mode 文件承担。机器可读的模式元数据唯一保存在 [`SECTION_MODE_MANIFEST.json`](SECTION_MODE_MANIFEST.json) 中。

## 1. 三轴输入

每次调用先规范化三个互相独立的维度：

| 维度 | 可用值 | 含义 |
|---|---|---|
| `section_mode` | `abstract` / `introduction` / `results` / `discussion` / `conclusion` / `full` | 当前要处理的部分；`full` 表示建立全文 ledger，而不是把局部文字自动扩展成全文审阅 |
| `operation` | `polish` / `rewrite` / `diagnose` / `restructure` / `consistency` | `rewrite` 保持当前结构重写，`restructure` 允许在授权范围内重组；只给文本而未说明动作时采用 `polish`，只问问题时采用 `diagnose` |
| `context_level` | `local` / `partial` / `full` | 由实际输入计算出的可核查范围；用户填写的值只记为 `requested_context_level`，不能覆盖缺失材料 |

三轴不互相推断。例如“引言重构”规范化为 `section_mode=introduction`、`operation=restructure`；它不会因此自动变成 `context_level=full`。旧字段、中文任务名和别名的唯一映射见 [`SECTION_MODE_MANIFEST.json`](SECTION_MODE_MANIFEST.json)。“完整模式”只表示输出详细度，绝不映射为 `context_level=full`。

## 2. 路由优先级

按以下顺序处理输入，越靠前的声明覆盖越靠后的推断：

1. 用户明确给出的 `section_mode` 和 `operation`；用户声明的上下文只记为 `requested_context_level`；
2. 旧字段 `文本所属部分`、`任务类型`、`上下文覆盖` 及其英文别名；`输出模式` 只控制输出详细度，不参与三轴判定；
3. 能由字段值无歧义映射的旧任务名，例如“摘要重构”“Introduction 重构”“Results–Discussion 分工”；
4. 文本标题、Markdown 小节标题和 `section_manifest`；
5. 根据实际章节、section manifest 和 ledger 计算 `context_level`；声明值高于实际覆盖时降级并记录 blocker；
6. 仅在无法安全识别或缺少目标文本时返回 `status=blocked`，不把缺失的部分当成已提供的上下文。

若一个别名在同一维度有多个候选值，路由不得静默选择；应返回 `blockers` 中的歧义，并要求作者确认。`section_mode` 不因 `operation=consistency` 自动变成 `full`。只有用户明确要求全文一致性，或提供完整 `section_manifest` 并选择 `full` 时，才加载全文 gate。

### 2.1 标准路由输出

路由在开始改写前先建立以下对象。模式完整输出、诊断和带说明输出必须显示它；用户明确选择“仅精修稿”时可仅在内部保留，除非发生 `fallback`、`author_confirmation_required` 或 `blocked`，此时安全说明优先。`coverage` 是实际检查范围，`skipped_checks` 与 `not_checked` 明确记录关闭的检查；二者为空数组时也必须保留，不能省略字段。

```json
{
  "section_mode": "introduction",
  "requested_operation": "rewrite",
  "operation": "rewrite",
  "paired_modes": [],
  "journal_overlay": "off",
  "output_detail": "mode_full",
  "requested_context_level": "full",
  "context_level": "partial",
  "required_inputs": ["text", "Y", "A", "C", "B", "X", "M", "E", "G"],
  "loaded_refs": ["references/SECTION_MODE_ROUTER.md", "references/INTRODUCTION_MODE.md"],
  "skipped_checks": ["full_text_ownership", "title_abstract_conclusion_alignment"],
  "coverage": "partial",
  "status": "partial",
  "blockers": [],
  "not_checked": ["unprovided citation_manifest"]
}
```

允许的 `status` 只有：

| 状态 | 适用条件 | 输出动作 |
|---|---|---|
| `ok` | 请求的操作在实际 coverage 内完整完成，且没有请求内检查被跳过 | 可按请求输出修订或诊断 |
| `partial` | 保持同一 operation，但请求范围内只有部分检查或段落可安全完成 | 只输出覆盖范围内的结果，并列出未检查项 |
| `fallback` | 请求的高阶 operation 不能安全执行，但无需作者科学判断即可改为较低风险操作 | `requested_operation` 保留原请求，`operation` 写实际降级操作 |
| `author_confirmation_required` | 发现新主张、证据/条件冲突、引用支撑不明或需要作者选择；即使可给诊断，也不能自行裁决 | 停止受影响改写，列出待确认项；实际诊断操作仍写入 `operation` |
| `blocked` | 必填文本/上下文缺失，或输入歧义使任何安全处理都不可行 | 不生成会被误认为科学结论的改写 |

主状态按 `blocked > author_confirmation_required > fallback > partial > ok` 取最高严重度。`requested_operation` 永远记录用户意图，`operation` 记录实际执行；二者不同时必须说明降级原因。这样“缺少 Results 的 Discussion 机制重写”可表示为 `requested_operation=rewrite`、`operation=diagnose`、`status=fallback`，而存在冲突数值时则使用 `author_confirmation_required`。

路由输出中的 `coverage` 只能是 `local`、`partial` 或 `full`。`local` 输入绝不能输出“全文一致”“机制已闭合”“与结论一致”等未核查结论。

## 3. 统一输入 envelope

新调用优先使用下列结构；旧模板字段仍可按 manifest 的 `legacy_fields` 映射。未提供的字段必须标为 `missing`，不能用空泛的领域常识代填。

```yaml
section_mode: abstract | introduction | results | discussion | conclusion | full
operation: polish | rewrite | diagnose | restructure | consistency
requested_context_level: local | partial | full | auto
text: "当前待处理文本"
sections:
  title: "optional"
  abstract: "optional"
  introduction: "optional"
  methods: "optional"
  results: "optional"
  discussion: "optional"
  conclusion: "optional"
section_manifest:
  provided: [abstract, introduction, results, discussion, conclusion]
  missing: [methods]
  source: author | extracted | unknown
evidence:
  claim_records: []
  evidence_records: []
  figure_table_map: []
permissions:
  add_citations: false
  change_scientific_content: false
  cross_section_reorder: false
target_journal: null
adaptation_permission: false
journal_overlay: off
```

`context_level` 不直接接受用户声明，按下列证据计算：

- `local`：只提供当前部分或一个片段；只允许句法、段落功能和当前部分的局部证据边界检查；
- `partial`：提供当前部分及至少一个直接依赖部分，或提供可审计的 `claim_records`/`evidence_records`；只能声明已提供依赖的闭合；
- `full`：提供完整 `section_manifest` 和所需核心章节，并且已有可审计的证据/主张 ledger，或输入足以先逐项建立带原文定位的 ledger；完成该 ledger 后，才允许全文 ownership、跨章覆盖和题目—摘要—结论对齐检查。

若用户请求 `full` 但只给单段/单章，路由输出 `requested_context_level=full`、`context_level=local`、`coverage=local`，并将缺失章节/ledger 列入 `blockers` 和 `not_checked`。文本很长、字段写着“全文”或选择“完整模式”都不能替代这些证据。

## 4. 加载策略

路由器先加载本文件和 manifest，再加载共享契约，最后按 `section_mode` 加载一个 section wrapper。wrapper 只声明差异和深层文件指针，不复制其他 section 的规则。

### 4.1 共享层

所有 mode 共同依赖以下边界：

- 证据等级和动词上限：`references/CLAIM_EVIDENCE_MATRIX.md`；
- 输入字段兼容：`references/INPUT_TEMPLATE.md`；
- 论文类型在上下文不足时返回 `indeterminate`：`references/PAPER_TYPE_ROUTING.md`；
- 交付前的整体质量检查：`references/QUALITY_CHECKLIST.md`，仅在相应 output 或 `full` gate 被启用时执行。

上述文件是共享引用，不是复制条文的许可。`CLAIM_EVIDENCE_MATRIX.md` 是 L0–L7 的唯一规范；论文类型的唯一路由规范是 `PAPER_TYPE_ROUTING.md`。

### 4.2 部分层

| `section_mode` | wrapper | 深层规则/条件文件 | 该 mode 负责写入/验证的字段 |
|---|---|---|---|
| `abstract` | `references/ABSTRACT_MODE.md` | `references/ABSTRACT_MODELS.md`，按模式再加载 core/design 文件 | 核心 claim ID 的压缩、顺序和摘要动词上限 |
| `introduction` | `references/INTRODUCTION_MODE.md` | `references/INTRODUCTION_LOGIC.md`；反向生成时再加载专用 prompt | 缺口、承诺、待验证 claim ID 和证据路线 |
| `results` | `references/RESULTS_MODE.md` | `references/RESULTS_DISCUSSION_LOGIC.md` 与证据矩阵 | 观察、局部主张和证据引用 |
| `discussion` | `references/DISCUSSION_MODE.md` | `references/RESULTS_DISCUSSION_LOGIC.md`；全文一致性时再加载架构规则 | 证据箭头、替代解释和边界 |
| `conclusion` | `references/CONCLUSION_MODE.md` | 证据矩阵；全文时再加载架构规则 | 已建立主张的回收与排序 |
| `full` | `references/FULL_TEXT_MODE.md` | 架构、证据、论文类型和明确启用的 overlay | claim/evidence ledger 与 ownership |

目标期刊适配是独立 overlay。`journal_overlay=off` 是默认值；只有同时提供非空 `target_journal` 与 `adaptation_permission=true` 时才允许开启。用户明确使用“期刊格式适配”任务名即表示请求开启 overlay，但仍须通过这两个输入门；具体字数、栏目或格式要求可作为可选约束继续提供。缺少任一必填字段时，不得隐式套用 Elsevier 或任何其他期刊的长度、体裁和措辞规则。

## 5. 最小可审计数据结构

这些结构用于跨部分传递已确认的信息；它们不是要求作者凭空建立新数据。缺字段的记录应有 `status=missing` 或 `status=author_confirmation_required`。

### 5.1 ClaimRecord

```json
{
  "id": "C-01",
  "statement": "由作者原文或已确认结果抽取的主张",
  "record_kind": "scientific_claim",
  "claim_kind": "association",
  "evidence_level": "L3",
  "evidence_refs": ["E-02"],
  "conditions": ["material", "temperature", "scale", "test_protocol"],
  "canonical_owner": "results",
  "source_sections": ["results", "abstract"],
  "occurrences": {"results": "evidence", "abstract": "compression"},
  "allowed_verbs": ["associated with", "coincided with"],
  "status": "established"
}
```

必填的识别字段是 `id`、`statement`、`record_kind`、`claim_kind`、`evidence_level`、`conditions`、`canonical_owner`、`occurrences` 和 `status`。`record_kind` 区分 `scientific_claim / research_promise / gap_statement / definition`；`claim_kind` 可为 observation、difference、association、contribution、mechanism、performance、generalization 或 limitation。`evidence_refs` 为空不等于主张不存在；它表示当前输入还不能把主张与证据绑定，涉及机制或推广的改写应停下。

对 `scientific_claim`，`canonical_owner` 是该主张被完整定义或建立的位置，只能为 Methods、Results 或 Discussion；Introduction 只可拥有 `research_promise` 或 `gap_statement` 记录。`occurrences` 记录同一 ID 在各 section 的角色，例如 promise、evidence、explanation、compression 或 recovery。Title、Abstract 和 Conclusion 只能压缩或回收既有 claim ID，不能成为科学主张的 owner。

### 5.2 EvidenceRecord

```json
{
  "id": "E-02",
  "source": "Figure 3b / Table 1 / supplied measurement",
  "observation": "可直接核查的观察或测量",
  "conditions": ["same composition", "matched strain range"],
  "supports": ["C-01"],
  "limitations": ["does not isolate competing factor"],
  "status": "provided"
}
```

EvidenceRecord 记录观察、条件、支持关系和局限。空间邻近、同步变化或性能差异不自动升级为唯一机制；升级必须满足 `CLAIM_EVIDENCE_MATRIX.md` 中相应证据等级。

### 5.3 ConsistencyLedger

```json
{
  "claims": ["C-01"],
  "evidence": ["E-02"],
  "section_ownership": {
    "C-01": "results"
  },
  "claim_order": {
    "introduction": ["C-01"],
    "abstract": ["C-01"],
    "conclusion": ["C-01"]
  },
  "terminology": [],
  "conditions": [],
  "conflicts": [],
  "status": "partial"
}
```

`canonical_owner` 只允许一个主要归属。其他部分可以压缩、引用或回收该主张，但不得重新声明为新的主张。发生重复、顺序冲突、证据冲突或条件丢失时，ledger 记录冲突并触发 gate，而不是由润色器自行决定哪一个版本为真。

## 6. 共享 gates 与 fail-closed

以下 gate 由路由器统一命名；各 mode 只选择适用集合并输出失败原因。

| gate | 检查内容 | 失败时的最小动作 |
|---|---|---|
| `context_sufficiency` | 所需部分、字段和证据记录是否实际提供 | 降级覆盖度或阻断 |
| `core_claim_identity` | 处理前后是否仍是同一最高层主张 | 停止改写并请求确认 |
| `evidence_strength_monotonicity` | 改写动词不超过 `evidence_level` | 降低动词强度 |
| `condition_term_lock` | 材料、相、变量、温度、尺度和测试条件不漂移 | 保留原条件或标记冲突 |
| `section_role_boundary` | 当前 section 不承担别的 section 的功能 | 压缩、移动建议或停写 |
| `claim_coverage_order` | 关键主张被覆盖且顺序符合论证依赖 | 输出诊断，不假装闭合 |
| `evidence_arrow_closure` | 每条解释箭头有证据或明确的作者确认 | 禁止机制重写 |
| `canonical_owner` | 主张只有一个主要归属，重复处为短引用 | 生成 ownership blocker |
| `no_new_claims` | 改写没有引入原文/ledger 未确认的主张 | 标记 `author_confirmation_required` |
| `scope_author_confirmation` | 推广、优先性、性能优势和未提供条件是否获作者确认 | 限定范围或停写 |
| `citation_permission` | 新增或移动引文是否获授权且支撑范围明确 | 不新增引文 |
| `gap_precision` | Introduction 的缺口是否具体、可回答且与核心贡献同级 | 保留诊断，不生成虚假缺口 |
| `promise_evidence_closure` | Introduction 的每个研究承诺是否映射到已提供证据或明确未闭合状态 | 标记未闭合承诺 |
| `evidence_proximity` | Results 的判断是否能由当前图表、数据和条件直接核查 | 降为观察或移交 Discussion |
| `local_causality` | Results 中的因果是否局限于同一局部过程并具有时序、干预或中间变量支持 | 降为关联或阻断 |
| `figure_table_mapping` | Results 的每个实质主张是否能定位到图、表、数据或计算 | 标记证据定位缺失 |
| `alternative_explanations` | Discussion 是否识别并处理与主机制竞争的合理解释 | 保留多解释，不写唯一机制 |
| `boundary_statement` | Discussion 的机制是否保留材料、状态、尺度和条件边界 | 补回边界或降低推广强度 |
| `established_claim_recovery` | Conclusion 是否只回收正文已经建立的 claim ID | 删除新增主张或请求作者确认 |
| `claim_order` | Conclusion 的回收顺序是否符合正文证明依赖 | 输出顺序诊断，不静默换主线 |
| `scope_boundary` | Conclusion 是否保留来源主张的适用范围、限制和不确定性 | 恢复限定或停止推广 |
| `title_abstract_conclusion_alignment` | Title、Abstract、Conclusion 是否压缩同一 claim ID 集合且动词不强化 | 报告不一致并停止跨章改写 |

上述表是 gate 名称与语义的唯一规范。六种 mode 的完整 gate 集合由 [`SECTION_MODE_MANIFEST.json`](SECTION_MODE_MANIFEST.json) 声明，并由验证器执行精确集合检查；mode 文件只引用对应集合，不另造同义名称。

特定的强制降级规则：

- Discussion 没有 Results 或 EvidenceRecord 时，最多做语言层和局部结构诊断；不得重写跨图机制；
- Conclusion 没有 source ledger、Results 或 Discussion 时，最多压缩作者已写出的句子；不得宣布全文一致或补入新贡献；
- 仅有单节输入时，任何 operation 都只能输出 `coverage=local`；
- 论文类型缺少摘要、结论或其他必要入口时，类型判定为 `indeterminate`，不强行套用某一类型路线；
- 证据冲突、条件冲突或主张无法唯一归属时，相关改写返回 `author_confirmation_required`；
- 期刊未明确或没有适配许可时，`journal_overlay=off`，并在 `skipped_checks` 中注明期刊检查未执行。

## 7. Operation 边界

| operation | 允许动作 | 不隐含的动作 |
|---|---|---|
| `polish` | 保留主张和结构，改善语法、清晰度、衔接和动词校准 | 不重排全文、不补证据、不启用期刊 overlay |
| `rewrite` | 在当前 section 契约内重写论证表达 | 不新造主张、机制、数据或引用 |
| `diagnose` | 输出问题、证据边界、缺口和可选修订点 | 不把建议写成已证实结论 |
| `restructure` | 在明确权限内重排当前 section 的段落/句子 | 不默许跨节移动或改变 canonical owner |
| `consistency` | 对已提供的 ledger 和部分做一致性比对 | 不把未提供的部分标成已检查 |

如果用户同时给出多个操作，优先执行风险最低的 `diagnose`，列出需要确认的主操作；不要把 `polish`、`rewrite` 和 `consistency` 混成一个未标注范围的“完整模式”。

## 8. 向后兼容

现有 [`INPUT_TEMPLATE.md`](INPUT_TEMPLATE.md) 的“文本所属部分”“任务类型”“输出模式”、摘要模式和 Introduction 模式继续接受。兼容层只负责映射，不改变新三轴的含义：

| 旧输入 | 新维度 | 说明 |
|---|---|---|
| `文本所属部分=摘要` | `section_mode=abstract` | 仍需单独判断 operation 和 context |
| `任务类型=语言精修` | `operation=polish` | 不自动变成全文 |
| `任务类型=摘要重构` | `section_mode=abstract`, `operation=restructure` | 上下文仍按实际提供范围判定 |
| `任务类型=Results–Discussion 分工` | `section_mode=results`, `operation=diagnose`, `paired_modes=[results, discussion]` | 只有明确提供重新分配权限时才升级为 `restructure` |
| `输出模式=完整模式` | `output_detail=mode_full` | 只增加当前 mode 的诊断字段；绝不改变 `context_level` 或 `coverage` |

旧调用如果只有“全文”字样而没有 section 内容，不能作为 `full` context；它只能作为用户意图，等待 `section_manifest` 或实际文本补足。
