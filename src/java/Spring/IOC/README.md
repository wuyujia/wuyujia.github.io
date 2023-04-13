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

