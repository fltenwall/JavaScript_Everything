#### node.js开启多进程

1. child_process.fork

父、子进程发送消息给对方都是用`send()`, 接收消息都是用`on()`

main.js

```javascript
const http = require('http')
const path = require('path')
const fork = require('child_process').fork

const server = http.createServer((req,res)=>{
    if(req.url === '/get-data'){
        const childProcess = fork(path.resolve(__dirname, './child.js'))
        childProcess.send('start...')
        childProcess.on('message', data => {
            console.log('The main process recevied data: ' , data)
            res.end('data: ' + data)
        })
        childProcess.on('close', () => {
            childProcess.kill()
            res.end('error')
        })
    }
})
server.listen(8000, () => {
    console.info('server is running')
})
```

child.js

```javascript
function sum(){
    let res = 0
    for (let index = 0; index < 10000; index++) {
        res += index;
    }
    return res
}

process.on('message', () => {
    const data = sum()
    console.info('The child process backed data to main')
    process.send(data)
})
```

2. cluster.fork

```javascript
const http = require('http')
const cupLength = require('os').cpus().length
const cluster = require('cluster')

// 判断是不是主进程
if(cluster.isMaster) {
    for (let index = 0; index < cupLength; index++) {
        cluster.fork()
    }
    cluster.on('exit', worker => {
        console.info(`${worker.id} exit.`)
        cluster.fork() // 进程守护，退出一个马上开启另外一个
    })
}else {
    const server = http.createServer((req, res)=>{
        res.writeHead(200)
        res.end('server is running')
    })
    server.listen(9000)
}
```

区别：

1. cluster集群，适用开启多个进程搭建集群的场景
2. child_process主要用开启新的进程进行比较大量的计算

#### 浏览器和nodejs事件循环（Event Loop）有什么区别

执行时机：微任务在下一轮`DOM 渲染之前`执行，宏任务在下一轮`DOM 渲染之后`执行

区别：node.js的宏任务和微任务分`不同类型`，有`不同优先级`。按照优先级顺序执行微任务、宏任务。

微任务：

1. process.nextTick(最高)
2. promise, async/await 

宏任务：

1. Timer - setTimeout, setInterval
2. I/O Callback - 处理网络，流，TCP 的错误回调
3. Idle, prepare - 闲置状态(node.js内部使用)
4. Poll 轮询 - 执行poll中的 I/O 队列
5. Check检查 - 存储 setImmediate 回调
6. Close callbacks - 关闭回调，比如`socket.on('close')`

推荐使用`setImmediate`代替`process.nextTick`


