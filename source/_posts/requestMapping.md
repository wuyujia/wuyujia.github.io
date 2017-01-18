---
title: RequestMapping 属性解释
date: 2017-01-18 21:39:06
tags:
- springmvc
- annotation
categories:
- springmvc
- annotation
---



这是我个人在工作中使用requestMapping的时候产生的疑问, 然后查查资料自己总结在工作中能使用的方面, 并不全, 我个人是为了解决一些问题才会做一些资料的查询和搜集, 如果要系统的学习的话, 还是建议看看专业书籍  

### 源码

```java  
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Mapping
public @interface RequestMapping { 
	String[] value() default {};              
	String[] params() default {};        
	String[] headers() default {};        
	String[] consumes() default {};        
	String[] produces() default {};  
	RequestMethod[] method() default {};  
}
```  

单词解释:  

```java
Retention: 保留  
produces: 产生  
consume: 消费, 消耗  
```  


`@RequestMapping`  

RequestMapping是一个用来处理请求地址映射的注解，可用于类或方法上。用于类上，表示类中的所有响应请求的方法都是以该地址作为父路径。

RequestMapping注解有六个属性，下面分别进行说明。 
 
### value: 
> 
指定请求的实际地址，指定的地址可以是URI Template 模式（后面将会说明);    
@RequestMapping(value = "/test")  


### method:  
>指定请求的method类型， GET、POST、PUT、DELETE等；  
@RequestMapping(value = "/test", method = RequetMethod.GET)  

### consumes:
>指定处理请求的提交内容类型（Content-Type），例如application/json, text/html;  
>  
```java
@Controller    
@RequestMapping(	value = "/users", 
					method = RequestMethod.POST, 
					consumes="application/json")    
@ResponseBody  
public List<User> addUser(@RequestBody User userl) {            
	// implementation omitted        
	return List<User> users;  
}
```  
>此方法仅处理request Content-Type为"application/json"类型的请求


### produces:
>指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回； (相当于指定当前请求的返回Content-Type类型)  
>
```java
@Controller    
@RequestMapping(	value = "/users", 
					method = RequestMethod.POST,
					produces="application/json")    
					@ResponseBody  
public List<User> addUser(@RequestBody User userl) {            
	// implementation omitted        
	return List<User> users;  
}
```  
>此方法产生Content-Type为"application/json"类型的响应  



(这里网上许多人说prodcues是只处理对应格式的请求, 但我认为是错的, 按照我理解的意思, produces本身就是产生的意思, 添加produces应该是指定返回值类型为json, 而consumer才是指定接受参数的媒体类型, 实测确实如此, 如果指定了consumer, 那么请求参数类型若不是该类型, 会报出Error 415 Unsupported Media Type的错误)



### params:
>指定request中必须包含某些参数值是，才让该方法处理。
>
```java
@RequestMapping(	value = "/test/{userId}", 
					method = RequestMethod.GET, 
					params="myParam=myValue")    
public void findUser(@PathVariable String userId) {          
	// implementation omitted    
}
```  
>仅处理请求中包含了名为"myParam", 值为"myValue"的请求, 起到了一个过滤的作用
>
(经过测试, 如果添加了params参数, 那么在请求中一定要包含该指定才能进入方法执行, 如果没有传参, 那么会提示400错误 Error 400 Parameter conditions "hello=world" not met for actual request parameters: uid={1}, 告诉请求者, 这个参数是明确要求传的参数)


### headers:  
>指定request中必须包含某些指定的header值，才能让该方法处理请求。
>
```java
@RequestMapping(	value = "/test", 
					method = RequestMethod.GET, 
					headers="Referer=www.baidu.com")    
public void testHeaders(@PathVariable String ownerId, @PathVariable String petId){          
	// implementation omitted    
}
```  
>
当添加了Headers之后, 只有在请求头中添加上Referer=ABC这样的键值对,才能使该方法执行, 否则在调用接口的时候会出现404, 找不到该地址















