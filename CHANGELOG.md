# Changelog

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
