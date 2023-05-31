#### var声明

1.`var`声明的变量会进行比变量提升

2.`var`声明的变量会在`window`上添加一个属性

#### let与const声明

1.let/const不可重复定义

2.const值不可改变，但如果是引用类型，则其地址不可更改，但其内部属性可变


#### let/const有没有作用域提升

词法环境被实例化时(执行上下文被创建时)，let/const声明的变量就已经创建了，但不能访问，直到被词法绑定时被求值。

以下代码，在代码解析时，执行到`console.log(foo)`,foo已经被创建了，但是不能被访问。

```javascript
console.log(foo)
let foo = 'flten'
```

#### let/const与window

1.`let`和`const`如何进行保存

结论：变量保存在`VaraiableMap`中

每一个执行上下文会关联到一个变量环境`VariableEnvrionment`，在执行代码中变量和函数声明会作为环境记录添加到变量环境中。

2.(新)VE 与 VO(旧) 的不同：

对于 V8 引擎来说，VE 对应的变量会存放在`variable_:VaraiableMap`，是一个哈希表的结构

而之前的实现中，`var`声明的变量会存放在`GO`中，而`GO`会关联到`window`上，因此早期`GO`和`window`是等价的。现在的实现中，`window`是浏览器添加的全局变量，并且会保持`window`上挂载的属性和`var`声明变量的相等性，但二者应该不再是同一个对象，而仅仅是为了兼容之前的浏览器实现。

创建作用域的文件：`scopes.cc`

#### 块级作用域

1.ES5中没有块级作用域，只有`全局作用域`和`函数作用域`。内层作用域会通过`作用域链`访问外层作用域的变量.

2.ES6 中提供了块级作用域,但要注意代码块声明的块级作用域对`var`无效，对`let/const/function/class`声明有效

 ```javascript
{
    var f1 = 'f1'
    let f2 = 'f2'
}
console.log(f1)  // f1
console.log(f1) // 报错
 ```

3.注意📢：对函数的声明，大部分浏览器为了兼容旧代码，使得`function`声明无块级作用域

 ```javascript
{
    function foo(){
        console.log('foo')
    }
}
foo() // foo
 ```

4.但块级作用域对`class`声明有效，因为早期标准中没有`class`声明，不存在历史负担

 ```javascript
{
    class Person{}
}
let p = new Person() // ReferenceError: Person is not defined
 ```

 5.`if/switch/for`代码块也是块级作用域

if语句

 ```javascript
if(true){
    var f1 = 'flten'
    let f2 = 'me'
}
console.log(f1) // flten
console.log(f2) // f2 is not defined
 ```

switch语句

```javascript
switch(true){
    case true:
        var f1 = 'flten'
        let f2 = 'me'
}

console.log(f1)  // flten
console.log(f2) // ReferenceError: f2 is not defined
```

for语句：

(1)var声明

```javascript
for (var index = 0; index < 10; index++) {
    console.log(index)
}
console.log(index)  // 10
```

(2)let 声明

```javascript
for (let index = 0; index < 10; index++) {
    console.log(index)
} 
console.log(index)  // ReferenceError: index is not defined
```

#### 块级作用域的应用

下面👇的每个按钮点击时，因为`var`没有块级作用域，因为向上层作用域(全局作用域)去查找变量`index`,而全局的`index`已经变为5

```html
<body>
    <button>1</button>
    <button>2</button>
    <button>3</button>
    <button>4</button>
    <button>5</button>
    <script>
        const btns = document.getElementsByTagName('button')
        for (var index = 0; index < btns.length; index++) {
            const element = btns[index];
            element.onclick = function(){
                console.log(index) 
            }
        }
    </script>
</body>
```

使用立即执行函数生成函数作用域，每一层循环就多形成一个函数作用域，保持对应的变量值`index`。点击按钮时，执行回调函数，向上层作用域(这时候是函数作用域)找到变量`index`

```javascript
const btns = document.getElementsByTagName('button')
for (var index = 0; index < btns.length; index++) {
    (function(index){
        const element = btns[index];
        element.onclick = function(){
            console.log(index)
        }
    })(index)
}
```

使用`let`增加块级作用域，每一次循环都会增加一个块级作用域保持变量值`index`。点击按钮时，执行回调函数，直接在对应的块级作用域中找到`index`

```javascript
const btns = document.getElementsByTagName('button')
for (let index = 0; index < btns.length; index++) {
    const element = btns[index];
    element.onclick = function(){
        console.log(index)
    }
}
```

但是上面的代码是不能使用`const`定义`index`的，因为`const`定义的变量不能够进行自增操作。

但在不自增的情况下，是可以进行遍历循环的

```javascript
const arr = [1,2,3]

for (const iterator of arr) {
    console.log(iterator)
}
```

#### 暂时性死区

使用`let/const`声明的变量，在声明之前，是不可使用的。

```javascript
var foo = 'flten'

if(true){
    console.log(foo) // flten
}
```
使用`let`声明后会出现暂时性死区。下面的代码中，尽管全局作用域中声明了变量`foo`，但是在`if`块级作用域中，使用了`let`声明，这里便形成了暂时性死区，`if`代码块内，`foo`不能在声明前被使用。

```javascript
var foo = 'flten'

if(true){
    console.log(foo) 
    let foo = 'wall' // ReferenceError: Cannot access 'foo' before initialization
}
```

#### var/let/const的使用选择

1.不使用`var`

2.优先使用`const`

#### var与let的区别总结

1.作用域提升

2.是否挂载到了`window`上

3.块级作用域