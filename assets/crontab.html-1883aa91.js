import{_ as r,W as c,X as d,$ as o,a2 as s,Y as e,Z as n,C as u}from"./framework-817d905c.js";const m={},b=e("h2",{id:"nginx日志切割",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#nginx日志切割","aria-hidden":"true"},"#"),n(" Nginx日志切割")],-1),v=e("p",null,"最好是配置在 server节点下，每个server的日志单独打印",-1),_=e("div",{class:"language-text line-numbers-mode","data-ext":"text"},[e("pre",{class:"language-text"},[e("code",null,`server {

  listen 80;
  
  ...

  if ($time_iso8601 ~ "^(\\d{4})-(\\d{2})-(\\d{2})") {
    set $year $1;
    set $month $2;
    set $day $3;
  }

  access_log /usr/local/nginx/logs/example.access_$year-$month-$day.log main;
  error_log  /usr/local/nginx/logs/example.error.log;

  ...

  location / {
    ...
  }
}

`)]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),h=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token function"},"mkdir"),n(),e("span",{class:"token parameter variable"},"-P"),n(` NG需要的目录层级结构
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),g=e("p",null,"NG日志需要往这个目录写所以需要有权限，因此，先查看nginx.conf 确定ng使用的用户，一般是www或者nobody",-1),x=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token function"},"chown"),n(),e("span",{class:"token parameter variable"},"-R"),n(` nobody:nobody 文件目录
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1);function p(f,$){const t=u("Tabs");return c(),d("div",null,[b,o(t,{id:"3",data:[{title:"vhost/\\*.conf"},{title:"目录创建"},{title:"权限修改"}],active:0},{tab0:s(({title:a,value:l,isActive:i})=>[v,_]),tab1:s(({title:a,value:l,isActive:i})=>[h]),tab2:s(({title:a,value:l,isActive:i})=>[g,x]),_:1},8,["data"])])}const y=r(m,[["render",p],["__file","crontab.html.vue"]]);export{y as default};
