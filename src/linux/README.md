---
title: 常用命令
index: true
---

## 查询本机外网IP
``` bash
curl cip.cc

IP      : xxx.xx.xx.xx
地址    : 中国  北京
运营商  : 电信

数据二  : 北京市 | 电信

数据三  : 中国北京北京市 | 电信
```

## 日志切割
[日志切割](./crontab.md)

## 简易跳板机
[跳板机](./jump.md)

## 压缩日志文件
单个
```bash
tar -zcvf log.tar.gz stdout.log
```

批量
```bash
find . -maxdepth 1 -name "stdout.log.2020-03-*" -type f | xargs -I {} tar -zcvf {}.tar.gz {} --remove-files
```
> 说明
-maxdepth 1 : 表示搜索目录深度，取1表示只在当前目录下检索，不会检索子目录
-name “stdout.log.2020-03-*” : 表示匹配文件名规则
–remove-files : 表示压缩完成后删除源文件