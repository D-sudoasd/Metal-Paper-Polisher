# 材料与断裂力学论文精修工具包 v3

公开仓库：[https://github.com/D-sudoasd/materials-fracture-academic-polisher](https://github.com/D-sudoasd/materials-fracture-academic-polisher)

本工具包用于金属材料、物理冶金、组织演化、析出与相变、变形与损伤、疲劳与断裂力学论文的中英文精修。

v3 在 v2 的科学保护与句段规则之上，增加**全文逻辑架构层**：在原文已经建立的逻辑关系之内，把故事收成一条可追踪的主线。机制类论文按因果过程链组织；疲劳断裂类按受控驱动力对照组织。工具包不发明因果链，不补写缺失的机制环节，不复刻任何单篇论文的词句或内容结构。

句级语言标定仍来自 Robert O. Ritchie 1973–1999 年代表性摘要的抽象特征。架构层吸收的是可迁移的故事形态（动机金字塔、主线提前、结果轨迹、继承衔接、理论紧跟观察、讨论升维），不是任何一篇 Acta 或综述的情节。

## 取回本机

```bash
git clone https://github.com/D-sudoasd/materials-fracture-academic-polisher.git
```

或在仓库页点击 **Code → Download ZIP**。

## 文件说明

- `SKILL.md`：完整技能说明（v3）。
- `references/ARCHITECTURE_RULES.md`：七条架构规则、安全门、失败模式。
- `references/PAPER_TYPE_ROUTING.md`：机制 / 疲劳 / 工艺–性能 / 方法 / 综述的路由。
- `references/PROMPT_FULL.md`：完整版提示词。
- `references/PROMPT_COMPACT.md`：日常精简版提示词。
- `references/INPUT_TEMPLATE.md`：每次提交的输入模板。
- `references/CORPUS_STYLE_NOTES.md`：句级语料特征。
- `references/QUALITY_CHECKLIST.md`：输出核查表（含架构项）。
- `CHANGELOG_FROM_V2.md`：相对 v2 的保留与新增。

## 推荐使用方式

首次使用将 `SKILL.md` 作为固定技能保存。每次润色填写 `references/INPUT_TEMPLATE.md`。

- 只改语法与术语：轻度，架构干预 = 关闭。
- 段内逻辑变清楚，但先不动全文顺序：中度，架构干预 = 仅诊断。
- 要把摘要–引言–结果–讨论收成一条主线：深度 + 架构干预 = 在原文因果链内重排；若需要跨段移动，显式允许跨段重排。
- 用户说“学那篇论文的逻辑结构 / 主线 / 故事组织”：打开架构层，但只提取原文已有的链。

## 默认设置

- 中文转英文：深度学术重写；段内可显式化主线；默认仍不允许跨段重排。
- 已有英文稿：中度逻辑与语言优化 + 架构仅诊断。
- 输出：精修稿、实质性修改说明、需作者确认的问题、逻辑架构诊断（中度及以上）。
- 拼写体系：保持原文；无法判断时使用美式英语。

## 使用边界

本工具只调整表达、信息组织和**原文已有逻辑关系的可见性**。它不得补充实验事实、数据、文献、机制步骤、统计显著性、未测量的进度条指标，或把并列观察改写成必然因果序列。原文缺环时，保留可确定部分，并列入“需作者确认的问题”。
