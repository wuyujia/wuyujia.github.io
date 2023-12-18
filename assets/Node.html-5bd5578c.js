import{_ as t,W as c,X as v,$ as o,a2 as s,a1 as a,C as m,Y as n,Z as e}from"./framework-817d905c.js";const u={},b=a(`<h2 id="nvm安装-node多版本切换" tabindex="-1"><a class="header-anchor" href="#nvm安装-node多版本切换" aria-hidden="true">#</a> nvm安装（Node多版本切换）</h2><h3 id="brew-安装-nvm" tabindex="-1"><a class="header-anchor" href="#brew-安装-nvm" aria-hidden="true">#</a> brew 安装 nvm</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>brew instal nvm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装之后还不能直接使用<code>nvm</code>的命令, 需要配置一个命令加载项</p><div class="hint-container warning"><p class="hint-container-title">注意</p><p>要注意你本机用的环境变量配置文件，有的人是 <code>bash_profile</code>, 有的人是 <code>zshrc</code></p><p>如何确定？</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> ~
<span class="token function">ls</span> <span class="token parameter variable">-a</span> <span class="token operator">|</span> <span class="token function">egrep</span> <span class="token string">&#39;.*(rc|profile)&#39;</span>

<span class="token punctuation">..</span>.
.bash_profile
.npmrc
.profile
.yarnrc
.zprofile
.zshrc
.zshrc.pre-oh-my-zsh
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不一定有这么多，有<code>zshrc</code>就选<code>zshrc</code>，没有就选<code>bash_profile</code>来修改环境变量</p></div>`,5),p=n("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[n("span",{class:"token builtin class-name"},"echo"),e(),n("span",{class:"token string"},'"# nvm config"'),e(),n("span",{class:"token operator"},">>"),e(` ~/.zshrc
`),n("span",{class:"token builtin class-name"},"echo"),e(),n("span",{class:"token string"},[e('"source '),n("span",{class:"token variable"},[n("span",{class:"token variable"},"$("),e("brew "),n("span",{class:"token parameter variable"},"--prefix"),e(" nvm"),n("span",{class:"token variable"},")")]),e('/nvm.sh"')]),e(),n("span",{class:"token operator"},">>"),e(` ~/.zshrc
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),h=n("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[e("nvm "),n("span",{class:"token parameter variable"},"-v"),e(`
`),n("span",{class:"token number"},"0.39"),e(`.3
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),g=a(`<h3 id="卸载本机node、yarn环境" tabindex="-1"><a class="header-anchor" href="#卸载本机node、yarn环境" aria-hidden="true">#</a> 卸载本机Node、yarn环境</h3><p>brew uninstall node</p><h3 id="nvm-常用命令" tabindex="-1"><a class="header-anchor" href="#nvm-常用命令" aria-hidden="true">#</a> nvm 常用命令</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1. nvm list 是查找本电脑上所有的node版本
    - nvm list 查看已经安装的版本
    - nvm list installed 查看已经安装的版本
    - nvm list available 查看网络可以安装的版本
2. nvm install &lt;version&gt; 安装指定版本node
3. nvm use &lt;version&gt; 切换使用指定的版本node
4. nvm ls 列出所有版本
5. nvm current显示当前版本
6. nvm alias &lt;name&gt; &lt;version&gt; ## 给不同的版本号添加别名
7. nvm unalias &lt;name&gt; ## 删除已定义的别名
8. nvm reinstall-packages &lt;version&gt; ## 在当前版本node环境下，重新全局安装指定版本号的npm包
9. nvm on 打开nodejs控制
10. nvm off 关闭nodejs控制
11. nvm proxy 查看设置与代理
12. nvm node_mirror [url] 设置或者查看setting.txt中的node_mirror，如果不设置的默认是 https://nodejs.org/dist/
　　nvm npm_mirror [url] 设置或者查看setting.txt中的npm_mirror,如果不设置的话默认的是： https://github.com/npm/npm/archive/.
13. nvm uninstall &lt;version&gt; 卸载制定的版本
14. nvm use [version] [arch] 切换制定的node版本和位数
15. nvm root [path] 设置和查看root路径
16. nvm version 查看当前的版本
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function _(f,k){const i=m("Tabs");return c(),v("div",null,[b,o(i,{id:"22",data:[{title:"配置"},{title:"确认安装完成"}],active:0},{tab0:s(({title:l,value:r,isActive:d})=>[p]),tab1:s(({title:l,value:r,isActive:d})=>[h]),_:1}),g])}const z=t(u,[["render",_],["__file","Node.html.vue"]]);export{z as default};
