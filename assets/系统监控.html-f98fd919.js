import{_ as t,W as i,X as o,Y as n,Z as s,$ as e,a1 as l,C as r}from"./framework-817d905c.js";const p={},c=n("h2",{id:"参考文档",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#参考文档","aria-hidden":"true"},"#"),s(" 参考文档")],-1),d={href:"https://www.prometheus.wang/quickstart/use-grafana-create-dashboard.html",target:"_blank",rel:"noopener noreferrer"},u=n("h2",{id:"数据源采集",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#数据源采集","aria-hidden":"true"},"#"),s(" 数据源采集")],-1),v={href:"https://prometheus.io/docs/prometheus/latest/getting_started/",target:"_blank",rel:"noopener noreferrer"},m=n("h3",{id:"prometheus安装-docker",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#prometheus安装-docker","aria-hidden":"true"},"#"),s(" Prometheus安装 Docker")],-1),b=n("blockquote",null,[n("p",null,"docker pull bitnami/prometheus")],-1),k=n("h3",{id:"node-exporter安装启动",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#node-exporter安装启动","aria-hidden":"true"},"#"),s(" Node_Exporter安装启动")],-1),h=n("p",null,"创建文件夹",-1),_=n("blockquote",null,[n("p",null,"mkdir -p /opt/prometheus && cd /opt/prometheus")],-1),g={href:"https://prometheus.io/download/",target:"_blank",rel:"noopener noreferrer"},f={href:"https://github.com/prometheus/node_exporter/releases/download/v1.7.0/node_exporter-1.7.0.linux-amd64.tar.gz",target:"_blank",rel:"noopener noreferrer"},x=l(`<p>解压</p><blockquote><p>tar -zxf node_exporter-1.7.0.linux-amd64.tar.gz &amp;&amp; mv node_exporter-1.7.0.linux-amd64/node_exporter . &amp;&amp; chmod +x node_exporter</p></blockquote><p>编写启动命令至启动项</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建可执行文件</span>
<span class="token function">vim</span> /etc/rc.d/init.d/node_exporter
<span class="token comment"># 填入如下内容</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment">#</span>
<span class="token comment"># /etc/rc.d/init.d/node_exporter</span>
<span class="token comment">#</span>
<span class="token comment">#  Prometheus node exporter</span>
<span class="token comment">#</span>
<span class="token comment">#  description: Prometheus node exporter</span>
<span class="token comment">#  processname: node_exporter</span>

<span class="token comment"># Source function library.</span>
<span class="token builtin class-name">.</span> /etc/rc.d/init.d/functions

<span class="token assign-left variable">PROGNAME</span><span class="token operator">=</span>node_exporter
<span class="token assign-left variable">PROG</span><span class="token operator">=</span>/opt/prometheus/<span class="token variable">$PROGNAME</span>
<span class="token assign-left variable"><span class="token environment constant">USER</span></span><span class="token operator">=</span>root
<span class="token assign-left variable">LOGFILE</span><span class="token operator">=</span>/var/log/prometheus.log
<span class="token assign-left variable">LOCKFILE</span><span class="token operator">=</span>/var/run/<span class="token variable">$PROGNAME</span>.pid

<span class="token function-name function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;Starting <span class="token variable">$PROGNAME</span>: &quot;</span>
    <span class="token builtin class-name">cd</span> /opt/prometheus/
    daemon <span class="token parameter variable">--user</span> <span class="token environment constant">$USER</span> <span class="token parameter variable">--pidfile</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$LOCKFILE</span>&quot;</span> <span class="token string">&quot;<span class="token variable">$PROG</span> &amp;&gt;<span class="token variable">$LOGFILE</span> &amp;&quot;</span>
    <span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">$(</span>pidof proc $PROGNAME<span class="token variable">)</span></span> <span class="token operator">&gt;</span><span class="token variable">$LOCKFILE</span>
    <span class="token builtin class-name">echo</span>
<span class="token punctuation">}</span>

<span class="token function-name function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;Shutting down <span class="token variable">$PROGNAME</span>: &quot;</span>
    killproc <span class="token variable">$PROGNAME</span>
    <span class="token function">rm</span> <span class="token parameter variable">-f</span> <span class="token variable">$LOCKFILE</span>
    <span class="token builtin class-name">echo</span>
<span class="token punctuation">}</span>


<span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token keyword">in</span>
    start<span class="token punctuation">)</span>
    start
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    stop<span class="token punctuation">)</span>
    stop
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    status<span class="token punctuation">)</span>
    status <span class="token variable">$PROGNAME</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    restart<span class="token punctuation">)</span>
    stop
    start
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    reload<span class="token punctuation">)</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;Sending SIGHUP to <span class="token variable">$PROGNAME</span>&quot;</span>
    <span class="token function">kill</span> <span class="token parameter variable">-SIGHUP</span> <span class="token variable"><span class="token variable">$(</span>pidof proc $PROGNAME<span class="token variable">)</span></span><span class="token comment">#!/bin/bash</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
    *<span class="token punctuation">)</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;Usage: service node_exporter {start|stop|status|reload|restart}&quot;</span>
        <span class="token builtin class-name">exit</span> <span class="token number">1</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token keyword">esac</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 添加执行权限</span>
<span class="token function">chmod</span> +x /etc/rc.d/init.d/node_exporter

<span class="token comment"># 启动服务</span>
<span class="token function">service</span> node_exporter start

<span class="token comment"># 确认服务已启动</span>
<span class="token function">cat</span> /var/log/prometheus.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置监控节点至 <code>prometheus.yml</code></p><h2 id="数据可视化" tabindex="-1"><a class="header-anchor" href="#数据可视化" aria-hidden="true">#</a> 数据可视化</h2>`,8),q={href:"https://grafana.com/docs/grafana/latest/setup-grafana/installation/docker/",target:"_blank",rel:"noopener noreferrer"},E=n("h3",{id:"docker",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#docker","aria-hidden":"true"},"#"),s(" Docker")],-1),P=n("blockquote",null,[n("p",null,"docker pull grafana/grafana-enterprise")],-1);function $(O,G){const a=r("ExternalLinkIcon");return i(),o("div",null,[c,n("p",null,[n("a",d,[s("https://www.prometheus.wang/quickstart/use-grafana-create-dashboard.html"),e(a)])]),u,n("p",null,[n("a",v,[s("Prometheus"),e(a)]),s(" -- 将它理解为一个集中的数据仓库 各种exporter作为Prometheus的具体数据源")]),m,b,k,h,_,n("p",null,[n("a",g,[s("下载地址"),e(a)])]),n("blockquote",null,[n("p",null,[s("wget "),n("a",f,[s("https://github.com/prometheus/node_exporter/releases/download/v1.7.0/node_exporter-1.7.0.linux-amd64.tar.gz"),e(a)])])]),x,n("p",null,[n("a",q,[s("Grafana"),e(a)]),s(" -- 将 Prometheus 数据进行可视化展示")]),E,P])}const N=t(p,[["render",$],["__file","系统监控.html.vue"]]);export{N as default};
