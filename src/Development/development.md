---
title: 开发环境搭建
index: true
---

## Mac基础工具搭建
### Mac免费软件下载
[Mac波罗](https://www.macbl.com/)
### Homebrew 安装
[参考](https://brew.idayer.com/)
``` bash
/bin/bash -c "$(curl -fsSL https://gitee.com/ineo6/homebrew-install/raw/master/install.sh)"
```
如果遇到无法安装，例如：
> curl: (7) Failed to connect to raw.githubusercontent.com port 443: Operation timed out

使用如下命令先安装一遍：

`core`
```bash
cd "$(brew --repo)/Library/Taps/"
mkdir homebrew && cd homebrew
git clone git://mirrors.ustc.edu.cn/homebrew-core.git
```

`cask`
```bash
cd "$(brew --repo)/Library/Taps/"
cd homebrew
git clone https://mirrors.ustc.edu.cn/homebrew-cask.git
```

安装完成之后再执行第一步的安装命令

最后执行一次更新操作
``` bash
brew update
```

### 系统资源监控工具
可以不装，这个就是自己看CPU和内存情况用的, `istat menus`网上可以搜到，付费软件，免费版本够用了，网盘有

## Java开发环境搭建
最近刚换了新电脑，老电脑的数据又不想完全拷贝过来，在重装过程中又发现很多工具安装过程记不起来了，或者有哪些插件也不记得了。写一个笔记以免自己忘记

### Java安装
JDK: 安项目要求安装即可，Mac系统安装完甚至连环境变量都不用配置，如果Oracle下载不了，可以考虑安装OpenJDK，使用Homebrew安装就可以了, 网盘里有JDK安装包

### IDE安装
- Visual Studio Code: 搜索下载
- `IntelliJ IDEA`: [官方下载](https://www.jetbrains.com.cn/idea/download/#section=mac), 百度网盘有`2023.1`版本，可以直接用，破解办法也在网盘
- 破解：[访问这里](https://3.jetbra.in/)，看看有什么地址可以访问，然后进去下载jebra.zip包，解压后运行scripts/install.sh命令就完成了破解
- IDEA 插件列表:
    - `Maven Dependency Helper`: 能够帮助分析包版本冲突, 以及快捷排除冲突项
    - `MyBatisCodeHelperPro`: 如果项目使用 Mybatis 且同时使用 mapper.xml 文件，建议安装，能方便直接从接口到文件, 除了这款还有其它类似插件，任选即可，收费软件，但免费功能足矣
    - `Free Mybatis plugin`: 同上，替代品
    - `Gerrit`: 如果公司项目管理用到了就安装吧。
    - `Rainbow Brackets`: 不光是为了括号好看，用来排查是哪个括号少了有奇效，可装可不装
    - `arthas idea`: 配合arthas工具使用的插件，非常好用
    - `GenerateSerialVersionUID`: 自动生成序列号ID, 用得不多，但是如果涉及到序列化反序列化就建议安装
    - `Lombok`: 神器，建议安装，好像在插件市场搜索不到，如果找不到按如下操作也可以：打开设置（Preference）找到 Build，Execution，Deployment 找到 Compiler，找到 AnnotationProcessors 找到 Enable 开启即可，一般项目启动都会问你开不开，直接开就行。

### 数据库工具
- Navicat Premium: 网盘有
- MongoDB Compass: 网盘有
- Another Redis Desktop Manger: 网盘有

### 编辑器
- Sublime Text: 网盘有
- Typeroa: 网盘有

### 接口测试
- Postman: 网盘有，也可以直接搜索安装

### 图床
- uPic: 搜有下载，网盘好像没有

### 画图
- Draw.io: 直接使用网站或者下载离线版, 用的少了, 飞书就可以直接画了
- Tayasui Sketches Pro: 画画工具, 网盘有

### 服务器管理
- Secure CRT: 网盘有

## NodeJs 安装
直接使用命令
``` bash
brew install node
```

中间遇到了无法下载，访问不到资源的情况。然后我是硬着头皮反复执行安装的。本来想用梯子，结果梯子不好使。

### npm 更换源
`taobao源`
``` bash
npm config set registry http://registry.npmmirror.com/
```

### Yarn 安装
``` bash
npm install -g yarn 
```

## Docker 安装
`--cask`表示安装图形化界面
``` bash
brew install docker --cask
```

### Jupyter Notbook 安装
python 利器, 还有别的版本，这里不过是选了一个比较全的版本，占用空间很大
``` bash
docker pull jupyter/datascience-notebook
```
启动
``` bash

```

### Nginx 安装
有时候使用反向代理+内网穿透测试有奇效
``` bash
docker pull nginx
```


## 内网穿透工具
- 花生壳: 直接搜索下载
- ngrok: 很少用，不过也是免费的, [地址](https://ngrok.com/)
- 飞鸽内网穿透: 还可以，临时用用蛮不错的，[地址](https://www.fgnwct.com/index)

## VMware Fusion 12
安装程序网盘有，热心网友激活码：NH001-8HJ06-18LJ3-0L926-98RP4

## 截图工具
iShot Pro，AppStore已购买正版，永久使用

