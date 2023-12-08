---
title: Node
index: true
---

## nvm安装（Node多版本切换）

### brew 安装 nvm
``` bash
brew instal nvm
```

安装之后还不能直接使用`nvm`的命令, 需要配置一个命令加载项
::: warning 注意

要注意你本机用的环境变量配置文件，有的人是 `bash_profile`, 有的人是 `zshrc`


如何确定？

``` sh
cd ~
ls -a | egrep '.*(rc|profile)'

...
.bash_profile
.npmrc
.profile
.yarnrc
.zprofile
.zshrc
.zshrc.pre-oh-my-zsh
...
```

不一定有这么多，有`zshrc`就选`zshrc`，没有就选`bash_profile`来修改环境变量

:::


::: tabs

@tab:active 配置
```bash
echo "# nvm config" >> ~/.zshrc
echo "source $(brew --prefix nvm)/nvm.sh" >> ~/.zshrc
```

@tab 确认安装完成
```bash
nvm -v
0.39.3
```

:::


### 卸载本机Node、yarn环境
brew uninstall node

### nvm 常用命令
```
1. nvm list 是查找本电脑上所有的node版本
    - nvm list 查看已经安装的版本
    - nvm list installed 查看已经安装的版本
    - nvm list available 查看网络可以安装的版本
2. nvm install <version> 安装指定版本node
3. nvm use <version> 切换使用指定的版本node
4. nvm ls 列出所有版本
5. nvm current显示当前版本
6. nvm alias <name> <version> ## 给不同的版本号添加别名
7. nvm unalias <name> ## 删除已定义的别名
8. nvm reinstall-packages <version> ## 在当前版本node环境下，重新全局安装指定版本号的npm包
9. nvm on 打开nodejs控制
10. nvm off 关闭nodejs控制
11. nvm proxy 查看设置与代理
12. nvm node_mirror [url] 设置或者查看setting.txt中的node_mirror，如果不设置的默认是 https://nodejs.org/dist/
　　nvm npm_mirror [url] 设置或者查看setting.txt中的npm_mirror,如果不设置的话默认的是： https://github.com/npm/npm/archive/.
13. nvm uninstall <version> 卸载制定的版本
14. nvm use [version] [arch] 切换制定的node版本和位数
15. nvm root [path] 设置和查看root路径
16. nvm version 查看当前的版本
```