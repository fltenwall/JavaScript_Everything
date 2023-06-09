#### script标签的defer和async有什么区别

`<script>`: 遇到script中断 HTML 解析，加载js文件，然后解析 JS 文件，再继续解析 HTML

`<script defer>`: 遇到script并行加载js文件，但 HTML 解析完才行执行 JS

`<script async>`：遇到script并行加载js文件，但 JS 加载完后会立刻执行，HTML 需要等待 JS 加载结束再继续解析

![defer与async.png](https://github.com/fltenwall/JavaScript_Interview_Everything/blob/main/notes/JavaScript/imgs/defer%E4%B8%8Easync.png)

JS是单线程的，JS 解析与 DOM 渲染共用一个线程。因此 JS 加载与 HTML 解析可以并行，但是 JS 解析与 HTML 解析不能并行。

日常工作中，`<script defer>`更好，并行加载，但是 HTML 解析完毕再执行 HTML。将`<script>`放到最后的话，JS 文件是在 HTML 解析再加载，然后再解析的。

#### prefetch和preload的区别是什么

prefetch和dns-prefetch没有直接联系。

prefetch：提前，资源在未来页面使用，`空闲时加载`

preload：提前加载，资源在当前页面使用，会`优先加载`

```html
<head>
    <!-- preload 优先加载，当前页面使用 -->
    <link rel="preload" href="style.css" as="style">
    <link rel="preload" href="main.js" as="script">
    <!-- prefetch 当前页面不使用，空闲时加载 -->
    <link rel="prefetch" href="other.js" as="script">

    <!-- 当前页面引用preload的文件 -->
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- 当前页面引用preload的文件 -->
    <script scr="main.js" defer></script>
</body>
```

#### dns-prefetch和preconnet的区别

dns-prefetch：DNS 预查询

preconnet：DNS 预连接

都是针对未来页面

```html
<head>
    <link rel="dns-prefetch" href="https://www.baid.com">
    <link rel="preconnet" href="https://www.baid.com" crossorigin>
</head>
```