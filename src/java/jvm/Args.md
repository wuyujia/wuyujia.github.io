---
title: JVM参数
index: true
---

## 内存相关参数调整

| 名称 | 参数 | 案例 | 说明 |
| --- | --- | --- | --- |
| 堆内存最小值 | -Xms<大小> | -Xms1g | 最小堆内存1G |
| 堆内存最大值 | -Xmx<大小>  | -Xmx1g | 最大堆内存1G |

## GC相关参数调整

| 名称 | 参数 | 案例 | 说明 |
| --- | --- | --- | --- |
| 使用G1收集器 | -XX:+Use<GC名字> | -XX:+UseG1GC |  |
| 最大GC停顿时间 | -XX:MaxGCPauseMillis=<毫秒> | -XX:MaxGCPauseMillis=200 | 最大停顿200ms |
| 最大GC停顿间隔 | -XX:GCPauseIntervalMillis=<毫秒> | -XX:GCPauseIntervalMillis=500 | 停顿间隔500ms |
