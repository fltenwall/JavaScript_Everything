
分为三个阶段：网络请求、解析、渲染

#### 网络请求

1. DNS 查询，获得 IP 地址
2. 客户端发起TCP连接请求，三次握手🤝
3. 浏览器发送 HTTP请求
4. 收到请求响应,获得 HTML源代码
5. 解析 HTML 过程中，遇到静态资源执行发起网络请求(css/图片/视频)。如果静态资源是强缓存，则不必请求


#### 解析(字符串->结构化数据)

1. HTML 构建 DOM树
2. CSS 构建CSSOM树
3. 两者结合形成render tree

优化解析：CSS放在head中，不要异步加载 CSS

JS 使用`<script defer>`

`<img>`提前定义好 `width`和`height`


#### 渲染

1. 计算各个 DOM的尺寸，定位，最后绘制到页面
2. 遇到 JS 可能会执行，使用`<script defer>`会在 HTML 解析后再执行
3. 异步 CSS、图片加载会触发重新渲染

![浏览器解析过程](https://github.com/fltenwall/JavaScript_Interview_Everything/tree/main/notes/%E6%B5%8F%E8%A7%88%E5%99%A8/imgs)