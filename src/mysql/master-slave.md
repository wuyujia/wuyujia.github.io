---
title: MySQL主从搭建
index: true
---

## 当前状态
线上数据库只有一主 + Canal的情况下，需要增加一个从节点，不管是作为灾备还是做读写分离，都是很有必要的

Master数据库版本：5.7.27-log
Slave也需要按这个版本进行安装

## 操作步骤
### 1. 从节点下载MySQL服务端
使用SCP命令将master节点的安装包发给slave节点，也可以从网上下载
```bash
scp ./mysql-5.7.27-linux-glibc2.12-x86_64.tar.gz 172.10.0.2:/usr/local/src 
```
等待传输完成，切换到 slave 机器上进行解压
```bash
cd /usr/local/src && tar -zxvf mysql-5.7.27-linux-glibc2.12-x86_64.tar.gz
```
将得到目录：`mysql-5.7.27-linux-glibc2.12-x86_64`
将目录更名，并移动至 /usr/local/mysql
```bash
mv mysql-5.7.27-linux-glibc2.12-x86_64 mysql && mv ./mysql /usr/local
```

### 2. 创建my.cnf
复制master的`/etc/my.cnf`文件到slave的`/etc/my.cnf`中
::: warning 注意
注意修改一下server-id的值，从节点必须和主节点不同
:::

### 3. 初始化数据库
```bash
# 默认会自动读取 /etc/my.cnf 的信息，无需额外参数即可
mysqld --initialize
```
查看初始化密码
```
cat 在/etc/my.cnf中配置的log_error参数
找到 [Note] A temporary password is generated for root@localhost 后面的值为密码
```

### 4. 修改root密码
登录mysql
```bash
mysql -p
# 输入密码
```
修改root密码
```mysql
# 修改密码
alter user 'root'@'localhost' identified by '你的密码'; 
# 刷新权限
flush privileges;
# 退出
exit
```

### 5. master数据拷贝
将master的事实数据导出，拷贝至slave
有两种方案：

1. mysqldump：逻辑备份，数据量大时，备份速度会很慢，锁表的时间也会很长。
2. xtrabackup：物理备份，备份速度快，不锁表。为什么不锁表？因为自身会监控主库日志，如果有更新的数据，就会先写到一个文件中，然后再回归到备份文件中，从而保持数据一致性。

由于是生产服务器，所以采用`方案2`

安装 `XtraBackup`
```shell
# yum源安装
yum install https://repo.percona.com/yum/percona-release-latest.noarch.rpm

yum list | grep percona-xtrabackup-24
# 如果存在，则进行安装
yum install percona-xtrabackup-24
```

::: info tips
两台机器都要安装哦
:::

数据备份
```shell
innobackupex --user=root --password=$DB_PD ./
```
备份完成之后，会在当前目录下产生一个当前日期时间的文件夹，这个文件夹就是备份内容

将文件进行压缩
```shell
tar -zcvf backup.tar.gz ./日期文件 --remove-files
```

### 6. 迁移文件并恢复
将压缩文件传输至slave节点
```shell
scp ./backup.tar.gz 172.16.100.16:/tmp
```
将数据进行恢复，恢复之前记得先停止节点
```shell
service mysqld stop
```

解压文件, 并恢复内容
```shell
# 第一步 解压
cd /tmp && tar -zxvf ./backup.tar.gz
# 第二步 恢复应用日志
innobackupex --user=root --password=$DB_PD --apply-log --use-memory=4G ./解压出来的目录/
# 第三步 恢复拷贝文件 要确保数据目录是空的
innobackupex --user=root --password=$DB_PD --copy-back ./2023-12-05_11-46-02/
# 第四步 检查恢复完的数据权限是否是mysql
cd /data/3306 && chown -R mysql.mysql ./*
```
其中
> --defaults-file=/etc/my.cnf     恢复会使用my.cnf文件把需要恢复的文件，恢复到my.cnf指定的位置。  
--apply-log             这是备份时产生的日志，  
--copy-back             这是备份源，解压后的备份文件。  
--use-memory=4G                    为了加快恢复速度,设置可用内存参数  


启动服务
```shell
service mysqld start
# 确认服务是否启动成功 应该会成功的
```

查看同步起点
```shell
cat xtrabackup_binlog_info
mysql-bin.000373        861304970       11ee986b-0512-11ea-a00c-5254008e708a:1-413438727
```

### 7. 启动从节点同步
在主节点创建用户
```mysql
grant replication slave on *.* to slave@'172.30.100.16' identified by 'slave';
flush privileges;
```

进入slave的mysql
```mysql
# 配置主节点 一定要保证从节点用的slave账户在主节点存在并有效
change master to master_host='172.30.100.17', master_user='slave', master_password='slave', master_log_file='mysql-bin.000373', master_log_pos=861304970;

# 启动同步
start slave;

# 查看状态
show slave status\G
# 从 Seconds_Behind_Master 属性中，如果为0，则表示正常，如果为正值且很大则表示延迟很大

# 从节点设置为只读
set global read_only=1;
set global super_read_only = 1;
```

### 8. 创建只读账户
创建用户
```msyql
grant select on tb_prod.* to db_reader@'172.30.100.16' identified by 'xxxxx';
flush privileges;
```

回收用户
```mysql
revoke select on tb_prod.* from db_reader@'172.30.100.16';
```