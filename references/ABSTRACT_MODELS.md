# 金属材料论文摘要功能模型（v5）

摘要结构由论文主类型决定。以下模型规定句子功能，不提供可复制的固定措辞。所有内容必须来自原文。

## 1. 通用要求

摘要应回答：

1. 研究对象和具体问题是什么；
2. 为什么现有认识或性能不足；
3. 本文改变、测量或比较了什么；
4. 最重要的定量结果是什么；
5. 证据支持的机制或解释是什么；
6. 结论在哪些条件下成立。

摘要不应成为设备清单、图号清单、无条件性能宣传或 Discussion 中未证明机制的提前声明。

## 2. M：相变、析出和形核长大

### 功能顺序

1. 过程的重要性；
2. 已知终态与精确机制缺口；
3. 本文对象和关键方法；
4. 最早先导事件；
5. 中间结构或形核；
6. 生长、取向、界面或变体演化；
7. 完整机制和边界。

### 空白骨架

```text
[Process] in [material/state] affects [property or microstructural outcome], yet [specific nucleation/growth/intermediate-step gap] remains unresolved.
Here, [methods] were used to examine [object and variables].
[Early event] was observed before [later event].
[Independent evidence] shows that [local structural/chemical/energetic change].
This state is associated with/promotes [nucleation or transformation], producing [intermediate feature].
During subsequent [growth/evolution], [quantitative crystallographic or structural change] occurred, leading to [final state].
The results support [bounded mechanism] under [conditions].
```

## 3. P：性能导向设计

### 功能顺序

1. 所需性能组合；
2. 常规路线的瓶颈或权衡；
3. 设计动作和目标中间变量；
4. 形成的关键组织；
5. 定量性能和测试条件；
6. P1 的来源；
7. P2 的来源和代价抑制；
8. 设计边界。

### 空白骨架

```text
[Application/material class] requires [P1] together with [P2].
Conventional [route/microstructure] limits this combination because [physical bottleneck].
Here, [design action] was used to regulate [intermediate variable], producing [microstructural state].
The material achieved [P1 value] and [P2 value] under [conditions], compared with [reference].
The improvement in [P1] is associated with [mechanism and evidence].
The retention/enhancement of [P2] arises from [separate process], which suppresses [usual penalty].
These findings identify [design feature] as a route to [property combination] under [boundary].
```

## 4. D：变形机制和载荷分配

### 功能顺序

1. 材料性能或变形问题；
2. 未知的相/晶粒族承载过程；
3. 原位或多尺度方法；
4. 初始弹性和屈服顺序；
5. 载荷转移、相变、孪生或滑移；
6. 与加工硬化、局部化或断裂的连接；
7. 适用条件。

### 空白骨架

```text
The macroscopic response of [material] depends on how [phases/grain families] partition load and plastic strain, but [specific process] remains unclear.
Using [in situ method] combined with [local method], we tracked [quantities] during [loading].
[Phase/family A] departed from [linear response] at [condition], followed by [response of B].
This sequence indicates [bounded load-transfer/transformation conclusion].
[Local evidence] shows [slip/twinning/interface response], linking the phase-level behavior to [hardening/localization/damage].
The results establish [mechanism] over [strain/stress/temperature range].
```

## 5. F：疲劳、裂纹扩展和断裂

### 功能顺序

1. 工程或科学问题；
2. 裂纹尺度、驱动力或机制缺口；
3. 材料与加载条件；
4. 定量疲劳/裂纹结果；
5. 内禀与外禀机制证据；
6. 载荷比、环境、尺寸或组织效应；
7. 寿命或损伤容限意义。

### 空白骨架

```text
[Fatigue/fracture problem] limits [application], particularly under [crack size/loading/environment].
The response remains unclear because [specific driving-force or mechanism gap].
We compared [materials/states] under [explicit ΔK/Kmax/R/life conditions].
[Quantitative result].
[Fractographic/closure/crack-tip evidence] indicates [bounded mechanism].
The balance between [intrinsic resistance] and [extrinsic shielding] changes with [condition], accounting for [trend].
These results define [boundary or design implication].
```

## 6. E：氢脆和环境辅助损伤

### 功能顺序

1. 环境下的性能问题；
2. 未知的损伤阶段或机制；
3. 环境/氢状态与方法；
4. 宏观退化；
5. 局部变形或裂纹时序；
6. 氢位置、界面或机制证据；
7. 机制边界。

### 空白骨架

```text
[Material] is susceptible to [hydrogen/environmental degradation] under [service condition], yet the damage stage most strongly affected by [environment] remains unresolved.
We controlled [hydrogen/environment state] and tracked [macroscopic and local quantities].
[Performance metric] changed from X to Y under [condition].
[Local event] preceded [crack/damage event] and occurred preferentially at [location].
[Independent hydrogen/interface evidence] is consistent with [mechanism class].
The data support [bounded conclusion] without uniquely assigning [unsupported strong mechanism].
```

## 7. T：蠕变、高温和热稳定性

### 功能顺序

1. 高温性能要求；
2. 控速过程或组织稳定性缺口；
3. 温度、应力和材料状态；
4. 定量蠕变/稳定性结果；
5. 组织和位错演化；
6. 速率控制解释；
7. 寿命与边界。

## 8. A：加工、增材和连接

### 功能顺序

1. 制造问题或缺陷瓶颈；
2. 工艺变量；
3. 缺陷和组织；
4. 定量性能或各向异性；
5. 工艺—组织—性能连接；
6. 工艺窗口和可重复性。

## 9. Q：表征和方法

### 功能顺序

1. 现有方法无法测量的具体量；
2. 新协议或算法；
3. 标定对象；
4. 精度、分辨率和不确定度；
5. 材料问题中的演示；
6. 适用边界。

## 10. C：计算和模型

### 功能顺序

1. 科学或预测问题；
2. 模型和关键假设；
3. 验证；
4. 变量依赖或机制解释；
5. 预测；
6. 敏感性和边界。

## 11. R：综述

### 功能顺序

1. 范围和重要性；
2. 已有综述或研究重点；
3. 精确缺口；
4. 本文覆盖范围；
5. 定义或分类；
6. 关键对比和证据冲突；
7. 对预测、设计或研究方向的含义。

## 12. 摘要自检

- [ ] 第一到第三句已经明确问题和本文动作；
- [ ] 核心性能或核心机制没有被方法细节淹没；
- [ ] 所有比较带条件；
- [ ] 每个因果动词可在正文定位；
- [ ] 性能论文分别解释不同性能；
- [ ] 机制论文按过程顺序而非设备顺序；
- [ ] 氢脆论文没有用断口单独指定机制；
- [ ] 结尾给出边界，或在原文没有边界时保持局部结论；
- [ ] 没有为强调使用空泛的 remarkable、excellent、promising。
