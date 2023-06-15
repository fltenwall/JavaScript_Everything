<!-- vscode-markdown-toc -->
* 1. [js基础面试题](#js)
    * 1.1. [call和apply哪个性能更好](#callapply)
    * 1.2. [实现一个属性选择器](#)
    * 1.3. [script标签的defer和async有什么区别](#scriptdeferasync)
    * 1.4. [prefetch和preload的区别是什么](#prefetchpreload)
    * 1.5. [dns-prefetch和preconnet的区别](#dns-prefetchpreconnet)
    * 1.6. [什么时候不能使用箭头函数](#-1)
    * 1.7. [for...in 和 for...of 的区别](#for...infor...of)
    * 1.8. [如何区分`可枚举`与`可迭代`数据：](#-1)
    * 1.9. [for await...of有什么作用](#forawait...of)
    * 1.10. [JS严格模式的特点](#JS)
    * 1.11. [for和forEach 哪个更快](#forforEach)
    * 1.12. [如何将一个类数组转为数组](#-1)
    * 1.13. [如何进行数组去重](#-1)
    * 1.14. [怎样对给定数组求最大值](#-1)
    * 1.15. [多种方式实现数组拍平](#-1)
    * 1.16. [如何使`a===1 && a===2 && a===3`成立](#a1a2a3)
    * 1.17. [ES6中对象新增的方法有了解吗？](#ES6)
    * 1.18. [class和function的区别](#classfunction)
    * 1.19. [你对Promise了解多少](#Promise)
    * 1.20. [如何去除数组中指定的元素](#-1)
    * 1.21. [JavaScript 的数组方法有哪些](#JavaScript)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->
###  1. <a name='js'></a>js基础面试题
####  1.1. <a name='callapply'></a>call和apply哪个性能更好

1. call和apply都是 Function 构造函数原型上的方法
2. call传参是逐个传参，apply是传入一个数组
3. 传参超过 3 个时，`call`的性能会比`apply`更好
4. jquery作者在注释中说明过call性能更好
5. 从内存角度看，数组会放在堆中，增加一个引用指向；而且V8 会为每一个对象创建一个隐藏类，记录对象的属性布局，包括所有属性和偏移量

####  1.2. <a name=''></a>实现一个属性选择器

实现一个`$attr(name,value)`遍历属性为name，所有值为value的元素集合

```html
<body>
    <div class="box fix"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box fix"></div>
    <div class="box"></div>
    <div class="box2"></div>
    <div class="box3"></div>
    <div class="box4"></div>
    <div class="box5"></div>
    <script>
        function $attr(name, value){
            // 获取页面中所有标签
            let elements = document.getElementsByTagName('*');
            const arr = [];
            elements = Array.from(elements);
            elements.forEach(item => {
                let itemValue = item.getAttribute(name);
                // 类名可以有多个
                if(name === 'class'){
                    new RegExp("\\b"+value+"\\b").test(itemValue) ? arr.push(item) : null;
                    return
                }
                if(itemValue === value) arr.push(item)
            });
            return arr 
        }
        console.log($attr('class', 'box'))
    </script>
</body>
```

####  1.3. <a name='scriptdeferasync'></a>script标签的defer和async有什么区别

`<script>`: 遇到script中断 HTML 解析，加载js文件，然后解析 JS 文件，再继续解析 HTML

`<script defer>`: 遇到script并行加载js文件，但 HTML 解析完才行执行 JS

`<script async>`：遇到script并行加载js文件，但 JS 加载完后会立刻执行，HTML 需要等待 JS 加载结束再继续解析

![defer与async.png](https://github.com/fltenwall/JavaScript_Interview_Everything/blob/main/notes/JavaScript/imgs/defer%E4%B8%8Easync.png)

JS是单线程的，JS 解析与 DOM 渲染共用一个线程。因此 JS 加载与 HTML 解析可以并行，但是 JS 解析与 HTML 解析不能并行。

日常工作中，`<script defer>`更好，并行加载，但是 HTML 解析完毕再执行 HTML。将`<script>`放到最后的话，JS 文件是在 HTML 解析再加载，然后再解析的。

####  1.4. <a name='prefetchpreload'></a>prefetch和preload的区别是什么

prefetch和dns-prefetch没有直接联系。

prefetch：提前，资源在未来页面使用，`空闲时加载`

preload：提前加载，资源在当前页面使用，会`优先加载`

```html
<head>
    <!-- preload 优先加载，当前页面使用 -->
    <link rel="preload" href="style.css" as="style">
    <link rel="preload" href="main.js" as="script">
    <!-- prefetch 当前页面不使用，空闲时加载 -->
    <link rel="prefetch" href="other.js" as="script">

    <!-- 当前页面引用preload的文件 -->
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- 当前页面引用preload的文件 -->
    <script scr="main.js" defer></script>
</body>
```

####  1.5. <a name='dns-prefetchpreconnet'></a>dns-prefetch和preconnet的区别

dns-prefetch：DNS 预查询

preconnet：DNS 预连接

都是针对未来页面

```html
<head>
    <link rel="dns-prefetch" href="https://www.baid.com">
    <link rel="preconnet" href="https://www.baid.com" crossorigin>
</head>
```

####  1.6. <a name='-1'></a>什么时候不能使用箭头函数

箭头函数的特性：

1.箭头函数不绑定this，直接去上一层作用域取this，无法通过`call/apply/bind`改变this

2.箭头函数没有显示原型对象，即没有`prototype`属性

3.箭头函数不能作为构造函数使用

4.箭头函数没有`arguments`

5.箭头函数作为对象存在隐式原型，通过`__proto__`指向`Function`的原型对象，即`Function.prototype`

```javascript
const a = ()=>{}
console.log(a.__proto__ === Function.prototype) // true
```

不适用的场景：

1. 作为对象方法，这样无法通过this获取到该对象
2. 作为原型方法，函数内部的this无法指向原型
3. 箭头函数无法作为构造函数使用
4. 动态上下文中的回调函数

```javascript
btn.addEventListener('click', ()=>{
    this.innerHTML = 'aaa'  // ❌
})
```
5. Vue 的生命周期和methods 不能使用箭头函数，`this`无法指向 Vue实例。

因为 Vue 组件本质上是一个对象，而 React 的非hooks组件本质上是一个class因此可以使用

####  1.7. <a name='for...infor...of'></a>for...in 和 for...of 的区别

1. for...in 遍历得到key，for...of遍历得到value
2. 适用于不同的数据类型，`for...in`适用于`可枚举`数据，比如对象、数组、字符串等；`for...of`适用于`可迭代`数据， 比如数组、字符串、Map、Set

遍历对象：`for...in`可以；`for...of`不行，会报错。

遍历map/set：`for...in`不可以，不会返回任何结果；`for...of`可以，迭代`map`得到的是`[key,value]`组合

遍历generator：`for...in`不可以，不会返回任何结果；`for...of`可以

####  1.8. <a name='-1'></a>如何区分`可枚举`与`可迭代`数据：

使用`Object.getOwnPropertyDescriptors(obj)`查看`enumerable`属性是否为`true`

查看数据是否存在`Symbol.iterator`迭代方法，该迭代函数具有一个`next`方法

####  1.9. <a name='forawait...of'></a>for await...of有什么作用

`for await...of`用于遍历多个 Promise，可以替代使用`Promise.all()`

```javascript

function createPromise(val){
    return new Promise((resolve, reject)=>{
        setTimeout(function(){
            resolve(val)
        },1000)
    })
}

(async function(){
    const p1 = createPromise(1)
    const p2 = createPromise(2)
    const p3 = createPromise(3)

    const list = [p1,p2,p3]

    // 遍历多个promise
    for await (const res of list) {
        console.log(res)
    }
})()

```

如果是想异步调用每一个promise，让promise按顺序执行：

```javascript
(async function(){
    const list = [1,2,3]

    for (const num of list) {
        const res = await createPromise(num)
        console.log(res)
    }
})()
```

####  1.10. <a name='JS'></a>JS严格模式的特点

构建工具打包出来的生产环境的代码一般是在严格模式下

```javascript
// 全局开启
'use strick'

// 只在该该函数内开启
function fn(){
    'use strick'
}
```

```html
<script>
'use strick'
</script>
```

要求：

1. 全局变量必须先声明
2. 禁止使用`with`
```javascript
const obj = {a:1, b:2};
with(obj){
    console.log(a, b)
}
```
3. 创建`eval`作用域
```javascript
'use strick'
var x = 1;
eval(`var x = 2;console.log(x)`) // 2
console.log(x)  // 1
```
4. 禁止`this`指向`window`，默认指向window的则`this`为`undefined`
5. 函数参数不能重名

####  1.11. <a name='forforEach'></a>for和forEach 哪个更快

for更快，因为 forEach每次都要创建一个函数调用，函数需要创建作用域等开销。

####  1.12. <a name='-1'></a>如何将一个类数组转为数组

1. 使用`Array.from()`
2. 使用扩展运算符`[...list]`
3. 使用`Array.prototype.slice.call(list)`
4. 使用for循环将类数组元素逐个放入一个新数组

####  1.13. <a name='-1'></a>如何进行数组去重

indexOf 方法，返回值是目标值的下标，找不到返回-1

```javascript
const arr = [1,2,3,4]
const res = arr.indexOf(1)
console.log(res) // 0
```

filter方法，返回值是符合传入函数的数组

```javascript
const arr = [1,2,3,4]
const res = arr.filter((item,index)=>{
    return item % 2 === 0
})
console.log(res) [ 2, 4 ]
```

sort方法，排序，`a-b`从小到大排序

```javascript
const arr = [1,2,3,4]
const res = arr.sort((a,b)=>{
    return a - b
})
console.log(res) //[ 1, 2, 3, 4 ]
```
`b-a`从大到小排序

```javascript
const arr = [1,2,3,4]
const res = arr.sort((a,b)=>{
    return b-a
})
console.log(res) //[ 4, 3, 2, 1 ]
```

reduce 用于数组求和：

```javascript
const arr = [1,2,3,4]
const res = arr.reduce((prev, current, currentIndex, sourceArr)=>{
    return prev(current)
})
console.log(res) //10
```

对基本元素进行排序

push 方法返回的是数组长度，会改变原数组

`indexOf + filter`

```javascript
const arr = [1,2,3,4,2,3,5,1]

function unique(arr){
    if(!Array.isArray(arr)) throw new Error('param is not a array')
    return arr.filter((item ,index)=>{
        return arr.indexOf(item) === index
    })
}

console.log(unique(arr)) // [ 1, 2, 3, 4, 5 ]
```

`sort`排序+遍历数组前后比较

```javascript
const arr = [1,2,3,4,2,3,5,1]

function unique(arr){
    if(!Array.isArray(arr)) throw new Error('param is not a array')
    arr = arr.sort()
    let res = []
    for (let index = 0; index < arr.length; index++) {
        if(arr[index] !== arr[index+1]){
            res.push(arr[index])
        }  
    }
    return res
}

console.log(unique(arr)) // [ 1, 2, 3, 4, 5 ]
```

`set`解构赋值

```javascript
const arr = [1,2,3,4,2,3,5,1]

function unique(arr){
    if(!Array.isArray(arr)) throw new Error('param is not a array')
    return [...new Set(arr)]
    
}

console.log(unique(arr)) // [ 1, 2, 3, 4, 5 ]
```

`set` + `Array.from`方法

```javascript
const arr = [1,2,3,4,2,3,5,1]

function unique(arr){
    if(!Array.isArray(arr)) throw new Error('param is not a array')
    return Array.from(new Set(arr))
    
}

console.log(unique(arr)) // [ 1, 2, 3, 4, 5 ]
```

对象数组去重

临时对象缓存key值

```javascript
const arr = [{name:'flten', age:18},{name:'wall',age:18},{name:'flten',age:22}]

function unique(arr, key){
    if(!Array.isArray(arr)) throw new Error('param is not a array')
    let res = []
    let temp = {}
    for (let index = 0; index < arr.length; index++) {
        let keyName = arr[index][key]
        if(temp[keyName]){
            continue
        }
        temp[keyName] = true
        res.push(arr[index])
    }
    return res
}

console.log(unique(arr, 'name')) // [ { name: 'flten', age: 18 }, { name: 'wall', age: 18 } ]
```

使用 reduce 和临时对象缓存

```javascript
const arr = [{name:'flten', age:18},{name:'wall',age:18},{name:'flten',age:22}]

function unique(arr, key){
    if(!Array.isArray(arr)) throw new Error('param is not a array')
    const cacheObject = {}
    return arr.reduce((prev, crrent)=>{
        cacheObject[crrent[key]] ? "" : cacheObject[crrent[key]] = true && prev.push(crrent)
        return prev
    },[])
}

console.log(unique(arr, 'name')) // [ { name: 'flten', age: 18 }, { name: 'wall', age: 18 } ]
```

####  1.14. <a name='-1'></a>怎样对给定数组求最大值

1. Math.sort

```javascript
const arr = [1,2,3,9,5,8]
const res = Math.max(...arr)
console.log(res) // 9
```

```javascript
const arr = [1,2,3,9,5,8]
const res = Math.max.apply(null, arr)
console.log(res) // 9
```

2. reduce

```javascript
const arr = [1,2,3,9,5,8]
const getMax = (arr) => (arr).reduce((prev, current)=>{
    return current > prev ? current : prev
})
console.log(getMax(arr)) // 9
```

3. sort

```javascript
const arr = [1,2,3,9,5,8]
const getMax = (arr) => {
    const newArr = arr.sort()
    return newArr[newArr.length-1]
}
console.log(getMax(arr)) // 9
```

####  1.15. <a name='-1'></a>多种方式实现数组拍平

1. reduce

```javascript
const arr = [[1,2,3],6,7,[10,[9,3,[5,7,]]],0,[11,7]]
const flatArr = (arr) => {
    return arr.reduce((prev,current)=>{
        return prev.concat(Array.isArray(current) ? flatArr(current) : current)
    },[])
}
console.log(flatArr(arr)) 

// [1, 2, 3, 6, 7, 10,9, 3, 5, 7, 0, 11,7]
```

2. flat

```javascript
const arr = [[1,2,3],6,7,[10,[9,3,[5,7,]]],0,[11,7]]
const flatArr = (arr) => {
    return arr.flat(Infinity)
}
console.log(flatArr(arr)) 

// [1, 2, 3, 6, 7, 10,9, 3, 5, 7, 0, 11,7]
```

3. while 循环

```javascript
const arr = [[1,2,3],6,7,[10,[9,3,[5,7,]]],0,[11,7]]
const flatArr = (arr) => {
    while(arr.some(Array.isArray)){
        arr = [].concat(...arr)
    }
    return arr
}
console.log(flatArr(arr)) 

// [1, 2, 3, 6, 7, 10,9, 3, 5, 7, 0, 11,7]
```

####  1.16. <a name='a1a2a3'></a>如何使`a===1 && a===2 && a===3`成立

使以下代码成立：
```javascript
if(a===1 && a===2 && a===3){
    console.log('object')
}
```

```javascript
let value = 0
Object.defineProperty(window, 'a', {
    get(){
        return ++value
    }
})

if(a===1 && a===2 && a===3){
    console.log('object')
}
```

####  1.17. <a name='ES6'></a>ES6中对象新增的方法有了解吗？

Object.is() 判断两个值是否相等

1. `Object.is`会同时比较值和类型是否相等
2.  可以判断`NaN === NaN`为`true`，而`===`并不能

Object.assign() 合并目标对象

```javascript
const obj1 = {
    name : 'flten',
    age : 16,
}
const obj2 = {
    name : 'wall',
    food:'meat'
}
const res = Object.assign(obj1, obj2)
console.log(res) // { name: 'wall', age: 16, food: 'meat' }
```

Object.keys 返回一个包含所有对象可遍历属性的数组

```javascript
const obj1 = {
    name : 'flten',
    age : 16,
}
const res = Object.keys(obj1)
console.log(res) // [ 'name', 'age' ]
```

Object.value 返回一个包含所有对象可遍历属性值的数组

```javascript
const obj1 = {
    name : 'flten',
    age : 16,
}
const res = Object.values(obj1)
console.log(res) // [ 'flten', 16 ]
```

Object.entries 返回一个包含所有对象可遍历属性的键值对

```javascript
const obj1 = {
    name : 'flten',
    age : 16,
}
const res = Object.entries(obj1)
console.log(res) // [ [ 'name', 'flten' ], [ 'age', 16 ] ]
```

####  1.18. <a name='classfunction'></a>class和function的区别

相同点：都可以用作构造函数

不同点：

1. class不可以使用`call/apply/bind`改变this指向
2. class可以用`extends`关键字进行继承


####  1.19. <a name='Promise'></a>你对Promise了解多少

什么是 Promise：异步编程的一种标准解决方法

Promise 的三种状态：

1. pending 初始化
2. fulilled 成功态
3. rejected 失败态

状态一经改变，不可再次修改

原型方法：

Promise.prototype.then

1. 支持链式调用
2. 接受两个函数参数，分别作为fulilled和rejected时的回调函数
3. 返回值是一个新的 Promise

Promise.prototype.catch

捕获 Promise 的错误

Promise.prototype.finally

指定无论最后状态都会执行的回调。用于兜底

实例方法：

Promise.all

Promise.race

Promise.resolve

Promise.reject

####  1.20. <a name='-1'></a>如何去除数组中指定的元素

```javascript
const arr = [{name:'flten',age:18},{name:'wall',age:20}]
function cutArray(sourceArray, target){
    sourceArray.forEach((item, index) => {
        if(item.name === target) sourceArray.splice(index,1)
    });
    return sourceArray
}

const res = cutArray(arr, 'flten')
console.log(res) // [ { name: 'wall', age: 20 } ]
```

####  1.21. <a name='JavaScript'></a>JavaScript 的数组方法有哪些

`concat`:连接两个或多个数组，并返回结果

```javascript
const arr1 = [1,2,3]
const arr2 = [4,5,6]
const res = arr1.concat(arr2)
console.log(res) // [ 1, 2, 3, 4, 5, 6 ]
```

`every`:对数组中的每一项运行给定函数，如果该函数对每一项都返回true，则返回true

```javascript
const arr1 = [{age:22},{age:22},{age:19}]
const res = arr1.every(item => item.age > 18)
console.log(res) // true
```

`filter`: 对数组中的每一项都运行给定函数，返回该函数会返回true的项组成的数组

```javascript
const arr1 = [{age:22},{age:22},{age:19}]
const res = arr1.filter(item => item.age > 20)
console.log(res) // [ { age: 22 }, { age: 22 } ]
```

`forEach`: 对数组中的每一项都运行给定函数，但没有返回值

```javascript
const arr1 = [{age:22},{age:22},{age:19}]
const res = arr1.forEach(item => console.log(item))
console.log(res) // { age: 22 } { age: 22 } { age: 19 }
```

`join`: 将所有数组元素拼成一个字符串

```javascript
// const arr1 = [{age:22},{age:22},{age:19}]
const arr1 = [1,2,3,4,5]
const res = arr1.join('-')
console.log(res) // 1-2-3-4-5
```

`indexOf`: 返回第一个与给定参数相等的数组元素的索引，没有找到则返回-1

```javascript
const arr1 = [1,2,3,4,5]
const res1 = arr1.indexOf(1)
const res2 = arr1.indexOf(9)
console.log(res1) // 0
console.log(res2) // -1
```

`lastIndexOf`: 返回在数组中搜索到的与给定参数相等的元素的索引里的最大值

```javascript
const arr1 = [1,2,2,9,3,4,2,5]
const res1 = arr1.lastIndexOf(2)
const res2 = arr1.lastIndexOf(10)
console.log(res1) // 6
console.log(res2) // -1
```

`map`: 对数组中的每一项都运行给定函数，返回每次函数调用的结果组成的数组

```javascript
const arr1 = [{age:22},{age:22},{age:19}]
const res1 = arr1.map(item => item.age)
console.log(res1) //[ 22, 22, 19 ]
```

```javascript
const arr1 = [{age:22},{age:22},{age:19}]
const res1 = arr1.map(item => item.age)
const res2 = arr1.map(item => {
    if(item.age > 20){
        return item
    }
    return {}
})
console.log(res1) //[ 22, 22, 19 ]
console.log(res2) //[ { age: 22 }, { age: 22 }, {} ]
```

`reverse`: 数组反转

```javascript
const arr1 = [1,2,3,34,5]
const res1 = arr1.reverse()
console.log(res1)// [ 5, 34, 3, 2, 1 ]
```

`slice`: 传入索引值，将数组中对应索引范围内的元素作为新数组返回

```javascript
const arr1 = [1,2,3,34,5]
const res1 = arr1.slice(0,3)

console.log(res1) //[ 1, 2, 3 ]
console.log(arr1) //[ 1, 2, 3, 34, 5 ]
```

`splice`: 传入索引值，将数组中对应索引范围内的元素作为新数组返回,但会改变原数组

```javascript
const arr1 = [1,2,3,34,5]
const res1 = arr1.splice(0,3)

console.log(res1) //[ 1, 2, 3 ]
console.log(arr1) //[ 34, 5 ]
```

`some`: 对数组中的每一项都运行给定函数，如果任意一项为true，则返回true

```javascript
const arr1 = [1,2,3,34,5]
const res1 = arr1.some(item => item > 10)

console.log(res1) //true
```

`sort`: 按字母顺序进行排序，支持指定排序方式的函数作为参数。会改变原数组

```javascript
const arr1 = [1,2,3,34,5]
const res1 = arr1.sort((a,b)=>a-b)
console.log(res1, arr1) //[ 34, 5, 3, 2, 1 ] [ 34, 5, 3, 2, 1 ]
const res2 = arr1.sort((a,b)=>b-a)
console.log(res2,arr1) // [ 34, 5, 3, 2, 1 ] [ 34, 5, 3, 2, 1 ]
```

`toString`: 将数组作为字符串返回

```javascript
const arr1 = [1,2,3,34,5]
const res1 = arr1.toString()
console.log(res1) // 1,2,3,34,5
```

`reduce`: 强大的规约函数

```javascript
const arr1 = [1,2,3,34,5]
const res1 = arr1.reduce((prev,current)=>{
    return prev + current
})
console.log(res1) // 45
```