<!-- vscode-markdown-toc -->
	* 1. [监听对象的操作](#)
	* 2. [Object.defineProperty](#Object.defineProperty)
		* 2.1. [快速上手](#-1)
		* 2.2. [缺陷](#-1)
	* 3. [Proxy 代理](#Proxy)
		* 3.1. [快速了解](#-1)
		* 3.2. [get/set捕获器](#getset)
		* 3.3. [in 捕获器](#in)
		* 3.4. [deleteProperty 监听属性删除操作](#deleteProperty)
		* 3.5. [apply监听函数对象的apply操作](#applyapply)
		* 3.6. [construct 监听函数对象的 new 调用操作](#constructnew)
	* 4. [Reflect反射](#Reflect)
		* 4.1. [快速了解](#-1)
		* 4.2. [Proxy的 get 与Reflect.get 的第三个参数(代理对象)：receiver](#ProxygetReflect.getreceiver)
		* 4.3. [Proxy的 set 与Reflect.set 的第三个参数(代理对象)：receiver](#ProxysetReflect.setreceiver)
		* 4.4. [Reflect.construct()](#Reflect.construct)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->
###  1. <a name=''></a>监听对象的操作

###  2. <a name='Object.defineProperty'></a>Object.defineProperty

####  2.1. <a name='-1'></a>快速上手


####  2.2. <a name='-1'></a>缺陷

1.无法直接监听新增、删除属性

2.是直接操作原对象的属性，修改了对象本身的属性描述符

###  3. <a name='Proxy'></a>Proxy 代理

####  3.1. <a name='-1'></a>快速了解

Proxy是ES6新增的`类`, 用来创建代理对象，通过代理对象完成对原对象的监听操作，不直接监听原对象，不改变原对象的属性描述符。

Proxy 提供了更多的监听操作，可以通过重写 Proxy 的捕获器来对代理对象进行操作和监听。

####  3.2. <a name='getset'></a>get/set捕获器

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

####  3.3. <a name='in'></a>in 捕获器

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

####  3.4. <a name='deleteProperty'></a>deleteProperty 监听属性删除操作

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

####  3.5. <a name='applyapply'></a>apply监听函数对象的apply操作

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
####  3.6. <a name='constructnew'></a>construct 监听函数对象的 new 调用操作

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
###  4. <a name='Reflect'></a>Reflect反射

####  4.1. <a name='-1'></a>快速了解 

Reflect是 ES6 新增的一个`对象`，它提供了很多操作对象的方法，类似Object 操作对象的方法。

例如：

```javascript
Reflect.defineProperty()
```
问：为什么要新增一个 `Reflect` 对象呢？

1.Object 作为一个构造函数，承担了太多额外的操作，因此需要一个专门的对象承担这些操作

2.类似 `in`、`delete`操作符非常奇怪，这些操作不应该单独作为操作符

3.因此有需求将对象操作的方法全部放到一个专门的Reflect对象上，将其规范化

4.Reflect上的 13 个方法与 Proxy类上的捕获器是一一对应的

5.在使用 Proxy 进行代理时，可以用Reflect对目标对象进行操作，而不直接对原对象进行操作，让代理操作更加真实，实现真正的代理操作

问：通过`Reflect`操作对象与直接操作对象有什么的区别？

`Reflect`在方法上与对象方法有不同，比如设置值时，`Reflect.set()`会返回一个布尔结果，从而知道设置值操作是否成功

问：`Reflect`有哪些应用场景呢？

1.与 Proxy 配合进行代理操作，用`Reflect`操作对象

2.替代 `Object` 的对象操作

```javascript
//09.js
const obj = {
    name:'flten',
    age:16,
}

const proxy = new Proxy(obj, {
    get: function(target, key, receiver){
        console.log(`监听到了${target.name}对象${key}的get操作`)
        return Reflect.get(target, key)
    },
    set: function(target, key, newValue, receiver){
        console.log(`监听到了${target.name}对象${key}的set操作`)
        Reflect.set(target, key, newValue)
    },
})

proxy.age = 18
console.log(proxy.age)

/*
监听到了flten对象age的set操作
监听到了flten对象age的get操作
18
*/
```

####  4.2. <a name='ProxygetReflect.getreceiver'></a>Proxy的 get 与Reflect.get 的第三个参数(代理对象)：receiver

看下面的代码有什么问题？

```javascript
//10.js
const obj = {
    _name:'flten',
    get name(){
        return this._name
    },
    set name(newValue){
        this._name = newValue
    }
}

const proxy = new Proxy(obj, {
    get: function(target, key){
        console.log(`get方法访问监听了${key}属性`, target)
        return Reflect.get(target, key)
    },
    set: function(target, key, newValue){
        Reflect.set(target, key, newValue)
    }
})

console.log(proxy.name)

/*
get方法访问监听了name属性 {_name: 'flten'}
flten
*/
```

我们来分析一下上面的代码：

1.`console.log(proxy.name)`触发代理对象`proxy`的`get`方法，因此输出`get方法访问监听了name属性 {_name: 'flten'}`;

2.但是`Reflect.get(target, key)`进行操作时，是访问`name`属性，而`name`属性是通过 getter 方法`get name(){return this._name},`进行访问的，而这个 getter 里是去访问 `this._name`的

3.于是存在两个问题：(1)访问了`_name`属性，为什么没有监听到？打印的结果显示只监听到了`name`属性;(2)`this`指向的是哪个对象？实际上我们可以从第一行的打印结果`get方法访问监听了name属性 {_name: 'flten'}`中看到，其实`this`指向的是目标对象`obj`，而不是代理对象 proxy，因此访问`_name`属性时，其实是直接访问了目标对象`obj`

4.因此，在这种情况下，我们对`_name`属性的监听失败，而且直接访问了目标对象`obj`，绕开了代理

因此我们需要在 `proxy` 的 `get` 中直接获取到代理对象，并且改变 this 的指向，解决的方案是在代理对象 `proxy` 的 `get` 方法和 `Reflect` 的 `get` 方法中增加一个代理对象的参数 `receiver`，并且能够将 `this`指向改为代理 对象


```javascript
// 11.js
const obj = {
    _name:'flten',
    get name(){
        return this._name
    },
    set name(newValue){
        this._name = newValue
    }
}

const proxy = new Proxy(obj, {
    get: function(target, key, receiver){
        console.log(`get方法访问监听了${key}属性`, target, receiver)
        console.log(Object.is(target, receiver))
        console.log(Object.is(proxy, receiver))
        // receiver 可以将 this 指向改为代理对象 proxy
        return Reflect.get(target, key, receiver)
    },
    set: function(target, key, newValue){
        Reflect.set(target, key, newValue)
    }
})

console.log(proxy.name)

/*

get方法访问监听了name属性 {_name: 'flten'} Proxy(Object) {_name: 'flten'}
false
true
get方法访问监听_name属性 {_name: 'flten'} Proxy(Object) {_name: 'flten'}
false
true
flten
*/

```
从上面的打印结果可以看到，`name`和`_name`都被监听到了，且`receiver`就是代理对象

因此`receiver`的作用就是传入代理对象，并且改变`this`指向

为了解决同样的问题，在 set 中也需要传入`receiver`

####  4.3. <a name='ProxysetReflect.setreceiver'></a>Proxy的 set 与Reflect.set 的第三个参数(代理对象)：receiver

先来看下面的代码：

```javascript
//12.js
const obj = {
    _name:'flten',
    get name(){
        return this._name
    },
    set name(newValue){
        this._name = newValue
    }
}

const proxy = new Proxy(obj, {
    set: function(target, key, newValue){
        console.log(`对${key}属性进行了set操作`)
        Reflect.set(target, key, newValue)
    }
})

proxy.name = 'fltenwall'

/*
对name属性进行了set操作
*/
```

同样的，对`name`进行设置值时，会设置`_name`属性的值，但是只监听到了name属性的set操作，因此也需要传入代理对象参数-`receiver`

```javascript
//13.js
const obj = {
    _name:'flten',
    get name(){
        return this._name
    },
    set name(newValue){
        this._name = newValue
    }
}

const proxy = new Proxy(obj, {
    set: function(target, key, newValue, receiver){
        console.log(`对${key}属性进行了set操作`)
        Reflect.set(target, key, newValue, receiver)
    }
})

proxy.name = 'fltenwall'

/*
对name属性进行了set操作
对_name属性进行了set操作
*/
```
这样就可以监听到`_name`属性，且改变了`this`指向，从而不会绕过代理对象的监听和避免对目标对象的直接操作

####  4.4. <a name='Reflect.construct'></a>Reflect.construct()

构建函数的实例对象的隐式原型`__proto__`是指向构造函数的原型对象`prototype`的

```javascript
//14.js
function Person(name, age){
    this.name = name
    this.age = age
}

const p = new Person('flten', 16)
console.log(Object.is(p.__proto__, Person.prototype)) // true
```
但如果想改变原型指向，我们需要修改`__proto__`的指向

```javascript
// 15.js
function Person(name, age){
    this.name = name
    this.age = age
}

function Dog(){

}

const p = new Person('flten', 16)
p.__proto__ = Dog.prototype
console.log(Object.is(p.__proto__, Person.prototype)) // false
console.log(Object.is(p.__proto__, Dog.prototype)) // true
```

不过 Reflect 为我们提供了更好的方法：`Reflect.construct()`

```javascript
//16.js
function Person(name, age){
    this.name = name
    this.age = age
}

function Dog(number){
    this.foot = number
}

Dog.prototype.tail = true

const dog = new Dog()
console.log(dog) // Dog { foot: undefined }

// 以Person为构造函数，构造出原型为Dog的函数
const p = Reflect.construct(Person, ['flten', 16], Dog)

console.log(p) // Dog { name: 'flten', age: 16 }
// 可以访问到Dog原型上的属性
console.log(p.tail)  // true
console.log(Object.is(p.__proto__, Person.prototype)) // false
console.log(Object.is(p.__proto__, Dog.prototype)) // true
```




