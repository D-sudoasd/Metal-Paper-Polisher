# 摘要设计/解决导向模式（v5 · 设计链扩展）

本模式用于将金属材料论文摘要重构为一条以“实现过去难以获得的能力”为中心的设计论证链。它适用于通过成分、工艺、组织、界面、缺陷或多尺度结构调控获得目标性能组合、功能范围、制造能力或服役可靠性的研究。

本模式只迁移高水平设计型摘要的抽象逻辑：需求与瓶颈 → 可控设计 → 设计实现机制 → 目标状态 → 定量验证 → 性能收益与代价抑制 → 受条件约束的设计认识。不得复制任何参考论文的可识别词句、具体工艺、机制或数据排列。

## 1. 与发现导向摘要的第一性原理区别

两类摘要回答的问题不同：

```text
发现导向：
以前不清楚的 A→B 关系是什么，为什么成立？

设计/解决导向：
通过哪个可控变量 X，怎样实现过去难以获得的能力 Y？
```

发现导向增加知识；设计/解决导向增加能力。两者都可以包含机制、计算、显微表征和性能数据，分类取决于全文最强、最上游且证据最闭合的贡献。

### 1.1 中心主张的典型形式

发现导向：

```text
[Factor/process A] + [evidence-calibrated verb] + [phenomenon/process B].
```

设计/解决导向：

```text
[Controllable design X] + enables/produces/achieves + [target capability Y] + [system/boundary].
```

设计导向核心句中的主语应具有可控性，例如热处理、成分调节、相稳定性、组织尺度、界面状态、梯度、缺陷控制或制造路径。单纯的材料名称或性能结果通常不足以构成设计主张。

## 2. 启用条件

出现以下任一情况时优先启用本模式：

- 用户选择“摘要精修模式：设计/解决导向链”；
- 论文核心任务是突破强度—塑性、强度—韧性、模量—疲劳、高温强度—稳定性等性能权衡；
- 论文提出可控成分、工艺、组织、界面或缺陷设计并获得定量性能；
- 论文的主要价值是形成可实施、可重复或可规模化的解决路线；
- 即使删除部分机制解释，设计动作、目标组织和性能结果仍构成论文主要贡献；
- 标题和结论更自然地写成“X enables Y”“a route to Y”或“X for Y”。

以下情况应切换到发现导向单链或标准功能型：

- 删除全部性能数字后，仍存在一条更强、更上游且可独立成立的新机制关系；
- 设计动作只用于制造样品，真正的新意是某个未知过程、现象或定量关系；
- 性能提高只有相关性，没有证明设计变量产生目标组织或中间状态；
- 论文包含多项无法汇合的独立能力、多个材料案例或多个平行方法贡献；
- 仅有优异性能，没有有效对照、测试条件或机制边界；
- 工艺、组织和性能之间的因果环节需要新增实验才能闭合。

## 3. 设计摘要必须闭合的两条链

### 3.1 解决链

```text
应用或材料需求
→ 现有能力缺口或性能权衡
→ 造成瓶颈的具体物理原因
→ 可控设计动作
→ 关键中间变量
→ 目标组织/状态
→ 定量性能或功能
```

该链回答：

> 设计做了什么，怎样被实现，是否确实解决了问题？

### 3.2 解释链

```text
目标组织/状态
→ P1 的变形、损伤或功能机制
→ P2 的来源或常见代价受到抑制的原因
→ 综合性能、服役能力或制造优势
```

该链回答：

> 为什么设计有效，为什么通常伴随的代价没有同等程度发生？

高水平设计摘要需要两条链在同一个中间变量、组织状态或功能过程处连接。只有工艺—性能链，没有中间变量和机制，摘要会退化成性能报告；只有机制，没有可控设计和性能验证，则更接近发现导向。

## 4. 核心解决方案句的提取

### 4.1 选择原则

从全文中选择最能代表“可控设计实现目标能力”的一句关系。候选核心句应满足：

1. **可控性**：主语是作者能够调节或实施的变量；
2. **必要性**：该变量针对 S2 中的具体瓶颈；
3. **可验证性**：正文证明它产生了目标中间状态或组织；
4. **性能闭合**：正文提供定量性能和有效基准；
5. **覆盖度**：摘要后半的大部分结果都可用于证明或解释该句；
6. **身份性**：删除该句后，论文的设计身份明显消失；
7. **边界性**：材料、状态或适用条件可以明确限定。

优先选择“最上游且可控、同时能够覆盖最多结果”的设计关系。

### 4.2 设计主张的抽象层级

| 层级 | 示例形态 | 处理 |
|---|---|---|
| 过宽 | A novel microstructure improves properties | 缺少设计变量和目标能力 |
| 合适 | Retained compositional modulation enables heterogeneous precipitation | 可统领工艺、组织和性能 |
| 合适 | Nanoscale metastable-phase modulation enables high fatigue strain at low stiffness | 统一性能组合 |
| 过细 | Up-quenching at a specific temperature dissolves a phase and leaves pockets of a given size | 属于实现细节，后移 |
| 过载 | 工艺 + 成分 + 三种组织 + 多个数值 + 全部机制 | 拆分到后续句 |

### 4.3 核心句细节禁区

核心解决方案句通常不承载：

- 完整多步工艺；
- 仪器和软件；
- 多个具体温度、时间、尺寸或误差；
- 三项以上并列组织特征；
- 多组文献 benchmark；
- P1、P2 的全部机制；
- 工业愿景、临床愿景或宽泛应用宣传。

核心句可以保留材料体系、关键设计变量、目标组织和一个综合能力，只要仍有单一主干。

## 5. S1–S9 句子功能契约

### S1：目标能力及其价值

说明应用或材料体系需要什么能力组合。只保留与全文主线直接相关的性能或功能。

```text
[Application/material class] requires [capability P1] together with [capability P2].
```

### S2：精确能力缺口与物理瓶颈

S2 不只写“simultaneously achieving P1 and P2 remains challenging”，还应在原文支持时指出为什么：

```text
Conventional [route/state] improves P1 at the expense of P2 because [physical bottleneck].
```

瓶颈可落到应变硬化不足、界面不协调、裂纹萌生、组织粗化、模量代价、扩散限制、制造尺度或缺陷敏感性。

### S3：一句话核心解决方案

S3 回答“本文通过什么可控设计实现了什么能力”。

```text
Here, we show that [controllable design X] enables [target capability Y] in [material/system].
```

S3 不提前塞入完整工艺、全部组织细节和性能数字。

### S4：设计实现机制

S4 是设计摘要中最容易缺失的一句。它需要回答：

> X 怎样建立了目标组织或关键中间变量？

```text
[Design action] creates/preserves/regulates [intermediate state Z], which activates/forms [target architecture M].
```

S4 必须包含物理中间变量，例如成分调制、相稳定性、析出驱动力、界面状态、缺陷分布、应力梯度或局部自由能。只写“通过热处理获得该组织”属于工艺说明，不构成设计实现机制。

### S5：目标组织或功能状态

当 S4 未能清楚给出最终组织时，S5 用一句定量或结构化描述目标状态。组织清单只保留与后续性能机制直接相关的特征。

### S6：定量性能验证

性能句至少包括：

- 指标；
- 数值；
- 测试条件；
- 对照或 benchmark；
- 提升幅度。

记录型或跨文献比较需要限定搜索范围和可比条件。

### S7：P1 的来源

明确哪个组织因素通过哪个变形、损伤或功能过程提高 P1。

### S8：P2 的来源或代价抑制

明确为什么 P2 得到保留或提高，以及常见代价为什么没有同等程度发生。

### S9：设计认识与边界

最后一句将当前材料中的结果提升为受条件约束的设计关系：

```text
These results identify [specific controllable relation] as a route to [capability] in [bounded class/condition].
```

避免只写 `provide a new strategy`、`pave the way`、`offer prospects` 或 `benefit future design`。

## 6. 设计摘要中的两类机制

### 6.1 组织形成机制

回答：

```text
工艺/成分 X
→ 中间变量 Z
→ 目标组织 M
```

例如：

```text
快速结构转变快于长程扩散
→ 保留成分调制
→ 不同局部成分激活不同析出路径
→ 粗细析出区共存
```

### 6.2 性能实现机制

回答：

```text
目标组织 M
→ 变形/损伤/功能过程
→ P1、P2 或综合能力
```

例如：

```text
软硬区应变分配
→ 背应力和持续塑性
→ 强度—塑性协同
```

两类机制不能混写成一句。摘要篇幅受限时，优先保留一个组织形成箭头和一个性能实现箭头。

## 7. 五种设计导向子类型

### 7.1 工艺路线主导

核心贡献是简单、可重复或可规模化的加工路线。

```text
capability gap
→ scalable process
→ intermediate state
→ target structure
→ performance
```

### 7.2 组织架构主导

核心贡献是梯度、异质、层级、纳米调制或界面网络等架构。

```text
property trade-off
→ architecture design
→ deformation/damage redistribution
→ property synergy
```

### 7.3 综合性能主导

核心贡献是过去难以获得的性能组合或综合指标。

```text
P1–P2 trade-off
→ design X
→ P1 improvement
→ P2 retention
→ integrated metric
```

存在 `εf=σf/E`、specific strength、strength–toughness index 等原文定义的综合指标时，分别解释分子和分母，再汇合。

### 7.4 缺陷/失效控制主导

核心贡献是抑制夹杂破裂、裂纹萌生、孔隙、氢富集或界面失稳。

```text
dominant defect
→ defect/interface control
→ delayed damage stage
→ improved life/reliability
```

### 7.5 功能范围调控主导

核心贡献是将某一功能量从一个窄区间扩展为可调范围。

```text
limited tunability
→ controllable variable
→ quantified functional range
→ design rule
```

只有在作者实际实施调控并实现目标范围时采用设计导向。若主要贡献是定量解释多个因素的作用，则应采用发现导向的定量解析子型。

## 8. 多性能论文的分叉与汇合

设计论文常见错误是用一个宽泛机制同时解释两项性能。应先分叉：

```text
design/architecture
├─ mechanism A → P1
└─ mechanism B → P2 or penalty suppression
```

随后在综合能力处汇合：

```text
P1 gain + P2 retention
→ strength–ductility synergy
→ high fatigue strain
→ high-temperature strength with stability
→ hydrogen tolerance at high strength
```

如果 P1 和 P2 来自同一过程，也需说明该过程分别怎样作用于两项指标。

## 9. 定量比较与 benchmark 安全门

设计主张的强度取决于比较有效性。摘要中必须核查：

- 材料成分和初始状态是否可比；
- 工艺改变是否同时改变晶粒、相分数、织构、残余应力和缺陷；
- 拉伸测试的温度、应变率和试样几何；
- 疲劳测试的应力比、频率、寿命定义、表面状态和加载方式；
- 韧性测试的试样尺寸、裂纹条件和标准；
- 文献 benchmark 是否来自相同指标定义；
- 规模化、低成本或工业可实施性是否由实际工艺条件支持。

缺少可比条件时，降低 `superior`、`record`、`highest` 和百分比比较的强度，或列入作者确认项。

## 10. 设计增量检查

S3 之后每句话检查：

1. 是否证明设计确实建立了中间变量或目标组织；
2. 是否提供性能数值或必要条件；
3. 是否解释 P1、P2 或代价抑制；
4. 是否直接服务于核心解决方案句；
5. 是否只是设备、工艺步骤、常识或形貌清单。

不能通过前四项的句子应压缩、后移或删除。

## 11. 设计导向与发现导向的路由测试

### 11.1 删除性能数字测试

删除全部性能数字后，若论文仍然建立一条可独立发表的新机制关系，优先考虑发现导向。

### 11.2 删除机制测试

删除完整机制解释后，若可控路线、目标组织和性能组合仍构成主要贡献，优先考虑设计导向。

### 11.3 标题测试

更自然的标题若为：

```text
A-induced B
Origin of B
Quantitative role of A and B
```

倾向发现导向。

更自然的标题若为：

```text
X enables Y
X for simultaneous P1 and P2
A scalable route to Y
```

倾向设计导向。

### 11.4 图序覆盖测试

若大多数主图回答“过程为何发生”，倾向发现导向。若大多数主图回答“设计如何实现、性能是否提升、为何避免代价”，倾向设计导向。

### 11.5 证据上限测试

上游机制只有关联证据、而设计与性能由受控对照充分证明时，选择设计导向更稳。

## 12. 常见失败模式

### 12.1 只写“我们做了什么”

```text
We developed a heat treatment and characterized the microstructure.
```

缺少解决的能力和中间变量。

### 12.2 工艺清单替代设计机制

```text
solution treatment → quenching → aging → tensile testing
```

应压缩为：

```text
process X preserves/regulates intermediate state Z, which generates architecture M
```

### 12.3 性能数字先于设计关系

读者看到多个数值，却不知道哪个设计变量造成该结果。先给 S3 核心解决方案，再给数值证明。

### 12.4 一个宽泛机制解释全部性能

```text
The hierarchical structure accounts for the excellent properties.
```

应拆成 P1 和 P2 的独立路径。

### 12.5 机制夺取设计主线

摘要用大量篇幅讨论位错或相变细节，设计动作和性能能力退居背景。机制只保留解释设计为何有效所需的最短闭合链。

### 12.6 空泛结尾

```text
This work provides a new strategy for high-performance alloys.
```

改为具体可控变量、目标能力和适用条件。

## 13. 长摘要与短文压缩

### 13.1 Acta Materialia 全长文

可保留 7–9 个功能位：

```text
需求 → 瓶颈 → 核心解决方案 → 实现机制 → 目标组织 → 定量性能 → P1/P2 机制 → 边界
```

### 13.2 Scripta/快报

压缩为 5–6 句：

```text
瓶颈
→ 核心解决方案
→ 关键实现机制
→ 最强定量结果
→ 性能协同机制
→ 边界
```

### 13.3 Nature/Science 家族

保留设计能力和领域意义，压缩技术细节；数值只保留最具新闻性的 1–2 项，机制保留一个决定性中间过程。

## 14. 空白骨架

### 14.1 工艺路线主导

```text
[Capability] remains difficult to achieve in [material/application] because [bottleneck].
Here, we show that [controllable/scalable process X] generates [target structure M] and enables [capability Y].
[X] creates or preserves [intermediate state Z], which activates [formation process] and produces [M].
Compared with [reference] under [conditions], the material achieves [quantitative P1/P2].
[P1] arises from [mechanism A], while [P2 or penalty suppression] is enabled by [mechanism B].
These results identify [X→Z→M relation] as a route to [Y] within [boundary].
```

### 14.2 综合性能主导

```text
[Application] requires [P1] together with [P2], yet conventional [route] produces a trade-off because [bottleneck].
Here, we show that [design X] enables [integrated capability Y] in [material].
The resulting [structure/state] achieves [P1 value] and [P2 value] under [conditions].
[P1] is enhanced through [mechanism A], whereas [P2] is retained by [mechanism B], suppressing [usual penalty].
Together, these effects produce [integrated metric or property synergy].
These findings identify [bounded design relation].
```

### 14.3 设计短文

```text
[Capability gap].
Here, [design X] enables [Y].
[X] regulates [Z], producing [M].
The material achieves [key quantitative result] relative to [reference].
[Mechanism A/B] explains the gain and the suppressed penalty.
[Bounded design implication].
```

## 15. 完整模式输出

启用本模式且选择完整模式时，除精修摘要外输出：

1. **一句话核心解决方案**及最高证据等级；
2. **设计类型**：工艺路线 / 组织架构 / 综合性能 / 缺陷控制 / 功能调控；
3. **解决链映射**：需求 → 瓶颈 → 设计 → 中间变量 → 组织 → 性能；
4. **解释链映射**：组织 → P1 → P2/代价抑制 → 综合能力；
5. **S1–Sn 句子功能**及每句回答的问题；
6. **benchmark 审计**；
7. 被压缩的工艺、方法、常识和组织清单；
8. 未闭合且没有补写的设计或机制环节；
9. 发现导向替代方案：若存在更强上游科学关系，给出候选但不自动改变主线。

## 16. 科学安全边界

- 设计关系只能从受控变量、目标状态和性能对照中提取，不能由相关性生成；
- `enables` 需要设计动作、目标状态和性能后果的闭合证据；
- `solves`、`overcomes`、`eliminates` 需要明确基准和接近完整的边界验证，通常应谨慎使用；
- 单一材料和单一测试条件不能自动形成普适设计准则；
- 规模化、低成本、临床适用或工业可实施性必须有原文证据；
- 机制证据不足时保留设计主张，降低机制动词，不用推测补齐；
- 采用设计导向不意味着弱化科学机制，而是让机制服务于解释设计为何有效。
