import{_ as s,W as t,X as i,Y as e,Z as n,$ as r,a1 as c,C as o}from"./framework-817d905c.js";const l={},d=e("h2",{id:"arthas-介绍及下载",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#arthas-介绍及下载","aria-hidden":"true"},"#"),n(" Arthas 介绍及下载")],-1),p={href:"https://arthas.aliyun.com/doc/",target:"_blank",rel:"noopener noreferrer"},m=c(`<h2 id="实战实用命令合集" tabindex="-1"><a class="header-anchor" href="#实战实用命令合集" aria-hidden="true">#</a> 实战实用命令合集</h2><h3 id="ognl" tabindex="-1"><a class="header-anchor" href="#ognl" aria-hidden="true">#</a> OGNL</h3><h4 id="获取-spring-容器对象并执行函数" tabindex="-1"><a class="header-anchor" href="#获取-spring-容器对象并执行函数" aria-hidden="true">#</a> 获取 Spring 容器对象并执行函数</h4><p>假设有一个静态类持有 <code>ApplicationContext</code> 的情况下使用命令可以获取到静态对象</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 实用sc命令查看即将获取的类的类加载器</span>
$ sc *ContextHolder

com.tb.base.context.ContextHolder
org.springframework.context.i18n.LocaleContextHolder
org.springframework.web.context.request.RequestContextHolder
<span class="token punctuation">..</span>.

<span class="token comment"># 加上 -d 参数打印这个类的详细信息</span>
$ sc <span class="token parameter variable">-d</span> com.tb.base.context.ContextHolder

<span class="token comment"># 关注 classLoader 值, 后面需要用到</span>
<span class="token punctuation">..</span>. 
 classLoaderHash   1e60daa9  
<span class="token punctuation">..</span>.


<span class="token comment"># 使用 -c 参数指定 classLoader 来执行命令</span>
$ ognl <span class="token parameter variable">-c</span> 1e60daa9 <span class="token string">&#39;#ctx=@com.tb.base.context.ContextHolder@instance().appContext&#39;</span> <span class="token comment"># 这是获取到了容器并赋值给ctx</span>

<span class="token comment"># 使用变量去执行</span>
$ ognl <span class="token parameter variable">-c</span> 1e60daa9 <span class="token string">&#39;#ctx=@com.tb.base.context.ContextHolder@instance().appContext, #ctx.getBean(&quot;memberMapper&quot;)&#39;</span>

<span class="token comment"># 直接执行</span>
$ ognl <span class="token parameter variable">-c</span> 1e60daa9 <span class="token string">&#39;#ctx=@com.tb.base.context.ContextHolder@instance().appContext.getBean(&quot;memberMapper&quot;).memberAddAdviser(4L, 1L)&#39;</span>
$ ognl <span class="token parameter variable">-c</span> <span class="token number">41114410</span> <span class="token string">&#39;#ctx=@com.tb.base.context.ContextHolder@instance().appContext.getBean(&quot;memberMapper&quot;).memberAddAdviser(4L, 1L)&#39;</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function v(b,u){const a=o("ExternalLinkIcon");return t(),i("div",null,[d,e("p",null,[e("a",p,[n("https://arthas.aliyun.com/doc/"),r(a)])]),m])}const x=s(l,[["render",v],["__file","index.html.vue"]]);export{x as default};
