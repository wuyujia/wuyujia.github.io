import{_ as a,W as t,X as p,$ as i,Y as e,Z as c,a2 as o,C as l}from"./framework-aa83d01c.js";const r={},s=e("h2",{id:"ioc概念及原理",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#ioc概念及原理","aria-hidden":"true"},"#"),c(" IOC概念及原理")],-1),d=e("p",null,"Spring 是 Java 项目框架中最流行的一个。",-1),h=e("p",null,"Spring 容器最核心的两个概念是:",-1),B=e("ul",null,[e("li",null,"IOC: (Inversion Of Control，控制反转) 是核心概念，而 DI(Dependency Injection，依赖注入) 是其实现方式，也是 IOC 的另一种称呼。"),e("li",null,"AOP: (Aspect-Oriented Programming，面向切面编程) 是 Spring 框架的另一个重要的概念。")],-1),b=o('<p>在传统的编程模型中，我们在一个类中通过<code>new</code>关键字实例化另一个类的对象, 这样就会造成两个类之间的强耦合关系，使得代码难以扩展、维护和测试。</p><p>而在 Spring 框架中，采用 IOC 的设计模式，将对象的创建和依赖管理交给 Spring 容器来完成，从而实现了解耦。</p><p>在 Spring 中，IOC 的实现是通过依赖注入（DI）来实现的。它通过将分析对象的依赖关系将依赖注入到对象中，从而实现对象创建的解耦。在 Spring 中，可以使用三种方式来实现 DI：</p><ol><li>构造函数注入：通过在类的构造函数中定义参数，然后在 XML 配置文件或者使用注解的方式来注入依赖对象。</li><li>属性注入：通过在类中定义成员变量，然后在 XML 配置文件或者使用注解的方式来注入依赖对象。</li><li>接口注入：通过在类中定义接口类型和成员变量，然后在 XML 配置文件或者使用注解的方式来注入依赖对象。</li></ol><p>除了依赖注入之外，Spring 还提供了依赖查找（Dependency Lookup）的机制，可以让我们在需要使用依赖对象时，从 Spring 容器中查找对应的 Bean 对象。依赖查找和依赖注入一起构成了 Spring 框架的 IOC 容器机制。</p><p>总之，通过 IOC 容器，Spring 将对象之间的依赖关系解耦，提高了代码的灵活性、可扩展性和可维护性，从而使得我们的应用程序更加易开发和测试。将开发人员从繁琐的对象构建过程释放出来。</p><h2 id="ioc容器的类型" tabindex="-1"><a class="header-anchor" href="#ioc容器的类型" aria-hidden="true">#</a> IOC容器的类型</h2><p>在 Spring 框架中，IOC容器有三种类型：</p><ol><li><p><code>BeanFactory</code>：是Spring框架的基础接口，提供了IOC容器的基本功能。它通过Lazy Loading的方式来创建和管理Bean实例，即只有在第一次使用时才会创建Bean实例。BeanFactory的优点是轻量级，适合在资源受限的环境中使用。</p></li><li><p><code>ApplicationContext</code>：是BeanFactory的子接口，它是Spring框架中最常用的IOC容器。与BeanFactory相比，ApplicationContext提供了更多的功能，例如国际化、事件处理、AOP等。ApplicationContext在启动时会一次性创建所有Bean实例，这样可以提高应用程序的性能。</p></li><li><p><code>WebApplicationContext</code>：是ApplicationContext的子接口，它是Web应用程序中使用的IOC容器。WebApplicationContext可以获取ServletContext中的参数、属性和资源，并可以访问Servlet API中的对象。它还提供了许多与Web相关的功能，例如Handler Mapping和View Resolver等。</p></li></ol><p>在实际开发中，我们可以根据应用程序的需要来选择合适的IOC容器类型。如果应用程序的资源受限，可以选择BeanFactory；如果应用程序需要更多的功能，例如AOP、国际化等，可以选择ApplicationContext；如果应用程序是Web应用程序，可以选择WebApplicationContext。</p><p>通常如果我们使用 SpringBoot 项目，基本都是使用的 ApplicationContext，而如果是传统 Spring 项目，需要搭配外部 Web 容器来使用的话，使用的是 WebApplicationContext。</p>',11),g={class:"hint-container tip"},C=e("p",{class:"hint-container-title"},"容器继承图",-1),x=o('<h2 id="bean的定义" tabindex="-1"><a class="header-anchor" href="#bean的定义" aria-hidden="true">#</a> Bean的定义</h2><p>在了解容器如何创建 Bean 之前需要知道 Bean 的信息是怎么解析、存储的。有助于进一步了解 Bean 的属性定义有哪些。</p><p>Spring 框架里所有通过 XML 或者通过 Java <code>@Bean</code>注解配置的 Bean 都会被解析成 <code>BeanDefinition</code>，在容器初始化对象时，会根据 <code>BenDefinition</code> 来创建对象</p><p><code>BeanDefinition</code> 定义属性如下（根据 Setter 属性来描述）：<br><sub>只例举常见且用得到的属性</sub></p>',4),S=o('<p>以上就是我们 Bean 的定义，其中很多参数都是可以通过配置方式去控制 Bean 的创建行为的，以及 Bean 的生命周期，之后再说。</p><h2 id="bean-的作用域" tabindex="-1"><a class="header-anchor" href="#bean-的作用域" aria-hidden="true">#</a> Bean 的作用域</h2><p>在 Spring 中，Bean 的作用域用于定义 Bean 实例在容器中的生命周期，包括 Bean 实例的创建、初始化、销毁等阶段。</p><p>下面是 Spring 中常用的 Bean 作用域：</p><ul><li><p><strong>singleton</strong>：单例模式，一个容器中只存在一个实例。默认作用域。</p></li><li><p><strong>prototype</strong>：多例模式，每次从容器中获取 Bean 时都会创建一个新的实例。</p></li><li><p>request：用于 Web 应用中，每次 HTTP 请求都会创建一个新的实例，仅适用于 Web 应用上下文。</p></li><li><p>session：用于 Web 应用中，同一个会话（Session）共享一个实例，不同会话之间的实例是不同的，仅适用于 Web 应用上下文。</p></li><li><p>global session：用于 Web 应用中，同一个全局 Session 共享一个实例，适用于 Portlet 应用上下文。</p></li><li><p>application：用于 Web 应用中，整个 Web 应用共享一个实例，适用于 Web 应用上下文。</p></li><li><p>websocket：用于 Web 应用中，每个 WebSocket 会话共享一个实例，仅适用于 Web 应用上下文。</p></li><li><p>custom：自定义作用域，可以根据具体的需求进行扩展和实现。</p></li></ul><p>通过定义不同的 Bean 作用域，可以更加灵活地管理 Bean 实例的生命周期和资源消耗。需要注意的是，作用域为 prototype 的 Bean 实例需要手动释放资源，否则可能会导致资源泄漏问题。</p><h2 id="bean-生命周期" tabindex="-1"><a class="header-anchor" href="#bean-生命周期" aria-hidden="true">#</a> Bean 生命周期</h2>',7);function m(u,I){const n=l("Mermaid");return t(),p("div",null,[s,d,h,B,i(n,{id:"mermaid-21",code:"eJzLzcxLyU0s4FJQKMrPL9HQCC4oysxLf7+n49mCHU/3Nz9b1vR0/9b3ezo1NYFKFBQ8/Z1Bcn3Ln3Zse9rf+2LvGqAcWMbRPwAo82Tf3Bdbpz3bvOJp61KQDAC9BDI2"}),b,e("div",g,[C,i(n,{id:"mermaid-84",code:"eJxLL0osyFBwCuFSUHAsKMjJTE4syczPc87PK0mtKFHQ1VV4vnv5s879QJadglNqYp5bYnJJflElUHl4ahJBHZgKuABQCCqw"})]),x,i(n,{id:"mermaid-98",code:"eJxlks9u00AQxu99ipX6JJBeOBSQkLggDpt4Gyw53mi9ETIIyS0tdtrQGGjSyDRpkQiJKkESKmjaNOVh8GycU1+B9b/gtL55Zr7fzHyzBQ0bxpqKiwyXVhCKftF9gvU1sqHqKlepjl7LBEJPOFP1IsrLXC6seohLJIwjtBoFEQwugtEXcN/PesOswijQclKZfoli5m3706PZQR+Oj2+uPENWa4RT/a+1WWaUU26WSUTKU6qFAg2/Mh/IqbIkYX+E3ZNgOs30fPYcKaRMdMV4pP+v9K/bwa9mPKZsN7e84I8tHBc+tKDemtt1cN6JjgvXh6LdXeqLK5y+VBnJYV1RFcyJpAX2Kez2xX5fNL9Lmj/ZgeknUavORhPo7ImzPux0xeFvcVQVDWeJVmZqCTNzyQ/RGoD7zR9f+uNJ5L9EgluLYQi+ev74NAxncIm9G7jAKTPDZHqSVQTOZ5hcRqDQZTjvwv7W3dMk2nXCX1AlVstRajb88ILhW3mYhVY0L8RZQxIieY7qBmeVUHyPFSslovOnWKsQQ8rTnqKzPbdOoL4lGsObKwfOf8ae3ElVI+R6heO8Rh4z+VgYNxNcvM1ijVFHWL1bsDQYY5LFwqeb3WoZ47Shtwe1ZrxUVqcQuRe9ZUiqmx9YYrC5EL1Z+Qeijn7z"}),S])}const O=a(r,[["render",m],["__file","index.html.vue"]]);export{O as default};
