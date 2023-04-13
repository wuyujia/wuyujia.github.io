---
title: IOC 容器
index: true
date: 2023-04-13 16:03:26
category: 
  - Spring
  - IOC
tag:
  - Spring
  - IOC
---

## IOC概念及原理

Spring 是 Java 项目框架中最流行的一个。

Spring 容器最核心的两个概念是:
- IOC: (Inversion Of Control，控制反转) 是核心概念，而 DI(Dependency Injection，依赖注入) 是其实现方式，也是 IOC 的另一种称呼。
- AOP: (Aspect-Oriented Programming，面向切面编程) 是 Spring 框架的另一个重要的概念。

```mindmap
root((Spring（核心概念）))
  IOC（控制反转）
  AOP（依赖注入）
```

在传统的编程模型中，我们在一个类中通过`new`关键字实例化另一个类的对象, 这样就会造成两个类之间的强耦合关系，使得代码难以扩展、维护和测试。

而在 Spring 框架中，采用 IOC 的设计模式，将对象的创建和依赖管理交给 Spring 容器来完成，从而实现了解耦。

在 Spring 中，IOC 的实现是通过依赖注入（DI）来实现的。它通过将分析对象的依赖关系将依赖注入到对象中，从而实现对象创建的解耦。在 Spring 中，可以使用三种方式来实现 DI：
1. 构造函数注入：通过在类的构造函数中定义参数，然后在 XML 配置文件或者使用注解的方式来注入依赖对象。
2. 属性注入：通过在类中定义成员变量，然后在 XML 配置文件或者使用注解的方式来注入依赖对象。
3. 接口注入：通过在类中定义接口类型和成员变量，然后在 XML 配置文件或者使用注解的方式来注入依赖对象。

除了依赖注入之外，Spring 还提供了依赖查找（Dependency Lookup）的机制，可以让我们在需要使用依赖对象时，从 Spring 容器中查找对应的 Bean 对象。依赖查找和依赖注入一起构成了 Spring 框架的 IOC 容器机制。

总之，通过 IOC 容器，Spring 将对象之间的依赖关系解耦，提高了代码的灵活性、可扩展性和可维护性，从而使得我们的应用程序更加易开发和测试。将开发人员从繁琐的对象构建过程释放出来。

## IOC容器的类型
在 Spring 框架中，IOC容器有三种类型：

1. `BeanFactory`：是Spring框架的基础接口，提供了IOC容器的基本功能。它通过Lazy Loading的方式来创建和管理Bean实例，即只有在第一次使用时才会创建Bean实例。BeanFactory的优点是轻量级，适合在资源受限的环境中使用。

2. `ApplicationContext`：是BeanFactory的子接口，它是Spring框架中最常用的IOC容器。与BeanFactory相比，ApplicationContext提供了更多的功能，例如国际化、事件处理、AOP等。ApplicationContext在启动时会一次性创建所有Bean实例，这样可以提高应用程序的性能。

3. `WebApplicationContext`：是ApplicationContext的子接口，它是Web应用程序中使用的IOC容器。WebApplicationContext可以获取ServletContext中的参数、属性和资源，并可以访问Servlet API中的对象。它还提供了许多与Web相关的功能，例如Handler Mapping和View Resolver等。

在实际开发中，我们可以根据应用程序的需要来选择合适的IOC容器类型。如果应用程序的资源受限，可以选择BeanFactory；如果应用程序需要更多的功能，例如AOP、国际化等，可以选择ApplicationContext；如果应用程序是Web应用程序，可以选择WebApplicationContext。

通常如果我们使用 SpringBoot 项目，基本都是使用的 ApplicationContext，而如果是传统 Spring 项目，需要搭配外部 Web 容器来使用的话，使用的是 WebApplicationContext。

::: tip 容器继承图
``` mermaid
graph BT
  ApplicationContext -- 继承 --> BeanFactory
  WebApplicationContext -- 继承 --> ApplicationContext
```
:::

## Bean的定义

在了解容器如何创建 Bean 之前需要知道 Bean 的信息是怎么解析、存储的。有助于进一步了解 Bean 的属性定义有哪些。

Spring 框架里所有通过 XML 或者通过 Java `@Bean`注解配置的 Bean 都会被解析成 `BeanDefinition`，在容器初始化对象时，会根据 `BenDefinition` 来创建对象

`BeanDefinition` 定义属性如下（根据 Setter 属性来描述）：  
~只例举常见且用得到的属性~
``` class
class BeanDefinition {
  String beanClassName      # bean 对象名称
  String scope              # bean 的作用域：singleton、prototype
  boolean lazyInit          # 懒加载
  String[] dependsOn        # 依赖对象：通过成员变量分析得来
  boolean autowireCandidate # 自动推断：仅当按类型注入时有效
  boolean primary           # 是否为主 Bean：同类型 多个Bean有效
  String factoryBeanName    # 创建 Bean 的工厂名称
  String factoryMethodName  # 指定调用的工厂方法名
  ConstructorArgumentValues # Bean 的构造参数（已注入的构造参数）
  MutablePropertyValues     # Bean 的属性（已注入的属性）
  String initMethodName     # Bean 的初始化方法
  String destroyMethodName  # Bean 的销毁方法
}
```
以上就是我们 Bean 的定义，其中很多参数都是可以通过配置方式去控制 Bean 的创建行为的，以及 Bean 的生命周期，之后再说。

## Bean 的作用域

在 Spring 中，Bean 的作用域用于定义 Bean 实例在容器中的生命周期，包括 Bean 实例的创建、初始化、销毁等阶段。

下面是 Spring 中常用的 Bean 作用域：

- **singleton**：单例模式，一个容器中只存在一个实例。默认作用域。

- **prototype**：多例模式，每次从容器中获取 Bean 时都会创建一个新的实例。

- request：用于 Web 应用中，每次 HTTP 请求都会创建一个新的实例，仅适用于 Web 应用上下文。

- session：用于 Web 应用中，同一个会话（Session）共享一个实例，不同会话之间的实例是不同的，仅适用于 Web 应用上下文。

- global session：用于 Web 应用中，同一个全局 Session 共享一个实例，适用于 Portlet 应用上下文。

- application：用于 Web 应用中，整个 Web 应用共享一个实例，适用于 Web 应用上下文。

- websocket：用于 Web 应用中，每个 WebSocket 会话共享一个实例，仅适用于 Web 应用上下文。

- custom：自定义作用域，可以根据具体的需求进行扩展和实现。

通过定义不同的 Bean 作用域，可以更加灵活地管理 Bean 实例的生命周期和资源消耗。需要注意的是，作用域为 prototype 的 Bean 实例需要手动释放资源，否则可能会导致资源泄漏问题。

## Bean 生命周期
