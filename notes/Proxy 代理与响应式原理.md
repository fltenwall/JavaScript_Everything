
### 监听对象的操作

### Object.defineProperty

#### 快速上手


#### 缺陷

1.无法直接监听新增、删除属性

2.是直接操作原对象的属性，修改了对象本身的属性描述符

### Proxy 代理

#### 快速了解

Proxy是ES6新增的`类`, 用来创建代理对象，通过代理对象完成对原对象的监听操作，不直接监听原对象，不改变原对象的属性描述符。

Proxy 提供了更多的监听操作，可以通过重写 Proxy 的捕获器来对代理对象进行操作和监听。

#### get/set捕获器

```javascript
//04.js
const obj = {
    name:'flten',
    age:20,
}

const proxy = new Proxy(obj, {
    get: function(target, key){
        console.log(`${key} 属性被获取`)
        return target[key]
    },
    set: function(target, key, newValue){
        console.log(`${key} 属性被设置`)
        target[key] = newValue
    },
})

proxy.name='fltenwall'
proxy.age=18

console.log(proxy.name)
console.log(proxy.age)
console.log('---------')
console.log(obj.name)
console.log(obj.age)

/*
name 属性被设置
age 属性被设置
name 属性被获取
fltenwall
age 属性被获取
18
---------
fltenwall
18
*/
```

#### in 捕获器

对象属性的存在性检查操作监听

```javascript
//05.js
const obj = {
    name:'flten',
    age:20,
}

const proxy = new Proxy(obj, {
    has: function(target, key){
        console.log(`对象的${key}属性存在性检查操作`)
        return key in target
    },
})

console.log('name' in proxy)

/*
对象的name属性存在性检查操作
true
*/
```

#### deleteProperty 监听属性删除操作

```javascript
//06.js
const obj = {
    name:'flten',
    age:20,
}

const proxy = new Proxy(obj, {
    deleteProperty: function(target,key){
        console.log(`监听到删除了属性${key}`)
        delete target[key]
    }
})

delete proxy.age

/*
监听到删除了属性age
*/
```

#### apply监听函数对象的apply操作

```javascript
//07.js
function fn(){

}

const proxy = new Proxy(fn, {
    apply: function(target, thisArg, argArray){
        console.log(`对${target.name}对象进行了apply操作`)
        target.apply(thisArg, argArg)
    }
})

proxy.apply({}, ['age'])

/*
对fn对象进行了apply操作
*/
```
#### construct 监听函数对象的 new 调用操作

```javascript
//08.js
function fn(){

}

const proxy = new Proxy(fn, {
    construct: function(target, argArray, newTarget){
        console.log(`对${target.name}对象进行了new操作`)
        return new target(...argArray)
    }
})

new proxy('age')

/*
对fn对象进行了new操作
*/
```

