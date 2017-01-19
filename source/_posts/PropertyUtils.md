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

### 结束语
有了这三个方法, 结合java反射, 我们就可以写一些功能比较全面的工具类, 也不需要自己再去封装获取属性, 设置值, 获取类型的方法了, 当然, 自己有能力的, 也可以封装一下, 这也不难.