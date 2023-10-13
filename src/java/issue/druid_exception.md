---
title: Druid数据源异常问题汇总
index: true
---

## java.sql.SQLException: statement is closed
### 产生背景
这个问题的产生来自于【XH】项目  
项目本身为单体项目，采用Tomcat部署，使用数据源Druid版本为`1.1.23`  
线上服务正常启动一段时间后，会偶尔出现 `java.sql.SQLException: statement is closed` 错误  
这个错误经过Debug排查来自于以下位置:
::: tabs

@tab ErrorMessage

``` log
### Cause: java.sql.SQLException: statement is closed
; uncategorized SQLException for SQL []; SQL state [null]; error code [0]; statement is closed; nested exception is java.sql.SQLException: statement is closed
	at org.springframework.jdbc.support.AbstractFallbackSQLExceptionTranslator.translate(AbstractFallbackSQLExceptionTranslator.java:84)
	at org.springframework.jdbc.support.AbstractFallbackSQLExceptionTranslator.translate(AbstractFallbackSQLExceptionTranslator.java:81)
	at org.springframework.jdbc.support.AbstractFallbackSQLExceptionTranslator.translate(AbstractFallbackSQLExceptionTranslator.java:81)
	at org.mybatis.spring.MyBatisExceptionTranslator.translateExceptionIfPossible(MyBatisExceptionTranslator.java:88)
	at org.mybatis.spring.SqlSessionTemplate$SqlSessionInterceptor.invoke(SqlSessionTemplate.java:440)
	at com.sun.proxy.$Proxy83.selectList(Unknown Source)
	at org.mybatis.spring.SqlSessionTemplate.selectList(SqlSessionTemplate.java:223)
	at com.baomidou.mybatisplus.core.override.MybatisMapperMethod.executeForMany(MybatisMapperMethod.java:173)
	at com.baomidou.mybatisplus.core.override.MybatisMapperMethod.execute(MybatisMapperMethod.java:78)
	at com.baomidou.mybatisplus.core.override.MybatisMapperProxy$PlainMethodInvoker.invoke(MybatisMapperProxy.java:148)
```

@tab:active com/alibaba/druid/pool/DruidPooledStatement.java
``` java
...
    protected void checkOpen() throws SQLException {
        if (closed) {   // 当statement已经关闭时仍然还在调用就会出现这个问题
            Throwable disableError = null;
            if (this.conn != null) {
                disableError = this.conn.getDisableError();
            }

            if (disableError != null) {
                throw new SQLException("statement is closed", disableError);
            } else {
                throw new SQLException("statement is closed");
            }
        }
    }
...
```

:::

由于项目代码中从没有主动获取Statement并调用close()方法，所以排出项目开发人员的原因，接下来排查方向从框架逻辑入手。

在 `DruidPooledStatement` 中可以修改 `closed` 属性的外部方法仅有 `close()`，从框架看没有发现明显问题，但是问题产生一定是closed为true

由于项目重启一切就好了，所以框架代码本身问题应该没有，所以需要再看看配置问题，通过继续排查日志找到如下内容：

``` log
The last packet successfully received from the server was 71,836 milliseconds ago.  The last packet sent successfully to the server was 8,214 milliseconds ago.
        at sun.reflect.NativeConstructorAccessorImpl.newInstance0(Native Method) ~[?:1.8.0_341]
        at sun.reflect.NativeConstructorAccessorImpl.newInstance(NativeConstructorAccessorImpl.java:62) ~[?:1.8.0_341]
        at sun.reflect.DelegatingConstructorAccessorImpl.newInstance(DelegatingConstructorAccessorImpl.java:45) ~[?:1.8.0_341]
        at java.lang.reflect.Constructor.newInstance(Constructor.java:423) ~[?:1.8.0_341]
        at com.mysql.jdbc.Util.handleNewInstance(Util.java:404) ~[mysql-connector-java-5.1.39.jar:5.1.39]
        at com.mysql.jdbc.SQLError.createCommunicationsException(SQLError.java:988) ~[mysql-connector-java-5.1.39.jar:5.1.39]
        at com.mysql.jdbc.MysqlIO.reuseAndReadPacket(MysqlIO.java:3552) ~[mysql-connector-java-5.1.39.jar:5.1.39]
        at com.mysql.jdbc.MysqlIO.reuseAndReadPacket(MysqlIO.java:3452) ~[mysql-connector-java-5.1.39.jar:5.1.39]
        at com.mysql.jdbc.MysqlIO.checkErrorPacket(MysqlIO.java:3893) ~[mysql-connector-java-5.1.39.jar:5.1.39]
        at com.mysql.jdbc.MysqlIO.sendCommand(MysqlIO.java:2526) ~[mysql-connector-java-5.1.39.jar:5.1.39]
        at com.mysql.jdbc.MysqlIO.sqlQueryDirect(MysqlIO.java:2673) ~[mysql-connector-java-5.1.39.jar:5.1.39]
        at com.mysql.jdbc.ConnectionImpl.execSQL(ConnectionImpl.java:2549) ~[mysql-connector-java-5.1.39.jar:5.1.39]
        at com.mysql.jdbc.PreparedStatement.executeInternal(PreparedStatement.java:1861) ~[mysql-connector-java-5.1.39.jar:5.1.39]
        at com.mysql.jdbc.PreparedStatement.execute(PreparedStatement.java:1192) ~[mysql-connector-java-5.1.39.jar:5.1.39]
        at com.alibaba.druid.filter.FilterChainImpl.preparedStatement_execute(FilterChainImpl.java:3461) ~[druid-1.1.23.jar:1.1.23]
```

这个问题通常来说就是Druid数据源中的连接被认为还是有效的，但是MySQL服务端实际上已经把这个连接给干掉了，所以才会出现这个问题。经过排查，确认了以下信息：
* mysql服务端连接超时时间：3600 s，`show global variables like 'wait_timeout';`
* java应用配置检测项:
    * testOnReturn：false   // 这个没开，但凡这个开了，这个问题发生现象都会没有，但是，生产环境一般不开，为啥捏～，因为性能问题，开了之后高并发就GG了
    * testOnBorrow：false
    * testWhileIdle：true
    * timeBetweenEvictionRunsMillis：3600000 // 1小时，问题来了，检测周期1小时监测1次，过期也是1小时，那么就可能遇到问题，现在只需要调低这个值，就能轻松解决问题

怀疑就是连接失效导致出现了 `statement is closed`

### 解决方法:

timeBetweenEvictionRunsMillis=600000 // 改成10分钟检查一次空闲链接是否有效，这样多半不会出问题了

## 查阅资料
- [activeCount大于maxActive](https://github.com/search?q=is%3Aissue%20Druid%20statement%20is%20closed&type=issues)
- [彻底解决jdbc数据库连接超时重试-communication link failure的正确姿势](https://blog.csdn.net/lifetragedy/article/details/116641291)
