# 金属材料论文摘要功能模型（v5 · 摘要双路由扩展）

摘要结构由论文主类型、目标期刊和摘要精修模式共同决定。本文件规定句子功能和路由，不提供可复制的固定措辞。所有事实、因果、性能比较和推广必须来自原文。

## 1. 摘要精修模式

### 1.1 标准功能型

按论文类型完成问题、方法、结果、机制和边界。适用于多条平行结果、方法论文、综述、数据库研究以及无法提取唯一主线的稿件。

### 1.2 发现导向单链

兼容旧名称“核心发现单链（Mo式逻辑）”。先用一句话提出最高层级科学发现，随后逐句解释该发现的来源、中间过程、后续演化和定量后果。启用时加载：

- `references/ABSTRACT_CORE_CLAIM_MODE.md`
- 可直接使用的专用提示词：`references/PROMPT_ABSTRACT_CORE_CLAIM.md`

其抽象逻辑为：

```text
研究价值
→ 已知边界与精确知识缺口
→ 一句话核心发现
→ 机制解析深度
→ 逐环节增量链
→ 物理落点
→ 受边界约束的认识
```

不得复制标定论文的原句、具体机制和数据结构。

### 1.3 设计/解决导向链

围绕“通过可控设计实现过去难以获得的能力”组织摘要。启用时加载：

- `references/ABSTRACT_DESIGN_SOLUTION_MODE.md`
- 可直接使用的专用提示词：`references/PROMPT_ABSTRACT_DESIGN_SOLUTION.md`

其抽象逻辑为：

```text
目标能力
→ 现有能力缺口或性能权衡
→ 一句话核心解决方案
→ 设计实现机制
→ 目标组织/状态
→ 定量性能
→ P1/P2 机制与代价抑制
→ 受边界约束的设计认识
```

设计导向不等于弱化机制。它要求区分：

1. 设计动作怎样建立目标组织或中间变量；
2. 目标组织怎样产生性能或功能；
3. 通常伴随的性能代价为什么受到抑制。

### 1.4 自动

当用户未指定时，先判断贡献属于哪一族：

#### 发现导向判据

- 核心贡献是新现象、新机制、新定量关系或新控制因素；
- 删除性能数字后，主要科学关系仍可独立成立；
- 大多数主图回答“过程如何发生”或“变量怎样决定结果”；
- 标题更自然地写成 `A-induced B`、`Origin of B` 或 `Quantitative role of A and B`。

#### 设计/解决导向判据

- 核心贡献是可控路线、目标组织、性能组合、功能范围或制造能力；
- 删除完整机制后，设计动作、目标状态和性能结果仍构成主要贡献；
- 大多数主图回答“设计怎样实现、性能是否提升、为什么避免代价”；
- 标题更自然地写成 `X enables Y`、`X for P1 and P2` 或 `A scalable route to Y`。

#### 标准功能型判据

- 存在两条以上无法汇合的独立主线；
- 贡献天然需要平行分类；
- 证据不足以支持发现单链或设计链；
- 方法、综述、数据库或多案例论文无法压缩为单一主张。

目标期刊为 Acta Materialia 或 Scripta Materialia、任务类型为“摘要重构”且全文具有单一主线时，自动模式优先在发现导向和设计导向之间选择，不机械默认发现导向。

## 2. 通用要求

摘要应回答：

1. 研究对象和具体问题是什么；
2. 已有认识或能力到哪一步，缺失哪一关系或能力；
3. 本文最重要的新发现或解决方案是什么；
4. 作者把该发现或设计解释到什么机制深度；
5. 哪些定量结果和证据支持核心主张；
6. 结论在哪些材料、状态和测试条件下成立。

摘要不应成为设备清单、图号清单、组织特征清单、工艺流程清单、无条件性能宣传或 Discussion 中未证明机制的提前声明。

### 2.1 核心主张句

发现导向：

```text
[upstream factor/process] + [evidence-calibrated verb] + [core downstream phenomenon].
```

设计导向：

```text
[controllable design] + enables/produces/achieves + [target capability] + [system/boundary].
```

两类核心句均避免同时放入方法、多个数值、完整工艺、组织清单和多组 benchmark。细节后移，用于证明核心句。

### 2.2 新信息要求

核心主张句之后的独立句必须提供本文新增信息。领域常识、正常变形路径、传统组织行为和普通工艺步骤只有在构成必要比较基准时保留，并压缩为含有新发现或设计增量的句子中的从属成分。

### 2.3 机制解析句

核心主张句之后应有一句说明机制解析深度。

发现导向需点名需要解释的过程，例如：

- nucleation and growth；
- phase-specific yielding；
- crack-tip shielding；
- rate-controlling process；
- quantitative phonon–elasticity contributions。

设计导向需点名两类机制中的至少一类：

- design-realization mechanism：设计怎样建立中间变量和目标组织；
- performance-enabling mechanism：组织怎样提高 P1、保留 P2 或抑制通常代价。

只写“使用某方法研究某问题”不满足该功能。

## 3. M：相变、析出和形核长大

### 3.1 标准功能型顺序

1. 过程的重要性；
2. 已知终态与精确机制缺口；
3. 本文对象和关键方法；
4. 最早先导事件；
5. 中间结构或形核；
6. 生长、取向、界面或变体演化；
7. 完整机制和边界。

### 3.2 发现导向单链顺序

1. 过程的重要性；
2. 已知终态 + 缺失的形核/生长关系；
3. `Here, we show that A [precedes/promotes/induces] B.`；
4. 方法从属于“解析 A-assisted nucleation and growth mechanism”；
5. A 为什么形成；
6. A 改变了哪个局部化学、结构或能量状态；
7. 中间状态怎样形成 B；
8. B 在后续生长中的界面、取向或变体演化；
9. 终态、迁移条件或边界。

### 3.3 空白骨架

```text
[Process] in [material/state] affects [outcome]. Although [known endpoint], how [specific missing relation] remains unresolved.
Here, we show that [early factor A] [evidence-calibrated verb] [event B].
Using [essential methods], we elucidate the [A]-assisted [nucleation/growth/evolution] mechanism.
[A] arises from [supported origin].
[A] changes [intermediate state C], thereby [bounded relation to B].
During subsequent [growth/evolution], [quantitative change] occurs, leading to [final state].
These results identify [bounded mechanism or condition].
```

## 4. P：性能导向设计

### 4.1 标准功能型顺序

1. 所需性能组合；
2. 常规路线的瓶颈或权衡；
3. 设计动作和目标中间变量；
4. 形成的关键组织；
5. 定量性能和测试条件；
6. P1 的来源；
7. P2 的来源和代价抑制；
8. 设计边界。

### 4.2 发现导向路由

当性能结果由一个更上游、可独立成立的新组织形成规律或变形规律统领时，采用发现导向。

```text
性能背景
→ 上游科学关系
→ 机制解析深度
→ 中间变量
→ 目标组织
→ 性能后果
→ 边界
```

核心句优先写成“上游变量引导目标组织形成”，避免停在“microstructure improves properties”。

### 4.3 设计/解决导向路由

#### 工艺或组织形成路线主导

```text
能力缺口
→ 可控工艺/设计作为核心解决方案
→ 设计实现机制
→ 关键中间变量
→ 目标组织
→ 定量性能
→ P1/P2 机制分工
→ 可实施边界
```

#### 综合性能主导

```text
应用需求与权衡
→ 设计实现综合性能作为核心解决方案
→ 目标组织或状态
→ 定量性能证明
→ P1 的来源
→ P2 的来源或通常代价受到抑制的原因
→ 两条支路汇合
→ 受边界约束的设计认识
```

存在综合指标时，用该指标统一主线。例如 fatigue strain 为 `σf/E` 时，后半分别解释疲劳强度提高和模量保持较低，再汇合到 fatigue strain。

### 4.4 设计导向空白骨架

```text
[Application/material class] requires [P1] together with [P2].
Conventional [route/microstructure] limits this combination because [physical bottleneck].
Here, we show that [controllable design X] enables [integrated capability Y] in [material/system].
[X] creates or preserves [intermediate state Z], which produces [target architecture M].
Compared with [reference] under [conditions], the material achieves [P1 value] and [P2 value].
[P1] arises from [mechanism A], whereas [P2 or retained property] is supported by [mechanism B].
Together, these effects [rejoin at the integrated metric or trade-off].
These findings identify [specific bounded X→Z→M→Y relation].
```

## 5. D：变形机制和载荷分配

### 5.1 标准功能型顺序

1. 材料性能或变形问题；
2. 未知的相/晶粒族承载过程；
3. 原位或多尺度方法；
4. 初始弹性和屈服顺序；
5. 载荷转移、相变、孪生或滑移；
6. 与加工硬化、局部化或断裂的连接；
7. 适用条件。

### 5.2 发现导向单链顺序

1. 相间或晶粒间变形影响宏观行为；
2. 精确缺口定位到某一屈服、载荷转移或不相容阶段；
3. 核心句提出“因素 A 改变/加速/抑制变形关系 B”；
4. 说明原位方法解析到 phase-specific yielding、stress partitioning 或 compatibility evolution；
5. 只保留发生变化的增量；
6. 已知承载路径作为从属基准；
7. 落到硬化、局部化或损伤的物理后果。

### 5.3 设计导向路由

当论文主动调节相强度差、织构、相稳定性或界面状态以改变载荷分配并获得目标性能时，可采用设计导向：

```text
变形瓶颈
→ 可控组织设计
→ 相级承载关系改变
→ 硬化/局部化受到调节
→ 定量性能
```

### 5.4 空白骨架

```text
The macroscopic response of [material] depends on [phase/grain-family interaction], yet how [factor] alters [specific stage] remains unclear.
Here, we show that [factor] [accelerates/changes/suppresses] [core micromechanical relation].
Using [in situ method], we resolve how this effect develops through [yielding/load transfer/stress mismatch].
[Factor] preserves [necessary baseline] yet [new increment].
The resulting [intermediate change] leads to [hardening/localization/damage outcome].
The results establish [bounded micromechanical insight].
```

## 6. F：疲劳、裂纹扩展和断裂

### 6.1 标准功能型顺序

1. 工程或科学问题；
2. 裂纹尺度、驱动力或机制缺口；
3. 材料与加载条件；
4. 定量疲劳/裂纹结果；
5. 内禀与外禀机制证据；
6. 载荷比、环境、尺寸或组织效应；
7. 寿命或损伤容限意义。

### 6.2 发现导向单链

核心句优先提出一个受驱动力和尺度限定的关系，例如组织或环境因素怎样改变裂纹萌生、门槛或屏蔽。后续按裂纹阶段或驱动力区间推进，不按断口、曲线和显微镜分列。

### 6.3 设计导向链

当核心贡献是通过组织、残余应力、界面或缺陷控制提高疲劳寿命、门槛或损伤容限时：

```text
失效瓶颈
→ 可控设计
→ 裂纹萌生/扩展阶段改变
→ 定量疲劳性能
→ 内禀/外禀机制
→ 寿命边界
```

### 6.4 空白骨架

```text
[Fatigue/fracture problem] limits [application], yet [specific crack-stage or driving-force relation] remains unresolved.
Here, we show that [factor/design] [changes/enables] [crack process or fatigue capability] under [condition].
Using [essential evidence], we elucidate how [intrinsic process] and [extrinsic shielding] produce this response.
[Quantitative result].
[Mechanism evidence] accounts for [trend across crack size/R/environment].
These results define [bounded life or damage-tolerance implication].
```

## 7. E：氢脆和环境辅助损伤

### 7.1 标准功能型顺序

1. 环境下的性能问题；
2. 未知的损伤阶段或机制；
3. 环境/氢状态与方法；
4. 宏观退化；
5. 局部变形或裂纹时序；
6. 氢位置、界面或机制证据；
7. 机制边界。

### 7.2 发现导向单链

1. 环境损伤的重要性；
2. 已知断裂结果 + 断裂前未知阶段；
3. 核心句提出环境因素首先改变的上位微观力学过程；
4. 方法句说明解析到局部变形、相间应力或裂纹时序；
5. 新增量沿“局部改变 → 不相容/局部化 → 损伤”推进；
6. HELP、HEDE 或氢化物机制只有在独立证据充分时进入摘要。

### 7.3 设计导向链

当论文通过陷阱、界面、相稳定性、组织尺度或缺陷控制提高抗氢脆能力：

```text
氢损伤瓶颈
→ 可控设计
→ 氢状态/局部变形/裂纹阶段改变
→ 定量抗氢性能
→ 强度代价或其他代价受到抑制
→ 边界
```

### 7.4 空白骨架

```text
[Material] is susceptible to [hydrogen/environmental degradation], yet how [environment] alters [specific pre-fracture stage] remains unresolved.
Here, we show that [environment/design] [accelerates/enables/is associated with] [core local process or resistance].
Using [methods], we resolve how this effect develops through [mechanism scope].
[New stress/strain/damage increment or performance].
[Independent local or hydrogen evidence] supports [bounded interpretation].
These results identify [early consequence or design relation and boundary].
```

## 8. T：蠕变、高温和热稳定性

### 标准功能型顺序

1. 高温性能要求；
2. 控速过程或组织稳定性缺口；
3. 温度、应力和材料状态；
4. 定量蠕变/稳定性结果；
5. 组织和位错演化；
6. 速率控制解释；
7. 寿命与边界。

发现导向优先提取“组织演化 A 改变控速过程 B”的关系。设计导向优先提取“设计 X 稳定组织 M 并实现高温能力 Y”的关系。

## 9. A：加工、增材和连接

### 标准功能型顺序

1. 制造问题或缺陷瓶颈；
2. 工艺变量；
3. 缺陷和组织；
4. 定量性能或各向异性；
5. 工艺—组织—性能连接；
6. 工艺窗口和可重复性。

设计导向通常是本类型的首选：

```text
制造能力缺口
→ 可实施工艺
→ 中间热/流动/凝固变量
→ 缺陷或组织
→ 性能
→ 工艺窗口
```

发现导向只在工艺研究揭示一条新的形成规律且该规律是主要贡献时启用。

## 10. Q：表征和方法

### 标准功能型顺序

1. 现有方法无法测量的具体量；
2. 新协议或算法；
3. 标定对象；
4. 精度、分辨率和不确定度；
5. 材料问题中的演示；
6. 适用边界。

方法论文通常保留标准功能型。若协议形成一个经过标定的新测量能力，可采用设计/解决导向：

```text
measurement gap
→ protocol
→ validation
→ resolution/uncertainty
→ capability boundary
```

## 11. C：计算和模型

### 标准功能型顺序

1. 科学或预测问题；
2. 模型和关键假设；
3. 验证；
4. 变量依赖或机制解释；
5. 预测；
6. 敏感性和边界。

发现导向可围绕“模型揭示变量 A 控制趋势 B”展开。设计导向可围绕“模型指导设计 X，实现目标 Y”展开，但必须有实验或独立验证支持。

## 12. R：综述

### 功能顺序

1. 范围和重要性；
2. 已有综述或研究重点；
3. 精确缺口；
4. 本文覆盖范围；
5. 定义或分类；
6. 关键对比和证据冲突；
7. 对预测、设计或研究方向的含义。

综述通常不启用发现或设计单链。观点型综述具有一个得到文献证据支持的中心论点时，可以采用中心论点先行，后续仍按分类和证据冲突展开。

## 13. 摘要专用输出诊断

以下“与正文对应”“benchmark 审计”和备选主张只检查实际提供的上下文。只有摘要时输出 `coverage=local`，把正文证据、题目—结论对齐和全文 ownership 列入 `not_checked`；“完整模式”只增加诊断细节，不表示全文上下文完整。

### 13.1 发现导向完整模式

- 一句话核心发现及证据等级；
- S1–Sn 句子功能映射；
- 每句回答的问题；
- 被删除、后移或降为从属成分的非增量信息；
- 摘要主线与正文证据的对应关系；
- 无法闭合但没有补写的机制环节。

### 13.2 设计导向完整模式

- 一句话核心解决方案及证据等级；
- 设计类型：工艺路线 / 组织架构 / 综合性能 / 缺陷控制 / 功能调控；
- 解决链：需求 → 瓶颈 → 设计 → 中间变量 → 组织 → 性能；
- 解释链：组织 → P1 → P2/代价抑制 → 综合能力；
- S1–Sn 功能映射；
- benchmark 和测试条件审计；
- 被压缩的工艺、方法和组织清单；
- 未闭合且没有补写的设计环节；
- 发现导向备选主张及路由理由。

## 14. 摘要自检

- [ ] 已选择标准功能型、发现导向单链、设计/解决导向链或自动模式；
- [ ] 自动模式能够说明选择理由；
- [ ] 核心主张属于本文新增认识或能力；
- [ ] 核心句没有被方法、数值、工艺和组织清单淹没；
- [ ] 核心动词与证据等级一致；
- [ ] 发现导向的机制解析句点明过程深度；
- [ ] 设计导向的 S4 点明中间变量和设计实现机制；
- [ ] 核心句之后每句均提供新增量；
- [ ] 已知行为只作为必要对照嵌入新发现或设计增量；
- [ ] 所有比较带条件；
- [ ] 每个因果动词可在正文定位；
- [ ] 设计论文分别解释 P1 与 P2，并在综合指标或性能权衡处汇合；
- [ ] 设计论文同时闭合“设计怎样形成组织”和“组织怎样产生性能”；
- [ ] 机制论文按过程顺序而非设备顺序；
- [ ] 氢脆论文没有用断口单独指定机制；
- [ ] 倒数第二句有物理或设计落点；
- [ ] 结尾给出具体认识和边界；
- [ ] 没有使用空泛的 remarkable、excellent、promising 代替证据。
