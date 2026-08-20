# Results 与 Discussion 的第一性原理分工（v4）

## 1. 核心命题

Results 回答：**当前证据直接建立了什么。**

Discussion 回答：**这些证据合起来支持什么解释，该解释为什么可信，以及在什么条件下成立。**

章节边界由“结论离原始数据的距离”决定，不由是否出现因果词决定。

## 2. 从数据到认识的层级

```text
原始数据
  ↓
直接观察或测量
  ↓
定量关系和受控比较
  ↓
证据相邻的局部判断
  ↓
跨图、跨尺度的综合解释
  ↓
完整机制
  ↓
适用边界和推广
```

| 层级 | 典型问题 | 常见位置 |
|---|---|---|
| 数据 | 仪器、曲线、图像给出什么 | Results |
| 观察 | 看到了什么、测到了什么 | Results |
| 关系 | 如何随条件变化、谁先发生 | Results |
| 局部判断 | 当前证据支持的最近结论是什么 | Results 末段或合并章节 |
| 综合解释 | 多组结果如何连接 | Discussion |
| 完整机制 | A 通过 C、D、E 导致 B | Discussion |
| 边界 | 机制在哪些条件下成立 | Discussion |

## 3. Results 的任务

Results 建立一条读者能够从图表直接核查的证据链。

### 3.1 Results 应包含

1. 材料、状态、条件和比较基准；
2. 直接观察、测量值和统计结果；
3. 定量趋势和组间差异；
4. 时间、空间、应变、温度、循环或驱动力顺序；
5. 新获得的计算输出；
6. 与当前数据紧邻的局部结论；
7. 必要的客观归纳和下一问题。

### 3.2 Results 可以包含因果判断的条件

因果判断可以出现在 Results，前提是数据本身已经直接支持该局部因果。常见支持组合：

- A 被有意改变，B 在其他条件可比时发生系统变化；
- A 先于 B 出现；
- 中间变量 C 被直接测量；
- 改变或抑制 A 后，B 相应改变；
- 观察、计算或模型对同一局部过程相互验证；
- 主要混杂变量得到控制或定量处理。

允许的 Results 结论示例：

- `The departure of the α-phase lattice strain from linearity was followed by a steeper increase in the β-phase lattice strain, indicating load transfer from α to β.`
- `The solute-rich region preceded the appearance of the new phase and locally adopted a lattice geometry approaching that phase.`

这类句子仍应限定为当前相、当前应变区间、当前样品或当前实验条件。

### 3.3 Results 不宜承担

- 需要多幅图和文献才能成立的完整机制；
- 主要替代解释的系统比较；
- 跨材料、跨成分或跨服役条件的推广；
- 仅由断口、峰宽、强度提高或同步变化推断的唯一机制；
- 对作者未直接测量的中间变量作确定归因；
- 大段重复方法和领域背景。

### 3.4 Results 的停止点

Results 应写到：

> 当前单项证据组能够直接支持的最强局部结论。

超过该位置仍需联合多组证据时，转入 Discussion。

## 4. Discussion 的任务

Discussion 将证据链整合为机制链、性能链或损伤链。

### 4.1 Discussion 应回答

1. 为什么观察到该结果；
2. 哪些中间过程连接起点和终点；
3. 不同尺度的证据是否相互一致；
4. 定量模型是否支持解释；
5. 哪些替代解释仍可能成立；
6. 当前证据为何更支持某一解释；
7. 组织怎样影响变形、损伤或性能；
8. 结论受哪些成分、组织、温度、应变率、环境或尺寸限制；
9. 哪些方面仍缺证据。

### 4.2 Discussion 的基本段落结构

```text
需要解释的核心结果
→ 支撑该结果的多类证据
→ 中间物理过程
→ 定量或理论检验
→ 替代解释与证据边界
→ 局部结论及适用范围
```

### 4.3 Discussion 不宜承担

- 首次报告关键实验结果；
- 首次给出决定摘要主张的唯一证据；
- 无条件重述 Results 中全部数值；
- 为显得全面而补充原文没有的争议机制；
- 把合理推断写成已经证明的唯一机制；
- 用文献替代本文缺失的关键中间证据。

## 5. 因果关系究竟在哪里建立

因果关系可以分阶段建立：

### 5.1 Results 建立局部因果

例如：

```text
α 相开始塑性响应
→ β 相晶格应变斜率增加
→ 相间载荷重新分配
```

如果这些变化由同一原位实验和明确时间顺序直接支持，Results 可写出局部载荷转移判断。

### 5.2 Discussion 建立完整机制

Discussion 继续回答：

- α 相为什么先屈服；
- 成分或组织怎样改变两相强度差；
- 载荷转移如何改变加工硬化；
- 织构、相分数和弹性各向异性是否提供替代解释；
- 该过程如何连接到局部应变和断裂。

因此：

```text
Results：闭合局部证据环节
Discussion：闭合跨环节机制链
```

## 6. 一句话归属判据

对每个句子依次提问：

1. 读者只看当前图表能否核查该句？
2. 该句是否需要联合其他图、模型或文献？
3. 该句是否解释了未直接测量的中间过程？
4. 该句是否评价替代机制？
5. 该句是否推广到其他材料或条件？

判断：

- 第 1 题为“能”，其余多为“否”：Results；
- 第 1 题为“不能”，第 2–5 题任一为“是”：Discussion；
- 介于两者之间：Results 先给局部、保守判断，Discussion 再给综合解释。

## 7. Results 段落模板

### 7.1 初始状态段

```text
[材料/状态] consisted of [phase or microstructural state].
[Quantitative baseline] was measured as [value].
No [target feature] was detected under [method/resolution].
This state therefore provides the reference for the subsequent [process/comparison].
```

最后一句只建立参照，不提前写机制。

### 7.2 变化段

```text
Under [condition], [feature] changed from X to Y relative to [reference].
This change was accompanied by [directly observed feature].
[Local conclusion supported by the same evidence].
```

### 7.3 原位变形段

```text
The [phase/grain-family] lattice strain remained approximately linear up to [condition].
Beyond this point, [specific deviation] occurred, followed by [response in another phase].
The sequential change indicates [local load-transfer or transformation judgment], within [strain/stress range].
```

### 7.4 性能结果段

```text
The designed condition achieved [metric and value] under [test condition], compared with [reference].
The improvement was reproduced across [number/range], where supplied.
[Additional metric] remained [value], establishing the targeted property combination.
```

性能来源留到后续机制证据或 Discussion。

## 8. Discussion 段落模板

### 8.1 单一机制箭头

```text
The key result requiring explanation is [result].
[Evidence 1] and [evidence 2] jointly indicate [intermediate process].
This process can account for [quantitative or directional consequence] because [physical basis].
[Alternative explanation] would require [different observation], which was [not observed / not evaluated].
The present evidence therefore supports [calibrated local mechanism] under [conditions].
```

### 8.2 性能协同

```text
The increase in [P1] is associated with [mechanism and evidence].
The retention or increase in [P2] arises from a separate response, namely [mechanism and evidence].
Their coexistence is enabled by [common microstructural condition], which [physical function].
The contribution of [confounding variable] cannot be isolated from the current data and therefore limits the attribution.
```

### 8.3 氢脆机制评估

```text
Hydrogen primarily altered [damage stage], as indicated by [time/spatial evidence].
The observed [local deformation/interface response] is consistent with [mechanism class].
Direct identification of [HELP/HEDE/hydride mechanism] additionally requires [missing evidence].
The present results therefore support [bounded conclusion] without uniquely assigning the entire failure process to [strong mechanism].
```

## 9. 合并的 Results and Discussion

期刊采用合并章节时，每个小节内部保持功能顺序：

1. 直接结果；
2. 定量比较；
3. 数据支持的局部判断；
4. 跨证据解释；
5. 条件和边界；
6. 下一小节的问题。

推荐段落分工：

- 第 1 段：Results；
- 第 2 段：Results + 局部判断；
- 第 3 段：Discussion；
- 小节末句：局部结论或下一问题。

## 10. 常见错误及修正

| 错误 | 表现 | 修正 |
|---|---|---|
| Results 只有图像描述 | 缺少定量关系和局部结论 | 补充原文已有数值和客观归纳 |
| Results 过度解释 | 每段都以 governed 结束 | 降级到 evidence-proximal judgment |
| Discussion 复述 | 重新列出全部数值 | 选择关键结果，整合多证据 |
| Discussion 新增核心证据 | 关键数据首次在讨论出现 | 前移到 Results，若原文结构允许 |
| 因果一刀切 | 认为 Results 不能有因果 | 依据实验设计和证据距离判断 |
| 机制仅靠文献 | 本文无中间证据 | 限定为 interpretation consistent with literature |
| 先结论后证据 | 强机制句在段首，数据在段末 | 调整为证据 → 判断 → 解释 |

## 11. Results–Discussion 审计输出

完整审计包含：

- 当前每段的功能；
- 应保留在 Results 的句子；
- 应移动到 Discussion 的句子；
- Results 中缺少的基准或定量关系；
- Discussion 中缺少的中间箭头；
- 重复内容；
- 过强因果；
- 推荐小节顺序；
- 不能由现有证据解决的问题。
