
#### 可以借用的库

`asyncpool` 

#### 自己实现并发控制

模拟网络请求的基本代码

```javascript
const delay = function(interval){
    return new Promise((resolve, reject) =>{
        setTimeout(function(){
            resolve(interval)
        },interval)
    })
}

let tasks = [()=>{
    return delay(1000)
},()=>{
    return delay(1000)
},()=>{
    return delay(1001)
},()=>{
    return delay(1002)
},()=>{
    return delay(1003)
},()=>{
    return delay(1004)
},()=>{
    return delay(1001)
},()=>{
    return delay(1002)
}]
```

有一个请求失败整体就算失败，返回的并且保证按照发送请求的顺序

```javascript
/**
 * 有一个失败整体就算失败，并且保证顺序
 * @param {*} tasks 连接池
 * @param {*} pool 请求限制
 */
function createRequest(tasks, pool = 6){
    const results = [];
    let together = new Array(pool).fill(null);
    let index = 0;
    together = together.map(()=>{
        return new Promise((resolve, reject)=>{
            const run = function(){
                if(index >= tasks.length){
                    resolve()
                    return
                }
                let old_index = index
                let task = tasks[index++]
                task().then(res=>{
                    results[old_index] = res
                    run()
                }).catch(err => {
                    reject(err)
                })
            }
            run()
        })
    })
    return Promise.all(together).then(()=>results );
}
createRequest(tasks, 6).then(res => console.log(res)).catch(err => console.log('失败了', err))
```

不管执行失败的请求，返回的结果不保证请求发送顺序

```javascript
/**
 * 
 * @param {*} tasks 连接池
 * @param {*} pool 请求限制
 * @param {*} callback 请求完毕后执行的回调函数
 */
function createRequest(tasks, pool = 6, callback){
    if(typeof pool === 'function') callback = pool
    if(typeof pool !== 'number') pool = 6
    if(typeof callback !== 'function' ) callback = function(){}
    class TaskQueue {
        running = 0
        queue = []
        results = []
        pushTask(task){
            let self = this
            self.queue.push(task)
            self.next()
        }
        next(){
            let self = this
            while(self.running <= pool && self.queue.length){
                self.running++
                let task = self.queue.shift()
                task().then(res=>{
                    self.results.push(res)
                }).finally(()=>{
                    self.running--
                    self.next()
                })
            }
            if(!self.running.length) callback(self.results)
        }
        
    }
    let taskQueue = new TaskQueue()
    tasks.forEach(task => {
        taskQueue.pushTask(task)
    });
}
createRequest(tasks, 6, results =>{
    console.log(results)
})

```

