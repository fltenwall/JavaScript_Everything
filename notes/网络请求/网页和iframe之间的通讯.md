
通过`window.postMessage`进行数据发送，通过`window.addEventListener('message', event => {}`进行数据监听接收，但要注意跨域的限制和判断

main.html
```html
<body>
<button id="btn">发送消息</button>
<iframe id="iframe1" src="./child.html"></iframe>
<script>
    const btn1 = document.getElementById('btn')
    btn1.addEventListener('click', ()=>{
        // window.iframe1.contentWindow 取到iframe的window实例
        // * 表示无域名限制
        window.iframe1.contentWindow.postMessage('main', '*')
    })
    window.addEventListener('message', event => {
        console.info('origin',event.origin) // 来源的域名
        console.info('received', event.data)
    })
</script>
</body>
```


child.html
```html
<body>
<button id="btn">发送消息</button>
<script>
    const btn1 = document.getElementById('btn')
    btn1.addEventListener('click', ()=>{
        // window.iframe1.contentWindow 取到父页面的window实例
        // * 表示无域名限制
        window.parent.postMessage('child', '*')
    })
    window.addEventListener('message', event => {
        console.info('origin',event.origin) // 可以判断来源域名的合法性
        console.info('received', event.data)
    })
</script>

</body>
```