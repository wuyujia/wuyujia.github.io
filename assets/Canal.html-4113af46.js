const l=JSON.parse('{"key":"v-e8c0bb38","path":"/mysql/Canal.html","title":"Canal搭建及使用","lang":"zh-CN","frontmatter":{"title":"Canal搭建及使用","index":true,"description":"Canal 是什么？ 官网的介绍 canal，译意为水道/管道/沟渠，主要用途是基于 MySQL 数据库增量日志解析，提供增量数据订阅和消费。 可以简单地把canal理解为一个用来同步增量数据的一个工具。 接下来我们看一张官网提供的示意图： 介绍图 canal的工作原理就是把自己伪装成MySQL slave，模拟MySQL slave的交互协议向MyS...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/mysql/Canal.html"}],["meta",{"property":"og:site_name","content":"Notes"}],["meta",{"property":"og:title","content":"Canal搭建及使用"}],["meta",{"property":"og:description","content":"Canal 是什么？ 官网的介绍 canal，译意为水道/管道/沟渠，主要用途是基于 MySQL 数据库增量日志解析，提供增量数据订阅和消费。 可以简单地把canal理解为一个用来同步增量数据的一个工具。 接下来我们看一张官网提供的示意图： 介绍图 canal的工作原理就是把自己伪装成MySQL slave，模拟MySQL slave的交互协议向MyS..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-09T12:08:08.000Z"}],["meta",{"property":"article:author","content":"YuJia"}],["meta",{"property":"article:modified_time","content":"2023-05-09T12:08:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Canal搭建及使用\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-09T12:08:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"YuJia\\",\\"url\\":\\"https://wuyujia.github.io\\"}]}"]]},"headers":[{"level":2,"title":"Canal 是什么？","slug":"canal-是什么","link":"#canal-是什么","children":[]},{"level":2,"title":"Canal 应用场景","slug":"canal-应用场景","link":"#canal-应用场景","children":[]},{"level":2,"title":"MySQL 服务配置修改&重启","slug":"mysql-服务配置修改-重启","link":"#mysql-服务配置修改-重启","children":[{"level":3,"title":"创建 Canal 用户","slug":"创建-canal-用户","link":"#创建-canal-用户","children":[]},{"level":3,"title":"检查 Binlog 是否开启","slug":"检查-binlog-是否开启","link":"#检查-binlog-是否开启","children":[]}]},{"level":2,"title":"Canal 搭建","slug":"canal-搭建","link":"#canal-搭建","children":[{"level":3,"title":"Canal Admin 搭建 (未使用)","slug":"canal-admin-搭建-未使用","link":"#canal-admin-搭建-未使用","children":[]},{"level":3,"title":"Canal 文件下载","slug":"canal-文件下载","link":"#canal-文件下载","children":[]},{"level":3,"title":"解压文件","slug":"解压文件","link":"#解压文件","children":[]},{"level":3,"title":"将 Binglog 直接对接致 RabbitMQ","slug":"将-binglog-直接对接致-rabbitmq","link":"#将-binglog-直接对接致-rabbitmq","children":[]},{"level":3,"title":"修改 Canal 配置","slug":"修改-canal-配置","link":"#修改-canal-配置","children":[]},{"level":3,"title":"创建一个 RabbitMQ 监听 Exchange","slug":"创建一个-rabbitmq-监听-exchange","link":"#创建一个-rabbitmq-监听-exchange","children":[]},{"level":3,"title":"启动 Canal","slug":"启动-canal","link":"#启动-canal","children":[]},{"level":3,"title":"Canal 配置优化","slug":"canal-配置优化","link":"#canal-配置优化","children":[]}]},{"level":2,"title":"关于 Canal 生产环境的恰当配置思考","slug":"关于-canal-生产环境的恰当配置思考","link":"#关于-canal-生产环境的恰当配置思考","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1683632742000,"updatedTime":1683634088000,"contributors":[{"name":"wuyujia","email":"wuyujia@sunlands.com","commits":3}]},"readingTime":{"minutes":4.31,"words":1294},"filePathRelative":"mysql/Canal.md","localizedDate":"2023年5月9日","autoDesc":true,"excerpt":""}');export{l as data};
