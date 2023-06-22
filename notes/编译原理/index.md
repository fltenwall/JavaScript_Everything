#### ast 三方包

`acorn`将字符串代码生成ast

`acorn-walk`遍历acorn生成的ast


`esprima`将字符串代码生成ast

`estraverse` 遍历esprima生成的ast

`escodegen`生成代码

#### 如何理解 AST实现 和编译原理

`ast explorer`查看js代码转化为`ast`的结构。 [astexplorer](https://astexplorer.net/)

分词：

1. 明确需要分析哪些token类型：关键字、变量名、运算符、结束符号
2. 状态机：消费每一个源代码中的字符，对字符意义进行状态机判断

分词过程中，可以使用一个栈`context`表达一个上下文

语法分析：AST 封装及错误抛出

