# Changelog

## v5.0.0 — 真实顶刊体裁对齐与投稿全流程覆盖

本版本依据金属材料领域真实顶刊的公开投稿要求（Nature 系、Science 系、Acta/Scripta Materialia 等的 Guide for Authors）升级技能，并把覆盖范围从"正文精修"扩展到"投稿全流程"。

### 新增能力

1. **目标期刊适配**（`references/JOURNAL_ADAPTATION.md`）
   - 六个期刊家族路由：Nature 系、Science 系、Elsevier 全长文（Acta Mater. 基准）、快报（Scripta Mater. 基准）、长综述、通用学会期刊；
   - 依据真实体裁参数执行适配：Nature Article ≤200 词引导段与 "Here we show" 句式；Nat. Commun. ≤150 词摘要与 5000 词正文；Science ≤125 词摘要与 ≤125 字符一句话总结；Acta Mater. ≤250 词事实型摘要、约 11,000 词/12 图软上限与 PSPP 链条；Scripta ≤2500 词、≤5 图；
   - 同一摘要在不同家族间的功能位对比表与题目适配规则；
   - 安全边界：体裁适配只允许重排、压缩和调整受众层次，不改变科学内容。

2. **投稿配套材料**（`references/SUBMISSION_PACKAGE.md`）
   - Highlights（3–5 条、每条 ≤85 字符含空格、逐条报告字符数）；
   - Cover Letter（250–450 词、认识增量视角、期刊契合度论证）；
   - 图形摘要设计稿（面板规划与标签文案，机制示意受证据等级约束）；
   - 一句话总结（≤125 字符）与意义陈述（100–120 词）；
   - 硬约束：投稿材料的每个主张必须能在正文定位且不超过正文 L0–L7 等级。

3. **高频语言问题与领域书写规范**（`references/LANGUAGE_PITFALLS.md`）
   - 图表引用句式、时态规范、冠词与单复数、评价词、动词搭配；
   - 单位、晶体学记法（晶面/晶向/取向关系/相名称正斜体）、材料命名规范；
   - 悬垂修饰、指代唯一性、句式冗余压缩、连接词强度；
   - 中译英高频陷阱对照表（组织/性能/细化/归因等）。

4. **易用性**
   - `SKILL.md` 新增"快速开始"：三种零配置用法（直接粘贴 / 粘贴 + 目标期刊 / 投稿材料请求）；
   - 新增投稿包输出模式（材料本体 + 主张定位 + 字符/词数核对 + 降级清单）；
   - 内部执行顺序增加期刊适配与投稿材料核对步骤；
   - 质量核查表新增期刊适配与投稿材料检查项。

### 更新文件

- `SKILL.md`（v5.0.0：第六层"期刊体裁层"、第 14 节期刊体裁与投稿材料、快速开始、章节重编号）
- `README.md`（全面重写）
- `references/QUALITY_CHECKLIST.md`
- `references/PROMPT_FULL.md`、`references/PROMPT_COMPACT.md`、`references/INPUT_TEMPLATE.md`
- 其余参考文件版本号对齐 v5

### 保留的核心原则

- 因果链只能提取，不能生成；
- 配套材料与正文共享同一主张集合和证据等级；
- 语言与体裁服从科学事实和证据边界；
- 缺失的科学环节进入作者确认项。

## v4.0.0 — 金属材料学通用化升级

### 正式更名

- 技能元数据由 `materials-fracture-academic-polisher` 更名为 `metallic-materials-academic-editor`。
- 文档标题由“材料与断裂力学论文精修”调整为“金属材料学论文精修与科学论证”。
- GitHub 仓库旧地址暂时保留，避免既有链接失效。

### 新增的核心层

1. **Results–Discussion 第一性原理分工**
   - 以“结论离原始数据的距离”为归属标准；
   - Results 建立直接证据、定量关系和局部判断；
   - Discussion 联合多组证据建立完整机制、处理替代解释和适用边界；
   - 因果关系可在 Results 中以局部形式建立，前提是实验设计和数据直接支持。

2. **性能类论文专用叙事**
   - 应用需求 → 性能瓶颈/权衡 → 中间物理过程 → 设计动作；
   - 设计动作 → 组织状态 → 变形/损伤过程 → 定量性能；
   - 分别解释各项性能来源及通常代价为何受到抑制；
   - 增加性能记录、强塑/强韧/模量–疲劳协同和文献可比性规则。

3. **主张—证据矩阵**
   - 增加 L0–L7 证据等级；
   - 细化直接观察、差异、关联、贡献、机制因果、控制机制和推广性主张；
   - 为 significant、superior、record、highest 等评价词设置最低证据要求。

4. **十类论文路由**
   - M：组织演化与相变；
   - P：性能设计；
   - D：变形与载荷分配；
   - F：疲劳断裂；
   - E：氢脆与环境损伤；
   - T：蠕变与高温；
   - A：加工制造；
   - Q：表征方法；
   - C：计算模型；
   - R：综述观点。

5. **领域证据安全门**
   - 同步辐射晶格应变、峰宽和峰强；
   - 氢脆机制识别；
   - 疲劳驱动力和裂纹尺度；
   - 相变快照与动力学；
   - 性能文献基准；
   - 蠕变、腐蚀、氧化、增材和计算模型。

6. **全文一致性和图序**
   - 题目、摘要、引言末段、Results、Discussion 和 Conclusion 采用同一主张集合；
   - 每幅主图承担一个主要证明任务；
   - 图序能够复述论文的证明顺序。

### 新增文件

- `references/RESULTS_DISCUSSION_LOGIC.md`
- `references/PERFORMANCE_PAPER_LOGIC.md`
- `references/CLAIM_EVIDENCE_MATRIX.md`
- `references/DOMAIN_EVIDENCE_MODULES.md`
- `references/ABSTRACT_MODELS.md`
- `references/WORKED_BLUEPRINTS.md`

### 更新文件

- `SKILL.md`
- `README.md`
- `references/PAPER_TYPE_ROUTING.md`
- `references/ARCHITECTURE_RULES.md`
- `references/CORPUS_STYLE_NOTES.md`
- `references/PROMPT_FULL.md`
- `references/PROMPT_COMPACT.md`
- `references/INPUT_TEMPLATE.md`
- `references/QUALITY_CHECKLIST.md`

### 保留的 v3 原则

- 因果链只能提取，不能生成；
- 缺失的科学环节进入作者确认项；
- 语言风格服从科学事实和证据边界；
- 不复制任何范文的可识别词句或具体机制结构。

## v3.0

增加全文主线、过程轨迹、阶段继承、理论—观察配对和论文类型初步路由。详见 `CHANGELOG_FROM_V2.md`。
