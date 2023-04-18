const f=(e,s)=>{const n=e.toLowerCase(),o=s.toLowerCase(),a=[];let l=0,r=0;const u=(t,p=!1)=>{let c="";r===0?c=t.length>20?`… ${t.slice(-20)}`:t:p?c=t.length+r>100?`${t.slice(0,100-r)}… `:t:c=t.length>20?`${t.slice(0,20)} … ${t.slice(-20)}`:t,c&&a.push(c),r+=c.length,p||(a.push(["strong",s]),r+=s.length,r>=100&&a.push(" …"))};let i=n.indexOf(o,l);if(i===-1)return null;for(;i>=0;){const t=i+o.length;if(u(e.slice(l,i)),l=t,r>100)break;i=n.indexOf(o,l)}return r<100&&u(e.slice(l),!0),a};function $(e){return e}const h=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},d="__vueuse_ssr_handlers__";h[d]=h[d]||{};var g;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})(g||(g={}));var m=Object.defineProperty,y=Object.getOwnPropertySymbols,w=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable,I=(e,s,n)=>s in e?m(e,s,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[s]=n,N=(e,s)=>{for(var n in s||(s={}))w.call(s,n)&&I(e,n,s[n]);if(y)for(var n of y(s))C.call(s,n)&&I(e,n,s[n]);return e};const Q={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};N({linear:$},Q);const b=Object.entries,v=Object.keys,E=e=>e.reduce((s,{type:n})=>s+(n==="title"?50:n==="heading"?20:n==="custom"?10:1),0),_=(e,s)=>{var n;const o={};for(const[a,l]of b(s)){const r=((n=s[a.replace(/\/[^\\]*$/,"")])==null?void 0:n.title)||"",u=`${r?`${r} > `:""}${l.title}`,i=f(l.title,e);i&&(o[u]=[...o[u]||[],{type:"title",path:a,display:i}]),l.customFields&&b(l.customFields).forEach(([t,p])=>{p.forEach(c=>{const O=f(c,e);O&&(o[u]=[...o[u]||[],{type:"custom",path:a,index:t,display:O}])})});for(const t of l.contents){const p=f(t.header,e);p&&(o[u]=[...o[u]||[],{type:"heading",path:a+(t.slug?`#${t.slug}`:""),display:p}]);for(const c of t.contents){const O=f(c,e);O&&(o[u]=[...o[u]||[],{type:"content",header:t.header,path:a+(t.slug?`#${t.slug}`:""),display:O}])}}}return v(o).sort((a,l)=>E(o[a])-E(o[l])).map(a=>({title:a,contents:o[a]}))},j=JSON.parse("{\"/\":{\"/\":{\"title\":\"首页\",\"contents\":[]},\"/slides.html\":{\"title\":\"幻灯片页\",\"contents\":[]},\"/demo/\":{\"title\":\"主要功能与配置演示\",\"contents\":[]},\"/demo/disable.html\":{\"title\":\"布局与功能禁用\",\"contents\":[]},\"/demo/encrypt.html\":{\"title\":\"密码加密的文章\",\"contents\":[]},\"/demo/markdown.html\":{\"title\":\"Markdown 展示\",\"contents\":[{\"header\":\"\",\"slug\":\"\",\"contents\":[\"VuePress 主要从 Markdown 文件生成页面。因此，你可以使用它轻松生成文档或博客站点。\"]},{\"header\":\"Markdown 介绍\",\"slug\":\"markdown-介绍\",\"contents\":[]},{\"header\":\"Markdown 配置\",\"slug\":\"markdown-配置\",\"contents\":[]},{\"header\":\"Markdown 扩展\",\"slug\":\"markdown-扩展\",\"contents\":[]},{\"header\":\"VuePress 扩展\",\"slug\":\"vuepress-扩展\",\"contents\":[]},{\"header\":\"主题扩展\",\"slug\":\"主题扩展\",\"contents\":[]},{\"header\":\"自定义容器\",\"slug\":\"自定义容器\",\"contents\":[]},{\"header\":\"代码块\",\"slug\":\"代码块\",\"contents\":[]},{\"header\":\"上下角标\",\"slug\":\"上下角标\",\"contents\":[]},{\"header\":\"自定义对齐\",\"slug\":\"自定义对齐\",\"contents\":[]},{\"header\":\"Attrs\",\"slug\":\"attrs\",\"contents\":[]},{\"header\":\"脚注\",\"slug\":\"脚注\",\"contents\":[]},{\"header\":\"标记\",\"slug\":\"标记\",\"contents\":[]},{\"header\":\"任务列表\",\"slug\":\"任务列表\",\"contents\":[]},{\"header\":\"图片增强\",\"slug\":\"图片增强\",\"contents\":[]},{\"header\":\"卡片\",\"slug\":\"卡片\",\"contents\":[]},{\"header\":\"图表\",\"slug\":\"图表\",\"contents\":[]},{\"header\":\"Echarts\",\"slug\":\"echarts\",\"contents\":[]},{\"header\":\"流程图\",\"slug\":\"流程图\",\"contents\":[]},{\"header\":\"Mermaid\",\"slug\":\"mermaid\",\"contents\":[]},{\"header\":\"Tex 语法\",\"slug\":\"tex-语法\",\"contents\":[]},{\"header\":\"导入文件\",\"slug\":\"导入文件\",\"contents\":[]},{\"header\":\"代码演示\",\"slug\":\"代码演示\",\"contents\":[]},{\"header\":\"样式化\",\"slug\":\"样式化\",\"contents\":[]},{\"header\":\"交互演示\",\"slug\":\"交互演示\",\"contents\":[]},{\"header\":\"Vue 交互演示\",\"slug\":\"vue-交互演示\",\"contents\":[]}]},\"/demo/page.html\":{\"title\":\"页面配置\",\"contents\":[{\"header\":\"页面信息\",\"slug\":\"页面信息\",\"contents\":[]},{\"header\":\"页面内容\",\"slug\":\"页面内容\",\"contents\":[]}]},\"/java/\":{\"title\":\"Java\",\"contents\":[]},\"/mysql/Command.html\":{\"title\":\"MySQL命令收集\",\"contents\":[{\"header\":\"数据库信息查询\",\"slug\":\"数据库信息查询\",\"contents\":[]},{\"header\":\"数据库所有表信息查询\",\"slug\":\"数据库所有表信息查询\",\"contents\":[]}]},\"/mysql/\":{\"title\":\"MySQL\",\"contents\":[]},\"/utils/\":{\"title\":\"工具收集\",\"contents\":[]},\"/guide/vuepress/1.guide.html\":{\"title\":\"搭建步骤\",\"contents\":[{\"header\":\"说明\",\"slug\":\"说明\",\"contents\":[]},{\"header\":\"安装NodeJS环境和Yarn管理器\",\"slug\":\"安装nodejs环境和yarn管理器\",\"contents\":[]},{\"header\":\"安装VuePress\",\"slug\":\"安装vuepress\",\"contents\":[]},{\"header\":\"配置全局搜索框\",\"slug\":\"配置全局搜索框\",\"contents\":[]},{\"header\":\"配置代码复制\",\"slug\":\"配置代码复制\",\"contents\":[]},{\"header\":\"导航配置\",\"slug\":\"导航配置\",\"contents\":[]},{\"header\":\"侧边栏配置\",\"slug\":\"侧边栏配置\",\"contents\":[]},{\"header\":\"可选图标内容\",\"slug\":\"可选图标内容\",\"contents\":[]},{\"header\":\"部署发版到Github配置\",\"slug\":\"部署发版到github配置\",\"contents\":[]},{\"header\":\"在GitHub编辑此页配置\",\"slug\":\"在github编辑此页配置\",\"contents\":[]}]},\"/guide/vuepress/2.gitpages-setting.html\":{\"title\":\"Git Pages设置\",\"contents\":[{\"header\":\"创建Github账号\",\"slug\":\"创建github账号\",\"contents\":[]}]},\"/java/Spring/\":{\"title\":\"Spring\",\"contents\":[]},\"/java/Spring/IOC/\":{\"title\":\"IOC 容器\",\"contents\":[{\"header\":\"IOC概念及原理\",\"slug\":\"ioc概念及原理\",\"contents\":[]},{\"header\":\"IOC容器的类型\",\"slug\":\"ioc容器的类型\",\"contents\":[]},{\"header\":\"Bean的定义\",\"slug\":\"bean的定义\",\"contents\":[]},{\"header\":\"Bean 的作用域\",\"slug\":\"bean-的作用域\",\"contents\":[]}]}}}");self.onmessage=({data:e})=>{self.postMessage(_(e.query,j[e.routeLocale]))};
//# sourceMappingURL=original.js.map