---
title: Canal搭建及使用
index: true
---

## Canal 是什么？

官网的介绍  
> canal，译意为水道/管道/沟渠，主要用途是基于 MySQL 数据库增量日志解析，提供增量数据订阅和消费。

可以简单地把canal理解为一个用来同步增量数据的一个工具。

接下来我们看一张官网提供的示意图：

![介绍图](https://raw.githubusercontent.com/wuyujia/oss/oss/uPic/2023-05-08/OgapBX.jpg)

canal的工作原理就是把自己伪装成MySQL slave，模拟MySQL slave的交互协议向MySQL Mater发送 dump协议，MySQL mater收到canal发送过来的dump请求，开始推送binary log给canal，然后canal解析binary log，再发送到存储目的地，比如MySQL，Kafka，Elastic Search等等。

## Canal 应用场景
参考[官网](https://github.com/alibaba/canal?spm=a2c6h.12873639.article-detail.6.487a78a3tkLaD0)

与其问canal能做什么，不如说数据同步有什么作用。

但是canal的数据同步不是全量的，而是增量。基于binary log增量订阅和消费，canal可以做：

- 数据库镜像
- 数据库实时备份
- 索引构建和实时维护
- 业务cache(缓存)刷新
- 带业务逻辑的增量数据处理

## MySQL 服务配置修改&重启

当前的 canal 支持源端 MySQL 版本包括 5.1.x , 5.5.x , 5.6.x , 5.7.x , 8.0.x

我的Linux服务器安装的MySQL服务器是5.7版本。

MySQL的安装这里就不演示了，比较简单，网上也有很多教程。

### 创建 Canal 用户
然后在MySQL中需要创建一个用户，并授权：

``` mysql
-- 使用命令登录：mysql -u root -p
-- 创建用户 用户名：canal 密码：Canal@123456
create user 'canal'@'%' identified by 'Canal@123456';
-- 授权 *.*表示所有库
grant SELECT, REPLICATION SLAVE, REPLICATION CLIENT on *.* to 'canal'@'%' identified by 'Canal@123456';
```

### 检查 Binlog 是否开启
```mysql
show variables like 'log_bin';
```
看到如下结果即位开启:
|Variable_name|Value|
|---|---|
| log_bin | ON |

若未开启则添加配置
``` properties
[mysqld]
# 打开binlog
log-bin=mysql-bin
# 选择ROW(行)模式
binlog-format=ROW
# 配置MySQL replaction需要定义，不要和canal的slaveId重复
server_id=1
```

确认binlog日志文件列表
``` mysql
show binary logs;
```
|Log_name|File_size|
|---|---|
|mysql-bin.000040	|1073742171|
|mysql-bin.000041	|1073742952|
|mysql-bin.000042	|410863200|

查看当前正在写入的binlog文件
``` mysql
show master status;
```
|File|Position|
|mysql-bin.000042	|412829327|

以上就是MySQL服务器所有配置了

## Canal 搭建

### Canal Admin 搭建 (未使用)
使用Docker部署
```bash
docker pull canal/canal-admin:v1.1.6  
```


### Canal 文件下载
我用的是1.1.6版本：[下载地址](https://github.com/alibaba/canal/releases/tag/canal-1.1.6)  
下载文件：`canal.deployer-1.1.6.tar.gz`

### 解压文件
``` bash
tar -zxvf canal.deployer-1.1.6.tar.gz
```
解压目录结构
> bin  启停脚本  
> conf  重点关注配置项目  
> lib  
> logs  
> plugin  

暂时不启动和修改配置，将下面的外部配置新建完成之后再启动canal

### 将 Binglog 直接对接致 RabbitMQ
对接MQ之前，需要先将`rabbitmq`的`exchange`给新建出来，模式选择：`fanout` 这种模式类似于广播，可以将消息投递至连接服务端的所有客户端中  
取名：exchange.canal.binlog

### 修改 Canal 配置

conf/canal.properties
``` properties
# tcp, kafka, rocketMQ, rabbitMQ, pulsarMQ 将 tcp 修改为 rabbitMQ
canal.serverMode = rabbitMQ
...
##################################################
#########                   RabbitMQ         #############
##################################################
rabbitmq.host = 127.0.0.1:5672
rabbitmq.virtual.host = /
# 这个exchange要提前去rabbitmq新建好，选择fanout模式
rabbitmq.exchange = exchange.canal.binlog
rabbitmq.username = admin
rabbitmq.password = 123456
rabbitmq.deliveryMode = fanout
```

conf/example/instance.properties
``` properties
# 修改地址、binlog文件、binglog 偏移位点来确定要同步的起始内容
canal.instance.master.address=127.0.0.1:3306
canal.instance.master.journal.name=mysql-bin.000001
canal.instance.master.position=168

# 用户名/密码
canal.instance.dbUsername=canal
canal.instance.dbPassword=Canal@123456

# 监听数据库表
canal.instance.filter.regex=.*\\..*
```

### 创建一个 RabbitMQ 监听 Exchange
SpringBoot2.X 项目 POM 文件
``` xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

配置文件
``` properties
# rabbitmq config
spring.rabbitmq.host=127.0.0.1
spring.rabbitmq.port=5672
spring.rabbitmq.username=admin
spring.rabbitmq.password=123456
spring.rabbitmq.virtual-host=/
## 手动确认消息到达
spring.rabbitmq.listener.simple.acknowledge-mode=manual
spring.rabbitmq.listener.simple.concurrency=5
spring.rabbitmq.listener.simple.max-concurrency=10
```

核心代码(就一个类)
``` java
@Component
@Slf4j
public class BinlogConsumer {

    @RabbitListener(bindings = {
            @QueueBinding(
                value = @Queue(name = QueuesName.DATA_CENTER),
                exchange = @Exchange(
                        name = ExchangesName.EXCHANGE_CANAL_BINLOG,
                        type = "fanout"
                )
            )
    })
    @RabbitHandler
    public void onMessage(@Payload String payload, Channel channel, @Headers Map<String, Object> headers) throws IOException {
        System.err.println("--------------------------------------");
        System.err.println("消费端Payload: " + JSONObject.toJSONString(JSONObject.parseObject(payload, BinlogDTO.class), true));
        Long deliveryTag = (Long) headers.get(AmqpHeaders.DELIVERY_TAG);
        //手工ACK
        channel.basicAck(deliveryTag, false);
    }
}
```
运行项目就可以进行监听了

### 启动 Canal 

``` bash
sh ./bin/startup:.sh
```

如果配置无误的话，就能够看到MQ消费信息了。


``` json
--------------------------------------
消费端Payload: {
	"data":[
		{
			"update_time":"2023-05-09 18:08:57",
			"id":"1",
			"delete_flag":"0",
			"series_course_sku":"1",
			"create_time":"2023-05-09 18:08:09",
			"stage_id":"1"
		}
	],
	"database":"xxx",
	"ddl":false,
	"old":[
		{
			"update_time":"2023-05-09 18:08:09"
		}
	],
	"table":"xxxx",
	"ts":1683626937769,
	"type":"UPDATE"
}
```

### Canal 配置优化

由于数据计算不需要监听所有表，因此在Canal配置时应当细化要监听的表，修改内容如下：  
conf/example/instance.properties
``` properties

# 监听数据库表 逗号分隔
canal.instance.filter.regex=db.tb1,db.tb2,db.tb3
```


## 关于 Canal 生产环境的恰当配置思考
1. 上面对接MQ的逻辑就已经足够了，大数据量还是用RocketMQ或者Kafka比较好，特别是Kafka，目前生产环境数据链不大，所以无需太过介意使用RabbitMQ  
对接MQ主要原因还是因为避免Canal客户端处理延迟导致消费过慢的问题。

2. 线上数据不应该监听所有表的变化，应该有目标的监听，否则业务或数据计算无关表大量数据进入，导致MQ消息太多，在消费端也会收到许多无用的消息 

## 参考
- [【开源实战】Canal生产环境部署常见问题分析](https://cloud.tencent.com/developer/beta/article/1643293)
- [超详细canal入门，看这篇就够了](https://zhuanlan.zhihu.com/p/177001630)
