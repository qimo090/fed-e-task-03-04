# Gridsome 介绍

- 一个免费、开源、基于 Vue.js 技术栈的静态网站生成器
- 官方网站 [https://gridsome.org/](https://gridsome.org/)
- GitHub [https://github.com/gridsome/gridsome](https://github.com/gridsome/gridsome)

# 什么是静态网站生成器

- 静态网站生成器是使用一系列配置、模板以及数据，生成静态 HTML 文件及相关资源的工具
- 这个功能也叫 **预渲染**
- 生成的网站不需要类似 PHP这样的服务器
- 只需要放到支持静态资源的 Web Server 或 CDN上即可运行

# 静态网站的好处

- 省钱
    - 不需要专业的服务器，只要能托管静态文件的空间即可
- 快速
    - 不经过后端服务器的处理，只传输内容
- 安全
    - 没有后端程序的执行，自然会更安全

# 常见的静态网站生成器

- Jekyll (Ruby)
- Hexo (Node)
- Hugo (Golang)
- Gatsby (Node/React)
- Gridsome (Node/Vue)
- 另外，Next.js，Nuxt.js 也能生成静态网站，但是它们更多被认为是 SSR (服务端渲染) 框架

# JAMStack

- 这类静态网站生成器还有个漂亮的名字叫 JAMStack
- JAMStack 的 JAM 是 Javascript、API 和 Markup 的首字母组合
- 本质上是一种胖前端，通过调用各种 API 来实现更多的功能
- 其实也是一种前后端的模式，只不过离得比较开，甚至前后端来自多个不同的厂商

## 例如 Gridsome

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6ed31337-efd3-440a-800d-89ddd076ac62/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6ed31337-efd3-440a-800d-89ddd076ac62/Untitled.png)

# 静态应用的使用场景

- 不适合有大量路由页面的应用
    - 如果您的站点有成百上千条路由页面，则预渲染将非常缓慢。当然，您每次更新只需要做一次，但是可能要花一些时间。 大多数人不会最终获得数千条静态路由页面，而只是以防万一.
- 不适合有大量动态内容的应用
    - 如果渲染路线中包含特定于用户查看其内容或其他动态源的内容，则应确保您具有可以显示的占位符组件，直到动态内容加载到客户端为止。否则可能有点怪异

# Gridsome学习建议

使用Gridsome需要有一定的Vue基础，如果有基础，看过文档，只会觉得它比Vue本身更简单一-些。
