---
title: 面向对象编程
index: true
date: 2023-12-12
---

## 类之间的关系
在类之间，最常见的关系有
* 依赖（uses-a）：dependence
* 聚合（has-a）：aggregation
* 继承（is-a）：extend

UML表示关系符号
| 关系     | UML连接符(MD表示法) |
|----------|---------------------|
| 继承     | <\|--               |
| 接口实现 | <\|..               |
| 依赖     | <..                 |
| 聚合     | o--                 |
| 组合     | *--                 |
| 关联     | --                  |
| 直接关联 | <--                 |

图形表示
``` class
SuperClass <|-- Extend

Interface <|.. Implement

OtherObject <.. Object 

Order o-- Item
Order ..> Account
```
参考资料: [https://mermaid.js.org/syntax/classDiagram.html](https://mermaid.js.org/syntax/classDiagram.html)

