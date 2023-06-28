### 实现call

函数作为对象调用`call`时，函数`call`内部的`this`便指向了该函数。

```javascript
Function.prototype.myCall = function(target){
    let fn = this
    target.fn = fn
    target.fn()
}

const obj = {
    age : 'flten'
}

function fn(){
    console.log(this.age)
}

fn.myCall(obj)
```

主要的实现：

```javascript
Function.prototype.myCall = function(target, ...args){
    let fn = this
    if(Object.is(target, null) || Object.is(target, undefined)) target = globalThis
    if(typeof target !== 'object'){
        target = Object(target)
    }
    target.fn = fn
    let result = target.fn(...args)
    delete target.fn
    return result
}

const obj = {
    age : 'flten'
}

function fn(job){
    console.log(this)
    console.log(this.age)
    console.log(job)
    console.log('-------------')
}

fn.myCall(obj, 'programmer')
fn.myCall('flten')
fn.myCall(undefined)
fn.myCall(0)

function add(num1,num2,num3){
    return num1+num2+num3
}
console.log(add.myCall(null,1,2,3))
```

存在的问题：

函数副作用：

如果对象存在和函数名同名的属性，就破坏了对象。

解决：使用时间戳作为属性名

```javascript
Function.prototype.myCall = function(target, ...args){
    let fn = Date.now()
    let self = this
    if(Object.is(target, null) || Object.is(target, undefined)) target = globalThis
    if(typeof target !== 'object'){
        target = Object(target)
    }
    target[fn] = self
    let result = target[fn](...args)
    delete target.fn
    return result
}
```

判断当前是否处于全局严格模式下：

```javascript
"use strict"

var fn = (function(){
    return this === undefined
}())

function test(){
    console.log(fn) // true
}

test()
```

判断局部严格模式：
```javascript
// "use strict"

var fn = (function(){
    return this === undefined
}())

function test(){
    "use strict"
    console.log(fn) 
}

console.log(test.toString().includes("use strict")) // true
```

### 实现apply

与`call`的区别在于传入的参数是一个数组

```javascript
Function.prototype.myApply = function(target, args){
    let fn = this
    if(Object.is(target, null) || Object.is(target, undefined)) target = globalThis
    if(typeof target !== 'object'){
        target = Object(target)
    }
    target.fn = fn
    if(Object.is(args, undefined)) args = []
    let result = target.fn(...args)
    delete target.fn
    return result
}

function add(...arr){
    return arr.reduce((prev, result)=> prev + result, 0)
}
console.log(add.myApply(null,[1,2,3])) // 6
console.log(add.myApply(null))
```

### bind的实现

```javascript
Function.prototype.myBind = function(target, ...args){
    let fn = Date.now()
    let self = this
    if(Object.is(target, undefined) || Object.is(target, null)) target = globalThis
    target = Object(target)
    
    return function(){
        target[fn] = self
        let result = target[fn](...args)
        delete target[fn]
        return result
    }
}

function logNumber(num1, num2, num3){
    return num1+num2+num3
}

const newLogNumber = logNumber.myBind(null, 1,2,3)
console.log(newLogNumber()) // 6
```
加入柯里化支持，不一次性传入的全部参数

```javascript
Function.prototype.myBind = function(target, ...args){
    let fn = Date.now()
    let self = this
    if(Object.is(target, undefined) || Object.is(target, null)) target = globalThis
    target = Object(target)
    
    return function(...newArgs){
        target[fn] = self
        let result = target[fn](...args, ...newArgs)
        delete target[fn]
        return result
    }
}

function logNumber(num1, num2, num3){
    return num1+num2+num3
}

const newLogNumber = logNumber.myBind(null, 1,2)
console.log(newLogNumber(3)) // 6
```