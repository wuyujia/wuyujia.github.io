---
title: 慢查询分析与优化
index: true
---

## 开启并查找慢查询日志

背景：MySQL单节点负载过高，先不要盲目增加从节点来提升负载能力，应先进行SQL调优，保证单机性能的优化达到一个优秀的地步  

一、先确定是否开启慢查询日志，如果没有开启，则先开启慢查询日志记录
``` sql
show variables like ‘slow_query_log’;
```

``` text
mysql> show variables like 'slow_query_log';
+----------------+-------+
| Variable_name  | Value |
+----------------+-------+
| slow_query_log | ON    |
+----------------+-------+
1 row in set (0.01 sec)
```

二、查看慢查询时间阈值
```sql
show variables like 'long_query_time';
```

```text
mysql> show variables like 'long_query_time';
+-----------------+----------+
| Variable_name   | Value    |
+-----------------+----------+
| long_query_time | 1.000000 |
+-----------------+----------+
1 row in set (0.00 sec)
```

三、查看慢查询日志存储位置
```sql
show variables like 'slow_query_log_file';
```

```text
mysql> show variables like 'slow_query_log_file';
+---------------------+--------------------------+
| Variable_name       | Value                    |
+---------------------+--------------------------+
| slow_query_log_file | /data/xxx/logs/slow.log |
+---------------------+--------------------------+
1 row in set (0.00 sec)
```

::: info 提示
以上内容都可以通过`my.cnf`或者`set global`命令修改
:::

四、查询慢查询日志，取出其中的SQL进行分析优化
EXPLAIN {SQL}

## 慢查询分析优化

### EXPLAIN 结果解释
使用`Explain`关键字可以模拟优化器执行SQL查询语句，从而知道MySQL是如何处理你的SQL语句的。分析你的查询语句或是表结构的性能瓶颈。

通过`Explain`，我们可以分析出以下结果：
* 表的读取顺序
* 数据读取操作的类型
* 哪些索引可以使用
* 哪些索引被实际使用
* 表之间的引用
* 没张表有多少行被优化器查询

EXPLAIN + SQL语句
``` sql
EXPLAIN SELECT ...
```

执行计划包含的信息如下：

| id |select_type|table|partitions| type |possible_keys| key |key_len| ref | rows |filterd|Extra|
|----|-----------|-----|----------|------|-------------|-----|-------|-----|------|-------|-----|
|1	|SIMPLE	|t1	|	|range	|uniq_member_class_stage,idx_f_enroll_time	|idx_f_enroll_time	|6	|	|50806	|100.00	|Using index condition; Using MRR; Using temporary; Using filesort|
|1	|SIMPLE	|t2	|	|ref	|idx_member_id	|idx_member_id	|9	|tb_prod.t1.f_member_id	|2	|100.00	|Using where; Using join buffer (Batched Key Access)|
|1	|SIMPLE	|t3	|	|ref	|idx_member_id	|idx_member_id	|9	|tb_prod.t1.f_member_id	|2	|100.00	|Using where; Using join buffer (Batched Key Access)|

字段含义：
### 1. id

select 查询的序号，包含一串数字，表示查询中执行select字句或操作表的顺序

id的结果共有3种情况：
* id相同，执行顺序由上至下
* id==不同==，如果是子查询，id的序号会递增，id值越大优先级越高，越先被执行
* id有相同的也有不同的，同时存在时，id相同认为是一组，从上往下顺序执行，id不同的，值越大优先级越高

### 2. selec_type

常见和常用的值有以下几种：

|  id  |  select_type |                                             说明                              |
|------|--------------|-------------------------------------------------------------------------------|
|   1  | SIMPLE       |`简单的select查询`，查询中`不包含子查询或者union`                                    |
|   2  | PRIMARY      |查询中若`包含任何复杂的`子部分，`最外层查询则被标记为PRIMARY`                           |
|   3  | SUBQUERY     |`在SELECT或者WHERE列表中包含了子查询`                                               |
|   4  | DERIVED      |在FROM列表中包含的`子查询被标记为DERIVED`（衍生），MySQL会递归执行把这些子查询放在`临时表`中|
|   5  | UNION        |如果第二个SELECT出现在UNION之后，则标记为UNION，如果UNION出现在FROM子句的子查询中，标记为DERVIED|
|   6  | UNION RESULT |从UNION表获取结果的SELECT|


### 3. table

指的就是当前执行的表

### 4. type

type所显示的是查询使用了哪种类型，type包含的类型包括以下几种：

> system > const > eq_ref > ref > range > index > all

依次从左至右表示性能高低

一般来说，得保证查询至少达到range级别，最好能达到ref
* `system`表只有一行记录（等于系统表），这是const类型的特例，平时不会出现，可以忽略
* `const`表示通过索引一次就找打了，const用于比较primary key或者unique索引。因为只匹配一行数据，所以很快。如果将主键置于where列表中，MySQL就能将该查询转换为一个常量。
* `eq_ref`唯一性索引扫描，对于每个索引键，表中只有一条记录与之匹配。常见于主键或唯一索引扫描
* `ref`非唯一性索引扫描，返回匹配某个单独值的所有行，本质上也是一种索引访问，它返回所有匹配某个单独值的行，然而，它可能会找到多个符合条件的行，所以应该属于查找和扫描的混合体
* `range`只检索给定范围的行，使用一个索引来选择行，Key列显示使用了哪个索引，一般就是在where条件中出现between、>、<、in等的查询，这种范围扫描索引比全表扫描要好，它只需要开始于索引的某一点，而结束于另一点，不用扫描全部索引。
* `index`Full Index Scan，Index与All区别为index类型只遍历索引树。通常比ALL快，因为索引未见通常比数据文件小。（也就是说，虽然all和index都是读全表，但是index是从索引中读取的，而all是从硬盘读取的）
* `all`Full Table Scan 将便利全表以找到匹配的行

### 5. possible_keys 和 key

`possible_keys`显示可能应用在这张表中的索引，一个或多个。查询涉及到的字段上若存在索引，则该索引将被列出，**但不一定被查询实际使用**。

`key`实际使用的索引，如果为NULL，则没有使用索引（可能原因包括没有建立索引或索引失效）。若查询中使用了`覆盖索引`（select后要查询的字段刚好和创建的索引字段完全相同，无需回表），则该索引**仅出现在key列表中**。


### 6. key_len

表示索引中使用的字节数，通过该列计算查询中使用的索引长度，在`不损失精确性的情况下，长度越短越好`。key_len显示的值为索引字段的最大可能长度，并非实际使用长度，即key_len是根据表定义计算而得，而不是通过表内检索出的。

### 7. ref

显示索引的哪一列被使用了，如果可能的话，最好是一个常数。哪些列或常量被用于查找索引列上的值。

### 8. rows

根据表信息及索引选用情况，大致估算出找到所需的记录所需要读取的行数，越少越好

### 9. Extra

`包含不适合在其它列中显示但十分重要的额外信息`

#### 9.1. Using filesort（九死一生）

说明mysql会对数据使用一个外部的索引排序，而不是按照表内的索引顺序进行读取。MySQL中无法利用索引完成的排序操作称为“文件排序”。

#### 9.2. Using temporary（十死无生）

使用了临时表保存中间结果，MySQL在对查询结果排序时使用临时表。常见于排序order by和分组查询group by。

#### 9.3. Using index（发财了）

表示相应的select操作中使用了覆盖索引（Covering Index），避免了回表访问数据行，效率不错。如果同时出现了using where，表明索引被用来执行索引键值的查找，其它过滤条件需要回表查询；如果没有同时出现using where，表明索引用来读取而非执行查找动作。如果见到Using index condition，表示过滤条件在索引中就可以完成，无需回表。

::: info 什么是覆盖索引？
总的来说就是所有查询动作，条件过滤，排序等都无需回表，直接在索引树上就可以完成。

理解方式一：select的数据列只用从索引中就能够取得，不必读取数据行，MySQL可以利用索引返回select列表中的字段，而不必根据索引再次读取数据文件，换句话说`查询列要被建立的索引覆盖`。

理解方式二：索引的高效找到行的一个办法，但是一般数据库也能使用索引找到一个列的数据，因此不必读取整个行。毕竟索引叶子结点存储了它们索引的数据；当能通过读取索引就可以得到想要的数据，那就不需要读取行了。一个索引包含了（或覆盖）满足查询结果的数据就叫做覆盖索引。

注意：  
如果要使用覆盖索引，一定要注意select列表中只读取出需要的列，不可 select *，  
如果将所有字段一起做索引会导致索引文件过大，查询性能下降
:::

#### 9.4. Using where

表明使用了where过滤，可以理解为回表了

#### 9.5. Using join buffer

表明在查询返回结果，使用了临时缓存，比如在查询的时候，多表Join或者子查询数据量太大，就会出现。通过将配置文件中的缓冲区的join buffer调大一些，可以降低出现频次，但是缓冲区过大也会引起查询慢问题。

#### 9.6. impossible where

where 字句的值`总是false`，不能用来获取任何数据

#### 9.7. select tables optimized away

在没有GROUP BY子句的情况下，基于索引优化MIN/MAX操作或者对于MyLSAM存储引擎优化COUNT(*)操作，不必等到执行阶段再进行计算，查询执行计划生成的阶段即将完成优化。

#### 9.8. distinct

优化distinct操作，在找到第一匹配的元组后即停止同样值的动作

**所谓优化慢查询，就是要解决执行器在执行过程中的不利因素，为SQL执行创造有利条件，以此来达到优化SQL的目的。**
