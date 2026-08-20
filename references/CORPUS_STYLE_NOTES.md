# 代表性语料与可迁移语言特征

## 一、语料范围

本工具采用 1973—1999 年间八篇代表性论文摘要进行标定。选择覆盖实验研究、综述、理论—实验联系、金属、陶瓷以及延性—脆性材料比较。

| 年份 | 论文 | 类型 | 用于标定的主要特征 |
|---|---|---|---|
| 1973 | R. O. Ritchie and J. F. Knott, *Mechanisms of fatigue crack growth in low alloy steel* | 实验研究 | 材料与状态先行；明确比较；相反趋势；结果后接机制归因；结尾推广到更广材料范围。DOI: 10.1016/0001-6160(73)90073-4 |
| 1979 | R. O. Ritchie, *Near-threshold fatigue-crack propagation in steels* | 综述 | 已有研究—具体缺口—定量范围—影响因素—解释路径—跨材料对比。DOI: 10.1179/imtr.1979.24.1.205 |
| 1984 | S. Suresh and R. O. Ritchie, *Propagation of short fatigue cracks* | 综述 | 平行判据定义；短裂纹与长裂纹在相同名义驱动力下比较；工程寿命后果。DOI: 10.1179/imtr.1984.29.1.445 |
| 1985 | R. O. Ritchie and A. W. Thompson, *On macroscopic and microscopic analyses for crack initiation and crack growth toughness in ductile alloys* | 理论与综述 | 宏观与微观尺度连接；静止与扩展裂纹对比；由局部机制推至宏观韧性参数。DOI: 10.1007/BF02815305 |
| 1988 | R. O. Ritchie, *Mechanisms of fatigue crack propagation in metals, ceramics and composites: Role of crack tip shielding* | 机制综述 | 先定义总概念，再按物理来源分类；给出材料实例；同时呈现增韧作用及其适用限制。DOI: 10.1016/0025-5416(88)90547-2 |
| 1991 | R. O. Ritchie and R. H. Dauskardt, *Cyclic fatigue of ceramics: A fracture mechanics approach to subcritical crack growth and life prediction* | 综述 | 多材料数据并列；长裂纹与小裂纹、循环与准静态加载对比；以寿命预测和损伤容限收束。DOI: 10.2109/jcersj.99.1047 |
| 1997 | C. J. Gilbert and R. O. Ritchie, *Mechanisms of cyclic fatigue-crack propagation in a fine-grained alumina ceramic: The role of crack closure* | 实验与机制 | 研究对象和变量明确；阈值与驱动力依赖定量化；控制变量实验；解释与结论紧邻证据。DOI: 10.1111/j.1460-2695.1997.tb01502.x |
| 1999 | R. O. Ritchie, *Mechanisms of fatigue-crack propagation in ductile and brittle solids* | 综合综述 | 将裂纹扩展表述为裂尖前方内禀机制与裂纹尾部外禀屏蔽机制的竞争；由机制差异解释载荷比和裂纹尺寸效应；连接寿命预测。DOI: 10.1023/A:1018655917051 |

## 二、跨时期稳定特征

### 1. 摘要以科学对象和问题为主语

材料、裂纹、加载状态、机制或力学量通常占据主题位置。作者身份很少成为叙述中心。

### 2. 比较条件被写入命题内部

差异经常与给定应力强度、载荷比、裂纹尺寸、温度、材料状态或取向同时出现。比较词不脱离条件单独使用。

### 3. 结果、解释和工程含义按强度递进

先给观察或趋势，再通过 attributed to、rationalized in terms of、is consistent with 等措辞给出解释，最后在原文提供依据时连接到寿命预测、损伤容限或结构应用。

### 4. 平行结构用于分类

短裂纹定义、屏蔽来源、材料类别和影响因素采用相同语法骨架，使多个判据能够直接比较。

### 5. 长句具有单一中心命题

长句常同时容纳条件、对比和范围，但核心判断清楚。句末承担最重要的新信息或后果。

### 6. 专业名词短语密集，核心动词普通

技术密度来自 crack-tip shielding、stress-intensity range、microvoid coalescence、damage-tolerant design 等稳定术语。核心谓语多为 examine、show、find、attribute、compare、discuss。

### 7. 对比承担解释功能

对比常用于揭示同一机制在不同尺度或材料中的作用差异，例如长裂纹与小裂纹、循环加载与准静态加载、延性与脆性固体、裂纹萌生与稳定扩展。

### 8. 结尾具有边界意识

摘要末句常给出结构应用或寿命预测含义，同时保留材料类别、裂纹尺度、加载状态或机制适用范围。

## 三、不能直接迁移的内容

- 单篇综述的“研究领域—空白—本文范围”结构不能用于所有结果段；
- 具体裂纹分类、屏蔽机制分类和术语序列属于论文内容，不能作为通用模板直接复制；
- 共同作者、期刊编辑和时代写作规范均会影响摘要措辞，因此只能提取跨论文反复出现的特征；
- 1970—1990 年代部分排版和拼写习惯不宜机械保留，应服从当前目标期刊规范；
- 高密度长句不代表句子越长越好，中心命题和修饰关系仍是判断标准。

## 四、与 v3 架构层的边界

本文件只标定**句段层**语言特征。全文故事形态（动机金字塔、主线提前、过程轨迹、继承衔接、理论紧跟观察、讨论升维）见 `ARCHITECTURE_RULES.md` 与 `PAPER_TYPE_ROUTING.md`。

不要把本节八篇摘要的内容结构当作所有论文的骨架：

- 综述型 field–gap–scope 不能用作实验结果段；
- 裂尖屏蔽分类、短裂纹判据、延性/脆性对照属于疲劳断裂内容，不能写入析出或相变论文；
- 机制/析出/相变论文启用因果过程链，但该链必须来自作者原文，不能从任何范文“借情节”。

架构层吸收的是抽象组织方式，不是第二套可复制的词句库。任何范文中的取向关系写法、口号式优先权声明、具体机制步骤均不得进入精修稿。
