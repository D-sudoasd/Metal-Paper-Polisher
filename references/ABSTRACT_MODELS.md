# 金属材料论文摘要功能模型（v5 · 摘要单链扩展）

摘要结构由论文主类型、目标期刊和摘要精修模式共同决定。本文件规定句子功能和路由，不提供可复制的固定措辞。所有事实、因果和推广必须来自原文。

## 1. 摘要精修模式

### 1.1 标准功能型

按论文类型完成问题、方法、结果、机制和边界。适用于多条平行结果、方法论文、综述、数据库研究以及无法提取唯一主线的稿件。

### 1.2 核心发现单链（Mo式逻辑）

先用一句话提出最高层级核心发现，随后逐句解释该发现的来源、中间过程、后续演化和定量后果。启用时加载：

- `references/ABSTRACT_CORE_CLAIM_MODE.md`
- 可直接使用的专用提示词：`references/PROMPT_ABSTRACT_CORE_CLAIM.md`

该名称只指一种抽象逻辑：价值 → 精确缺口 → 核心发现 → 机制解析深度 → 增量链 → 物理落点 → 受边界约束的认识。不得复制标定论文的原句、具体机制和数据结构。

### 1.3 自动

当用户未指定时，依次判断：

1. 全文能否提取一个得到证据支持的上位关系；
2. 摘要后半的大部分结果能否用于证明或解释该关系；
3. 该关系是否属于本文新增认识；
4. 采用单链后是否会压掉不可合并的第二主线。

四项均满足时启用核心发现单链；存在独立主线、证据断裂或分类型贡献时采用标准功能型，并在诊断中说明原因。

目标期刊为 Acta Materialia 或 Scripta Materialia、任务类型为“摘要重构”、全文具有单一发现时，自动模式优先尝试核心发现单链。

## 2. 通用要求

摘要应回答：

1. 研究对象和具体问题是什么；
2. 已有认识到哪一步，缺失哪一关系；
3. 本文最重要的新发现是什么；
4. 作者把该发现解释到了什么机制深度；
5. 哪些定量结果和证据支持该发现；
6. 结论在哪些条件下成立。

摘要不应成为设备清单、图号清单、组织特征清单、无条件性能宣传或 Discussion 中未证明机制的提前声明。

### 2.1 核心发现句

核心发现句应具有一个清楚主干：

```text
[upstream factor or process] + [evidence-calibrated verb] + [core downstream phenomenon or capability]
```

避免在该句中同时放入方法、多个数值、完整工艺、组织清单和多组 benchmark。细节后移，用于证明核心句。

### 2.2 新信息要求

核心发现句之后的独立句必须提供本文新增信息。领域常识、正常变形路径或传统组织行为仅在它们构成必要比较基准时保留，并压缩为包含新发现的句子中的从属成分。

### 2.3 机制解析句

核心发现句之后应有一句说明机制解析深度。该句应点名需要解释的机制范围，例如 nucleation and growth、composition-dependent transformation pathways、phase-specific yielding、cyclic-deformation accommodation 或 crack-tip shielding。只写“使用某方法研究某问题”不满足该功能。

## 3. M：相变、析出和形核长大

### 3.1 标准功能型顺序

1. 过程的重要性；
2. 已知终态与精确机制缺口；
3. 本文对象和关键方法；
4. 最早先导事件；
5. 中间结构或形核；
6. 生长、取向、界面或变体演化；
7. 完整机制和边界。

### 3.2 核心发现单链顺序

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

### 4.2 核心发现单链路由

先判断最高层级新发现位于哪里。

#### 组织形成规律主导

```text
性能瓶颈
→ 上游组织形成规律作为核心发现
→ 解析该规律的机制深度
→ 工艺如何建立中间变量
→ 中间变量如何产生目标组织
→ 定量性能
→ P1/P2 机制分工
→ 具体设计认识
```

核心句优先写成“上游变量引导目标组织形成”，避免停在“heterostructure improves strength and ductility”。

#### 性能组合主导

```text
应用需求与权衡
→ 设计实现综合性能作为核心发现
→ 解析综合性能的机制范围
→ 定量性能证明
→ P1 的来源
→ P2 的来源或通常代价受到抑制的原因
→ 两条支路汇合
→ 受边界约束的设计原则
```

存在综合指标时，用该指标统一主线。例如 fatigue strain 为 `σf/E` 时，后半分别解释疲劳强度提高和模量保持较低，再汇合到 fatigue strain。

### 4.3 空白骨架

```text
[Application/material class] requires [P1] together with [P2].
Conventional [route/microstructure] limits this combination because [physical bottleneck].
Here, we show that [upstream design or formation relation] enables/directs [integrated capability or target microstructure].
We further elucidate how [key feature] produces this outcome through [mechanism scope].
The material achieves [P1 value] and [P2 value] under [conditions], compared with [reference].
[P1] arises from [mechanism and evidence], whereas [P2 or retained property] is supported by [separate process].
Together, these effects [rejoin at the integrated metric or trade-off].
These findings identify [specific bounded design relation].
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

### 5.2 核心发现单链顺序

1. 相间或晶粒间变形影响宏观行为；
2. 精确缺口定位到某一屈服、载荷转移或不相容阶段；
3. 核心句提出“因素 A 改变/加速/抑制变形关系 B”；
4. 说明原位方法解析到 phase-specific yielding、stress partitioning 或 compatibility evolution；
5. 只保留发生变化的增量；
6. 已知承载路径作为从属基准；
7. 落到硬化、局部化或损伤的物理后果。

### 5.3 空白骨架

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

### 6.2 核心发现单链顺序

核心句优先提出一个受驱动力和尺度限定的关系，例如组织/环境因素怎样改变裂纹萌生、门槛或屏蔽。后续按裂纹阶段或驱动力区间推进，不按断口、曲线和显微镜分列。

### 6.3 空白骨架

```text
[Fatigue/fracture problem] limits [application], yet [specific crack-stage or driving-force relation] remains unresolved.
Here, we show that [factor] [changes] [crack process] under [essential condition].
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

### 7.2 核心发现单链顺序

1. 环境损伤的重要性；
2. 已知断裂结果 + 断裂前未知阶段；
3. 核心句提出环境因素首先改变的上位微观力学过程；
4. 方法句说明解析到局部变形、相间应力或裂纹时序；
5. 新增量沿“局部改变 → 不相容/局部化 → 损伤”推进；
6. HELP、HEDE 或氢化物机制只有在独立证据充分时进入摘要。

### 7.3 空白骨架

```text
[Material] is susceptible to [hydrogen/environmental degradation], yet how [environment] alters [specific pre-fracture stage] remains unresolved.
Here, we show that [environment] [accelerates/promotes/is associated with] [core local process].
Using [methods], we resolve how this effect develops through [mechanism scope].
[New stress/strain/damage increment].
[Independent local or hydrogen evidence] supports [bounded interpretation].
These results identify [early micromechanical consequence and boundary].
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

核心发现单链优先提取“组织演化 A 改变控速过程 B”的关系，再按温度/应力区间展开。

## 9. A：加工、增材和连接

### 标准功能型顺序

1. 制造问题或缺陷瓶颈；
2. 工艺变量；
3. 缺陷和组织；
4. 定量性能或各向异性；
5. 工艺—组织—性能连接；
6. 工艺窗口和可重复性。

核心发现单链优先选择“工艺建立中间变量，中间变量引导组织/缺陷演化”的上游关系。工艺步骤本身只有在它构成新路线时进入核心句。

## 10. Q：表征和方法

### 标准功能型顺序

1. 现有方法无法测量的具体量；
2. 新协议或算法；
3. 标定对象；
4. 精度、分辨率和不确定度；
5. 材料问题中的演示；
6. 适用边界。

方法论文通常保留标准功能型。只有协议形成单一能力关系且验证链完整时，才启用核心发现单链。

## 11. C：计算和模型

### 标准功能型顺序

1. 科学或预测问题；
2. 模型和关键假设；
3. 验证；
4. 变量依赖或机制解释；
5. 预测；
6. 敏感性和边界。

核心发现单链可围绕“模型揭示变量 A 控制趋势 B”展开，但 `controls` 仍需敏感性和替代变量检验。

## 12. R：综述

### 功能顺序

1. 范围和重要性；
2. 已有综述或研究重点；
3. 精确缺口；
4. 本文覆盖范围；
5. 定义或分类；
6. 关键对比和证据冲突；
7. 对预测、设计或研究方向的含义。

综述通常不启用核心发现单链。观点型综述具有一个得到文献证据支持的中心论点时，可以采用“中心论点先行”，但后续仍按分类和证据冲突展开。

## 13. 摘要专用输出诊断

当摘要精修模式为核心发现单链且输出为完整模式时，除精修稿、修改说明和作者确认项外，再输出：

- 一句话核心发现及证据等级；
- S1–Sn 句子功能映射；
- 每句回答的问题；
- 被删除、后移或降为从属成分的非增量信息；
- 摘要主线与正文证据的对应关系；
- 无法闭合但没有补写的机制环节。

## 14. 摘要自检

- [ ] 已选择标准功能型、核心发现单链或自动模式；
- [ ] 自动模式的选择理由可说明；
- [ ] S1–S3 已明确价值、缺口和唯一核心发现；
- [ ] 核心句没有被方法、数值和组织清单淹没；
- [ ] S4 点明机制解析深度；
- [ ] S3 之后每句均提供新增量；
- [ ] 已知行为只作为必要对照嵌入新发现；
- [ ] 所有比较带条件；
- [ ] 每个因果动词可在正文定位；
- [ ] 性能论文分别解释不同性能，并在权衡或综合指标处汇合；
- [ ] 机制论文按过程顺序而非设备顺序；
- [ ] 氢脆论文没有用断口单独指定机制；
- [ ] 倒数第二句有物理落点；
- [ ] 结尾给出具体认识和边界；
- [ ] 没有使用空泛的 remarkable、excellent、promising 代替证据。
