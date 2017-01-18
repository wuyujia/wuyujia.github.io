---
title: http请求头 content-type
date: 2017-01-18 21:30:06
tages:
- http
- header
categories:
- http
- header
---


`Content-Type`  

MediaType，即是Internet Media Type，互联网媒体类型；也叫做MIME类型，在Http协议消息头中，使用Content-Type来表示具体请求中的媒体类型信息。  

类型格式：  
`type/subtype(;parameter)`   
type  主类型，任意的字符串，如text，如果是\*号代表所有；   
subtype 子类型，任意的字符串，如html，如果是*号代表所有；   
parameter 可选，一些参数，如Accept请求头的q参数， Content-Type的 charset参数。    
`例如： Content-Type: text/html;charset:utf-8;`  

常见的媒体格式类型如下：  

```http
    text/html ： HTML格式

    text/plain ：纯文本格式      

    text/xml ：  XML格式    

    image/gif ：gif图片格式    

    image/jpeg ：jpg图片格式

    image/png：png图片格式

以application开头的媒体格式类型：

    application/xhtml+xml ：XHTML格式   

    application/xml     ： XML数据格式   

    application/atom+xml  ：Atom XML聚合格式    

    application/json    ： JSON数据格式   

    application/pdf       ：pdf格式  

    application/msword  ： Word文档格式   

    application/octet-stream ： 二进制流数据（如常见的文件下载application/x-www-form-urlencoded ： <form encType=””>中默认的encType，form表单数据被编码为key/value格式发送到服务器（表单默认的提交数据的格式）
```  

另外一种常见的媒体格式是上传文件之时使用的：  

```http
multipart/form-data ： 需要在表单中进行文件上传时，就需要使用该格式
```  

以上就是我们在日常的开发中，经常会用到的若干content-type的内容格式。  

Content-Type在Java中的使用:  

```http
<dependency>
	<groupId>org.springframework</groupId>
	<artifactId>spring-web</artifactId>
	<version>${spring.version}</version>
</dependency>

导入spring-web包以后可以使用:

MediaType.APPLICATION_JSON_UTF8_VALUE

@RequestMapping(value = "/test", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
@ResponseBody
public String test(HttpSession session) throws Exception {
    logger.info("sessionId-------" + session.getId());
    return Result.success(SystemConfig.Swagger.SWAGGER_JSON_URL);
}

```  

具体[Content-Type](http://tool.oschina.net/commons)对照表