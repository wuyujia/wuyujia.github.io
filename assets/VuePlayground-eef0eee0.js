import{O as p,g as d,_ as v}from"./app-c4a71b0c.js";import{c,r as n,y as f,h as m,o as y,j as a}from"./framework-fecba85b.js";const g=e=>d({},{showCompileOutput:!1,clearConsole:!1,ssr:!1},JSON.parse(decodeURIComponent(e)));var R=c({name:"VuePlayground",props:{title:{type:String,default:""},files:{type:String,required:!0},settings:{type:String,default:"{}"}},setup(e){const s=n(!0),t=f(),l=n(),o=m(()=>g(e.settings)),r=async()=>{const{ReplStore:u,Repl:i}=await v(()=>import("./vue-repl-3657fd62.js"),["assets/vue-repl-3657fd62.js","assets/app-c4a71b0c.js","assets/framework-fecba85b.js"]);t.value=i,l.value=new u({serializedState:decodeURIComponent(e.files)}),o.value.vueVersion&&await l.value.setVueVersion(o.value.vueVersion)};return y(async()=>{await r(),s.value=!1}),()=>[a("div",{class:"vue-playground-wrapper"},[e.title?a("div",{class:"header"},decodeURIComponent(e.title)):null,a("div",{class:"repl-container"},[s.value?a(p,{class:"preview-loading",height:192}):null,t.value?a(t.value,{store:l.value,autoResize:!0,...o.value,layout:"horizontal"}):null])])]}});export{R as default};
