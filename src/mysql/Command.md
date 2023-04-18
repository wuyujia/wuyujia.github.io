---
title: MySQL命令收集
index: true
---

## 数据库信息查询
### 数据库所有表信息查询
``` mysql
SELECT * FROM information_schema.`TABLES` WHERE table_schema = '数据库名称';
```

### 查询数据库表结构
``` mysql
SELECT * FROM information_schema.`COLUMNS` WHERE table_name = '表名称'
```
- 可以查询表字段
- 可以查询字段在那些表中