---
title: 搭建步骤
index: true
---

## 说明
如果真的是小白，推荐还是用hexo吧。那个要比这个更简单一些。搭建也没那么复杂
下面内容主要讲述我如何安装的

## 安装NodeJS环境和Yarn管理器

[环境安装教程](https://theme-hope.vuejs.press/zh/cookbook/tutorial/env.html)

我是本身就已经具有了NodeJS和Yarn管理工具

## 安装VuePress

[安装教程](https://theme-hope.vuejs.press/zh/cookbook/tutorial/create.html#%E5%88%9D%E5%A7%8B%E5%8C%96%E9%A1%B9%E7%9B%AE)

``` bash
yarn create vuepress-theme-hope notes
```
- vuepress-theme-hope 为使用框架
- notes 为我自己的目录名称

执行命令过程中根据自己需要选择内容即可，我选择的docs, 除了docs还可以选择blog

当问你是否需要`gitflow`时，请选择安装，这个是发版神器

## 配置全局搜索框

[安装教程](https://vuepress-theme-hope.gitee.io/v2/search-pro/zh/)

``` bash
yarn add -D vuepress-plugin-search-pro
```

``` typescript
// .vuepress/config.ts 安装目录
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default {
  plugins: [
    searchProPlugin({
      // 配置选项
    }),
  ],
};
```

## 配置代码复制

``` typescript
// .vuepresss/theme.ts
export default hopeTheme({
  plugins: {
    copyCode: {
      // 配置项
    },
  },
});

```

## 导航配置

``` typescript
// .vuepresss/navbar/zh.ts
export const zhNavbar = navbar([
  "/",
  // 需要可以自己加
  // { text: "目录", icon: "list", link: "/guide/vuepress/guide.md" },
})
```

## 侧边栏配置

``` typescript
// .vuepresss/sidebar/zh.ts
export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "导航",
      icon: "note",
      prefix: "guide/",
      children: "structure",
    },
    {
      icon: "discover",
      text: "案例",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    // 需要可以自己加
  ],
});
```

## 部署发版到Github配置

::: info
这个很关键，如果这一步配置好了，只需要写文章，发布到github，甚至可以直接在github页面编辑源代码就可以完成发布  
很高级
:::

在[这一步](./guide.md#安装vuepress)中如果选择了gitflow那就很方便了。如果没有选择，那就重新安装一遍吧。

在`.github/workflows/deploy-docs.yml`中可以配置发版项目相关信息，需要改动的点有如下几处

``` yaml
on:
  push:
    branches:
      # 确保这是你正在使用的分支名称, 这个是你源代码的分支名称
      - <branch>

jobs:
  deploy-gh-pages:
    runs-on: ubuntu-latest
    steps:
      ...
      - name: 部署文档
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          # 这是文档部署到的分支名称
          branch: <这个是你的GitPages展示分支, 我的默认为master>
          folder: src/.vuepress/dist
```
其它东西不用动，直接提交代码，等会儿，大概3~5分钟，代码就自动部署到master了。

## 在GitHub编辑此页配置

``` typescript
// .vuepresss/theme.ts
export default hopeTheme({
  // 源码入口目录
  docsDir: "src/",
  // 源码分支
  docsBranch: "vuepress",
});

```

## 关于GitPages配置

- [关于GitPages配置](gitpages-setting.md)

- [Markdown 展示](../../demo/markdown.md)