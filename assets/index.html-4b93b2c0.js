import{_ as r,W as d,X as l,Y as e,Z as a,$ as s,a2 as i,C as o}from"./framework-aa83d01c.js";const t={},c=e("h2",{id:"mac基础工具搭建",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#mac基础工具搭建","aria-hidden":"true"},"#"),a(" Mac基础工具搭建")],-1),h=e("h3",{id:"mac免费软件下载",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#mac免费软件下载","aria-hidden":"true"},"#"),a(" Mac免费软件下载")],-1),p={href:"https://www.macbl.com/",target:"_blank",rel:"noopener noreferrer"},u=e("h3",{id:"homebrew-安装",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#homebrew-安装","aria-hidden":"true"},"#"),a(" Homebrew 安装")],-1),b={href:"https://brew.idayer.com/",target:"_blank",rel:"noopener noreferrer"},m=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>/bin/bash <span class="token parameter variable">-c</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://gitee.com/ineo6/homebrew-install/raw/master/install.sh<span class="token variable">)</span></span>&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果遇到无法安装，例如：</p>`,2),v={href:"http://raw.githubusercontent.com",target:"_blank",rel:"noopener noreferrer"},g=i(`<p>使用如下命令先安装一遍：</p><p><code>core</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span>brew <span class="token parameter variable">--repo</span><span class="token variable">)</span></span>/Library/Taps/&quot;</span>
<span class="token function">mkdir</span> homebrew <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> homebrew
<span class="token function">git</span> clone git://mirrors.ustc.edu.cn/homebrew-core.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>cask</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span>brew <span class="token parameter variable">--repo</span><span class="token variable">)</span></span>/Library/Taps/&quot;</span>
<span class="token builtin class-name">cd</span> homebrew
<span class="token function">git</span> clone https://mirrors.ustc.edu.cn/homebrew-cask.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装完成之后再执行第一步的安装命令</p><p>最后执行一次更新操作</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>brew update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="系统资源监控工具" tabindex="-1"><a class="header-anchor" href="#系统资源监控工具" aria-hidden="true">#</a> 系统资源监控工具</h3><p>可以不装，这个就是自己看CPU和内存情况用的, <code>istat menus</code>网上可以搜到，付费软件，免费版本够用了，网盘有</p><h2 id="java开发环境搭建" tabindex="-1"><a class="header-anchor" href="#java开发环境搭建" aria-hidden="true">#</a> Java开发环境搭建</h2><p>最近刚换了新电脑，老电脑的数据又不想完全拷贝过来，在重装过程中又发现很多工具安装过程记不起来了，或者有哪些插件也不记得了。写一个笔记以免自己忘记</p><h3 id="java安装" tabindex="-1"><a class="header-anchor" href="#java安装" aria-hidden="true">#</a> Java安装</h3><p>JDK: 安项目要求安装即可，Mac系统安装完甚至连环境变量都不用配置，如果Oracle下载不了，可以考虑安装OpenJDK，使用Homebrew安装就可以了, 网盘里有JDK安装包</p><h3 id="ide安装" tabindex="-1"><a class="header-anchor" href="#ide安装" aria-hidden="true">#</a> IDE安装</h3>`,15),k=e("li",null,"Visual Studio Code: 搜索下载",-1),_=e("code",null,"IntelliJ IDEA",-1),f={href:"https://www.jetbrains.com.cn/idea/download/#section=mac",target:"_blank",rel:"noopener noreferrer"},x=e("code",null,"2023.1",-1),w=i("<li>IDEA 插件列表: <ul><li><code>Maven Dependency Helper</code>: 能够帮助分析包版本冲突, 以及快捷排除冲突项</li><li><code>MyBatisCodeHelperPro</code>: 如果项目使用 Mybatis 且同时使用 mapper.xml 文件，建议安装，能方便直接从接口到文件, 除了这款还有其它类似插件，任选即可，收费软件，但免费功能足矣</li><li><code>Free Mybatis plugin</code>: 同上，替代品</li><li><code>Gerrit</code>: 如果公司项目管理用到了就安装吧。</li><li><code>Rainbow Brackets</code>: 不光是为了括号好看，用来排查是哪个括号少了有奇效，可装可不装</li><li><code>arthas idea</code>: 配合arthas工具使用的插件，非常好用</li><li><code>GenerateSerialVersionUID</code>: 自动生成序列号ID, 用得不多，但是如果涉及到序列化反序列化就建议安装</li><li><code>Lombok</code>: 神器，建议安装，好像在插件市场搜索不到，如果找不到按如下操作也可以：打开设置（Preference）找到 Build，Execution，Deployment 找到 Compiler，找到 AnnotationProcessors 找到 Enable 开启即可，一般项目启动都会问你开不开，直接开就行。</li></ul></li>",1),y=i('<h3 id="数据库工具" tabindex="-1"><a class="header-anchor" href="#数据库工具" aria-hidden="true">#</a> 数据库工具</h3><ul><li>Navicat Premium: 网盘有</li><li>MongoDB Compass: 网盘有</li><li>Another Redis Desktop Manger: 网盘有</li></ul><h3 id="编辑器" tabindex="-1"><a class="header-anchor" href="#编辑器" aria-hidden="true">#</a> 编辑器</h3><ul><li>Sublime Text: 网盘有</li><li>Typeroa: 网盘有</li></ul><h3 id="接口测试" tabindex="-1"><a class="header-anchor" href="#接口测试" aria-hidden="true">#</a> 接口测试</h3><ul><li>Postman: 网盘有，也可以直接搜索安装</li></ul><h3 id="图床" tabindex="-1"><a class="header-anchor" href="#图床" aria-hidden="true">#</a> 图床</h3><ul><li>uPic: 搜有下载，网盘好像没有</li></ul><h3 id="画图" tabindex="-1"><a class="header-anchor" href="#画图" aria-hidden="true">#</a> 画图</h3>',9),D={href:"http://Draw.io",target:"_blank",rel:"noopener noreferrer"},M=e("li",null,"Tayasui Sketches Pro: 画画工具, 网盘有",-1),j=i(`<h3 id="服务器管理" tabindex="-1"><a class="header-anchor" href="#服务器管理" aria-hidden="true">#</a> 服务器管理</h3><ul><li>Secure CRT: 网盘有</li></ul><h2 id="nodejs-安装" tabindex="-1"><a class="header-anchor" href="#nodejs-安装" aria-hidden="true">#</a> NodeJs 安装</h2><p>直接使用命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>brew <span class="token function">install</span> <span class="token function">node</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>中间遇到了无法下载，访问不到资源的情况。然后我是硬着头皮反复执行安装的。本来想用梯子，结果梯子不好使。</p><h3 id="npm-更换源" tabindex="-1"><a class="header-anchor" href="#npm-更换源" aria-hidden="true">#</a> npm 更换源</h3><p><code>taobao源</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> config <span class="token builtin class-name">set</span> registry http://registry.npmmirror.com/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="yarn-安装" tabindex="-1"><a class="header-anchor" href="#yarn-安装" aria-hidden="true">#</a> Yarn 安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> <span class="token function">yarn</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="docker-安装" tabindex="-1"><a class="header-anchor" href="#docker-安装" aria-hidden="true">#</a> Docker 安装</h2><p><code>--cask</code>表示安装图形化界面</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>brew <span class="token function">install</span> <span class="token function">docker</span> <span class="token parameter variable">--cask</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="jupyter-notbook-安装" tabindex="-1"><a class="header-anchor" href="#jupyter-notbook-安装" aria-hidden="true">#</a> Jupyter Notbook 安装</h3><p>python 利器, 还有别的版本，这里不过是选了一个比较全的版本，占用空间很大</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull jupyter/datascience-notebook
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启动</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="nginx-安装" tabindex="-1"><a class="header-anchor" href="#nginx-安装" aria-hidden="true">#</a> Nginx 安装</h3><p>有时候使用反向代理+内网穿透测试有奇效</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="内网穿透工具" tabindex="-1"><a class="header-anchor" href="#内网穿透工具" aria-hidden="true">#</a> 内网穿透工具</h2>`,23),J=e("li",null,"花生壳: 直接搜索下载",-1),P={href:"https://ngrok.com/",target:"_blank",rel:"noopener noreferrer"},N={href:"https://www.fgnwct.com/index",target:"_blank",rel:"noopener noreferrer"},S=e("h2",{id:"vmware-fusion-12",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#vmware-fusion-12","aria-hidden":"true"},"#"),a(" VMware Fusion 12")],-1),C=e("p",null,"安装程序网盘有，热心网友激活码：NH001-8HJ06-18LJ3-0L926-98RP4",-1),E=e("h2",{id:"截图工具",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#截图工具","aria-hidden":"true"},"#"),a(" 截图工具")],-1),I=e("p",null,"iShot Pro，AppStore已购买正版，永久使用",-1);function L(q,B){const n=o("ExternalLinkIcon");return d(),l("div",null,[c,h,e("p",null,[e("a",p,[a("Mac波罗"),s(n)])]),u,e("p",null,[e("a",b,[a("参考"),s(n)])]),m,e("blockquote",null,[e("p",null,[a("curl: (7) Failed to connect to "),e("a",v,[a("raw.githubusercontent.com"),s(n)]),a(" port 443: Operation timed out")])]),g,e("ul",null,[k,e("li",null,[_,a(": "),e("a",f,[a("官方下载"),s(n)]),a(", 百度网盘有"),x,a("版本，可以直接用，破解办法也在网盘")]),w]),y,e("ul",null,[e("li",null,[e("a",D,[a("Draw.io"),s(n)]),a(": 直接使用网站或者下载离线版, 用的少了, 飞书就可以直接画了")]),M]),j,e("ul",null,[J,e("li",null,[a("ngrok: 很少用，不过也是免费的, "),e("a",P,[a("地址"),s(n)])]),e("li",null,[a("飞鸽内网穿透: 还可以，临时用用蛮不错的，"),e("a",N,[a("地址"),s(n)])])]),S,C,E,I])}const V=r(t,[["render",L],["__file","index.html.vue"]]);export{V as default};