---
title: Arthas
index: true
---

## Arthas 介绍及下载
https://arthas.aliyun.com/doc/

## 实战实用命令合集
### OGNL
#### 获取 Spring 容器对象并执行函数
假设有一个静态类持有 `ApplicationContext` 的情况下使用命令可以获取到静态对象
``` bash
# 实用sc命令查看即将获取的类的类加载器
$ sc *ContextHolder

com.tb.base.context.ContextHolder
org.springframework.context.i18n.LocaleContextHolder
org.springframework.web.context.request.RequestContextHolder
...

# 加上 -d 参数打印这个类的详细信息
$ sc -d com.tb.base.context.ContextHolder

# 关注 classLoader 值, 后面需要用到
... 
 classLoaderHash   1e60daa9  
...


# 使用 -c 参数指定 classLoader 来执行命令
$ ognl -c 1e60daa9 '#ctx=@com.tb.base.context.ContextHolder@instance().appContext' # 这是获取到了容器并赋值给ctx

# 使用变量去执行
$ ognl -c 1e60daa9 '#ctx=@com.tb.base.context.ContextHolder@instance().appContext, #ctx.getBean("memberMapper")'

# 直接执行
$ ognl -c 1e60daa9 '#ctx=@com.tb.base.context.ContextHolder@instance().appContext.getBean("memberMapper").memberAddAdviser(4L, 1L)'
$ ognl -c 41114410 '#ctx=@com.tb.base.context.ContextHolder@instance().appContext.getBean("memberMapper").memberAddAdviser(4L, 1L)'


```