
#### 1. 使用websocket

网页发信息给服务端，服务端同步信息到其他网页

优点：没有跨域问题

缺陷：需要服务端支持，成本高

#### 2. 通过localstorage通讯

可以实现`同域`多个页面的通讯，因为`localstorage`跨域不共享

`A`页面设置localstorage, `B`页面可以监听到`localstorage`的修改

pageA:

```html
<button id="btn">修改</button>
<script>
    const btn = document.getElementById('btn')
    btn.addEventListener('click', function(){
        const newMessage = {
            id:10000,
            message:'flten' + Date.now()
        }
        localStorage.SetItem('changeMessage', JSON.stringify(newMessage))
    })
</script>
```

pageB:

```html
<script>
    window.addEventListener('storage', event => {
        console.info('key', event.key)
        console.info('value', event.newValue)
    })
</script>
```

#### 3. 通过`SharedWorker`通讯

`SharedWorker`是`WebWorker` 的一种

`WebWorker`可以开启子进程执行 JS，但是不能操作 DOM。webworker本来就是为了在不影响dom渲染的情况下去处理js密集计算，处理完同步到主进程

`SharedWorker`可以单独开启一个`进程`，用于`同域`页面通讯

本地调试需要在隐身模式下访问

worker.js
```javascript
const set = new Set()

onconnect = event => {
    const port = event.ports[0]
    set.add(port)

    // 接收信息
    port.onmessage = e => {
        // 广播消息
        set.forEach(p => {
            if(p === port) return
            p.postMessage(e.data)
        })
    }
    // 发送消息
    port.postMessage('done')
}
```

pageA
```html
<button id="btn">修改</button>
<script>
    const worker = new SharedWorker('./worker.js')
    const btn = document.getElementById('btn')
    btn.addEventListener('click', function(){
        // 发送信息
        work.port.postMessage('pageA')
    })
</script>
```

pageB
```html
<script>
    const worker = new SharedWorker('./worker.js')
    // 接收信息
    work.port.onMessage = e => {
        console.log('pageB', e.data)
    }
</script>
```


