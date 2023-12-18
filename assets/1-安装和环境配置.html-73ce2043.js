import{_ as t,W as l,X as o,Y as n,Z as s,$ as e,a1 as i,C as d}from"./framework-817d905c.js";const c={},p={href:"https://flutter.cn/docs/get-started/install/macos",target:"_blank",rel:"noopener noreferrer"},r=i(`<h2 id="环境确认" tabindex="-1"><a class="header-anchor" href="#环境确认" aria-hidden="true">#</a> 环境确认</h2><p>本地环境：</p><blockquote><p>macOS Catalina: 10.15.7</p></blockquote><h2 id="安装配置" tabindex="-1"><a class="header-anchor" href="#安装配置" aria-hidden="true">#</a> 安装配置</h2><h3 id="_1-获取安装包" tabindex="-1"><a class="header-anchor" href="#_1-获取安装包" aria-hidden="true">#</a> 1. 获取安装包</h3><p>我选择从git上获取</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 目录自己定。</span>
<span class="token builtin class-name">cd</span> ~/dev
<span class="token function">git</span> clone https://github.com/flutter/flutter.git <span class="token parameter variable">-b</span> stable
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-配置环境变量" tabindex="-1"><a class="header-anchor" href="#_2-配置环境变量" aria-hidden="true">#</a> 2. 配置环境变量</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 这个依赖本地生效环境变量文件</span>
<span class="token function">vim</span> ~/.bashrc

<span class="token comment"># 添加如下内容</span>
<span class="token comment"># FLUTTER</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span>:~/dev/flutter/bin

<span class="token builtin class-name">source</span> ~/.bashrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-验证安装" tabindex="-1"><a class="header-anchor" href="#_3-验证安装" aria-hidden="true">#</a> 3. 验证安装</h3><p>通过运行以下命令来查看当前环境是否需要安装其他的依赖（如果想查看更详细的输出，增加一个 -v 参数即可）：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>flutter doctor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个命令会检查你当前的配置环境，并在命令行窗口中生成一份报告。安装 Flutter 会附带安装 Dart SDK，所以不需要再对 Dart 进行单独安装。你需要仔细阅读上述命令生成的报告，看看别漏了一些需要安装的依赖，或者需要之后执行的命令（这个会以 加粗的文本 显示出来）。</p><p>输入内容:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>flutter doctor
Downloading Darwin x64 Dart SDK from Flutter engine 54a7145303f0dd9d0f93424a2e124eb4abef5091<span class="token punctuation">..</span>.
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
<span class="token number">100</span>  208M  <span class="token number">100</span>  208M    <span class="token number">0</span>     <span class="token number">0</span>   537k      <span class="token number">0</span>  <span class="token number">0</span>:06:37  <span class="token number">0</span>:06:37 --:--:--  475k
Building flutter tool<span class="token punctuation">..</span>.
Resolving dependencies<span class="token punctuation">..</span>. <span class="token punctuation">(</span><span class="token number">2</span>:14.1s<span class="token punctuation">)</span>
Got dependencies.
Downloading Material fonts<span class="token punctuation">..</span>.                                       <span class="token number">5</span>.5s
Downloading Gradle Wrapper<span class="token punctuation">..</span>.                                    <span class="token number">1</span>,281ms
Downloading package sky_engine<span class="token punctuation">..</span>.                                   <span class="token number">4</span>.0s
Downloading flutter_patched_sdk tools<span class="token punctuation">..</span>.                            <span class="token number">8</span>.5s
Downloading flutter_patched_sdk_product tools<span class="token punctuation">..</span>.                    <span class="token number">8</span>.8s
Downloading darwin-x64 tools<span class="token punctuation">..</span>.                                    <span class="token number">76</span>.5s
Downloading libimobiledevice<span class="token punctuation">..</span>.                                  <span class="token number">1</span>,759ms
Downloading usbmuxd<span class="token punctuation">..</span>.                                           <span class="token number">1</span>,591ms
Downloading libplist<span class="token punctuation">..</span>.                                          <span class="token number">1</span>,445ms
Downloading openssl<span class="token punctuation">..</span>.                                              <span class="token number">3</span>.9s
Downloading ios-deploy<span class="token punctuation">..</span>.                                        <span class="token number">1</span>,850ms
Downloading darwin-x64/font-subset tools<span class="token punctuation">..</span>.                         <span class="token number">4</span>.8s
Doctor summary <span class="token punctuation">(</span>to see all details, run flutter doctor -v<span class="token punctuation">)</span>:
<span class="token punctuation">[</span>✓<span class="token punctuation">]</span> Flutter <span class="token punctuation">(</span>Channel stable, <span class="token number">3.16</span>.4, on Mac OS X <span class="token number">10.15</span>.7 19H2026 darwin-x64, locale zh-Hans-CN<span class="token punctuation">)</span>
<span class="token punctuation">[</span>✗<span class="token punctuation">]</span> Android toolchain - develop <span class="token keyword">for</span> Android devices
    ✗ Unable to <span class="token function">locate</span> Android SDK.
      Install Android Studio from: https://developer.android.com/studio/index.html
      On first launch it will assist you <span class="token keyword">in</span> installing the Android SDK components.
      <span class="token punctuation">(</span>or visit https://flutter.dev/docs/get-started/install/macos<span class="token comment">#android-setup for detailed instructions).</span>
      If the Android SDK has been installed to a custom location, please use
      <span class="token variable"><span class="token variable">\`</span>flutter config --android-sdk<span class="token variable">\`</span></span> to update to that location.

<span class="token punctuation">[</span>✗<span class="token punctuation">]</span> Xcode - develop <span class="token keyword">for</span> iOS and macOS
    ✗ Xcode installation is incomplete<span class="token punctuation">;</span> a full installation is necessary <span class="token keyword">for</span> iOS and macOS development.
      Download at: https://developer.apple.com/xcode/
      Or <span class="token function">install</span> Xcode via the App Store.
      Once installed, run:
        <span class="token function">sudo</span> xcode-select <span class="token parameter variable">--switch</span> /Applications/Xcode.app/Contents/Developer
        <span class="token function">sudo</span> xcodebuild <span class="token parameter variable">-runFirstLaunch</span>
    ✗ CocoaPods not installed.
        CocoaPods is used to retrieve the iOS and macOS platform side&#39;s plugin code that responds to your
        plugin usage on the Dart side.
        Without CocoaPods, plugins will not work on iOS or macOS.
        For <span class="token function">more</span> info, see https://flutter.dev/platform-plugins
      To <span class="token function">install</span> see https://guides.cocoapods.org/using/getting-started.html<span class="token comment">#installation for instructions.</span>
<span class="token punctuation">[</span>✗<span class="token punctuation">]</span> Chrome - develop <span class="token keyword">for</span> the web <span class="token punctuation">(</span>Cannot <span class="token function">find</span> Chrome executable at /Applications/Google
    Chrome.app/Contents/MacOS/Google Chrome<span class="token punctuation">)</span>
    <span class="token operator">!</span> Cannot <span class="token function">find</span> Chrome. Try setting CHROME_EXECUTABLE to a Chrome executable.
<span class="token punctuation">[</span><span class="token operator">!</span><span class="token punctuation">]</span> Android Studio <span class="token punctuation">(</span>not installed<span class="token punctuation">)</span>
<span class="token punctuation">[</span>✓<span class="token punctuation">]</span> IntelliJ IDEA Ultimate Edition <span class="token punctuation">(</span>version <span class="token number">2023.1</span><span class="token punctuation">)</span>
<span class="token punctuation">[</span>✓<span class="token punctuation">]</span> VS Code <span class="token punctuation">(</span>version <span class="token number">1.85</span>.0<span class="token punctuation">)</span>
<span class="token punctuation">[</span><span class="token operator">!</span><span class="token punctuation">]</span> Proxy Configuration
    <span class="token operator">!</span> NO_PROXY is not <span class="token builtin class-name">set</span>
<span class="token punctuation">[</span>✓<span class="token punctuation">]</span> Connected device <span class="token punctuation">(</span><span class="token number">1</span> available<span class="token punctuation">)</span>
<span class="token punctuation">[</span>✓<span class="token punctuation">]</span> Network resources

<span class="token operator">!</span> Doctor found issues <span class="token keyword">in</span> <span class="token number">5</span> categories.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>针对以上问题来分别解决。 3个严重问题</p><blockquote><ol><li>没有安卓SDK</li><li>没有Xcode</li><li>没有Chrome内核</li></ol></blockquote><p>2个警告问题</p><blockquote><ol><li>没有Android Studio</li><li>没有配置Proxy</li></ol></blockquote><h4 id="禁用匿名分析" tabindex="-1"><a class="header-anchor" href="#禁用匿名分析" aria-hidden="true">#</a> 禁用匿名分析</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>flutter config --no-analytics
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-平台配置" tabindex="-1"><a class="header-anchor" href="#_4-平台配置" aria-hidden="true">#</a> 4. 平台配置</h3><h4 id="设置ios开发环境" tabindex="-1"><a class="header-anchor" href="#设置ios开发环境" aria-hidden="true">#</a> 设置iOS开发环境</h4><h4 id="设置android开发环境" tabindex="-1"><a class="header-anchor" href="#设置android开发环境" aria-hidden="true">#</a> 设置Android开发环境</h4>`,24),u={href:"https://developer.android.google.cn/studio?hl=zh-cn",target:"_blank",rel:"noopener noreferrer"},v=n("li",null,[n("p",null,"针对以下情况，信任安卓SDK证书")],-1),m=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>✗ Android license status unknown.
Run <span class="token variable"><span class="token variable">\`</span>flutter doctor --android-licenses<span class="token variable">\`</span></span> to accept the SDK licenses.
See https://flutter.dev/docs/get-started/install/macos<span class="token comment">#android-setup for more details.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>flutter doctor --android-licenses
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5-配置ide" tabindex="-1"><a class="header-anchor" href="#_5-配置ide" aria-hidden="true">#</a> 5. 配置IDE</h3><p>vscode搜索<code>flutter</code>并安装该插件</p><h3 id="_6-创建第一个项目" tabindex="-1"><a class="header-anchor" href="#_6-创建第一个项目" aria-hidden="true">#</a> 6. 创建第一个项目</h3><h3 id="遇到的问题" tabindex="-1"><a class="header-anchor" href="#遇到的问题" aria-hidden="true">#</a> 遇到的问题</h3><p>安装Xcode：12.3版本之后，发现flutter无法连接上iOS模拟器。因此 重新回退flutter版本至3.10.7</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> e285328
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后重新执行 <code>flutter doctor</code>, 等下载完成，查看结果</p>`,9);function b(h,k){const a=d("ExternalLinkIcon");return l(),o("div",null,[n("p",null,[s("参考："),n("a",p,[s("https://flutter.cn/docs/get-started/install/macos"),e(a)])]),r,n("ol",null,[n("li",null,[n("p",null,[s("下载地址： "),n("a",u,[s("https://developer.android.google.cn/studio?hl=zh-cn"),e(a)]),s(" 安装软件")])]),v]),m])}const g=t(c,[["render",b],["__file","1-安装和环境配置.html.vue"]]);export{g as default};
