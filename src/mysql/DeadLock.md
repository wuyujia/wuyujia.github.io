---
title: MySQL死锁分析
index: true
---

## 背景
应用服务器抛出一段异常，如下：
``` log
Caused by: com.mysql.cj.jdbc.exceptions.MySQLTransactionRollbackException: Deadlock found when trying to get lock; try restarting transaction
        at com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:123) ~[mysql-connector-java-8.0.28.jar!/:8.0.28]
        at com.mysql.cj.jdbc.exceptions.SQLExceptionsMapping.translateException(SQLExceptionsMapping.java:122) ~[mysql-connector-java-8.0.28.jar!/:8.0.28]
        at com.mysql.cj.jdbc.ClientPreparedStatement.executeInternal(ClientPreparedStatement.java:953) ~[mysql-connector-java-8.0.28.jar!/:8.0.28]
        at com.mysql.cj.jdbc.ClientPreparedStatement.execute(ClientPreparedStatement.java:371) ~[mysql-connector-java-8.0.28.jar!/:8.0.28]
        at com.zaxxer.hikari.pool.ProxyPreparedStatement.execute(ProxyPreparedStatement.java:44) ~[HikariCP-3.4.1.jar!/:?]
        at com.zaxxer.hikari.pool.HikariProxyPreparedStatement.execute(HikariProxyPreparedStatement.java) ~[HikariCP-3.4.1.jar!/:?]
        at org.apache.ibatis.executor.statement.PreparedStatementHandler.update(PreparedStatementHandler.java:47) ~[mybatis-3.5.10.jar!/:3.5.10]
        at org.apache.ibatis.executor.statement.RoutingStatementHandler.update(RoutingStatementHandler.java:74) ~[mybatis-3.5.10.jar!/:3.5.10]
        at org.apache.ibatis.executor.SimpleExecutor.doUpdate(SimpleExecutor.java:50) ~[mybatis-3.5.10.jar!/:3.5.10]
        at org.apache.ibatis.executor.BaseExecutor.update(BaseExecutor.java:117) ~[mybatis-3.5.10.jar!/:3.5.10]
        at org.apache.ibatis.executor.CachingExecutor.update(CachingExecutor.java:76) ~[mybatis-3.5.10.jar!/:3.5.10]
        at org.apache.ibatis.session.defaults.DefaultSqlSession.update(DefaultSqlSession.java:194) ~[mybatis-3.5.10.jar!/:3.5.10]
        at sun.reflect.GeneratedMethodAccessor120.invoke(Unknown Source) ~[?:?]
        at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[?:1.8.0_201]
        at java.lang.reflect.Method.invoke(Method.java:498) ~[?:1.8.0_201]
        at org.mybatis.spring.SqlSessionTemplate$SqlSessionInterceptor.invoke(SqlSessionTemplate.java:427) ~[mybatis-spring-2.0.7.jar!/:2.0.7]
```

找出死锁的原因，才能正确解决问题

## 分析步骤
### 通过MySQL查询死锁
``` mysql

```