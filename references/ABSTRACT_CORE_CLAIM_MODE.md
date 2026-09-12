# 摘要核心发现单链模式（v5 · 摘要单链扩展）

本模式用于把金属材料论文摘要重构为一条高度集中的科学推演链。其标定对象是高水平机制论文中反复出现的抽象组织方式：一句话交代价值，一句话限定精确缺口，一句话提出最高层级核心发现，随后逐句解释该发现为何成立、怎样展开以及产生什么后果。

本模式只迁移逻辑层级、句子功能和证据推进方式。不得复制任何参考论文的可识别词句、具体机制、取向关系或数据排列。

## 1. 启用条件

当出现以下任一情况时启用本模式：

- 用户选择“摘要精修模式：核心发现单链（Mo式逻辑）”；
- 用户要求“核心发现先行”“摘要更锋利”“像高水平 Acta 摘要一样层层递进”；
- 用户要求短文、快报或单一发现型摘要；
- 目标期刊为 Acta Materialia、Scripta Materialia 等，且全文能够提取一条主要科学关系；
- 现有摘要包含完整结果，但中心发现被方法、数值、组织清单或比较条件淹没。

以下情况仅做诊断，并退回标准功能型摘要：

- 原文存在两条以上彼此独立、无法归入同一上位命题的主线；
- 中心因果关系只有并列观察，没有时序、中间变量、受控比较或独立验证；
- 全文只提供性能数据，没有形成规律、机制或受条件约束的设计关系；
- 综述、数据库、方法验证或多案例论文的贡献天然需要平行分类；
- 用户只提供零散片段，无法确认摘要其他功能位是否已有正文支持。

## 2. 本模式的目标

完成重构后，摘要应满足四项核心要求：

1. 读者在第三句左右即可复述全文唯一的核心发现；
2. 第三句之后的每句话都增加新的科学信息，并服务于同一主张；
3. 每句话回答上一句话自然产生的问题，同时为下一句话建立必要前提；
4. 倒数第二句形成明确的物理落点，最后一句将认识提升一个层级并保留适用边界。

摘要的底层结构为：

```text
研究价值
→ 已知边界与精确缺口
→ 一句话核心发现
→ 机制解析深度
→ 关键证据或机制环节逐步展开
→ 定量后果或终态
→ 可迁移但受边界约束的认识
```

## 3. 核心发现句的提取

### 3.1 选择原则

先把实际提供的摘要、正文片段或 ledger 中的主张和证据组织成有向关系图，再选择最适合作为摘要核心的关系。只有摘要时，该图只代表摘要内部候选关系，不得声称等同于全文主线。候选关系应同时满足：

- 属于本文新增认识，不是领域常识；
- 位于证据链相对上游，能够统领尽可能多的结果；
- 能用一个主要谓语表达；
- 具有清楚的主体、作用关系和结果对象；
- 其动词强度不超过原文证据等级；
- 删除该句后，摘要会失去论文身份。

优先选择“最上游且得到证据闭合的新增关系”。性能结果本身可以成为核心主张；当全文已经建立更上游的组织形成规律或变形规律时，优先使用该规律统领性能后果。

### 3.2 合适的抽象层级

| 层级 | 典型表现 | 处理 |
|---|---|---|
| 过宽 | heterostructures improve mechanical properties | 缺少具体科学关系，继续向下收束 |
| 合适 | retained compositional modulation directs heterogeneous α precipitation | 能统领工艺、组织和性能，适合作为核心句 |
| 过细 | up-quenching dissolves primary α and leaves solute-rich regions of specific size | 属于形成细节，应后移到机制展开 |

性能类示例：

- `Spinodal β+α″ modulation enables high fatigue strain at low stiffness.`
- `Retained compositional modulation directs heterogeneous α precipitation.`

变形与环境损伤示例：

- `Hydrogen accelerates the loss of deformation compatibility between the B2 and FCC phases before fracture.`

这些句子仅示意抽象层级。实际措辞必须由作者原文和证据决定。

### 3.3 核心句的细节禁区

核心发现句通常不承载以下内容：

- 仪器、表征协议或计算软件；
- 多个具体数值、误差或测试参数；
- 完整工艺流程；
- 三项以上并列组织特征；
- 精确取向关系、晶面指数或阶段性尺寸；
- 多组文献基准；
- 机制链的全部中间步骤；
- 泛化应用愿景。

材料名称、关键相、关键作用因素和核心结果可保留，只要句子仍具有单一主干。

## 4. 前四句的功能契约

### S1：一句话建立研究价值

S1 只说明研究对象为何重要，通常采用：

```text
[Process/property] in [material or application] controls/affects [important consequence].
```

要求：

- 只保留与全文主线直接相关的价值；
- 不写两到三句通用领域背景；
- 不提前列方法、材料成分或全部性能指标；
- 性能类论文可在一句中定义目标性能组合。

### S2：已知边界加精确缺口

S2 应同时回答“已经知道到哪一步”和“知识链断在哪里”。常用功能为：

```text
Although [established endpoint or known behavior], how/why [specific missing relation] remains unclear.
```

缺口应具体到：

- 哪一先导事件；
- 哪一中间变量；
- 哪一形核、生长、载荷分配或损伤阶段；
- 哪一性能权衡的物理来源；
- 哪一尺度连接或证据类型。

避免使用 few studies、limited attention 或 remains poorly understood 代替具体缺口。

### S3：一句话提出最高层级核心发现

S3 是全文灵魂句，通常采用：

```text
Here, we show that [upstream factor/process] [evidence-calibrated verb] [core downstream phenomenon or capability].
```

动词按证据选择：

- `precedes`：具有可靠时序证据；
- `is associated with`：只有关联或共现；
- `promotes` / `contributes to`：有受控比较或可测贡献；
- `enables`：设计或组织使性能组合成为可能，因果排他性尚未完全建立；
- `accelerates`：存在清楚的演化速率、应变区间或阶段提前证据；
- `induces` / `leads to`：存在中间过程和独立验证；
- `governs`：主要替代解释已经处理。

S3 只回答“本文发现了什么”，不同时回答“用了什么方法”“具体数值是多少”和“全部机制是什么”。

### S4：声明机制解析深度

S4 回答“本文把 S3 解释到了什么层级”。它必须具有机制问题感，方法只能作为从属信息。

推荐功能：

```text
Using [essential methods], we elucidate how [upstream factor] produces [downstream phenomenon] through [mechanism scope].
```

或：

```text
We further reveal that [second-level mechanistic relation], which links [S3 factor] to [S3 outcome].
```

S4 可点名以下机制范围：

- clustering-assisted nucleation and growth；
- composition-dependent transformation pathways；
- phase-specific yielding and interphase load transfer；
- elastic response and cyclic-deformation accommodation；
- crack-tip shielding and intrinsic damage；
- diffusion, interface matching or rate-controlling processes。

S4 不应只写：

- `Using X, we systematically investigated Y.`
- `A series of experiments were conducted.`
- `The detailed microstructure was characterized.`

这些句子只说明工作量，没有说明解析深度。

## 5. S4 之后的增量链

S4 之后，每句话只闭合一个主要箭头。常见顺序为：

```text
A 为什么形成
→ A 改变了什么中间状态 C
→ C 怎样形成或改变 B
→ B 后续怎样生长、演化或影响性能
→ 定量终态或性能后果
```

### 5.1 M：相变、析出和形核长大

推荐顺序：

```text
先导事件的来源
→ 局部化学/结构/能量变化
→ 胚胎或新相形成
→ 生长中的界面、取向或变体变化
→ 终态与适用边界
```

每一句应使时间顺序、因果顺序和尺度顺序尽量一致。

### 5.2 P：性能设计与性能权衡

性能类论文启用本模式时，先寻找最上游的新关系，再安排性能数据。

#### 路径 A：组织形成规律是主要新发现

```text
性能瓶颈
→ 上游形成规律
→ 机制解析深度
→ 目标组织怎样形成
→ 定量性能
→ 各性能来源
→ 权衡缓解的共同条件
```

例如，组织形成规律可以是“成分调制引导异质析出”，随后再展开工艺、粗细组织、强度和塑性。

#### 路径 B：性能组合是主要新发现

```text
性能需求与权衡
→ 设计实现综合性能
→ 机制解析深度
→ 定量性能证明
→ P1 的来源
→ P2 的来源或通常代价受到抑制的原因
→ 两条支路重新汇合
```

综合指标可作为主轴。例如：

```text
εf = σf / E
```

摘要后半段分别解释分子为何提高、分母为何保持较低，再汇合到高 fatigue strain。公式只在原文已经定义并适合目标期刊时保留。

### 5.3 D/E：变形、载荷分配和环境损伤

推荐顺序：

```text
正常承载路径作为必要基准
→ 环境或设计因素首先改变的阶段
→ 应力/应变失配的演化
→ 变形异质性或损伤局部化
→ 断裂前的物理落点
```

领域常识或正常基准不得单独占据核心结果句。若基准本身没有新增量，应作为从句或对照嵌入包含新发现的句子：

```text
Hydrogen preserves [baseline pathway] yet accelerates [newly observed change].
```

### 5.4 F：疲劳和断裂

推荐顺序：

```text
明确驱动力和裂纹尺度
→ 关键速率或门槛差异
→ 内禀阻力与外禀屏蔽的变化
→ 裂纹萌生/短裂纹/长裂纹阶段
→ 寿命或损伤容限后果
```

不得用一个断口观察同时解释裂纹萌生、扩展和最终失稳。

## 6. 新信息门

S3 之后的每一句都必须通过以下检查：

1. 该句是否提供本文新增信息；
2. 该句是否直接证明或解释 S3；
3. 该句是否回答上一句产生的问题；
4. 删除该句后，主线中的某个箭头是否会断裂；
5. 该句是否只重复领域常识、方法事实或已给结论。

第 1–4 项均不能满足时，删除、压缩或后移该句。

已知行为只在以下情况下保留：

- 它是判断本文变化的必要参照；
- 它与新发现形成受控对比；
- 它被压缩为从属成分，不占用独立结果句。

## 7. 问题接力检查

完成初稿后，为每句话写出它回答的问题：

| 句子 | 应回答的问题 |
|---|---|
| S1 | 为什么研究这个过程或性能？ |
| S2 | 已知到哪一步，缺少哪一环？ |
| S3 | 本文最重要的新答案是什么？ |
| S4 | 作者把这个答案解释到了什么机制深度？ |
| S5 | 核心因素 A 为什么出现或怎样被建立？ |
| S6 | A 改变了哪个中间状态？ |
| S7 | 中间状态怎样产生目标过程或性能？ |
| S8 | 后续演化、定量后果或终态是什么？ |
| 末句 | 这条证据链带来哪一项受边界约束的新认识？ |

若相邻两句回答同一个问题，合并或删除重复句。若某句话无法说明它回答什么问题，通常说明主线出现旁支。

## 8. 显微观察的机制凝练

多项观察进入摘要前，先完成：

```text
直接观察
→ 共同支持的上位机制
→ 与核心性能或过程的连接
```

例如：

```text
dislocation shearing of nanoscale α″
+ strain transfer across coherent β/α″ interfaces
→ cooperative β/α″ deformation
→ high fatigue resistance
```

摘要优先保留“观察 + 上位机制 + 后果”中的必要部分。若应变传递仅由形貌推断，应使用 `consistent with` 或 `suggests`，不得写成直接观测。

## 9. 倒数第二句的物理落点

倒数第二句不得停在以下位置：

- 峰宽增加；
- 位错被观察到；
- 出现局部应变；
- 组织更加细小；
- 某变量变化更快。

它应继续落到由证据支持的物理结果，例如：

- cooperative interphase deformation；
- earlier loss of deformation compatibility；
- sustained strain hardening；
- reduced crack-driving force；
- accelerated damage localization；
- fatigue strengthening with a limited stiffness penalty。

物理落点的强度仍受 L0–L7 证据等级约束。

## 10. 最后一句的提升规则

最后一句将当前材料中的结果提升一个抽象层级，同时保留必要条件。

推荐结构：

```text
These findings identify [specific physical variable or microstructural relation] as [bounded route/principle] for [target process or property] in [applicable material class or conditions].
```

最后一句应具体说明新认识，避免只写：

- provide a new strategy；
- pave the way；
- offer broad prospects；
- benefit future alloy design；
- provide new insight。

若正文只支持当前材料和条件，最后一句停留在当前体系，不进行跨体系推广。

## 11. 句数和长度

在目标期刊未给出更严格限制时：

- Acta 类全长文：通常 7–10 句，约 160–240 词；
- Scripta 类短文：通常 5–7 句，约 120–180 词；
- Nature Communications：≤150 词并执行跨学科受众适配；
- Science 系：≤125 词，只保留唯一主链和最强证据。

句数是压缩提示，不是机械要求。科学链条完整性和证据边界优先。

## 12. 专用输出

当“摘要精修模式”为核心发现单链且输出模式为完整模式时，输出：

### 一、精修摘要

单段、可直接使用。

### 二、一句话核心发现

单独给出 S3，并说明其证据等级。

### 三、句子功能映射

逐句标注 S1–Sn 的功能和它回答的问题。

### 四、新信息审计

列出：

- 被删除或降为从属成分的领域常识；
- 被后移的数值、方法和组织细节；
- 原文中未能服务主线的旁支；
- 摘要仍缺失但没有补写的机制环节。

### 五、证据边界

列出核心动词、对应证据和最高允许强度。存在不能确认的关系时进入“需作者确认的问题”。

仅精修稿模式只输出摘要，不显示诊断。

## 13. 失败模式

| 失败模式 | 表现 | 修正方向 |
|---|---|---|
| 核心句过载 | S3 同时包含方法、工艺、数值、组织清单和文献比较 | 只保留一个上位关系，细节后移 |
| 核心句过宽 | improves properties、enhances performance | 提取具体上游因素和下游过程 |
| S4 缺少机制 | Using X, we investigated Y | 点明解析的机制范围或第二层关系 |
| 结果段复述常识 | 单独写正常载荷分配或传统析出行为 | 压缩为新发现句中的基准从句 |
| 观察并列 | TEM、XRD、DFT 各占一句且彼此不连接 | 按科学箭头重排，理论紧跟被解释观察 |
| 无物理落点 | 以位错、峰宽或局部应变观察结束 | 凝练共同机制并连接核心结果 |
| 结尾空泛 | would provide a new strategy | 写明具体变量、作用关系和适用边界 |
| 假单链 | 将并列结果强行写成 A→B→C | 退回标准功能型摘要并报告缺口 |

## 14. 最终检查

- [ ] S1 只有一项研究价值；
- [ ] S2 明确已知边界和精确缺口；
- [ ] S3 只有一个主要谓语，没有方法、数值和细节堆叠；
- [ ] S3 属于本文新增认识，并能覆盖摘要后半的大部分证据；
- [ ] S4 点明机制解析深度，没有退化为方法清单；
- [ ] S3 之后每句均包含新信息；
- [ ] 每句回答上一句产生的问题；
- [ ] 已知行为只作为必要基准嵌入新发现；
- [ ] 性能类分别解释各性能，并在综合指标或权衡处重新汇合；
- [ ] 倒数第二句具有物理落点；
- [ ] 最后一句提升一个层级并保留边界；
- [ ] 在正文或 ledger 已提供时，所有因果动词可映射到对应证据；只有摘要时该项进入 `not_checked`，不得假装通过；
- [ ] 没有复制标定论文的可识别词句或具体机制结构。
