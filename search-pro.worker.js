var h=Uint8Array,b=Uint16Array,re=Uint32Array,ne=new h([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),ae=new h([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Ce=new h([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),te=function(e,n){for(var r=new b(31),a=0;a<31;++a)r[a]=n+=1<<e[a-1];for(var o=new re(r[30]),a=1;a<30;++a)for(var f=r[a];f<r[a+1];++f)o[f]=f-r[a]<<5|a;return[r,o]},oe=te(ne,2),ie=oe[0],be=oe[1];ie[28]=258,be[258]=28;for(var Ie=te(ae,0),de=Ie[0],z=new b(32768),u=0;u<32768;++u){var C=(u&43690)>>>1|(u&21845)<<1;C=(C&52428)>>>2|(C&13107)<<2,C=(C&61680)>>>4|(C&3855)<<4,z[u]=((C&65280)>>>8|(C&255)<<8)>>>1}for(var k=function(e,n,r){for(var a=e.length,o=0,f=new b(n);o<a;++o)e[o]&&++f[e[o]-1];var v=new b(n);for(o=0;o<n;++o)v[o]=v[o-1]+f[o-1]<<1;var l;if(r){l=new b(1<<n);var i=15-n;for(o=0;o<a;++o)if(e[o])for(var t=o<<4|e[o],s=n-e[o],c=v[e[o]-1]++<<s,g=c|(1<<s)-1;c<=g;++c)l[z[c]>>>i]=t}else for(l=new b(a),o=0;o<a;++o)e[o]&&(l[o]=z[v[e[o]-1]++]>>>15-e[o]);return l},x=new h(288),u=0;u<144;++u)x[u]=8;for(var u=144;u<256;++u)x[u]=9;for(var u=256;u<280;++u)x[u]=7;for(var u=280;u<288;++u)x[u]=8;for(var fe=new h(32),u=0;u<32;++u)fe[u]=5;var me=k(x,9,1),Te=k(fe,5,1),D=function(e){for(var n=e[0],r=1;r<e.length;++r)e[r]>n&&(n=e[r]);return n},w=function(e,n,r){var a=n/8|0;return(e[a]|e[a+1]<<8)>>(n&7)&r},j=function(e,n){var r=n/8|0;return(e[r]|e[r+1]<<8|e[r+2]<<16)>>(n&7)},Se=function(e){return(e+7)/8|0},H=function(e,n,r){(n==null||n<0)&&(n=0),(r==null||r>e.length)&&(r=e.length);var a=new(e.BYTES_PER_ELEMENT==2?b:e.BYTES_PER_ELEMENT==4?re:h)(r-n);return a.set(e.subarray(n,r)),a},ke=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],O=function(e,n,r){var a=new Error(n||ke[e]);if(a.code=e,Error.captureStackTrace&&Error.captureStackTrace(a,O),!r)throw a;return a},xe=function(e,n,r){var a=e.length;if(!a||r&&r.f&&!r.l)return n||new h(0);var o=!n||r,f=!r||r.i;r||(r={}),n||(n=new h(a*3));var v=function(V){var Z=n.length;if(V>Z){var ee=new h(Math.max(Z*2,V));ee.set(n),n=ee}},l=r.f||0,i=r.p||0,t=r.b||0,s=r.l,c=r.d,g=r.m,m=r.n,A=a*8;do{if(!s){l=w(e,i,1);var N=w(e,i+1,3);if(i+=3,N)if(N==1)s=me,c=Te,g=9,m=5;else if(N==2){var P=w(e,i,31)+257,J=w(e,i+10,15)+4,L=P+w(e,i+5,31)+1;i+=14;for(var T=new h(L),U=new h(19),p=0;p<J;++p)U[Ce[p]]=w(e,i+p*3,7);i+=J*3;for(var W=D(U),we=(1<<W)-1,Oe=k(U,W,1),p=0;p<L;){var Y=Oe[w(e,i,we)];i+=Y&15;var y=Y>>>4;if(y<16)T[p++]=y;else{var I=0,F=0;for(y==16?(F=3+w(e,i,3),i+=2,I=T[p-1]):y==17?(F=3+w(e,i,7),i+=3):y==18&&(F=11+w(e,i,127),i+=7);F--;)T[p++]=I}}var q=T.subarray(0,P),E=T.subarray(P);g=D(q),m=D(E),s=k(q,g,1),c=k(E,m,1)}else O(1);else{var y=Se(i)+4,_=e[y-4]|e[y-3]<<8,Q=y+_;if(Q>a){f&&O(0);break}o&&v(t+_),n.set(e.subarray(y,Q),t),r.b=t+=_,r.p=i=Q*8,r.f=l;continue}if(i>A){f&&O(0);break}}o&&v(t+131072);for(var ye=(1<<g)-1,Ee=(1<<m)-1,M=i;;M=i){var I=s[j(e,i)&ye],d=I>>>4;if(i+=I&15,i>A){f&&O(0);break}if(I||O(2),d<256)n[t++]=d;else if(d==256){M=i,s=null;break}else{var X=d-254;if(d>264){var p=d-257,S=ne[p];X=w(e,i,(1<<S)-1)+ie[p],i+=S}var R=c[j(e,i)&Ee],B=R>>>4;R||O(3),i+=R&15;var E=de[B];if(B>3){var S=ae[B];E+=j(e,i)&(1<<S)-1,i+=S}if(i>A){f&&O(0);break}o&&v(t+131072);for(var K=t+X;t<K;t+=4)n[t]=n[t-E],n[t+1]=n[t+1-E],n[t+2]=n[t+2-E],n[t+3]=n[t+3-E];t=K}}r.l=s,r.p=M,r.b=t,r.f=l,s&&(l=1,r.m=g,r.d=c,r.n=m)}while(!l);return t==n.length?n:H(n,0,t)},Fe=new h(0),$e=function(e){((e[0]&15)!=8||e[0]>>>4>7||(e[0]<<8|e[1])%31)&&O(6,"invalid zlib data"),e[1]&32&&O(6,"invalid zlib data: preset dictionaries not supported")};function Ae(e,n){return xe(($e(e),e.subarray(2,-4)),n)}var le=typeof TextEncoder<"u"&&new TextEncoder,G=typeof TextDecoder<"u"&&new TextDecoder;try{G.decode(Fe,{stream:!0})}catch{}var Ne=function(e){for(var n="",r=0;;){var a=e[r++],o=(a>127)+(a>223)+(a>239);if(r+o>e.length)return[n,H(e,r-1)];o?o==3?(a=((a&15)<<18|(e[r++]&63)<<12|(e[r++]&63)<<6|e[r++]&63)-65536,n+=String.fromCharCode(55296|a>>10,56320|a&1023)):o&1?n+=String.fromCharCode((a&31)<<6|e[r++]&63):n+=String.fromCharCode((a&15)<<12|(e[r++]&63)<<6|e[r++]&63):n+=String.fromCharCode(a)}};function _e(e,n){if(n){for(var r=new h(e.length),a=0;a<e.length;++a)r[a]=e.charCodeAt(a);return r}if(le)return le.encode(e);for(var o=e.length,f=new h(e.length+(e.length>>1)),v=0,l=function(s){f[v++]=s},a=0;a<o;++a){if(v+5>f.length){var i=new h(v+8+(o-a<<1));i.set(f),f=i}var t=e.charCodeAt(a);t<128||n?l(t):t<2048?(l(192|t>>6),l(128|t&63)):t>55295&&t<57344?(t=65536+(t&1023<<10)|e.charCodeAt(++a)&1023,l(240|t>>18),l(128|t>>12&63),l(128|t>>6&63),l(128|t&63)):(l(224|t>>12),l(128|t>>6&63),l(128|t&63))}return H(f,0,v)}function Qe(e,n){if(n){for(var r="",a=0;a<e.length;a+=16384)r+=String.fromCharCode.apply(null,e.subarray(a,a+16384));return r}else{if(G)return G.decode(e);var o=Ne(e),f=o[0],v=o[1];return v.length&&O(8),f}}function Pe(e){return e}const ve=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},ue="__vueuse_ssr_handlers__";ve[ue]=ve[ue]||{};var se;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})(se||(se={}));var Ue=Object.defineProperty,ce=Object.getOwnPropertySymbols,Me=Object.prototype.hasOwnProperty,Re=Object.prototype.propertyIsEnumerable,he=(e,n,r)=>n in e?Ue(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r,Be=(e,n)=>{for(var r in n||(n={}))Me.call(n,r)&&he(e,r,n[r]);if(ce)for(var r of ce(n))Re.call(n,r)&&he(e,r,n[r]);return e};const ze={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};Be({linear:Pe},ze);const ge=Object.entries,De=Object.keys,je=e=>{const n=atob(e);return Qe(Ae(_e(n,!0)))},$=(e,n)=>{const r=e.toLowerCase(),a=n.toLowerCase(),o=[];let f=0,v=0;const l=(t,s=!1)=>{let c="";v===0?c=t.length>20?`… ${t.slice(-20)}`:t:s?c=t.length+v>100?`${t.slice(0,100-v)}… `:t:c=t.length>20?`${t.slice(0,20)} … ${t.slice(-20)}`:t,c&&o.push(c),v+=c.length,s||(o.push(["strong",n]),v+=n.length,v>=100&&o.push(" …"))};let i=r.indexOf(a,f);if(i===-1)return null;for(;i>=0;){const t=i+a.length;if(l(e.slice(f,i)),f=t,v>100)break;i=r.indexOf(a,f)}return v<100&&l(e.slice(f),!0),o},pe=e=>e.reduce((n,{type:r})=>n+(r==="title"?50:r==="heading"?20:r==="custom"?10:1),0),He=(e,n)=>{var r;const a={};for(const[o,f]of ge(n)){const v=((r=n[o.replace(/\/[^\\]*$/,"")])==null?void 0:r.title)||"",l=`${v?`${v} > `:""}${f.title}`,i=$(f.title,e);i&&(a[l]=[...a[l]||[],{type:"title",path:o,display:i}]),f.customFields&&ge(f.customFields).forEach(([t,s])=>{s.forEach(c=>{const g=$(c,e);g&&(a[l]=[...a[l]||[],{type:"custom",path:o,index:t,display:g}])})});for(const t of f.contents){const s=$(t.header,e);s&&(a[l]=[...a[l]||[],{type:"heading",path:o+(t.slug?`#${t.slug}`:""),display:s}]);for(const c of t.contents){const g=$(c,e);g&&(a[l]=[...a[l]||[],{type:"content",header:t.header,path:o+(t.slug?`#${t.slug}`:""),display:g}])}}}return De(a).sort((o,f)=>pe(a[o])-pe(a[f])).map(o=>({title:o,contents:a[o]}))},Ge=JSON.parse(je("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"));self.onmessage=({data:e})=>{self.postMessage(He(e.query,Ge[e.routeLocale]))};
//# sourceMappingURL=minify.js.map
