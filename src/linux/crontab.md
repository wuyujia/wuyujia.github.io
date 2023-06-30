---
title: 日志切割
index: true
---

## Nginx日志切割

::: tabs

@tab:active vhost/\*.conf
最好是配置在 server节点下，每个server的日志单独打印
``` 
server {

  listen 80;
  
  ...

  if ($time_iso8601 ~ "^(\d{4})-(\d{2})-(\d{2})") {
    set $year $1;
    set $month $2;
    set $day $3;
  }

  access_log /usr/local/nginx/logs/example.access_$year-$month-$day.log main;
  error_log  /usr/local/nginx/logs/example.error.log;

  ...

  location / {
    ...
  }
}

```

@tab 目录创建

``` shell
mkdir -P NG需要的目录层级结构
```

@tab 权限修改
NG日志需要往这个目录写所以需要有权限，因此，先查看nginx.conf 确定ng使用的用户，一般是www或者nobody
``` shell
chown -R nobody:nobody 文件目录
```

:::