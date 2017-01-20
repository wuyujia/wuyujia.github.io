---
title: PropertyUtils
date: 2017-01-19 17:21:20
tags: 
- apache
- beanutils
- PropertyUtils
categories: 
- apache 
- commons 
- beanutils
---

### 背景:
最近要开始写报表工具类, 经常需要动态的设置属性, 当然java反射是完全可以做到的, 但是个人认为, 既然有封装好的方法, 那就直接使用封装好的方法就Ok了, 我的目的是完成工具类. 并且采用apache的工具, 使用起来也是非常方便的, 非常感谢apache组织为世界所作出的贡献

### PropertyUtils简介
与BeanUtils类似, 都是对javaBean进行操作的工具类. 其中, BeanUtils中我用的最多的就是`BeanUtils.copy(Object target, Object source)`了, 使用它的好处呢, 就是能够自动复制bean属性类型相同, bean属性名称相同的值到目标对象中, 为了我开发中大量是用get\set方法提供了十分简洁的解决方案. PropertyUtils我个人理解为单独为某个属性进行值的操作的工具类, 尽管它可以完成更为复杂的功能, 比如: 为已经生成.class的javaBean, 动态的添加属性, 但是, 这个方法我几乎用不到, 所以不再去深究, 如果将来需要用, 再去扒一扒原理就好了

### PropertyUtils中的常用方法

#### getProperty
`PropertyUtils.getProperty(Object bean, String name)`  
`bean` 是不为null的Java Bean实例  
`name` 是Java Bean属性名称 (也就是方法中的getXxx(), setXxx(), 其中的xxx成为这个java bean的bean属性, java中的类成员变量称为字段, 并不是属性, Java Bean的命名规范(自行百度))  
这个方法是获取bean, 中名为name的属性

```java
// JavaBean
public class Car {

	// 这里故意将字段名称设置和bean属性名称不一样
	// 意在告诉, 参数name指代的是getXxx() 的xxx才是bean属性
    private String hello;

    private Integer world;

	// getXxx() xxx才是属性
    public String getName() {
        return hello;
    }

    public void setName(String name) {
        this.hello = name;
    }

    public Integer getCount() {
        return world;
    }

    public void setCount(Integer count) {
        this.world = count;
    }
    
}
```

main方法


```java
public static void main(String[] args) {
        // 创建新实例
        Car car = new Car();
        // 设置属性
        car.setName("凯迪拉克");

        try {
            // 通过工具类来获取实例中的属性值
            String name = (String) PropertyUtils.getProperty(car, "name");
            System.out.println(name);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        }

    }
```

运行结果:  

```
凯迪拉克
```

可见使用工具类可以轻而易举的获取属性值. 但是为什么我们要这么麻烦的去获取值呢? 因为在程序运行过程中有很多时候数据是未知的, 特别是写工具类的时候 (业务逻辑就不存在这些问题了).


#### setProperty
`PropertyUtils.setProperty(Object bean, String name, String value)`    
`bean`: 实例  
`name`: 属性  
`value`: 属性值  

```java
public static void main(String[] args) {
        // 创建新实例
        Car car = new Car();
        // 设置属性
        car.setName("凯迪拉克");
        try {
            // 通过工具类来获取实例中的属性值
            String name = (String) PropertyUtils.getProperty(car, "name");
            System.out.println(name);
            PropertyUtils.setProperty(car, "name", "劳斯莱斯");
            System.out.println(car.getName());
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        }
    }
```

运行结果:  

```
凯迪拉克
劳斯莱斯
```

#### getPropertyDescriptor
`PropertyUtils.getPropertyDescriptor(Object bean, String name)`  
`bean`: 实例  
`name`: 属性  
这个方法是获取bean属性的描述, 我们可以从这个类获得什么呢?

```java
    public static void main(String[] args) {
        // 创建新实例
        Car car = new Car();
        // 设置属性
        car.setName("凯迪拉克");
        try {
            // 通过工具类来获取实例中的属性类型
            PropertyDescriptor descriptor = PropertyUtils.getPropertyDescriptor(car, "name");
            Class<?> propertyType = descriptor.getPropertyType();
            System.out.println(propertyType);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        }
    }
```

我们可以从属性描述中获取这个属性的java数据类型, 这样我们可以根据判断数据类型, 做对应的处理  
`Class<?> propertyType = descriptor.getPropertyType();`  

输出结果:

```java
class java.lang.String
```

#### getSimpleProperty  
它的功能和`getProperty()`有些类似, 都是获取bean对象的属性值, 当属性值是普通值的时候, 使用`getProperty()`和`getSimpleProperty()`得到的结果一样  

```java
public static void main(String[] args) {
    // 创建新实例
    Car car = new Car();
    // 设置属性
    // String
    car.setName("汽车");
    // int
    car.setCount(1);
    // Integer
    car.setCountInt(2);
    // 自定义数据类型
    Brand brand = new Brand();
    brand.setBrand("凯迪拉克");
    car.setBrand(brand);
    // List
    List list = new ArrayList();
    list.add("Hello");
    car.setList(list);
    // Map
    Map map = new HashMap();
    map.put("map","World");
    car.setMap(map);
    try {
        // 这里演示如果知道数据类型, 是可以进行强制转换的
        Integer count = (Integer) PropertyUtils.getSimpleProperty(car, "count");
        System.out.println(count);
        // 以下都是获取bean 中的属性值
        Object countInt = PropertyUtils.getSimpleProperty(car, "countInt");
        System.out.println(countInt);

        Object brand1 = PropertyUtils.getSimpleProperty(car, "brand");
        System.out.println(brand1);

        Object list1 = PropertyUtils.getSimpleProperty(car, "list");
        System.out.println(list1);

        Object map1 = PropertyUtils.getSimpleProperty(car, "map");
        System.out.println(map1);

    } catch (IllegalAccessException e) {
        e.printStackTrace();
    } catch (InvocationTargetException e) {
        e.printStackTrace();
    } catch (NoSuchMethodException e) {
        e.printStackTrace();
    }
}  
```  



运行结果:   
  
```java  
1
2
Brand{brand='凯迪拉克'}
[Hello]
{map=World}
```    

由上面的结果可以看出, 使用`getSimpleProperty()`方法得到的结果和`getProperty()`方法得到的结果是一样的, 那不同点在什么地方, 后面再讲.  

#### setSimpleProperty  
这个就不多说了, 效果和`setProperty`也是一样的, 当然也有区别, 接下来就会讲到  

### 方法之间的区别  
直接了解完`getProperty()`和`getSimpleProperty()`之间的区别, set方法之间的区别就理解了, 是一个意思  
先来看看`getProperty()`的源码:    

```java
public Object getNestedProperty(Object bean, String name)
        throws IllegalAccessException, InvocationTargetException,
        NoSuchMethodException {

    if (bean == null) {
        throw new IllegalArgumentException("No bean specified");
    }
    if (name == null) {
        throw new IllegalArgumentException("No name specified for bean class '" +
                bean.getClass() + "'");
    }

    // Resolve nested references
    while (resolver.hasNested(name)) {
        String next = resolver.next(name);
        Object nestedBean = null;
        if (bean instanceof Map) {
            nestedBean = getPropertyOfMapBean((Map) bean, next);
        } else if (resolver.isMapped(next)) {
            nestedBean = getMappedProperty(bean, next);
        } else if (resolver.isIndexed(next)) {
            nestedBean = getIndexedProperty(bean, next);
        } else {
            nestedBean = getSimpleProperty(bean, next);
        }
        if (nestedBean == null) {
            throw new NestedNullException
                    ("Null property value for '" + name +
                    "' on bean class '" + bean.getClass() + "'");
        }
        bean = nestedBean;
        name = resolver.remove(name);
    }

    if (bean instanceof Map) {
        bean = getPropertyOfMapBean((Map) bean, name);
    } else if (resolver.isMapped(name)) {
        bean = getMappedProperty(bean, name);
    } else if (resolver.isIndexed(name)) {
        bean = getIndexedProperty(bean, name);
    } else {
    	/** 请看这里 */
        bean = getSimpleProperty(bean, name);
    }
    return bean;

}
```  

在方法的最后部分, `/**请看这里*/` 可以看到当传入参数没有什么特别之处的时候, 它会直接调用`getSimpleProperty()`方法获取数据.  

根据之前`getSimpleProperty()`方法的结果我们可以发现, 当我取用list集合, 和map集合中的数据的时候, 实际上是取出了所有数据, 那么如果我想取出集合中的某个元素, 我该怎么取用呢?  

这就是`getProperty()`和`getSimpleProperty()`的差别所在了!  

假设我们现在有一个java数组`arr[]`, 我们要那其中的数据, 应该在`[]`中填入我们要取用的索引值, 例如: `arr[1]`取用数组arr索引值为1(第二个元素, 0是第一个元素)的值, 对应的集合也是这种方式, 例如: `list[0]`取用集合第一个元素  

```java
// 获取集合
Object list1 = PropertyUtils.getProperty(car, "list");
System.out.println(list1);
// 获取集合中的某个元素
Object property = PropertyUtils.getProperty(car, "list[0]");
System.out.println(property);
```   

输出结果:

```java
[Hello]
Hello
```  

我觉得这足够清晰表达了, 我们直接使用`list`的时候, 实际上就是单纯的调用`getList()`来获取car中的list数据, 但是使用`list[0]`表示的意思是, 获取`car`中数据`list`的第一个元素的值, 所以我们调用`getProperty()`的时候, 如果判断出我们调用的属性(也就是`list[0]`这个部分)时, 发现我们使用index属性(也就是使用了`[]`之类的符号)就说明我名调用了嵌套类型(也就是调用了属性中的属性)的数据, 他就会取出`[]`中的只, 然后遍历, 取出该索引对应的值.   
但是当我们使用`getSimpleProperty()`时, 如果判断出我们使用了嵌套类型数据, 就会抛出异常.  
同理可得, map集合中的嵌套数据, 应该这样去取得: `map.key`, 以这样的方式去获得该key在map中所对应的值:  

```java
Object map1 = PropertyUtils.getProperty(car, "map.map");
System.out.println(map1);
```  

运行结果:  

```java
World
```  

那么基本的五个方法以及差异也就说完了, 对应的set方法可以参照get去完成

### 存在问题
#### 空指针问题

```java  
	public static void main(String[] args) {
	    // 创建新实例
	    Car car = new Car();
	    try {
	        PropertyUtils.setProperty(car, "list[0]", "hello");
	        System.out.println(car.getList());
	    } catch (IllegalAccessException e) {
	        e.printStackTrace();
	    } catch (InvocationTargetException e) {
	        e.printStackTrace();
	    } catch (NoSuchMethodException e) {
	        e.printStackTrace();
	    }
	}
```  

如果只是`new`了一个`car`对象, 然后就直接设置属性, 那么会抛出一个空指针异常, 为什么就不说了(如果不知道就弥补一下java基础)  
同理, 如果map中没有对应的key值, 同样会出现空指针异常

#### 索引越界异常

```java  
public static void main(String[] args) {
    // 创建新实例
    Car car = new Car();
    List list = new ArrayList();
    car.setList(list);
    try {
        PropertyUtils.setProperty(car, "list[0]", "hello");
        System.out.println(car.getList());
    } catch (IllegalAccessException e) {
        e.printStackTrace();
    } catch (InvocationTargetException e) {
        e.printStackTrace();
    } catch (NoSuchMethodException e) {
        e.printStackTrace();
    }
}
```  

如果我们手动new了一个list, 放进去, 那么在调用set方法的时候, 会抛出一个索引越界异常, 为什么呢? 因为, 这个属性设置, 不能向list中添加数据, 它只能修改数据, 而我们的list并没有放入任何数据, 所以`list[0]`并不存在, 所以越界了  


```java
public static void main(String[] args) {
    // 创建新实例
    Car car = new Car();
    List list = new ArrayList();
    list.add("world");
    car.setList(list);
    try {
        PropertyUtils.setProperty(car, "list[0]", "hello");
        System.out.println(car.getList());
    } catch (IllegalAccessException e) {
        e.printStackTrace();
    } catch (InvocationTargetException e) {
        e.printStackTrace();
    } catch (NoSuchMethodException e) {
        e.printStackTrace();
    }
}
```       
       
  
这样就没问题了⬆️    
map集合如果没有对应的key, 会出现空指针异常  

总之, 属性只能修改, 不能添加

### 结束语 
有了这5个方法, 结合java反射, 我们就可以写一些功能比较全面的工具类, 也不需要自己再去封装获取属性, 设置值, 获取类型的方法了, 当然, 自己有能力的, 也可以封装一下, 这也不难.  
我之所以能用简单的方法写出适用自己项目的工具, 是因为我们站在巨人的肩膀上!