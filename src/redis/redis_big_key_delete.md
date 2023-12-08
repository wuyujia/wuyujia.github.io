---
title: Redis批量Key删除和大Key删除
index: true
date: 2023-12-08
category: redis
---

最近碰到线上服务器报警，经`top`命令排查发现，很吃CPU的应用除了MySQL还有Redis，进一步根据进程ID排查发现，Redis的bgsave命令在执行。但是执行速度很慢，而且很耗CPU，绕了一圈发现，Redis的内存已经高达27G了。在确认过哪些Key是可以删除之后，既要着手开始删除数据了。

## <span style="color: red">一定不能碰的红线</span>
1. 在线上Redis服务器中，一定能使用`Keys`命令进行模糊匹配
> keys命令会阻塞redis进程（单线程模型），如果key非常多，则阻塞时间非常长。想想就很恐怖了

2. 从Redis删除Key一定要看清楚，这个Key的大小，例如：Hash的Key，使用`hlen key-name`来查看大小
> 大批量删除Key和大key的删除都会阻塞进程，不能一次性全删除，后果非常严重哈

## 如何扫描Key，如何删除Key？
### Linux命令渐进式删除
```shell
redis-cli --scan --pattern "key*" | xargs -I {} redis-cli del {}
```
这个命令容易遇到一个问题，当Kye里面有乱码的时候，就无法正常删除了。

### Python脚本渐进式删除
渐进批量删除Key
```python
import redis

# 创建一个连接到本地Redis服务器的连接对象
redis_client = redis.StrictRedis(host='localhost', port=6379, db=0)
cursor = 0
try:
    match_str = 'key*'
    count = 1000
    counter=0
    while True:
        result = redis_client.scan(cursor, match_str, count)
        cursor = result[0]
        if len(result[1]) > 0:
            for subKey in result[1]:
                redis_client.delete(key)
            counter = counter + len(result[1])
            print("当前已删除:", counter, "条数据")
        elif cursor == 0:
            break
    print("一共删除:", counter, "条数据")
except Exception as e:
    print("发生错误", e)
finally:
    print('cursor:', cursor)
    # 关闭连接
    redis_client.close()
```


渐进删除大HashKey
```python
import redis

# 创建一个连接到本地Redis服务器的连接对象
redis_client = redis.StrictRedis(host='localhost', port=6379, db=0)
cursor = 0
try:
    key='AB_TEST_KEY_STAR'
    match_str = '*'
    count = 1000
    counter=0
    while True:
        result = redis_client.hscan(key, cursor, match_str, count)
        cursor = result[0]
        if len(result[1]) > 0:
            for subKey, value in result[1].items():
                redis_client.hdel(key, subKey)
            counter = counter + len(result[1])
            print("当前已删除:", counter, "条数据")
        elif cursor == 0:
            break
    print("一共删除:", counter, "条数据")
except Exception as e:
    print("发生错误", e)
finally:
    print('cursor:', cursor)
    # 关闭连接
    redis_client.close()
```