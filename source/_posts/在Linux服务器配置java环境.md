---
title: 在Linux服务器配置java环境
date: 2017-01-23 22:00:05
tags: 
- java
- linux
categories: 
- linux
- java
---

### 下载java安装包
在[Oracle官网](https://www.oracle.com/index.html)中找到Downloads  
选择[Java for Development](http://www.oracle.com/technetwork/java/javase/downloads/index.html)下载对应的jdk版本  


### 将JDK从本地上传到服务器
我使用的工具是FileZilla, 输入主机Ip: xxx.xxx.xxx.xxx 用户名: root 密码: xxx 端口选择22就可以连接上服务器, 将我们所下载的JDK上传到服务器的某个目录下, 因为我是用root账户登录的, 所以直接放在`~`目录下(也就是`/root`目录)  


### 解压压缩包

`tar -zxvf jdk-8u121-linux-x64.tar.gz`    
  
`命令解释: `  
`-x, --extract, --get extract files from an archive`从压缩包中抽取文件  
`-f, --file=ARCHIVE use archive file or device ARCHIVE`使用档案文件或设备档案  
`-v, --verbose verbosely list files processed`打印解压过程  
`-z, --gzip filter the archive through gzip`通过gzip格式解压  
最终得到文件夹:`jdk1.8.0_121`  

### 配置环境变量
进入到jdk1.8.0_121目录下:  
`cd jdk1.8.0_121`  
获取当前目录的全路径命令:  
`pwd`  
得到:  
`/usr/java/jdk1.8.0_121`

编辑配置文件:  
`vi /etc/profile`

添加如下内容: 
 
```shell  
export JAVA_HOME=/usr/java/jdk1.8.0_121
export JRE_HOME=${JAVA_HOME}/jre
export CLASSSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH
```     

### 使配置生效
`source profile`  或者 重启机器 `shutdown -r now`

### 运行命令检验  
`java -version`  如果命令能够执行, 说明环境配置完成

### 注意, 系统位数要和JDK的位数对应  
32位系统对应32位JDK, 64位系统对应64位JDK


### 将JDK设为系统默认程序  

```shell
update-alternatives --install /usr/bin/java java /usr/java/jdk1.8.0_121/bin/java 50
```    

```shell
update-alternatives --install /usr/bin/javac javac /usr/java/jdk1.8.0_121//bin/javac 50
```    

```shell
update-alternatives --config
```    

这个命令查看系统已经配置的JDK版本  






