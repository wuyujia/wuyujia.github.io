import{_ as c,W as l,X as u,Y as n,Z as s,$ as a,a1 as i,a2 as t,C as o}from"./framework-aa83d01c.js";const r={},d=n("h2",{id:"说明",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#说明","aria-hidden":"true"},"#"),s(" 说明")],-1),v=n("p",null,"如果真的是小白，推荐还是用hexo吧。那个要比这个更简单一些。搭建也没那么复杂 下面内容主要讲述我如何安装的",-1),k=n("h2",{id:"安装nodejs环境和yarn管理器",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#安装nodejs环境和yarn管理器","aria-hidden":"true"},"#"),s(" 安装NodeJS环境和Yarn管理器")],-1),m={href:"https://theme-hope.vuejs.press/zh/cookbook/tutorial/env.html",target:"_blank",rel:"noopener noreferrer"},h=n("p",null,"我是本身就已经具有了NodeJS和Yarn管理工具",-1),b=n("h2",{id:"安装vuepress",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#安装vuepress","aria-hidden":"true"},"#"),s(" 安装VuePress")],-1),g={href:"https://theme-hope.vuejs.press/zh/cookbook/tutorial/create.html#%E5%88%9D%E5%A7%8B%E5%8C%96%E9%A1%B9%E7%9B%AE",target:"_blank",rel:"noopener noreferrer"},_=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">yarn</span> create vuepress-theme-hope notes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>vuepress-theme-hope 为使用框架</li><li>notes 为我自己的目录名称</li></ul><p>执行命令过程中根据自己需要选择内容即可，我选择的docs, 除了docs还可以选择blog</p><p>当问你是否需要<code>gitflow</code>时，请选择安装，这个是发版神器</p><h2 id="配置全局搜索框" tabindex="-1"><a class="header-anchor" href="#配置全局搜索框" aria-hidden="true">#</a> 配置全局搜索框</h2>`,5),f={href:"https://vuepress-theme-hope.gitee.io/v2/search-pro/zh/",target:"_blank",rel:"noopener noreferrer"},y=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> vuepress-plugin-search-pro
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// .vuepress/config.ts 安装目录</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> searchProPlugin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vuepress-plugin-search-pro&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token function">searchProPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token comment">// 配置选项</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置代码复制" tabindex="-1"><a class="header-anchor" href="#配置代码复制" aria-hidden="true">#</a> 配置代码复制</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// .vuepresss/theme.ts</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">hopeTheme</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">{</span>
    copyCode<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// 配置项</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="导航配置" tabindex="-1"><a class="header-anchor" href="#导航配置" aria-hidden="true">#</a> 导航配置</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// .vuepresss/navbar/zh.ts</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> zhNavbar <span class="token operator">=</span> <span class="token function">navbar</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span>
  <span class="token comment">// 需要可以自己加</span>
  <span class="token comment">// { text: &quot;目录&quot;, icon: &quot;list&quot;, link: &quot;/guide/vuepress/guide.md&quot; },</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="侧边栏配置" tabindex="-1"><a class="header-anchor" href="#侧边栏配置" aria-hidden="true">#</a> 侧边栏配置</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// .vuepresss/sidebar/zh.ts</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> zhSidebar <span class="token operator">=</span> <span class="token function">sidebar</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token string-property property">&quot;/&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      text<span class="token operator">:</span> <span class="token string">&quot;导航&quot;</span><span class="token punctuation">,</span>
      icon<span class="token operator">:</span> <span class="token string">&quot;note&quot;</span><span class="token punctuation">,</span>
      prefix<span class="token operator">:</span> <span class="token string">&quot;guide/&quot;</span><span class="token punctuation">,</span>
      children<span class="token operator">:</span> <span class="token string">&quot;structure&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      icon<span class="token operator">:</span> <span class="token string">&quot;discover&quot;</span><span class="token punctuation">,</span>
      text<span class="token operator">:</span> <span class="token string">&quot;案例&quot;</span><span class="token punctuation">,</span>
      prefix<span class="token operator">:</span> <span class="token string">&quot;demo/&quot;</span><span class="token punctuation">,</span>
      link<span class="token operator">:</span> <span class="token string">&quot;demo/&quot;</span><span class="token punctuation">,</span>
      children<span class="token operator">:</span> <span class="token string">&quot;structure&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 需要可以自己加</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="可选图标内容" tabindex="-1"><a class="header-anchor" href="#可选图标内容" aria-hidden="true">#</a> 可选图标内容</h2>`,9),x={href:"https://theme-hope.vuejs.press/zh/guide/interface/icon.html#%E6%B5%8F%E8%A7%88%E5%9B%BE%E6%A0%87",target:"_blank",rel:"noopener noreferrer"},q=n("h2",{id:"部署发版到github配置",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#部署发版到github配置","aria-hidden":"true"},"#"),s(" 部署发版到Github配置")],-1),w=n("div",{class:"hint-container info"},[n("p",{class:"hint-container-title"},"相关信息"),n("p",null,[s("这个很关键，如果这一步配置好了，只需要写文章，发布到github，甚至可以直接在github页面编辑源代码就可以完成发布"),n("br"),s(" 很高级")])],-1),E=t(`<p>在<code>.github/workflows/deploy-docs.yml</code>中可以配置发版项目相关信息，需要改动的点有如下几处</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span>
      <span class="token comment"># 确保这是你正在使用的分支名称, 这个是你源代码的分支名称</span>
      <span class="token punctuation">-</span> &lt;branch<span class="token punctuation">&gt;</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">deploy-gh-pages</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">...</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 部署文档
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> JamesIves/github<span class="token punctuation">-</span>pages<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span>action@v4
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># 这是文档部署到的分支名称</span>
          <span class="token key atrule">branch</span><span class="token punctuation">:</span> &lt;这个是你的GitPages展示分支<span class="token punctuation">,</span> 我的默认为master<span class="token punctuation">&gt;</span>
          <span class="token key atrule">folder</span><span class="token punctuation">:</span> src/.vuepress/dist
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其它东西不用动，直接提交代码，等会儿，大概3~5分钟，代码就自动部署到master了。</p><h2 id="在github编辑此页配置" tabindex="-1"><a class="header-anchor" href="#在github编辑此页配置" aria-hidden="true">#</a> 在GitHub编辑此页配置</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// .vuepresss/theme.ts</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">hopeTheme</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// 源码入口目录</span>
  docsDir<span class="token operator">:</span> <span class="token string">&quot;src/&quot;</span><span class="token punctuation">,</span>
  <span class="token comment">// 源码分支</span>
  docsBranch<span class="token operator">:</span> <span class="token string">&quot;vuepress&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="关于gitpages配置" tabindex="-1"><a class="header-anchor" href="#关于gitpages配置" aria-hidden="true">#</a> 关于GitPages配置</h2>`,6);function B(z,P){const e=o("ExternalLinkIcon"),p=o("RouterLink");return l(),u("div",null,[d,v,k,n("p",null,[n("a",m,[s("环境安装教程"),a(e)])]),h,b,n("p",null,[n("a",g,[s("安装教程"),a(e)])]),_,n("p",null,[n("a",f,[s("安装教程"),a(e)])]),y,n("ul",null,[n("li",null,[n("a",x,[s("图标地址"),a(e)])])]),q,w,n("p",null,[s("在"),a(p,{to:"/guide/vuepress/guide.html#%E5%AE%89%E8%A3%85vuepress"},{default:i(()=>[s("这一步")]),_:1}),s("中如果选择了gitflow那就很方便了。如果没有选择，那就重新安装一遍吧。")]),E,n("ul",null,[n("li",null,[a(p,{to:"/guide/vuepress/gitpages-setting.html"},{default:i(()=>[s("关于GitPages配置")]),_:1})])])])}const N=c(r,[["render",B],["__file","1.guide.html.vue"]]);export{N as default};
