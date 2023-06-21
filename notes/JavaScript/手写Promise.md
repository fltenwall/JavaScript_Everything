#### 基本结构

```javascript
class Promise {
    constructor(executor){
        function resolve(data){
        }
        function reject(err){}
    }
    then(resolve, reject){}
}
```

#### 改变状态

```javascript
class Promise {
    constructor(executor){
        this.PromiseState = 'pendding'
        this.PromiseResult = null
        const self = this
        function resolve(data){
            self.PromiseState = 'fulfilled'
            self.PromiseResult = data
        }
        function reject(err){
            self.PromiseState = 'rejected'
            self.PromiseResult = err
        }
        executor(resolve,reject)
    }
    then(resolve, reject){}
}
```

```javascript
let p = new Promise((resolve, reject)=>{
    resolve('ok')
})
console.log(p) // Promise {PromiseState: 'fulfilled', PromiseResult: 'ok'}
```

#### 抛出异常时改变状态

```javascript
class Promise {
    constructor(executor){
        this.PromiseState = 'pendding'
        this.PromiseResult = null
        const self = this
        function resolve(data){
            self.PromiseState = 'fulfilled'
            self.PromiseResult = data
        }
        function reject(err){
            self.PromiseState = 'rejected'
            self.PromiseResult = err
        }
        try {
            executor(resolve,reject)
        } catch (error) {
            reject(error)
        }
    }
    then(resolve, reject){}
}
```

```javascript
let p = new Promise((resolve, reject)=>{
    throw 'error'
})
console.log(p)  // Promise {PromiseState: 'rejected', PromiseResult: 'error'}
```

#### 限制状态只能改变一次

```javascript
function resolve(data){
    if(self.PromiseState !== 'pendding') return
    self.PromiseState = 'fulfilled'
    self.PromiseResult = data
}
function reject(err){
    if(self.PromiseState !== 'pendding') return
    self.PromiseState = 'rejected'
    self.PromiseResult = err
}
```

#### 实现then

```javascript
    then(resolve, reject){
        if(this.PromiseState === 'fulfilled') resolve(this.PromiseResult)
        if(this.PromiseState === 'rejected') reject(this.PromiseResult)
    }
```

```javascript
let p = new Promise((resolve, reject)=>{
    resolve('ok')
    reject('err')
})
p.then(res=>{
    console.log(res) // ok
})
```

#### 异步回调的执行

```javascript
let p = new Promise((resolve, reject)=>{
    setTimeout(function(){
        resolve('ok')
    },100)
})
p.then(res=>{
    console.log(res)
},err => {
    console.log(err)
})
```

由于包含了异步回调函数，因此`resolve`不会同步执行，在目前的情况下，执行`then`时，状态并没有改变。因此我们需要包含`then`中的两个回调函数，并在`resolve`或`reject`中执行。

```javascript
    constructor(executor){
        ...
        this.callback = {}
    }

    then(onResolve, onReject){
        if(this.PromiseState === 'fulfilled') onResolve(this.PromiseResult)
        if(this.PromiseState === 'rejected') onReject(this.PromiseResult)
        if(this.PromiseState === 'pendding') {
            // 保存回调函数
            this.callback = {
                onResolve,
                onReject,
            }
        }
    }
```

根据`callback`属性是否有值进行执行：

```javascript
function resolve(data){
    if(self.PromiseState !== 'pendding') return
    self.PromiseState = 'fulfilled'
    self.PromiseResult = data
    if(self.callback.onResolve){
        self.callback.onResolve(data)
    }
}
function reject(err){
    if(self.PromiseState !== 'pendding') return
    self.PromiseState = 'rejected'
    self.PromiseResult = err
    if(self.callback.onReject){
        self.callback.onReject(err)
    }
}
```

此时代码为：

```javascript
class Promise {
    constructor(executor){
        this.PromiseState = 'pendding'
        this.PromiseResult = null
        this.callback = {}
        const self = this
        function resolve(data){
            if(self.PromiseState !== 'pendding') return
            self.PromiseState = 'fulfilled'
            self.PromiseResult = data
            if(self.callback.onResolve){
                self.callback.onResolve(data)
            }
        }
        function reject(err){
            if(self.PromiseState !== 'pendding') return
            self.PromiseState = 'rejected'
            self.PromiseResult = err
            if(self.callback.onReject){
                self.callback.onReject(err)
            }
        }
        try {
            executor(resolve,reject)
        } catch (error) {
            reject(error)
        }
    }
    then(onResolve, onReject){
        if(this.PromiseState === 'fulfilled') onResolve(this.PromiseResult)
        if(this.PromiseState === 'rejected') onReject(this.PromiseResult)
        if(this.PromiseState === 'pendding') {
            // 保存回调函数
            this.callback = {
                onResolve,
                onReject,
            }
        }
    }
}
```

#### `then`支持多个回调函数

在下面的情况下，只会输出`3, ok`

```javascript
let p = new Promise((resolve, reject)=>{
    setTimeout(function(){
        resolve('ok')
    },100)
})
p.then(res=>{
    console.log(1,res)
})
p.then(res=>{
    console.log(2,res)
})
p.then(res=>{
    console.log(3,res)
})
```

因为只保存了一个对象，因此后面的then方法会覆盖前面的then方法中的回调。

1. 首先应该将`callback`由对象改为数组
```javascript
this.callbacks = []
```

2. then方法中应该将回调放入该数组

```javascript
then(onResolve, onReject){
    if(this.PromiseState === 'fulfilled') onResolve(this.PromiseResult)
    if(this.PromiseState === 'rejected') onReject(this.PromiseResult)
    if(this.PromiseState === 'pendding') {
        // 保存回调函数
        this.callbacks.push({onResolve,onReject})
    }
}
```

3. `resolve`和`reject`方法中进行遍历

```javascript
function resolve(data){
    if(self.PromiseState !== 'pendding') return
    self.PromiseState = 'fulfilled'
    self.PromiseResult = data
    if(self.callbacks.length > 0){
        self.callbacks.forEach(callback => {
            callback.onResolve(data)
        })
    }
}
function reject(err){
    if(self.PromiseState !== 'pendding') return
    self.PromiseState = 'rejected'
    self.PromiseResult = err
    if(self.callbacks.length > 0){
        self.callbacks.forEach(callback => {
            callback.onResolve(data)
        })
    }
}
```

#### then 的返回结果为同步任务

```javascript
then(onResolve, onReject){
return new Promise((resolve, reject) => {
    if(this.PromiseState === 'fulfilled'){
        let res = onResolve(this.PromiseResult)
        if(res instanceof Promise) {
            return res.then(val => {
                resolve(val)
            }, err => {
                reject(err)
            })
        }else {
            resolve(res)
        }
    }
    if(this.PromiseState === 'rejected') onReject(this.PromiseResult)
    if(this.PromiseState === 'pendding') {
        // 保存回调函数
        this.callbacks.push({onResolve,onReject})
    }
})
}
```

```javascript
let p = new Promise((resolve, reject)=>{
    resolve('ok')
})
const res = p.then(res=>{
    // return 'p'
    return new Promise((resolve, reject)=>{
        reject('no')
    })
},err=>{
    console.log(err)
})

console.log(res)
```

抛出错误处理：

```javascript
then(onResolve, onReject){
    return new Promise((resolve, reject) => {
        try {
            if(this.PromiseState === 'fulfilled'){
                let res = onResolve(this.PromiseResult)
                if(res instanceof Promise) {
                    return res.then(val => {
                        resolve(val)
                    }, err => {
                        reject(err)
                    })
                }else {
                    resolve(res)
                }
            }
        } catch (error) {
            reject(error)
        }
        if(this.PromiseState === 'rejected') onReject(this.PromiseResult)
        if(this.PromiseState === 'pendding') {
            // 保存回调函数
            this.callbacks.push({onResolve,onReject})
        }
    })
}
}
```

#### then 的返回结果为异步任务