---
title: 读写分离之Sharding-JDBC
index: true
---

::: info
这是SpringBoot版本
:::

## 1. 下载 JDBC
```xml
<!-- https://mvnrepository.com/artifact/org.apache.shardingsphere/sharding-jdbc-spring-boot-starter -->
<dependency>
    <groupId>org.apache.shardingsphere</groupId>
    <artifactId>sharding-jdbc-spring-boot-starter</artifactId>
    <version>4.1.1</version>
</dependency>

```

## 2. 配置 JDBC
```
# Sharding-JDBC 数据源配置
spring.shardingsphere.datasource.names=master,slave
# 主
spring.shardingsphere.datasource.master.type=com.zaxxer.hikari.HikariDataSource
spring.shardingsphere.datasource.master.driver-class-name=com.mysql.jdbc.Driver
spring.shardingsphere.datasource.master.jdbc-url=jdbc:mysql://localhost:3306/test?characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai
spring.shardingsphere.datasource.master.username=test
spring.shardingsphere.datasource.master.password=test
# 从
spring.shardingsphere.datasource.slave.type=com.zaxxer.hikari.HikariDataSource
spring.shardingsphere.datasource.slave.driver-class-name=com.mysql.jdbc.Driver
spring.shardingsphere.datasource.slave.jdbc-url=jdbc:mysql://localhost:3307/test?characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai
spring.shardingsphere.datasource.slave.username=test
spring.shardingsphere.datasource.slave.password=test

# Sharding-JDBC 属性及规则配置
spring.shardingsphere.props.sql-show=false
spring.shardingsphere.rules.readwrite-splitting.data-sources.readwrite_ds.type=Static
spring.shardingsphere.rules.readwrite-splitting.data-sources.readwrite_ds.props.write-data-source-name=master
spring.shardingsphere.rules.readwrite-splitting.data-sources.readwrite_ds.props.read-data-source-names=slave
spring.shardingsphere.rules.readwrite-splitting.data-sources.readwrite_ds.load-balancer-name=round_robin
spring.shardingsphere.rules.readwrite-splitting.load-balancers.round_robin.type=ROUND_ROBIN
```

## 3. 运行程序
直接启动即可

## 4. 遇到的问题
1. 各种类型转换异常：通过升级版本解决的，升级以前4.1.1版本，升级后5.1.0版本，两个版本对应的配置文件还不一样，折腾了很久，配置问题，参考如下：
官方配置参考：[URL](https://github.com/apache/shardingsphere/blob/5.1.0/examples/shardingsphere-jdbc-example/single-feature-example/readwrite-splitting-example/readwrite-splitting-spring-boot-mybatis-example/src/main/resources/application-readwrite-splitting.properties)