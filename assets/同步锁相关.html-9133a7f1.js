import{_ as n,W as s,X as a,a2 as e}from"./framework-aa83d01c.js";const t={},p=e(`<h2 id="关于单体项目在控制并发方面代码编写要注意的问题" tabindex="-1"><a class="header-anchor" href="#关于单体项目在控制并发方面代码编写要注意的问题" aria-hidden="true">#</a> 关于单体项目在控制并发方面代码编写要注意的问题</h2><p>之前也犯过类似的错误，所以更需要注意，先观察以下代码:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 生成用户文档
 */</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">generateUserDoc</span><span class="token punctuation">(</span><span class="token class-name">String</span> uid<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">User</span> user <span class="token operator">=</span> userMapper<span class="token punctuation">.</span><span class="token function">selectById</span><span class="token punctuation">(</span>uid<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>user <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span> <span class="token comment">// 找不到用户就不处理了。</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">synchronized</span><span class="token punctuation">(</span>uid<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// xxx 同步处理业务逻辑</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段代码中，我们通常会认为，只要是同一个人的生成文档需求，则排队处理，因为锁对象是<code>String</code>且字符串对象值都是相同的<code>uid</code>。 但是，在真实环境下，虽然都同为值相同的uid，但是其在堆中的地址却可能不一样。只要 <code>obj a != obj b</code>, 哪怕 <code>obj a equals obj b</code>，也不会产生同步效果</p><p>就好比</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">String</span> a <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">&quot;Hello&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

a<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
a <span class="token operator">==</span> b<span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在使用字符串的前提下，可以用以下工具来解决问题</p><blockquote><p>注意哈，这个工具还在@Beta版本。此工具来源于Google的Guava工具包</p></blockquote><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Interner</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> lock <span class="token operator">=</span> <span class="token class-name">Interners</span><span class="token punctuation">.</span><span class="token function">newWeakInterner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">HandleResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">handle</span><span class="token punctuation">(</span><span class="token class-name">String</span> uid<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token comment">// 单线程处理用户消息</span>
        <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>lock<span class="token punctuation">.</span><span class="token function">intern</span><span class="token punctuation">(</span>uid<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// xxx 业务逻辑</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token class-name">HandleResult</span><span class="token punctuation">.</span><span class="token function">success</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),c=[p];function o(l,i){return s(),a("div",null,c)}const k=n(t,[["render",o],["__file","同步锁相关.html.vue"]]);export{k as default};
