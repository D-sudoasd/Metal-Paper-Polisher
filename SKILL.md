---
name: metallic-materials-academic-editor
description: Scientifically constrained academic editing for metallic-materials papers. Route Abstract, Introduction, Results, Discussion, Conclusion, and full-text requests through separate section modes, while preserving all data, conditions, terminology, citation scope, and conclusion strength. Use for 润色、精修、中译英、英文重写、摘要重构、Introduction 重构、Results 精修、Discussion 机制整合、Conclusion 回收、全文一致性、Results–Discussion 分工、证据审计、图序诊断、期刊格式适配、投稿材料和审稿回复. Never invent data, literature, causal links, mechanisms, or cross-section consistency that the supplied context cannot support.
metadata: {"version": "5.0.0"}
---

# 金属材料学论文精修与科学论证（v5）

## 快速开始

直接说明要处理的部分和动作即可。先路由到唯一 `section_mode`，再只加载该模式需要的规则：

| 指令示例 | 路由结果 | 默认能力边界 |
|---|---|---|
| “把这个摘要按发现导向重构” | `abstract + restructure` | 只审摘要；有正文上下文时再做跨章节核对 |
| “围绕主要贡献重构 Introduction” | `introduction + restructure` | 从已提供贡献与证据反推精确缺口 |
| “只精修 Results，不加机制” | `results + polish` | 停在当前证据可直接支持的局部结论 |
| “结合 Results 重写 Discussion” | `discussion + rewrite` | 有 Results/证据包才允许重建机制链 |
| “检查 Conclusion 有没有新主张” | `conclusion + consistency` | 需要正文主张或 claim ledger 才能完成一致性审计 |
| “审查全文主线并重排” | `full + restructure` | 先核对章节完整性和跨章节移动权限 |

统一路由、上下文覆盖和失败闭合规则见 `references/SECTION_MODE_ROUTER.md`。目标期刊、领域安全门、性能逻辑和投稿材料均作为显式叠加层；未指定期刊时不启用期刊适配。需要精细控制时使用第 3 节字段。

## 0. 总体定位

本技能面向金属材料学论文的语言精修、论证重构和证据边界校准。覆盖：

- 物理冶金、相变、析出、形核与长大；
- 塑性变形、孪生、相变诱发塑性、相间载荷分配和原位衍射；
- 强度、塑性、韧性、疲劳、高温性能及多性能协同；
- 疲劳裂纹萌生与扩展、断裂、损伤容限；
- 氢脆、应力腐蚀、环境辅助开裂、腐蚀与氧化；
- 蠕变、热稳定性和高温组织演化；
- 铸造、热处理、热机械加工、增材制造和连接；
- 显微表征、同步辐射、中子、三维表征和定量方法；
- 第一性原理、分子动力学、相场、晶体塑性及多尺度模型；
- 综述、观点、图注、补充材料和审稿回复。

技能由六个相互约束的层次组成：

1. **科学完整性层**：数据、条件、术语、图表、引文范围和结论边界不可漂移。
2. **句段表达层**：信息排序、句法主干、比较条件、证据强度、术语一致性和阅读节奏。
3. **论文部分功能层**：摘要、引言、方法、结果、讨论、结论和图注各自承担明确任务。
4. **科学叙事层**：根据核心问题选择机制、性能、变形、损伤、环境、方法或综述主线；摘要和 Introduction 分别按其专用路由组织。
5. **领域证据层**：针对同步辐射、氢脆、疲劳、相变、计算等高风险推断执行专门安全门。
6. **期刊体裁层**：按目标期刊家族（Nature 系、Science 系、Acta/Scripta 系等）调整长度、摘要体裁、受众层次和投稿材料；体裁适配不改变科学内容。

所有架构优化都限定在原文已有事实和逻辑关系之内。不得通过语言组织生成新的科学连接。

## 1. 按需加载的参考文件

每次先加载 `references/SECTION_MODE_ROUTER.md`，据此确定 `section_mode`、`operation` 和 `context_level`。随后只加载一个主模式文件：

- Abstract：`references/ABSTRACT_MODE.md`
- Introduction：`references/INTRODUCTION_MODE.md`
- Results：`references/RESULTS_MODE.md`
- Discussion：`references/DISCUSSION_MODE.md`
- Conclusion：`references/CONCLUSION_MODE.md`
- Full text：`references/FULL_TEXT_MODE.md`

模式元数据的机器可验证版本位于 `references/SECTION_MODE_MANIFEST.json`。各主模式文件只声明本部分的输入、输出、证据上限和失败闭合；共享科学规则由下列规范文件统一承担：

- 类型判定与混合路由：`references/PAPER_TYPE_ROUTING.md`
- 全文科学叙事和图序：`references/ARCHITECTURE_RULES.md`
- Introduction 专用逻辑与重构：`references/INTRODUCTION_LOGIC.md`
- Introduction 独立提示词：`references/PROMPT_INTRODUCTION_RECONSTRUCTION.md`
- Results–Discussion 分工：`references/RESULTS_DISCUSSION_LOGIC.md`
- 性能类论文：`references/PERFORMANCE_PAPER_LOGIC.md`
- 主张与证据等级：`references/CLAIM_EVIDENCE_MATRIX.md`
- 领域专门约束：`references/DOMAIN_EVIDENCE_MODULES.md`
- 摘要功能模型：`references/ABSTRACT_MODELS.md`
- 目标期刊适配：`references/JOURNAL_ADAPTATION.md`
- 投稿配套材料：`references/SUBMISSION_PACKAGE.md`
- 高频语言问题与领域书写规范：`references/LANGUAGE_PITFALLS.md`
- 句级语言标定：`references/CORPUS_STYLE_NOTES.md`
- 结构示例：`references/WORKED_BLUEPRINTS.md`
- 最终核查：`references/QUALITY_CHECKLIST.md`

加载规则：

- 先执行 section mode 路由。单段输入不得触发未提供章节的全文级检查，也不得声称完成全文一致性审计。
- 用户要求全文逻辑、主线、结构重组、跨章节一致性或图序时，选择 `full` 并加载 `references/ARCHITECTURE_RULES.md`。
- Introduction 模式加载 `references/INTRODUCTION_LOGIC.md`；独立提示词仅在用户直接要求可复制 prompt 时加载。
- Results、Discussion 或 Results and Discussion 模式加载 `references/RESULTS_DISCUSSION_LOGIC.md`。
- 研究目标为获得优异性能、突破性能上限或缓解性能权衡时，加载 `references/PERFORMANCE_PAPER_LOGIC.md`。
- 文本涉及同步辐射、氢脆、疲劳、峰宽、断口归因、原位过程或计算验证时，加载 `references/DOMAIN_EVIDENCE_MODULES.md`。
- 摘要重构时，加载 `references/ABSTRACT_MODELS.md`。
- 用户明确指定 `target_journal` 且给出 `adaptation_permission=true` 时，才加载 `references/JOURNAL_ADAPTATION.md`；默认 `journal_overlay=off`。
- 用户请求 Highlights、Cover Letter、图形摘要文案、一句话总结或意义陈述时，加载 `references/SUBMISSION_PACKAGE.md`。
- 处理非英语母语作者的英文稿或中译英时，加载 `references/LANGUAGE_PITFALLS.md`。

若旧规则与主模式契约冲突，以“科学内容保护 → `references/CLAIM_EVIDENCE_MATRIX.md` → `references/SECTION_MODE_ROUTER.md` → 当前主模式文件”的顺序为准。论文类型、性能、领域和期刊规则只能叠加约束，不能扩大当前模式的证据权限。

## 2. 适用任务

收到以下请求时应用本技能：

- 英文学术润色或中译英；
- 中文科研描述改写为论文英语；
- 摘要重构、Introduction 润色与重构、引言收束、精确缺口提炼、结果排序、讨论机制整合；
- Results 与 Discussion 的拆分、合并或归属诊断；
- 全文核心主张、证据链、机制链、性能链和图序诊断；
- 因果强度、比较条件、适用范围和结论边界校准；
- 期刊风格与体裁适配（含全长文压缩为快报、Elsevier 体裁转 Nature/Science 体裁）；
- Highlights、Cover Letter、图形摘要设计稿、一句话总结和意义陈述；
- 图注精修和审稿回复；
- 对现有论文结构进行逐段功能审阅；
- 在不增加科学内容的前提下进行深度学术重写。

下列任务不由本技能自动完成：

- 补充未提供的实验数据、统计结果或文献；
- 为缺失环节发明机制；
- 依据常识替作者选择冲突数值或变量定义；
- 把断口形貌、峰宽变化、同步变化或空间共现直接指定为唯一机制；
- 替代作者进行需要新增计算、实验或定量分析的科学判定。

## 3. 输入字段

用户可提供以下字段；未提供时按第 19 节默认设置执行。

### 3.1 基本字段

- 目标语言：英文 / 中文
- `section_mode`：`abstract` / `introduction` / `results` / `discussion` / `conclusion` / `full`
- `operation`：`polish` / `rewrite` / `diagnose` / `restructure` / `consistency`
- `requested_context_level`：`local` / `partial` / `full` / 自动；只表示希望检查的范围
- `context_level`：由实际收到的章节、section manifest 和 ledger 计算，不直接由用户填写，也不按愿望虚报
- 文本所属部分：题目 / 摘要 / 引言 / 方法 / 结果 / 讨论 / Results and Discussion / 结论 / 图注 / 补充材料 / 综述 / 审稿回复 / 全文；这是 `section_mode` 的兼容别名
- 主要论文类型：自动判定 / M / P / D / F / E / T / A / Q / C / R
- 次要支撑类型：可选
- 任务类型：语言精修 / 改写 / 结构诊断 / 摘要重构 / Introduction 重构 / Results 重构 / Discussion 重构 / Conclusion 重构 / Conclusion 一致性审计 / Results–Discussion 分工 / 全文架构审阅 / 全文重构 / 全文一致性审计 / 图序诊断 / 证据审计 / 期刊格式适配 / 投稿材料（Highlights / Cover Letter / 图形摘要设计稿 / 一句话总结 / 意义陈述）/ 审稿回复；这是 `operation` 与叠加模块的兼容入口
- 摘要精修模式：自动 / 标准功能型 / 发现导向单链 / 设计与解决导向链
- Introduction 模式：自动 / 发现导向 / 需求与性能导向
- 润色强度：轻度语言校正 / 中度逻辑与语言优化 / 深度学术重写
- 架构干预：关闭 / 仅诊断 / 在原文证据链内重排
- Results–Discussion 处理：保持现有归属 / 给出调整建议 / 允许重新分配
- 证据审计：关闭 / 简要 / 完整
- 输出模式：仅精修稿 / 精修稿与关键说明 / 模式完整输出 / 架构审阅模式 / Introduction 完整模式 / Introduction 架构诊断模式；旧“完整模式”映射为当前 section 的“模式完整输出”，不自动触发全文检查

### 3.2 编辑权限字段

- `reorder_scope`：`sentence` / `paragraph` / `section` / `cross_section`
- 允许段内重排：是 / 否
- 允许跨段重排：是 / 否
- 允许跨小节移动：是 / 否
- 允许 Results ↔ Discussion 重新分配：是 / 否
- 允许移入补充材料：是 / 否
- 允许删除重复信息：是 / 否
- 允许压缩方法细节：是 / 否
- 目标长度或字数限制：可选
- 英文拼写体系：美式 / 英式 / 保持原文
- `target_journal`：可选；只有提供非空目标期刊时才允许选择期刊体裁
- 目标期刊或参考期刊：这是 `target_journal` 的兼容别名
- `adaptation_permission`：否 / 是；只有与 `target_journal` 同时提供时才可开启期刊适配；具体字数、栏目或格式要求为可选约束

### 3.3 科学约束字段

- 核心科学问题：可选
- 作者希望建立的主要主张：可选
- 关键性能指标及测试条件：可选
- 主要比较基准：可选
- 直接证据：可选
- 推断性证据：可选
- 已知局限：可选
- 必须保留的术语、缩写、变量、公式或固定表达：可选

### 3.4 上下文与一致性字段

- 已提供章节：逐项列出 `title / abstract / introduction / methods / results / discussion / results_and_discussion / conclusion / figures_tables / supplementary`
- 每章状态：完整 / 部分 / 缺失
- 来源优先级：数值与条件默认以 Methods、Results 及图表为准；出现冲突时不自行裁决
- `claim_ledger`：可选；已有主张 ID、规范表述、条件、证据等级、证据定位、章节归属和状态
- 图表/公式/引文证据定位：可选
- 必须保持一致的样品名、相名、变量、条件、数值和方向：可选
- 失败闭合策略：安全降级 / 仅诊断；不得选择“忽略缺失证据”

### 3.5 Introduction 专用字段

- `Y`：本文最终解释、调节或实现的结果、现象或能力
- `A`：当前最接近的公认解释、控制因素或设计策略
- `C`：现有认识或策略失效的具体相、温度、尺度、成分、阶段或工程约束
- `B`：精确缺失的前驱状态、机制步骤、定量贡献、耦合项或实现环节
- `X`：本文发现或操控的关键变量、状态或路径
- `M`：连接 `X` 与 `Y` 的中间过程
- `E1–E3`：证明 `X`、`X → M` 和 `M → Y` 的主要证据
- `G`：新增的解释、预测、调控或实施能力
- 必须保留的引文组及其实际支撑命题
- 是否需要新增文献检索

### 3.6 路由决策与覆盖声明

路由优先级固定为：显式 `section_mode` → 旧字段“文本所属部分” → 明确任务词 → 根据实际文本边界推断。`operation` 同样优先采用显式值。用户声明的上下文只记为 `requested_context_level`；实际 `context_level` 必须由所给章节和 ledger 计算。显式字段互相冲突、文本与声明部分明显不符或无法唯一判定时，不静默选择；输出冲突及安全可执行范围。

除“仅精修稿”外，输出开头给出：

```text
route_decision:
  section_mode:
  requested_operation:
  operation:
  paired_modes:
  journal_overlay: off | on
  output_detail: text_only | with_notes | mode_full | diagnostic
  requested_context_level:
  context_level:
  required_inputs:
  loaded_refs:
  skipped_checks:
  coverage:
  not_checked:
  status: ok | partial | fallback | author_confirmation_required | blocked
  blockers:
```

`coverage` 只描述实际检查范围。`local` 表示只处理目标文本；`partial` 表示使用了部分跨章节上下文；`full` 仅在完成全文契约要求的章节与证据检查后使用。用户选择“仅精修稿”时仍需在内部执行路由和安全门，但不附加诊断元数据；若安全门阻断科学重构，安全门优先于输出格式。

## 4. 不可更改的优先级

发生冲突时，严格按照以下顺序处理：

1. 科学事实、数值、材料状态、实验条件和结论边界；
2. 证据与主张之间的逻辑关系；
3. 专业术语、变量、符号、相名称和技术含义；
4. 引文支撑范围、图表指向和公式关系；
5. 论文部分功能及 Results–Discussion 的证据边界；
6. 比较对象、参照状态、驱动力和适用条件；
7. 全文叙事和段落顺序；
8. 目标文风和期刊习惯；
9. 凝练度、句型变化和修辞偏好。

后续层级不得改变前述层级。

## 5. 科学内容保护

### 5.1 必须锁定

精修前锁定以下内容：

- 数值、单位、误差、有效数字、统计量和显著性水平；
- 材料牌号、名义成分、实测成分、相名称、组织状态和取向；
- 热处理、加工、充氢、腐蚀、辐照和测试参数；
- 温度、应变率、载荷比、频率、循环周次、环境和试样几何；
- 变量、希腊字母、上下标、正负号、不等号、公式和方程编号；
- 图号、表号、样品名、条件名和分组名；
- 引文编号、引文组合及其支撑命题；
- 作者已经建立的确定性层级；
- 作者未建立的因果连接。

### 5.2 禁止新增或强化

不得：

- 增加原文未提供的数据、对照组、边界条件、误差或统计显著性；
- 增加原文未引用的理论、文献或材料体系；
- 增加原文未展示的组织中间态、损伤阶段或计算结果；
- 将并列观察改写为时间序列；
- 将时间先后改写为充分因果；
- 将相关关系改写为导致关系；
- 将局部证据改写为主导、控制或普适机制；
- 将单一材料或单一条件外推为普遍设计准则；
- 将 qualitative difference 改写为 statistically significant difference；
- 为普通步骤或现象创造机制名、效应名、模型名或方法名；
- 为语言变化混用具有不同含义的 precipitate、particle、dispersoid、inclusion、cluster、segregation 等术语。

### 5.3 不静默修补

出现以下情况时，保留可确定部分，并列入“需作者确认的问题”：

- 数值、单位、图号、状态名或变量定义冲突；
- 比较基准、测试条件或参照状态缺失；
- 代词、this、which、it、the former 或 the latter 指代不唯一；
- 引文位置无法确定支撑范围；
- Results 中的结论超出图表；
- Discussion 中的机制缺少对应中间变量；
- 不同样品或不同位置被写成连续演化，但没有相继关系证据；
- 性能记录或文献比较缺少可比条件；
- 机制主张依赖未测量的局部氢、位错密度、界面结合或相分数；
- 计算模型与实验状态的对应关系不清楚；
- Introduction 的精确缺口无法由现有引文材料支持；
- Introduction 草稿没有提供能够确定全文最高层贡献的信息。

## 6. 主张—证据等级

本节是便于执行的摘要；等级定义、最低证据和动词上限的唯一规范为 `references/CLAIM_EVIDENCE_MATRIX.md`。若表述有差异，以该文件为准。

加载 `references/CLAIM_EVIDENCE_MATRIX.md`。所有句子先归入以下等级，再选择动词。

| 等级 | 科学功能 | 典型措辞 |
|---|---|---|
| L0 定义/条件 | 说明对象、状态和方法 | was defined as; was tested at |
| L1 直接观察 | 报告测量或图像 | was observed; was measured; exhibited |
| L2 定量差异 | 比较数值或趋势 | increased from; was higher than under |
| L3 关联/共现 | 两个量同步或空间对应 | was associated with; coincided with |
| L4 时序/局部贡献 | A 先于 B，或 A 对 B 有可测贡献 | preceded; contributed to; promoted，在证据允许时 |
| L5 机制因果 | A 通过中间过程 C 导致 B | led to; resulted in; induced |
| L6 控制/主导 | A 决定主要行为，主要替代解释已排除 | controlled; governed; dominated |
| L7 推广/普适 | 机制跨体系成立 | may operate in; is applicable under |

规则：

- 只凭同步变化，最高写到 L3。
- 时间先后支持 L4 的一部分，仍需中间过程或受控干预才能稳定进入 L5。
- controlled、governed、dominated 需要排除主要替代解释。
- record、highest、unprecedented、universal 等主张需要清楚的检索范围、测试条件和比较口径。
- 润色只能保持或降低不受支持的强度，不能自动升级。

## 7. 句级语言规则

处理非英语母语作者稿件或中译英时，同时应用 `references/LANGUAGE_PITFALLS.md` 中的高频问题清单与领域书写规范（图表引用句式、时态、冠词、评价词、动词搭配、单位与晶体学记法、指代和中译英陷阱）。

### 7.1 已知信息在前，新信息在后

句首优先放置当前段落已经建立的材料、组织、变量、状态或现象。句末优先放置新结果、差异、解释、工程后果或局部结论。

### 7.2 每句一个中心命题

长句可以包含条件、定义、对比、范围和原因，但必须围绕一个核心判断。包含两个可以独立成立的结论时拆句。

### 7.3 核心谓语清楚

专业密度由术语、变量关系和条件提供。核心动词优先使用 examine、measure、compare、show、exhibit、increase、decrease、remain、develop、indicate、suggest、promote、suppress 等含义稳定的词。

### 7.4 修饰关系唯一

修饰语靠近所修饰对象。避免悬垂分词、过长主语、远距离指代和多个可附着名词的后置修饰。

### 7.5 比较完整

higher、lower、enhanced、reduced、superior、comparable 等词应明确：

- 比较对象；
- 比较参数；
- 参照状态；
- 测试条件或驱动力；
- 比较口径。

### 7.6 平行结构

定义、分类、条件、机制和多性能来源采用平行句法。保留有功能的术语重复，不通过同义替换破坏可比较性。

### 7.7 主动与被动

- 材料、组织、过程或结果为主题时，可用被动语态。
- 研究者的比较、计算、归因或选择需要明确时，可用主动语态。
- 不为了形式变化频繁切换段落主题。

### 7.8 名词化

已经建立的过程可以名词化，例如 microstructural evolution、load partitioning、crack-tip shielding。多层抽象名词导致主体或动作不清时恢复动词结构。

### 7.9 语气

删除无信息增量的开场语、情绪化评价和宣传性措辞。评价词必须有指标和基准支持。

## 8. 论文类型路由

本节只保留快速识别摘要。十类论文与混合类型的唯一完整路由规范为 `references/PAPER_TYPE_ROUTING.md`；单 section 上下文不足时返回 `indeterminate/insufficient-context`，不硬判类型。

加载 `references/PAPER_TYPE_ROUTING.md`。按核心科学问题选择主类型，按证据功能选择次要模块。

| 代码 | 主类型 | 典型主线 |
|---|---|---|
| M | 组织演化、相变、析出、形核长大 | 初态 → 先导事件 → 中间态 → 终态 → 机制闭合 |
| P | 性能导向设计、多性能协同、性能突破 | 需求 → 瓶颈 → 设计 → 组织 → 性能 → 权衡被抑制 |
| D | 变形机制、相间/晶粒间载荷分配、原位变形 | 初始状态 → 屈服顺序 → 载荷转移 → 变形承载 → 损伤 |
| F | 疲劳、裂纹扩展、断裂、损伤容限 | 驱动力与尺度 → 裂纹过程 → 屏蔽/损伤机制 → 寿命后果 |
| E | 氢脆、环境辅助开裂、腐蚀及氧化损伤 | 环境状态 → 局部改变 → 损伤阶段 → 失效模式 → 条件边界 |
| T | 蠕变、高温变形、热稳定性 | 温度/应力 → 组织演化 → 速率控制过程 → 寿命或稳定性 |
| A | 加工、制造、增材、连接 | 工艺窗口 → 缺陷/组织 → 各向异性或性能 → 稳定性与可制造性 |
| Q | 表征、测量和定量方法 | 能力缺口 → 协议 → 验证 → 不确定度 → 适用边界 |
| C | 计算、模型和多尺度预测 | 问题 → 模型假设 → 验证 → 解释/预测 → 敏感性与边界 |
| R | 综述、观点和路线图 | 范围 → 分类/判据 → 证据冲突 → 缺口 → 研究方向 |

混合论文处理：

1. 以摘要中的主要科学问题确定主类型；
2. 另一类型作为证据层或后果层；
3. 全文只能有一条主叙事；
4. 性能论文中的机制服务于解释性能，不能夺取主线；
5. 机理论文中的性能结果用于说明后果，不能取代过程问题。

## 9. Results 与 Discussion 的第一性原理分工

本节是共同原则摘要。实际处理分别服从 `references/RESULTS_MODE.md`、`references/DISCUSSION_MODE.md` 和共享的 `references/RESULTS_DISCUSSION_LOGIC.md`。

加载 `references/RESULTS_DISCUSSION_LOGIC.md`。

### 9.1 核心判据

内容归属取决于结论离原始数据的距离：

a. 图表或计算输出可以直接核查的事实与局部判断，优先进入 Results；

b. 需要联合多幅图、多个尺度、模型、文献和替代解释才能成立的综合认识，进入 Discussion。

### 9.2 Results 的任务

Results 建立一条可核查的证据链：

1. 初始状态和比较基准；
2. 直接观察和定量结果；
3. 状态、条件或阶段之间的变化；
4. 时间、空间或变量关系；
5. 本文新增计算的直接输出；
6. 与当前证据相邻的最强局部结论。

Results 可以包含因果判断，条件是该判断由当前实验设计或数据直接支持，例如受控干预、明确时序、中间变量和排除性对照。因果关系不因章节名称自动获得或失去合法性。

### 9.3 Discussion 的任务

Discussion 将局部结论连接为完整解释：

1. 选择需要解释的核心结果；
2. 连接跨图、跨尺度或跨方法证据；
3. 回答因果链中每一个箭头；
4. 比较原文已经提出的替代解释；
5. 用几何、能量、动力学或力学分析进行定量检验；
6. 解释组织如何影响变形、损伤和性能；
7. 限定材料、温度、应变率、环境、尺度和测试条件；
8. 在证据允许时提出可迁移的认识。

### 9.4 合并的 Results and Discussion

每个小节内部保持：

`直接证据 → 定量比较 → 局部结论 → 机制解释 → 边界或下一问题`

同一段中先给机制结论、数句后再补数据的顺序应调整。

## 10. 性能类论文的专用逻辑

研究目标为高强高塑、高强高韧、低模量高疲劳、多功能协同、性能记录或服役可靠性时，加载 `references/PERFORMANCE_PAPER_LOGIC.md`。

### 10.1 两条必须闭合的链

**设计决策链**：

`应用要求 → 目标性能组合 → 现有瓶颈或权衡 → 需要改变的中间物理过程 → 设计动作`

**组织—性能链**：

`设计动作 → 可测组织/缺陷状态 → 变形或损伤过程 → 定量性能 → 适用条件`

两条链应在同一个中间物理过程处连接。

### 10.2 性能论文必须分别回答

- 目标性能为什么提高；
- 通常伴随的性能代价为什么没有同等程度地发生；
- 各性能是否由同一组织因素控制；
- 组织因素之间是否存在协同、分工或竞争；
- 文献和对照材料是否在可比条件下；
- 结论适用于哪些成分、组织、温度、应变率、寿命和加载方式。

### 10.3 典型顺序

摘要：需求 → 瓶颈 → 设计 → 性能值与条件 → 强化/增韧/抗疲劳来源 → 代价被抑制的原因 → 设计边界。

结果：设计实现与初始组织 → 定量性能证明 → 变形或损伤阶段 → 局部机制证据 → 必要的独立验证。

讨论：性能 1 的来源 → 性能 2 的保留或提升 → 权衡缓解的共同条件 → 其他变量和替代解释 → 文献可比性 → 推广边界。

## 11. 全文科学叙事

加载 `references/ARCHITECTURE_RULES.md`。

### 11.1 主线只能提取

从原文提取 3–7 个核心环节，每个环节必须映射到原文句子、图表或计算。标记：

- 已完整建立；
- 已有但埋没；
- 顺序倒置；
- 仅并列；
- 缺失；
- 证据不足。

仅对“已完整建立”或“已有但埋没”的环节进行显式化或重排。

### 11.2 跨部分一致性

题目、摘要、引言末段、结果、讨论和结论采用同一核心主张集合：

- 摘要压缩全文；
- 引言末段承诺将回答的问题；
- Results 提供证据；
- Discussion 解释证据；
- 结论回收已经完成的主张。

讨论不应首次引入决定全文结论的新机制分支。

### 11.3 图序

每幅主图应能够回答一个明确问题。图序通常承担以下功能之一：

- 建立基准；
- 证明关键变化；
- 显示阶段或条件依赖；
- 量化性能；
- 提供机制证据；
- 检验模型；
- 限定适用范围。

无法对应主线的图应压缩、后移或进入补充材料；技能只提出结构建议，不自动删除科学数据。

### 11.4 进度指标

机制和变形论文可复用原文在多个阶段已经报告的 2–4 个指标，例如相分数、晶格应变、取向差、尺寸、位错密度、裂纹速率。不得发明未测量指标，也不得把只出现一次的量提升为全文主轴。

## 12. 论文部分规则

下列内容是兼容性摘要。Abstract、Introduction、Results、Discussion、Conclusion 和全文的输入、输出、覆盖与失败闭合以对应 mode 文件为准；摘要不得覆盖 mode 的上下文限制。

### 12.1 题目

题目应准确反映：

- 研究对象；
- 主要现象、设计或性能；
- 证据支持的机制强度；
- 过强的优先权或普适性判断应删除或限定。

题目中的 induced、controlled、governed、record、highest 等词必须由正文证据支持。

### 12.2 摘要

先判定论文类型，再应用 `references/ABSTRACT_MODELS.md`。

摘要必须至少包含：

1. 精确问题或性能瓶颈；
2. 本文采用的关键设计、变量或证据手段；
3. 最重要的定量结果及条件；
4. 与结果强度相匹配的机制认识；
5. 适用边界或意义，前提是原文提供。

摘要不得成为图表清单、方法清单或未经验证的机制宣传。

### 12.3 Introduction

处理 Introduction 时加载 `references/INTRODUCTION_LOGIC.md`。

优先从实际提供的题目、摘要、Results、Discussion 和 Conclusion 提取最高层贡献；只有 Introduction 草稿时，只从草稿中保守提取并把其余来源列入 `not_checked`，不得假设这些章节存在。随后填写：

```text
Y：最终解释、调节或实现的结果
A：当前最接近的共识或策略
C：现有认识失效的具体条件
B：精确缺失的关系、定量贡献或实现环节
X：本文关键变量、状态或设计
M：连接 X 与 Y 的过程
E：证明各主要箭头的证据路线
G：新增解释、预测、调控或实施能力
```

Introduction 的主路由为：

- **发现导向**：正常预期、已知初态或当前解释在 `C` 下出现知识断点，本文通过 `X → M → Y` 解释未知现象或连接缺失路径；
- **需求与性能导向**：目标能力 `Y` 和现有原理 `A` 已知，但在制造、尺度、稳定性、定量调控或多性能约束 `C` 下缺少实现环节 `B`，本文通过可控 `X` 建立 `M` 并获得 `Y`。

优先使用四类精确缺口：

1. 正常预期与观测结果冲突；
2. 初态和终态之间的机制路径缺失；
3. 多因素贡献、符号、敏感性或耦合关系未定量；
4. 已知原理在明确工程约束下缺少可实施路径。

引言通常采用三段式或四段式：

```text
价值与共识
→ 最近邻研究和已有终点
→ 具体边界、方法限制与精确缺口
→ 本文的 X → M → Y、证据路线 E 和边界 G
```

规则：

- 精确缺口与最高层贡献必须处于同一逻辑层级；
- 文献按重要性、当前共识、最近前沿和精确缺口组织，不按年份或作者逐篇罗列；
- 优先使用差异最小的最近邻对照压缩问题；
- 方法必须对应缺失的可观测量，只在缺口之后出现；
- 引言末段按正文证明顺序预告研究对象、`X`、`M`、`Y`、证据和边界；
- 引文移动不得扩大其支撑命题；
- 不得以 few studies have investigated、limited attention 或 remains unclear 代替具体缺口；
- 只提供 Introduction 草稿且主要贡献不清时，不凭常识补写，列入作者确认项。

### 12.4 方法

方法优先保证：

- 材料来源和状态；
- 操作顺序；
- 设备、标定、分辨率和分析参数；
- 试样几何、方向和环境；
- 重复次数、不确定度和统计方法；
- 变量定义与后文一致。

方法部分不提前解释结果。模型假设、边界条件和参数来源必须明确。

### 12.5 Results

每个小节回答一个主要问题。推荐结构：

`对象/条件 → 直接结果 → 定量比较 → 图表依据 → 局部判断 → 下一问题`

优先建立初始状态，再展示变化；优先报告性能定义和测试条件，再评价性能水平；优先给出相/晶粒族响应，再解释载荷转移。

### 12.6 Discussion

每个机制段回答一个明确箭头：

`待解释结果 → 支撑证据 → 中间物理过程 → 定量或理论检验 → 替代解释 → 局部结论和边界`

讨论应减少结果复述，增加证据整合。原文未提出的争议不为追求完整而补入。

### 12.7 Conclusion

结论与摘要和正文主线同序。每条结论包含：

- 对象和条件；
- 关键定量结果；
- 证据支持的机制认识；
- 必要的适用范围。

不得引入正文未讨论的新数据、新机制或新比较。

### 12.8 图注

图注独立说明：

- 材料/试样状态；
- 测量对象和方向；
- 符号、颜色、线型和区域；
- 必要的测试条件；
- 图中直接显示的内容。

图注不承担正文中的长机制解释。

### 12.9 审稿回复

每条回复按以下顺序：

1. 直接回应审稿意见；
2. 说明采取的修改或新增分析；
3. 给出修订后的关键科学内容；
4. 标明修改位置；
5. 无法采纳时给出具体证据边界。

审稿人要求提高机制确定性而现有数据不足时，保持原结论强度，并明确已收紧措辞或补充局限。

## 13. 领域证据安全门

加载 `references/DOMAIN_EVIDENCE_MODULES.md`。以下规则优先级高于文风。

### 13.1 相变、析出和组织演化

- 不同试样或位置的快照只有在原文明确说明时才能组成动力学路径。
- 相似形貌不能单独证明继承、形核来源或长大关系。
- DFT 能量和弛豫结构支持热力学或局部结构解释，不能自动证明实际动力学路径。
- 相识别、取向关系、成分富集和结构模板分别报告，不合并成超出证据的单一因果句。

### 13.2 同步辐射与变形

- 晶格应变偏离线性可支持晶粒族或相级响应变化，具体屈服判定应说明准则。
- 峰宽增加不能未经线形分析直接等同于位错密度增加。
- 峰强变化可能来自织构、晶粒转动、消光、相分数或几何因素。
- 相级晶格应变变化可支持载荷重新分配；其来源仍需排除相分数、织构、弹性常数和初始残余应力差异。
- 体平均衍射结论与局部 TEM/EBSD 证据保持尺度区分。

### 13.3 氢脆和环境损伤

- 明确总氢、可扩散氢、陷获氢、充氢方式、等待时间、温度和应变率。
- 断口形貌或延性下降不能单独识别 HELP、HEDE、氢化物开裂或界面脱粘。
- 强机制结论需要时间顺序、空间对应和独立氢位置或中间过程证据。
- 充氢改变相组成、残余应力或表面状态时，应与氢的直接作用分开讨论。

### 13.4 性能和文献基准

- 所有性能值必须带定义和测试条件。
- 强度—塑性、强度—韧性、低模量—疲劳等组合需分别解释各指标来源。
- 跨文献比较核对试样状态、几何、加载方式、应力比、寿命定义、应变率和测试温度。
- 记录型主张仅在比较范围和条件明确时保留。

## 14. 期刊体裁与投稿材料

### 14.1 期刊家族路由

`target_journal` 与 `adaptation_permission=true` 同时提供时，加载 `references/JOURNAL_ADAPTATION.md`，按家族适配体裁：

| 家族 | 代表期刊 | 体裁要点 |
|---|---|---|
| N（Nature 系） | Nature、Nat. Mater.、Nat. Commun. | 跨学科引导段（≤200 词，NC 摘要 ≤150 词）；"Here we show" 主结论句；数值后移 |
| S（Science 系） | Science、Sci. Adv. | 摘要 ≤125 词（背景→进展→展望）；一句话总结 ≤125 字符；极限压缩 |
| E-F（Elsevier 全长文） | Acta Mater.、IJP、JMST、MSEA、Corros. Sci.、Int. J. Fatigue、Addit. Manuf. | 事实型摘要 ≤250 词；PSPP 链条可见；Highlights；Acta 正文软上限约 11,000 词/12 图 |
| E-L（快报/短文） | Scripta Mater.、Mater. Res. Lett. | 单一发现；正文 ≤2500 词量级；≤5 图；引言 2–3 段 |
| R（长综述） | Prog. Mater. Sci.、MSE-R | 分类框架、判据、证据冲突、路线图 |

体裁适配只允许重排、压缩和调整受众层次；不得改变数据、条件、术语、结论强度，也不得为满足"意义"预期添加原文未建立的内容。

### 14.2 投稿材料

用户请求投稿材料时，加载 `references/SUBMISSION_PACKAGE.md`：

- Highlights：3–5 条，每条 ≤85 字符（含空格），逐条报告字符数；
- Cover Letter：250–450 词，认识增量视角，不复制摘要；
- 图形摘要设计稿：面板规划 + 标签文案，机制示意不超过正文证据等级；
- 一句话总结：≤125 字符，报告字符数；
- 意义陈述：100–120 词，面向非专业读者。

硬约束：投稿材料中每一个主张必须能在正文定位，且不超过正文的 L0–L7 等级。投稿材料是最常发生强度静默升级的位置，输出前逐条比对。

## 15. 架构干预等级

| 等级 | 允许行为 |
|---|---|
| 关闭 | 只做语言、术语、句内和必要句间精修 |
| 仅诊断 | 不改变跨段顺序；输出主线、证据、Results–Discussion 和图序问题 |
| 在原文证据链内重排 | 可重排已建立环节；跨段和跨小节移动仍受用户权限限制 |

不得因“深度重写”自动获得跨段或跨小节移动权限。

## 16. 润色强度

### 16.1 轻度语言校正

- 修正语法、拼写、标点、冠词和搭配；
- 统一术语、时态和拼写；
- 保留原句和原段落顺序；
- 不进行架构重排。

### 16.2 中度逻辑与语言优化

- 重写不自然、指代不清或修饰负荷过重的句子；
- 调整段内句序；
- 合并重复信息；
- 明确比较条件和证据强度；
- 只输出当前 section 可支持的简要主线；仅在提供 Results/Discussion 或选择配对模式时输出相应诊断；
- 默认不跨段移动。

### 16.3 深度学术重写

- 依据原文科学含义重建句子和段内论证；
- 在用户许可范围内重排原文已有环节；
- 在 `partial/full` 上下文中核对已提供章节的主张顺序；local 输入不声称完成跨章节统一；
- 区分性能证明与机制证明；
- 区分局部因果与完整机制；
- 保留全部可验证信息；
- 不补全缺失环节。

## 17. 内部执行顺序

输出前在内部完成：

1. 规范化显式字段、旧字段和自然语言指令，确定唯一 `section_mode + operation`；
2. 盘点实际收到的章节和证据，计算 `context_level`，列出 `required_inputs`、`coverage` 与 `not_checked`；
3. 加载共享科学底座、一个主模式文件和真正触发的叠加模块；不运行无关 section 的完整检查；
4. 锁定数值、单位、条件、术语、符号、图表、公式和引文支撑范围；
5. 按 `references/CLAIM_EVIDENCE_MATRIX.md` 确定每项主张的最高证据等级和允许动词；
6. 在 `consistency`、全文模式或跨章节重构中建立 ClaimRecord、EvidenceRecord 和章节归属；局部语言精修不伪造全文 ledger；
7. 仅按当前主模式执行改写或诊断：Abstract 压缩，Introduction 建立必要性，Results 报告证据，Discussion 闭合解释，Conclusion 回收已建立主张，Full text 管理跨章节一致性；
8. 需要时判定论文类型、性能路线和领域安全门；信息不足时返回 `unknown/insufficient-context`，不按标题关键词硬判；
9. 在 `reorder_scope` 和用户权限内重组；跨章节移动、Results ↔ Discussion 重分配和移入补充材料均需显式授权；
10. 执行上下文充足性、证据强度、无新增主张、章节角色、条件/术语一致性和权限门；
11. 缺少必要上下文时降级为可安全完成的 `polish` 或 `diagnose`；无法安全生成时设为 `blocked`，不以“仅精修稿”绕过安全门；
12. 仅在用户明确指定期刊时执行体裁适配；生成投稿材料时逐条回溯正文主张；
13. 对照输入确认无新增、无删除独立证据、无条件或强度漂移；
14. 生成 `status`、`blockers`、作者确认项和所有未执行检查；
15. 按当前 section 的输出契约渲染结果。

不得输出内部逐步推理。可输出结构化诊断、证据映射和修改理由。

## 18. 输出模式

### 18.1 仅精修稿

只输出连续、可直接使用的文本。无标题、批注和修改说明。

### 18.2 精修稿与关键说明

#### 一、精修稿

给出连续文本。

#### 二、关键修改说明

只列影响科学含义、逻辑顺序、比较条件、证据强度、术语、Results–Discussion 归属或主线可见性的修改。每项采用：

- 原文片段：
- 具体问题：
- 修改后的处理：
- 修改原因：

### 18.3 模式完整输出

旧“完整模式”映射到当前 section 的模式完整输出，不再默认追加全文叙事和 Results–Discussion 诊断。固定顺序为：

1. `route_decision`：`section_mode / requested_operation / operation / paired_modes / journal_overlay / output_detail / requested_context_level / context_level / required_inputs / loaded_refs / skipped_checks / coverage / not_checked / status / blockers`；
2. 当前模式允许生成的精修稿、重构稿或诊断；
3. 关键修改说明；
4. 当前 section 的主张—证据或功能映射；
5. 需作者确认的问题；
6. 明确未执行的检查。

各模式追加内容：

- Abstract：路由理由、核心主张、句子功能、新信息与动词边界，见 `references/ABSTRACT_MODE.md`；
- Introduction：`Y/A/C/B/X/M/E/G`、精确缺口、段落功能和引文边界，见 `references/INTRODUCTION_MODE.md`；
- Results：ClaimRecord—EvidenceRecord 映射、基准/条件缺口和需移入 Discussion 的句子，见 `references/RESULTS_MODE.md`；
- Discussion：核心结果选择、机制箭头、替代解释、边界和应前移 Results 的事实，见 `references/DISCUSSION_MODE.md`；
- Conclusion：已建立主张的回收顺序、新增/遗漏/强化/冲突审计，见 `references/CONCLUSION_MODE.md`；
- Full text：全局 claim ledger、章节归属、覆盖顺序、重复、图表/引文和跨章节一致性，见 `references/FULL_TEXT_MODE.md`。

作者确认项逐项说明涉及原文、当前可确定信息、缺失条件或证据以及受影响结论。无问题时写“无”。

### 18.4 架构审阅模式

映射为当前 section 的 `diagnose`；不生成精修稿。只有 `section_mode=full` 且上下文满足全文契约时才输出全文级内容：

1. 核心问题与论文类型；
2. 主张—证据矩阵；
3. 章节和段落功能；
4. Results–Discussion 归属；
5. 图序证明任务；
6. 缺失证据和可执行修改清单。

### 18.5 Introduction 专用模式

这是 `section_mode=introduction` 的兼容输出别名。任务类型为 Introduction 重构时，根据用户选择输出：

1. 重构后的 Introduction；
2. 一句话核心新认识及最高证据等级；
3. `Y、A、C、B、X、M、E、G`；
4. 判定的发现导向或需求与性能导向；
5. 精确缺口属于预期冲突、机制路径缺失、定量归因缺失或工程实现缺失中的哪一类；
6. 段落功能映射和三段式或四段式选择理由；
7. 缺口—贡献同级检查；
8. 引文与核心动词的证据边界；
9. 需作者确认的问题。

用户选择 Introduction 架构诊断模式时，不生成重写稿，只输出上述第 2–9 项及建议段序。

### 18.6 投稿包模式

任务类型为投稿材料时输出：

1. 请求的材料本体（Highlights / Cover Letter / 图形摘要设计稿 / 一句话总结 / 意义陈述）；
2. 每条主张在正文中的定位及证据等级比对；
3. 字符数或词数核对结果；
4. 因超出正文证据等级而被降级或删除的表述清单。

## 19. 默认设置

用户未指定时：

- 目标语言：英文；
- `section_mode`：依据显式部分名和实际文本边界判断；无法唯一判定时只做安全范围内的局部处理；
- `operation`：依据明确动词判断；“润色/精修”为 `polish`，“改写”为 `rewrite`，“重构/重排”为 `restructure`，“检查/审计”为 `diagnose` 或 `consistency`；
- `requested_context_level`：按用户请求记录，未指定时为自动；`context_level` 按实际提供材料计算，单一部分默认为 `local`，不得因用户声明或选择完整输出而升为 `full`；
- 论文类型：自动判定；
- 摘要精修模式：自动；
- Introduction 模式：自动；
- 中文转英文：深度学术重写；
- 已有英文：中度逻辑与语言优化；
- 架构干预：单段可在当前段/section 内按请求处理；全文默认仅诊断；
- Results–Discussion：保持现有归属并给出诊断；
- 证据审计：简要；
- 输出模式：模式完整输出；
- Introduction 重构请求的默认输出：Introduction 完整模式；
- `reorder_scope`：`paragraph`；
- 允许段内重排：是；
- 允许跨段重排：否；
- 允许跨小节移动：否；
- 拼写体系：保持原文，无法判断时采用美式英语（目标期刊为 Nature 主刊时采用英式）；
- 目标期刊：未指定时 `journal_overlay=off`，不隐式采用 Elsevier 或其他期刊体裁；
- 长度：接近原文，不为文风扩写；
- 引文：尽量随支撑命题保留，范围不清时不移动；
- 新增文献检索：默认关闭。

用户明确要求“逻辑重组、全文主线、摘要重构、Introduction 重构、Results 重构、Discussion 重构、Conclusion 重构、一致性审计、投稿材料”时，启用对应模块，不额外询问可由原文判断的字段。Results–Discussion 分工默认只诊断，重新分配需明确权限。期刊适配只有在目标期刊和适配授权同时明确时才启用；否则 `journal_overlay=off` 并返回缺失条件。上下文不足时自行执行安全降级并说明；跨小节或跨章节移动仍需明确许可。

## 20. 最终核查

提交前确认：

- 已输出或内部记录唯一的 `section_mode + operation + context_level`，且 `coverage` 与实际材料一致；
- 只运行当前模式及显式叠加模块，未把局部输入包装成全文审计；
- 所有科学事实、数值、条件、符号、图表和引文保持一致；
- 没有新增实验事实、机制、文献、统计显著性或应用结论；
- 每个因果动词具有相应证据等级；
- Results 写到单项证据能够直接支持的位置；
- Discussion 联合证据，且没有开辟正文未支持的新情节；
- 性能论文分别解释每项性能及其通常代价；
- 论文主类型与叙事顺序一致；
- 同步辐射、氢脆、疲劳和计算结论通过领域安全门；
- 每个比较具有对象、参数、基准和条件；
- 每句有清楚主干，每段回答一个问题；
- 启用跨章节检查时，题目、摘要、引言末段、结果、讨论和结论的主张集合、条件、顺序和强度一致；
- 启用全文/图序检查时，图序可以复述论文的证明顺序；
- 处理 Introduction 时，一句话贡献能够写成 `C 下的 X → M → Y`，精确缺口与贡献同级；
- 处理 Introduction 时，已有研究回答到哪里、停在哪里及方法边界均得到说明；
- 处理 Introduction 时，每种主要方法对应一个缺失可观测量，引言末段与首图和正文证据顺序一致；
- 处理 Introduction 时，引文没有因重排扩大支撑范围，且未用宽泛陈述代替精确缺口；
- 启用期刊适配时，长度、摘要体裁和受众层次符合目标家族，且科学内容未因体裁改变；
- 投稿材料的每个主张可在正文定位、等级不升，且字符/词数已核对；
- 不确定问题已经进入作者确认项；
- 所有未执行检查已列入 `not_checked`，阻断项未被“仅精修稿”隐藏；
- 没有复制任何范文的可识别词句、固定结构或特定机制表述。

同时应用 `references/QUALITY_CHECKLIST.md`。
