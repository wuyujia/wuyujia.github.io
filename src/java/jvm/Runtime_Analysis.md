---
title: 运行时系统分析
index: true
---

## 1. CPU异常分析

一般来讲我们应该会排查CPU方面的问题。

* **1. 业务逻辑问题（死循环）** ⬅️ 这是最常见的问题
* 2. 频繁GC
* 3. 上下文切换过多

等等

### 分析步骤

::: tabs

@tab 1.找到我们关心的进程信息
``` bash
ps -ef | grep 关键字
```
如果找到好多个pid无法确定是哪一个时，可以通过`top`命令看一下时哪个进程占用比较高  
主要目的是找出 `pid` 用于调用其它命令 

@tab 2.找到CPU使用率比较高的一些线程
``` bash
top -Hp <pid> 
```
找到消耗异常的线程ID（实际对应为PID），将其转化为16进制的 `nid`
``` bash
printf '%x\n' <pid>
```
例如：
``` bash
$ printf '%x\n' 16152
3f18
```

@tab 3.找到堆栈信息中该线程的信息
``` bash
jstack <进程ID> |grep <线程ID> -C5 –color
```
例如：
``` log

"xxl-job, JobThread-97-1684148400029" #3882 prio=10 os_prio=0 tid=0x00007f5994058800 nid=0x100a runnable [0x00007f575eeaf000]
   java.lang.Thread.State: RUNNABLE
        at java.net.SocketInputStream.socketRead0(Native Method)
        at java.net.SocketInputStream.socketRead(SocketInputStream.java:116)
        at java.net.SocketInputStream.read(SocketInputStream.java:171)
        at java.net.SocketInputStream.read(SocketInputStream.java:141)
```

@tab 4.分析线程调用
按照堆栈信息，分析造成线程执行占用资源过高的问题，一步一步分析下去

:::


### jstack 分析不正常线程
通常我们会比较关注 `BLOCKED`、 `WAITING` 和 `TIMED_WAITING` 三种状态的线程，如果这三种比较多，多半是有问题的。
::: info 线程的状态
初始(NEW)  
运行(RUNNABLE)  
阻塞(BLOCKED)：表示线程阻塞于锁。  
等待(WAITING)：进入该状态的线程需要等待其他线程做出一些特定动作（通知或中断）。  
超时等待(TIMED_WAITING)：该状态不同于WAITING，它可以在指定的时间后自行返回。  
终止(TERMINATED)  
:::

::: tabs

@tab:active 生成线程日志

``` bash 生成线程日志
jstack <pid> > jstack.log
```

@tab 线程状态分析

``` bash 线程状态分析
cat jstack.log | grep "java.lang.Thread.State" | sort -nr | uniq -c
```
``` log
# cat jstack.log | grep "java.lang.Thread.State" | sort -nr | uniq -c
    122    java.lang.Thread.State: WAITING (parking)
      3    java.lang.Thread.State: WAITING (on object monitor)
     27    java.lang.Thread.State: TIMED_WAITING (sleeping)
     12    java.lang.Thread.State: TIMED_WAITING (parking)
      6    java.lang.Thread.State: TIMED_WAITING (on object monitor)
     92    java.lang.Thread.State: RUNNABLE
```

:::


## 参考
- [JAVA 线上故障排查完整套路！牛掰！](https://cloud.tencent.com/developer/article/1633434)
- [线上服务Java进程假死快速排查、分析](https://zhuanlan.zhihu.com/p/529350757)
- [JVM故障分析及性能优化系列之四：jstack生成的Thread Dump日志线程状态](https://www.javatang.com/archives/2017/10/25/36441958.html)