import{_ as n,W as r,X as i,Y as s,Z as a,$ as t,a2 as d,C as l}from"./framework-aa83d01c.js";const c={},p=d(`<div class="hint-container info"><p class="hint-container-title">相关信息</p><p>这是SpringBoot版本</p></div><h2 id="_1-下载-jdbc" tabindex="-1"><a class="header-anchor" href="#_1-下载-jdbc" aria-hidden="true">#</a> 1. 下载 JDBC</h2><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token comment">&lt;!-- https://mvnrepository.com/artifact/org.apache.shardingsphere/sharding-jdbc-spring-boot-starter --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.apache.shardingsphere<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>sharding-jdbc-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>4.1.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-配置-jdbc" tabindex="-1"><a class="header-anchor" href="#_2-配置-jdbc" aria-hidden="true">#</a> 2. 配置 JDBC</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># Sharding-JDBC 数据源配置
spring.shardingsphere.datasource.names=master,slave
# 主
spring.shardingsphere.datasource.master.type=com.zaxxer.hikari.HikariDataSource
spring.shardingsphere.datasource.master.driver-class-name=com.mysql.jdbc.Driver
spring.shardingsphere.datasource.master.jdbc-url=jdbc:mysql://localhost:3306/test?characterEncoding=utf8&amp;useSSL=false&amp;serverTimezone=Asia/Shanghai
spring.shardingsphere.datasource.master.username=test
spring.shardingsphere.datasource.master.password=test
# 从
spring.shardingsphere.datasource.slave.type=com.zaxxer.hikari.HikariDataSource
spring.shardingsphere.datasource.slave.driver-class-name=com.mysql.jdbc.Driver
spring.shardingsphere.datasource.slave.jdbc-url=jdbc:mysql://localhost:3307/test?characterEncoding=utf8&amp;useSSL=false&amp;serverTimezone=Asia/Shanghai
spring.shardingsphere.datasource.slave.username=test
spring.shardingsphere.datasource.slave.password=test

# Sharding-JDBC 属性及规则配置
spring.shardingsphere.props.sql-show=false
spring.shardingsphere.rules.readwrite-splitting.data-sources.readwrite_ds.type=Static
spring.shardingsphere.rules.readwrite-splitting.data-sources.readwrite_ds.props.write-data-source-name=master
spring.shardingsphere.rules.readwrite-splitting.data-sources.readwrite_ds.props.read-data-source-names=slave
spring.shardingsphere.rules.readwrite-splitting.data-sources.readwrite_ds.load-balancer-name=round_robin
spring.shardingsphere.rules.readwrite-splitting.load-balancers.round_robin.type=ROUND_ROBIN
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-运行程序" tabindex="-1"><a class="header-anchor" href="#_3-运行程序" aria-hidden="true">#</a> 3. 运行程序</h2><p>直接启动即可</p><h2 id="_4-遇到的问题" tabindex="-1"><a class="header-anchor" href="#_4-遇到的问题" aria-hidden="true">#</a> 4. 遇到的问题</h2>`,8),o={href:"https://github.com/apache/shardingsphere/blob/5.1.0/examples/shardingsphere-jdbc-example/single-feature-example/readwrite-splitting-example/readwrite-splitting-spring-boot-mybatis-example/src/main/resources/application-readwrite-splitting.properties",target:"_blank",rel:"noopener noreferrer"};function u(g,h){const e=l("ExternalLinkIcon");return r(),i("div",null,[p,s("ol",null,[s("li",null,[a("各种类型转换异常：通过升级版本解决的，升级以前4.1.1版本，升级后5.1.0版本，两个版本对应的配置文件还不一样，折腾了很久，配置问题，参考如下： 官方配置参考："),s("a",o,[a("URL"),t(e)])])])])}const v=n(c,[["render",u],["__file","Sharding-JDBC.html.vue"]]);export{v as default};
