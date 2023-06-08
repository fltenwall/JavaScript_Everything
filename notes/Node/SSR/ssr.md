
### SPA的问题

1. 只返回一个空 HTML 页面，不利于 SEO
2. 首屏加载资源过大时，不利于首屏渲染
3. 不利于复杂应用开发

### SSR

用户每请求一个页面都在服务器端渲染，将渲染好的页面返回给浏览器

优势：

1. 更快的首屏渲染速度
2. 更好的 SEO
3. 可以保留web交互性，前端路由、响应式数据、虚拟 DOM 等

缺陷：

1. 会带来的更多的API调用，消耗更多的服务器资源

### Vue3+SSR

`createSSRApp` 创建的应用在激活的模式下挂载应用

服务器使用`@vue/server-renderer`中`renderToString`进行渲染

用到的包：

`nodemon`: 监听变化及时刷新

`webpack-node-externals`: 排除掉node_moduels以外的模块