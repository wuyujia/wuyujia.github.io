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

## SQL查询具有树结构的数据
建表语句
``` sql
CREATE TABLE `t_tree` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT '名称',
  `parent_id` int(11) NOT NULL COMMENT '父节点',
  PRIMARY KEY (`id`)
) COMMENT='树结构存储';


INSERT INTO t_tree VALUES
(1, '根节点', 0),
(2, '结点2', 1),
(3, '结点3', 1),
(4, '结点4', 3),
(5, '结点5', 4),
(6, '结点6', 2),
(7, '结点7', 3),
(8, '结点8', 7);
```
### 查找根节点
parent_id 一定小于id, 查询时需要先将数据逆序过来，让叶子结点出现在前面，才能正确的找到根节点  

查询语句, 小数据量时可以减少递归查询次数, 大数据量还是递归查询比较适合
``` sql
SELECT
	name,
	parent_id,
	id,
	@id := parent_id 
FROM
	( SELECT name, parent_id, id, @id := 8 FROM t_tree ORDER BY id DESC ) reverse 
WHERE
	id = @id;
```

### 查找所有子节点
parent_id 一定小于id，直接正向查找能找到所有的子节点

``` sql
SELECT @id:=(CONCAT(@id, ',', i.id)), i.name, i.parent_id, i.id
FROM t_tree i
JOIN (
    SELECT @id := 3
) t
WHERE FIND_IN_SET(i.parent_id, @id);
```