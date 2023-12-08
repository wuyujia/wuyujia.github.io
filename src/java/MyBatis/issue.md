---
title: 常见问题
index: true
date: 2023-12-08
---

## 常见问题

### TypeHandler不起作用
自定义类型处理器通过`@TableFiled`字段标注并配置属性`typeHandler`之后，在查询结果时，没有走TypeHandler，原因是没有开启结果映射，通过下面两种方式开启
1. 如果是通过在xml中书写sql，则一定要在xml配置结果映射，例如：
```xml
<resultMap type="BeanType" id="BeanId">
    <result column="f_prop" property="f_prop" javaType="BeanType"
                jdbcType="VARCHAR" typeHandler="TypeHandler"/>
</resultMap>      
```

2. 如果调用MyBatis原生方法，则可以通过在`@TableName`注解中开启`autoResultMap = true`配置来进行自动映射
::: info 提示
这种情况针对仅有少量字段定义结果处理器比较有效
:::

### 查询字段丢失问题
MyBatis-Plus与Sharding-JDBC结合使用后发现`select *`语句出现了字段丢失现象，还不清楚原因
解决办法：
补全`*`对应的字段
有关blog: [Mybatis中查询结果字段丢失的问题](https://blog.csdn.net/Cleverlove_/article/details/120165108)