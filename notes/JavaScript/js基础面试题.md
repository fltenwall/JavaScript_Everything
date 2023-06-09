#### call和apply哪个性能更好

1. call和apply都是 Function 构造函数原型上的方法
2. call传参是逐个传参，apply是传入一个数组
3. 传参超过 3 个时，`call`的性能会比`apply`更好
4. jquery作者在注释中说明过call性能更好
5. 从内存角度看，数组会放在堆中，增加一个引用指向；而且V8 会为每一个对象创建一个隐藏类，记录对象的属性布局，包括所有属性和偏移量

#### 实现一个属性选择器

实现一个`$attr(name,value)`遍历属性为name，所有值为value的元素集合

```html
<body>
    <div class="box fix"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box fix"></div>
    <div class="box"></div>
    <div class="box2"></div>
    <div class="box3"></div>
    <div class="box4"></div>
    <div class="box5"></div>
    <script>
        function $attr(name, value){
            // 获取页面中所有标签
            let elements = document.getElementsByTagName('*');
            const arr = [];
            elements = Array.from(elements);
            elements.forEach(item => {
                let itemValue = item.getAttribute(name);
                // 类名可以有多个
                if(name === 'class'){
                    new RegExp("\\b"+value+"\\b").test(itemValue) ? arr.push(item) : null;
                    return
                }
                if(itemValue === value) arr.push(item)
            });
            return arr 
        }
        console.log($attr('class', 'box'))
    </script>
</body>
```

#### script标签的defer和async有什么区别

`<script>`: 遇到script中断 HTML 解析，加载js文件，然后解析 JS 文件，再继续解析 HTML

`<script defer>`: 遇到script并行加载js文件，但 HTML 解析完才行执行 JS

`<script async>`：遇到script并行加载js文件，但 JS 加载完后会立刻执行，HTML 需要等待 JS 加载结束再继续解析

![defer与async.png](https://github.com/fltenwall/JavaScript_Interview_Everything/blob/main/notes/JavaScript/imgs/defer%E4%B8%8Easync.png)