var h=Uint8Array,b=Uint16Array,re=Uint32Array,ne=new h([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),ae=new h([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Ce=new h([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),te=function(e,n){for(var r=new b(31),a=0;a<31;++a)r[a]=n+=1<<e[a-1];for(var o=new re(r[30]),a=1;a<30;++a)for(var f=r[a];f<r[a+1];++f)o[f]=f-r[a]<<5|a;return[r,o]},oe=te(ne,2),ie=oe[0],be=oe[1];ie[28]=258,be[258]=28;for(var Ie=te(ae,0),de=Ie[0],z=new b(32768),u=0;u<32768;++u){var C=(u&43690)>>>1|(u&21845)<<1;C=(C&52428)>>>2|(C&13107)<<2,C=(C&61680)>>>4|(C&3855)<<4,z[u]=((C&65280)>>>8|(C&255)<<8)>>>1}for(var k=function(e,n,r){for(var a=e.length,o=0,f=new b(n);o<a;++o)e[o]&&++f[e[o]-1];var v=new b(n);for(o=0;o<n;++o)v[o]=v[o-1]+f[o-1]<<1;var l;if(r){l=new b(1<<n);var i=15-n;for(o=0;o<a;++o)if(e[o])for(var t=o<<4|e[o],s=n-e[o],c=v[e[o]-1]++<<s,g=c|(1<<s)-1;c<=g;++c)l[z[c]>>>i]=t}else for(l=new b(a),o=0;o<a;++o)e[o]&&(l[o]=z[v[e[o]-1]++]>>>15-e[o]);return l},x=new h(288),u=0;u<144;++u)x[u]=8;for(var u=144;u<256;++u)x[u]=9;for(var u=256;u<280;++u)x[u]=7;for(var u=280;u<288;++u)x[u]=8;for(var fe=new h(32),u=0;u<32;++u)fe[u]=5;var me=k(x,9,1),Te=k(fe,5,1),D=function(e){for(var n=e[0],r=1;r<e.length;++r)e[r]>n&&(n=e[r]);return n},w=function(e,n,r){var a=n/8|0;return(e[a]|e[a+1]<<8)>>(n&7)&r},j=function(e,n){var r=n/8|0;return(e[r]|e[r+1]<<8|e[r+2]<<16)>>(n&7)},Se=function(e){return(e+7)/8|0},H=function(e,n,r){(n==null||n<0)&&(n=0),(r==null||r>e.length)&&(r=e.length);var a=new(e.BYTES_PER_ELEMENT==2?b:e.BYTES_PER_ELEMENT==4?re:h)(r-n);return a.set(e.subarray(n,r)),a},ke=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],O=function(e,n,r){var a=new Error(n||ke[e]);if(a.code=e,Error.captureStackTrace&&Error.captureStackTrace(a,O),!r)throw a;return a},xe=function(e,n,r){var a=e.length;if(!a||r&&r.f&&!r.l)return n||new h(0);var o=!n||r,f=!r||r.i;r||(r={}),n||(n=new h(a*3));var v=function(V){var Z=n.length;if(V>Z){var ee=new h(Math.max(Z*2,V));ee.set(n),n=ee}},l=r.f||0,i=r.p||0,t=r.b||0,s=r.l,c=r.d,g=r.m,m=r.n,A=a*8;do{if(!s){l=w(e,i,1);var N=w(e,i+1,3);if(i+=3,N)if(N==1)s=me,c=Te,g=9,m=5;else if(N==2){var P=w(e,i,31)+257,J=w(e,i+10,15)+4,L=P+w(e,i+5,31)+1;i+=14;for(var T=new h(L),U=new h(19),p=0;p<J;++p)U[Ce[p]]=w(e,i+p*3,7);i+=J*3;for(var W=D(U),we=(1<<W)-1,Oe=k(U,W,1),p=0;p<L;){var Y=Oe[w(e,i,we)];i+=Y&15;var y=Y>>>4;if(y<16)T[p++]=y;else{var I=0,F=0;for(y==16?(F=3+w(e,i,3),i+=2,I=T[p-1]):y==17?(F=3+w(e,i,7),i+=3):y==18&&(F=11+w(e,i,127),i+=7);F--;)T[p++]=I}}var q=T.subarray(0,P),E=T.subarray(P);g=D(q),m=D(E),s=k(q,g,1),c=k(E,m,1)}else O(1);else{var y=Se(i)+4,_=e[y-4]|e[y-3]<<8,Q=y+_;if(Q>a){f&&O(0);break}o&&v(t+_),n.set(e.subarray(y,Q),t),r.b=t+=_,r.p=i=Q*8,r.f=l;continue}if(i>A){f&&O(0);break}}o&&v(t+131072);for(var ye=(1<<g)-1,Ee=(1<<m)-1,M=i;;M=i){var I=s[j(e,i)&ye],d=I>>>4;if(i+=I&15,i>A){f&&O(0);break}if(I||O(2),d<256)n[t++]=d;else if(d==256){M=i,s=null;break}else{var X=d-254;if(d>264){var p=d-257,S=ne[p];X=w(e,i,(1<<S)-1)+ie[p],i+=S}var R=c[j(e,i)&Ee],B=R>>>4;R||O(3),i+=R&15;var E=de[B];if(B>3){var S=ae[B];E+=j(e,i)&(1<<S)-1,i+=S}if(i>A){f&&O(0);break}o&&v(t+131072);for(var K=t+X;t<K;t+=4)n[t]=n[t-E],n[t+1]=n[t+1-E],n[t+2]=n[t+2-E],n[t+3]=n[t+3-E];t=K}}r.l=s,r.p=M,r.b=t,r.f=l,s&&(l=1,r.m=g,r.d=c,r.n=m)}while(!l);return t==n.length?n:H(n,0,t)},Fe=new h(0),$e=function(e){((e[0]&15)!=8||e[0]>>>4>7||(e[0]<<8|e[1])%31)&&O(6,"invalid zlib data"),e[1]&32&&O(6,"invalid zlib data: preset dictionaries not supported")};function Ae(e,n){return xe(($e(e),e.subarray(2,-4)),n)}var le=typeof TextEncoder<"u"&&new TextEncoder,G=typeof TextDecoder<"u"&&new TextDecoder;try{G.decode(Fe,{stream:!0})}catch{}var Ne=function(e){for(var n="",r=0;;){var a=e[r++],o=(a>127)+(a>223)+(a>239);if(r+o>e.length)return[n,H(e,r-1)];o?o==3?(a=((a&15)<<18|(e[r++]&63)<<12|(e[r++]&63)<<6|e[r++]&63)-65536,n+=String.fromCharCode(55296|a>>10,56320|a&1023)):o&1?n+=String.fromCharCode((a&31)<<6|e[r++]&63):n+=String.fromCharCode((a&15)<<12|(e[r++]&63)<<6|e[r++]&63):n+=String.fromCharCode(a)}};function _e(e,n){if(n){for(var r=new h(e.length),a=0;a<e.length;++a)r[a]=e.charCodeAt(a);return r}if(le)return le.encode(e);for(var o=e.length,f=new h(e.length+(e.length>>1)),v=0,l=function(s){f[v++]=s},a=0;a<o;++a){if(v+5>f.length){var i=new h(v+8+(o-a<<1));i.set(f),f=i}var t=e.charCodeAt(a);t<128||n?l(t):t<2048?(l(192|t>>6),l(128|t&63)):t>55295&&t<57344?(t=65536+(t&1023<<10)|e.charCodeAt(++a)&1023,l(240|t>>18),l(128|t>>12&63),l(128|t>>6&63),l(128|t&63)):(l(224|t>>12),l(128|t>>6&63),l(128|t&63))}return H(f,0,v)}function Qe(e,n){if(n){for(var r="",a=0;a<e.length;a+=16384)r+=String.fromCharCode.apply(null,e.subarray(a,a+16384));return r}else{if(G)return G.decode(e);var o=Ne(e),f=o[0],v=o[1];return v.length&&O(8),f}}function Pe(e){return e}const ve=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},ue="__vueuse_ssr_handlers__";ve[ue]=ve[ue]||{};var se;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})(se||(se={}));var Ue=Object.defineProperty,ce=Object.getOwnPropertySymbols,Me=Object.prototype.hasOwnProperty,Re=Object.prototype.propertyIsEnumerable,he=(e,n,r)=>n in e?Ue(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r,Be=(e,n)=>{for(var r in n||(n={}))Me.call(n,r)&&he(e,r,n[r]);if(ce)for(var r of ce(n))Re.call(n,r)&&he(e,r,n[r]);return e};const ze={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};Be({linear:Pe},ze);const ge=Object.entries,De=Object.keys,je=e=>{const n=atob(e);return Qe(Ae(_e(n,!0)))},$=(e,n)=>{const r=e.toLowerCase(),a=n.toLowerCase(),o=[];let f=0,v=0;const l=(t,s=!1)=>{let c="";v===0?c=t.length>20?`… ${t.slice(-20)}`:t:s?c=t.length+v>100?`${t.slice(0,100-v)}… `:t:c=t.length>20?`${t.slice(0,20)} … ${t.slice(-20)}`:t,c&&o.push(c),v+=c.length,s||(o.push(["strong",n]),v+=n.length,v>=100&&o.push(" …"))};let i=r.indexOf(a,f);if(i===-1)return null;for(;i>=0;){const t=i+a.length;if(l(e.slice(f,i)),f=t,v>100)break;i=r.indexOf(a,f)}return v<100&&l(e.slice(f),!0),o},pe=e=>e.reduce((n,{type:r})=>n+(r==="title"?50:r==="heading"?20:r==="custom"?10:1),0),He=(e,n)=>{var r;const a={};for(const[o,f]of ge(n)){const v=((r=n[o.replace(/\/[^\\]*$/,"")])==null?void 0:r.title)||"",l=`${v?`${v} > `:""}${f.title}`,i=$(f.title,e);i&&(a[l]=[...a[l]||[],{type:"title",path:o,display:i}]),f.customFields&&ge(f.customFields).forEach(([t,s])=>{s.forEach(c=>{const g=$(c,e);g&&(a[l]=[...a[l]||[],{type:"custom",path:o,index:t,display:g}])})});for(const t of f.contents){const s=$(t.header,e);s&&(a[l]=[...a[l]||[],{type:"heading",path:o+(t.slug?`#${t.slug}`:""),display:s}]);for(const c of t.contents){const g=$(c,e);g&&(a[l]=[...a[l]||[],{type:"content",header:t.header,path:o+(t.slug?`#${t.slug}`:""),display:g}])}}}return De(a).sort((o,f)=>pe(a[o])-pe(a[f])).map(o=>({title:o,contents:a[o]}))},Ge=JSON.parse(je("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"));self.onmessage=({data:e})=>{self.postMessage(He(e.query,Ge[e.routeLocale]))};
//# sourceMappingURL=minify.js.map
