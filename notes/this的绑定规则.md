
### this绑定时机

执行时this才开始绑定，对于函数来说，函数内部的this指向与函数的调用方式有关

### 函数的不同调用方法下的this

直接调用时，指向`window`

作为对象方法调用，指向该对象

使用apply/call/bind，则指向apply函数传入的参数

### this的绑定规则

#### 默认绑定

函数独立调用则指向`window`，无论函数是在哪里调用的，即便是在其他函数内部或者对象内部，但要注意是独立调用。

来看一个经典的代码：

```javascript
const obj = { fn : function(){console.log(this)}}
obj.fn()
```

上面的打印结果是fn函数，即`fn : function(){console.log(this)}`中的this此时指向的是`obj`。为什么呢？因为调用者是obj

请问上面的结果会使什么？

```javascript
const obj = { fn : function(){console.log(this)}}
let f = obj.fn
f() // Window
```

上面的打印结果是 Window，因为f是独立调用的

```javascript
function fn(){console.log(this)}
const obj = {fn:fn}
let f = obj.fn
f()
```

同样是 Window，因为`f()`是独立调用的方式

如果是在函数内部返回一个函数呢？

```javascript
function fn(){
    return function(){
        console.log(this)
    }
}
const f = fn;
f();
```
依然是 `Window`。

#### 隐式绑定

通过一个对象调用函数，则函数内部的`this`会绑定为该对象

```javascript
function fn(){console.log(this)}
const obj = {fn:fn}
obj.fn()
```

上面的调用者是`obj`，因此函数`fn`内部的`this`会指向obj

即便是在一个对象内部调用另外一个对象的方法，也是看调用者是谁

```javascript
const obj1 = {
    name : 'obj1',
    fn : function(){
        console.log(this)
    }
}
const obj2 = {
    name : 'obj2',
    fn : obj1.fn
}
obj2.fn()
```
上面的打印结果为obj2对象

当然如果我们稍微做一下改变，不直接用obj2调用fn会怎样呢？

```javascript
const obj1 = {
    name : 'obj1',
    fn : function(){
        console.log(this)
    }
}
const obj2 = {
    name : 'obj2',
    fn : obj1.fn
}
const f = obj2.fn
f()
```

这样调用就又变回了直接的函数调用，回到了默认绑定的规则，`this`会指向`Window`

#### 显式绑定 `apply`,`call`,`bind`

但是如果我们想借调函数呢？就是说我们直接借用下函数的功能，既不想让函数内部的`this`指向`Window`，也不想再创建一个对象以对象方法的方式调用该函数，那该怎么办呢？

这种情况就可以使用`apply`,`call`,`bind`函数，进行显示绑定，将函数this直接进行绑定

`call`与`apply`的第一个参数都是要绑定为`this`的值。`call`的后续参数逐个传入，`apply`的后续参数以数组形式传入

可以看下面的例子🌰：

1.将`this`绑定为`null`，则`this`指向 `Window`
```javascript
function fn(num1, num2){
    console.log(this) // Window
    return (num1 + num2 + 1)
}

fn.call(null,4,5) // 10
fn.apply(null,[4,5]) // 10
```

2.将`this`绑定为`obj`对象
```javascript
const obj = {
    name : 'flten',
    age : 20,
}
function fn(){console.log(this.name)}
fn.apply(obj) // flten
```

`bind`是特殊的显式绑定，因为它会返回一个绑定了`this`对象的函数。

```javascript
const obj = {
    name : 'flten',
    age : 20,
}
function fn(){console.log(this.name)}
const f = fn.bind(obj) // flten
f()
```

结果是将`this`绑定为了`obj`对象。可是这样子不是直接调用吗？不应该是默认绑定为`Window`吗？又想延后调用，又想指定`this`，两种规则必然冲突，但是`bind`显式绑定的优先级是高于默认绑定的。

#### new 绑定

将函数作为构造函数使用时，`this`会自动绑定到创建的新对象。

#### 规则优先级

`new绑定 > 显示绑定 > 隐式绑定 > 默认绑定`

显示绑定和隐式绑定的比较

```javascript
let obj = {
    name : 'flten',
    fn: fn,
}

function fn(){console.log(this)}

obj.fn.call('flten') // String {'flten'}
```

```javascript
let obj = {
    name : 'flten',
    fn: fn.bind('flten'),
}

function fn(){console.log(this)}

obj.fn() // String {'flten'}
```

new和显示绑定的比较

```javascript
function Fn(){console.log(this)}

let F = Fn.bind('flten')
let f = new F() // Fn {}
```

### 特殊绑定

#### call/apply/bind

如果绑定的是`null`或`undefined`，则绑定为`Window`

```javascript
function fn(){
    console.log(this)
}

fn.call(null) // Window
fn.apply(null) // Window
fn.call(undefined) // Window
fn.apply(undefined) // Window

let f1 = fn.bind(null)
f1()// Window

let f2 = fn.bind(undefined)
f2()// Window
```

#### 间接函数引用

```javascript
let obj1 = {
    name : 'obj1',
    fn:function(){
        console.log(this)
    }
};
let obj2 = {
    name : 'obj2',
};

(obj2.fn=obj1.fn)() // Window，因为将其看做一个直接函数调用，即()()
```

### 箭头函数的this指向

#### 箭头函数的this

箭头函数不会绑定`this`,只会到上层作用域找`this`。下面的三种调用方式都不会改变`this`指向

```javascript
let name = 'flten';

let fn = ()=>{console.log(this)}

fn() // Window
let obj = {
    name:'flten',
    fn:fn,
}
obj.fn()// Window
fn.call('a')// Window
```

#### 箭头函数`this`不绑定带来的好处

```javascript
let obj = {
    data:[],
    getData(){
        // 模拟网络请求 
        function getServeData(){
            let result = [1,2,3]
            this.data = result
        }
        getServeData();
    }
}
obj.getData()
console.log(obj.data)  // []
```

上面的`data`没有取到结果，因为`setTimeout`传入的函数中,`this`指向了全局`Winodw`

为了解决这个问题，我们可以提供保存`this`，利用闭包将其传给setTimeout的函数中

```javascript
let obj = {
    data:[],
    getData(){
        let that = this;
        // 模拟网络请求 
        function getServeData(){
            let result = [1,2,3]
            that.data = result
        }
        getServeData();
    }
}
obj.getData()
console.log(obj.data)  // [1, 2, 3]
```

但如果使用箭头函数，则可以完美避免这个问题

```javascript
let obj = {
    data:[],
    getData(){
        let that = this;
        // 模拟网络请求 
        (()=>{
            let result = [1,2,3]
            that.data = result
        })()
    }
}
obj.getData()
console.log(obj.data)  // [1, 2, 3]
```
