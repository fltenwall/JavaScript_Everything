#### 字面量增强

1.属性简写

```javascript
let name = 'flten'
let age = 16

let obj = {
    name, // name:name
    age, // age:age
}
```

2.方法简写

```javascript
let obj = {
    foo(){}
}
```
但要注意这种简写是对应`function foo(){}`，而不是`foo:()=>{}`。它们的`this`是不同的。

3.计算属性名

```javascript
let name = 'flten'
let obj = {
    [name+'wall']: 'he'
}
```

#### 数组解构

1.等变量名解构

```javascript
let animals = ['dog','hippo','tiger']

let [dog,hippo,tiger] = animals
console.log(dog,hippo,tiger) // dog hippo tiger
```

2.解构特定位置变量

```javascript
let animals = ['dog','hippo','tiger']

let [,hippo,] = animals
console.log(hippo) // hippo
```
3.剩余运算符

```javascript
let animals = ['dog','hippo','tiger']

let [dog,...others] = animals
console.log(dog,others) // dog [ 'hippo', 'tiger' ]
console.log(dog,...others) //dog hippo tiger
```

4.解构的默认值

```javascript
let animals = ['dog']

let [dog = 'dog',hippo = 'hippo'] = animals
console.log(dog,hippo) // dog hippo
```

#### 对象解构

特点：无须按顺序取值

1.等变量名解构

```javascript
let obj = {
    name : 'flten',
    age : 20,
    job : 'programmer',
}

let {name, age, job} = obj;
console.log(name, age, job) // flten 20 programmer
```

2.变量重命名

```javascript
let obj = {
    name : 'flten',
    age : 20,
    job : 'programmer',
}

let {name:newName} = obj;
console.log(newName) // flten
```

3.变量默认值

```javascript
let obj = {
    name : 'flten',
}

let {name:newName, job:MyJob = 'programmer'} = obj;
console.log(MyJob) // programmer
```

4.剩余运算符

```javascript
let obj = {
    name : 'flten',
    age:18,
    job:'programmer'
}

let {name:newName, ...others} = obj;
console.log(others) // { age: 18, job: 'programmer' }
```

#### 函数参数解构

1.参数是对象

```javascript
function foo({name,age}){
    console.log(name,age)
}

foo({name:'flten', age:16}) // flten 16
```

对象变量重命名，及设置默认值

```javascript
function foo({name:MyName, age:Myage = 16}){
    console.log(MyName,Myage)
}

foo({name:'flten'}) // flten 16
```

2.参数是数组

```javascript
function foo(name, ...others){
    console.log(name,others)
}

foo('flten', 16, 'programmer') // flten [ 16, 'programmer' ]
```

#### 函数默认参数

ES6 之前函数默认参数的处理及其问题，因为js对值的隐式转换会有一些问题，例如将`0`和` '' `转化为`false`

```javascript
function foo(a,b){
    let name = a || 'flten'
    let age = b || 16
    console.log(name,age)
}
foo(0, '') // flten 16
```

使用es6 提供的默认参数：

```javascript
function foo(a = 'flten',b = 16){
    let name = a
    let age = b
    console.log(name,age)
}
foo(0, '') // 0
```

当函数参数是对象时的解构与默认值：

```javascript
function foo({name,age} = {name:'flten', age:16}){
    let a = name
    let b = age
    console.log(a,b)
}
foo()  // flten 16
foo({name:'wall',age:20})  // wall 20
```

或者也可以这样

```javascript
function foo({name = 'flten', age = 16} = {}){
    let a = name
    let b = age
    console.log(a,b)
}
foo()  // flten 16
foo({name:'wall',age:20})  // wall 20
```

但有默认值的参数，则从该参数开始都不会计算在函数的`length`中

```javascript
function foo(a,b = 10,c,d){}
console.log(foo.length)  // 1
```

注意：有默认值的形参一般放在参数最后

#### 函数的剩余参数

最后一个参数是`...`的形式，则将剩余的不定参数放入一个数组中

```javascript
function foo(a,...rest){
    console.log(a,rest)
}
foo(1,2,3,4,5) // 1 [ 2, 3, 4, 5 ]
```

剩余参数`rest`与`arguments`的区别：

(1)rest 只包括剩余参数，但arguments包含所有参数

(2)arguments是一个类数组，而rest是真正的数组，可以进行所有的数组操作

```javascript
function foo(a,...rest){
    console.log(a,rest)
    console.log(arguments)
}
foo(1,2,3,4,5) 

// 1 [ 2, 3, 4, 5 ]
// [Arguments] { '0': 1, '1': 2, '2': 3, '3': 4, '4': 5 }
```

注意：剩余参数`...rest`必须放在参数最后

参数的顺序问题：如果前一个参数使用到了后一个参数，则必须放在前面

```javascript
function foo(m, n = m + 3){
    console.log(m, n)
}
foo(1) // 1 4
```

#### 模板字符串

```javascript
let obj = {'age':16}
console.log(`His age is ${obj.age}`)
```

#### 标签模板字符串

```javascript
function foo(a,b){
    console.log(a,b)
}

const age = 18
foo`flten is ${18} years old` // [ 'flten is ', ' years old' ] 18
```

应用：React的`styled-components`库

#### 展开运算符

可以展开`字符串`、`数组`、`对象(key/value)`、`函数参数`

展开运算符实际进行的是一个`浅拷贝`

```javascript
// 构造数组时，展开数组
const nums = [1,2,3]
const arr = [...nums]

// 展开字符串
const str = 'abc'
console.log(...str) // a b c

// 构造对象时，展开对象
const obj = {age:'flten'}
const info = {...obj, job:'programmer'}
console.log(info)  // { age: 'flten', job: 'programmer' }
```

#### Symbol

1.ES6新增的`数据类型`，可以通过调用`Symbol()`函数生成独一无二的值，避免同名属性

2.对象的属性名在 ES6 之后也可以使用`Symbol`值

3.创建`Symbol`时可以增加一个`描述`参数

注意：

1.使用`Symbol`作为对象属性时，不能通过`.`进行访问，因为通过`.`进行访问时，取到的是一个字符串属性。

2.使用`Symbol`作为对象属性名，在遍历对象时获取不到`Symbol`属性

```javascript
// 创建 Symbol 值
const s1 = Symbol()
const s2 = Symbol()
const s3 = Symbol()
const s4 = Symbol('4444') // 传入一个描述值

console.log(s3,s4) // Symbol() Symbol(4444)

// 字面量赋值
const obj1 = {
    [s1]:'flten',
    [s2]:'age',
}

// 新增 Symbol 属性
obj1[s3] = 'programmer'

Object.defineProperty(obj1, s4, {
    enumerable:true,
    configurable:true,
    writable:true,
    value:'China'
})

// 获取值
console.log(obj1[s1],obj1[s2],obj1[s3],obj1[s4]) // flten age programmer China

// 无法遍历得到
console.log(Object.keys(obj1)) // []
console.log(Object.getOwnPropertyNames(obj1)) // []
```

3.通过`Object.getOwnPropertySymbols()`可以获取到对象所有的`Symbol`属性值。遍历对象的所有`Symbol`属性和值

```javascript
const symbolKeys = Object.getOwnPropertySymbols(obj1)
for (const key of symbolKeys) {
    console.log(obj1[key])
}
```

4.如果需要创建同样的 `Symbol`时，需要向`Symbol.for()`传入相同的`key`

```javascript
const s1 = Symbol.for('111')
const s2 = Symbol.for('111')
console.log(s1 === s2) // true
```

5.取到`Symbol`对应的`key`

```javascript
const s1 = Symbol.for('111')
const key = Symbol.keyFor(s1)
console.log(key) // 111
```

#### 箭头函数

1.箭头函数不绑定this，直接去上一层作用域取this

2.箭头函数没有显示原型对象，即没有`prototype`属性

3.箭头函数不能作为构造函数使用

4.箭头函数没有`arguments`

5.箭头函数作为对象存在隐式原型，通过`__proto__`指向`Function`的原型对象，即`Function.prototype`

```javascript
const a = ()=>{}
console.log(a.__proto__ === Function.prototype) // true
```

#### Set

1.类似数组，但`数据不重复`，因此可以实现`自动去重`

2.但添加对象时，特别是空对象，由于对象是引用类型，其保存的地址值并不相同，因此不是重复数据

3.创建：`new Set()`,不能通过字面量

```javascript
const arr = [1,2,2,2,3,4,5,5,{},{}]
const newArr = [...new Set(arr)]
console.log(newArr) // [ 1, 2, 3, 4, 5, {}, {} ]
```

4.Set 常用属性与方法

```javascript
const set = new Set()
// 添加元素
set.add(1)
set.add(2)
set.add(3)
// 删除元素
set.delete(2)
// 判断元素是否存在
console.log(set.has(2)) // false
// 查看元素个数
console.log(set.size)  // 2
console.log(set)// Set(2) { 1, 3 }
// 遍历
set.forEach(e => console.log(e)) // 1 3
for (const e of set) {
    console.log(e) //1 3 
}
// 清空
set.clear()
console.log(set) // Set(0) {}
```

#### WeakSet

1.只能存放`引用类型`

2.对元素的引用是弱引用，如果某个元素没有被其他对象引用，则会被 GC 进行垃圾回收

3.WeakSet 不能进行遍历，因此存储到WeakSet中的数据是不能被获取到的

#### Map

1.和对象有什么区别？

对象的key只能是字符串和`Symbol`(es6)，即便是使用对象也作为key也会自动转为字符串`[obejct Object]`。而map的key可以是任意类型


2.Map的使用

```javascript
const obj1 =  {
    age:16
} 
const obj2 =  {
    age:18
} 

// 创建map
const map = new Map()
// 存放数据
map.set(obj1,'flten')
console.log(map)  // Map(1) { { age: 16 } => 'flten' }

// 创建map时批量存入数据
const map2 = new Map([[obj1, 'flten'],[obj2, 'wall']])
console.log(map2) // Map(2) { { age: 16 } => 'flten', { age: 18 } => 'wall' }

// 获取值
console.log(map.get(obj1)) // flten
// 判断是否存在某个key
console.log(map2.has(obj2)) // true
// 遍历map
map2.forEach(element => console.log(element)) //flten wall
// 遍历map
for (const element of map2) {
    console.log(element) 
    // [ { age: 16 }, 'flten' ]
    //[ { age: 18 }, 'wall' ]
}
for (const [key,value] of map2) {
    console.log(key,value)
    // { age: 16 } flten
    // { age: 18 } wall
}
// 通过key删除记录
map2.delete(obj2)
console.log(map2.has(obj2)) // false
// 清空map
map2.clear()
// 查看map记录数
console.log(map2.size) // 0
```

#### WeakMap

1.与map的区别：

(1)WeakMap 的`key只能使用对象`

(2)key对对象的引用是弱引用

(3)`不能进行遍历`

(4)无`size`属性

(5)无`clear`方法

2.何为弱引用

先来看下面的代码:

```javascript
const obj = {age:'flten'}
const map = new Map()
map.set(obj, 'flten')
```

上面的代码中，对于对象`{age:'flten'}`，其实存在两个引用：一个是变量`obj`指向了该对象，第二个是map中存入的一条记录中属性`obj`也指向了该对象，因此该对象有两处引用。当`obj = null`，想要GC 自动回收`{age:'flten'}`时，在map中对于该对象的引用依然存在，所以不会该对象不会被销毁，这就是`强引用`。

而如果使用`WeakMap`，像下面的代码一样：

```javascript
const obj = {age:'flten'}
const weakmap = new WeakMap()
weakmap.set(obj, 'flten')
```

则`weakmap`中存入的一条记录，它的key`obj`对该对象的引用是弱引用，当`obj = null`时，`weakmap`存入的记录会自动销毁，对象`{age:'flten'}`会被 GC 自动垃圾回收。

2.WeakMap的使用

```javascript
const obj1 = {
    age:16
} 
const obj2 =  {
    age:18
} 

// 创建WeakMap
const weakMap = new WeakMap()
weakMap.set(obj1, 'flten')
weakMap.get(obj1)
weakMap.has(obj1)
weakMap.delete(obj1)
```

3.WeakMap 的应用场景

vue3响应式原理中使用WeakMap作为容器，将每个响应式对象作为key

#### 数组方法

1.`Array.include()`，判断是否包含某个数据，相对于`indexOf`，可以判断是否包含`NaN`

```javascript
let arr = [1,2,3,4,5]
console.log(arr.includes(3))  // true
// 从索引为 3 的地方开始判断后面的数组中是否包含
console.log(arr.includes(3,3)) // false

console.log(arr.includes(NaN)) // true
console.log(arr.indexOf(NaN)) // false
```

2.`flat()`数组拍平

`flat()`会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回

```javascript
const arr = [[1,2,3],[4,5,5],{'name':['a','b'], 'age':16}]
console.log(arr.flat(3)) // [ 1, 2, 3, 4, 5, 5, { name: [ 'a', 'b' ], age: 16 } ]
```

3.`flatMap()`数组映射压缩

使用映射函数映射每个元素，然后将结果压缩成一个新数组。

相当于先进行`map`操作，再做`flat`的操作，但flatMap中的flat相当于`深度为1`

```javascript
const arr = [1,2,3,4,5,5]
console.log(arr.flatMap((item)=>{
    return item+100
}))

// [ 101, 102, 103, 104, 105, 105 ]
```

#### 对象方法

1.`Object.values()`获取对象所有的值

```javascript
const obj = {
    age : 18
}

console.log(Object.values(obj))
console.log(Object.values([1,2,3]))
console.log(Object.values('flten'))

/*
[ 18 ]
[ 1, 2, 3 ]
[ 'f', 'l', 't', 'e', 'n' ]
*/
```

2.`Object.entries()`得到`[key,value]`数组

```javascript
const obj = {
    age : 18
}

console.log(Object.entries(obj)) // [ [ 'age', 18 ] ]

console.log(Object.entries([1,2,3])) // [ [ '0', 1 ], [ '1', 2 ], [ '2', 3 ] ]
```

3.`Object.getOwnPropertyDescriptors`获取对象的属性描述符

```javascript
const obj = {
    age : 18
}

console.log(Object.getOwnPropertyDescriptors(obj))

/*
{
  age: { value: 18, writable: true, enumerable: true, configurable: true }
}
*/
```

4.`Object.formEntries`将`entries`数组即`[[key,value]]`，转化为对象

```javascript
const obj = {
    age:16,
    job:'boss'
}
const entries = Object.entries(obj)
console.log(entries) // [ [ 'age', 16 ], [ 'job', 'boss' ] ]
console.log(Object.fromEntries(entries)) // { age: 16, job: 'boss' }
```

5.`for...in`遍历对象key

在ES11中，对其进行了标准化

```javascript
const obj = {
    age:16,
    job:'boss'
}
for (const key in obj) {
    console.log(key)
}
/*
age
job
*/
```
#### String

1.`padStart`和`padEnd`

ES8中增加了 `padStart` 和 `padEnd` 方法，分
别是对字符串的首尾进行填充

```javascript
const ID = '13776543210'
console.log(ID.padStart(15,'*')) //****13776543210
console.log(ID.padEnd(15,'*'))  // 13776543210****
```

2.`trimStart`和 `trimEnd`去除前面或者后面空格

`trim`是去除前后所有空格

```javascript
const club = '   nba   '
console.log(club.trim())  // 'nba'
console.log(club.trimStart())  // 'nba   '
console.log(club.trimEnd())  // '   nba'
```

3.`replaceAll`

返回一个新的替换过的字符串

```javascript
let str= 'aaaddcc'
let newStr = foo.replaceAll('a','p')
console.log(newStr) // pppddcc
```

#### BigInt

可以表示超过`MAX_SAFE_INTEGER`的大数字，BitInt的表示方法是在数值的后面加上n

```javascript
const bigInt = 448488575757575757n
console.log(bigInt + 10000n) // 448488575757585757n
```

#### 可选链操作符`?.`

`?.`判断前面的对象是否存在，可以使得在进行`null`和`undefined`判断时更加清晰和简洁，而不是直接报错。

```javascript
const obj = {
    age:20
}

console.log(obj?.name) // undefined
```

#### 空值合并操作符`??`

`||`逻辑或的判断会有一些错误，比如会将''空字符串和 0 转化为`null`或`undefined`，这时用`??`判断就更为准确。

```javascript
const str = ''

const st1 = str || 'flten'
const st2 = str ?? 'flten'
console.log(st1) // 'flten'
console.log(st2) // ''

const str2 = false

const st3 = str2 || 'flten'
const st4 = str2 ?? 'flten'

console.log(st3) //'flten'
console.log(st4)  //  false

const str3 = undefined
const str4 = null

const st5 = str3 || 'flten'
const st6 = str3 ?? 'flten'

console.log(st5) // 'flten'
console.log(st6)  // 'flten'

const st7 = str4 || 'flten'
const st8 = str4 ?? 'flten'

console.log(st7) // 'flten'
console.log(st8)  // 'flten'

```

#### globalThis全局对象

之前不同的环境获取的方式是不一样的。在浏览器中可以通过this、`window`来获取；而在Node中需要通过`global`来获取

么在ES11中对获取全局对象进行了统一的规范：无论在什么环境中，都使用`globalThis`

#### FinalizationRegistry垃圾回收时的回调

在注册表中注册的对象，在该对象被垃圾回收时可以通过`FinalizationRegistry`执行一个回调，可以监听数据的垃圾回收。但在 ES2021 才支持，要注意兼容性。

以下代码需要在浏览器中运行才能看到打印。

```javascript
// 创建注册表
const registryTable = new FinalizationRegistry((obj)=>{
    console.log(`${obj}对象被垃圾回收了！`)
})

let obj1 = {age:18}
let obj2 = {age:28}
// 注册到registry中
registryTable.register(obj1,'obj1')
registryTable.register(obj2,'obj2')

obj1=null
obj2=null

/*
obj2对象被垃圾回收了！
test.html:18 obj1对象被垃圾回收了！
*/
```

如果对象被其他对象强引用，则即便将该对象设置为`null`，该对象也不会被销毁

```javascript
// 创建注册表
const registryTable = new FinalizationRegistry((obj)=>{
    console.log(`${obj}对象被垃圾回收了！`)
})

let obj1 = {age:18}
// obj2引用了obj1
let obj2 = obj1
// 注册到registry中
registryTable.register(obj1,'obj1')

obj1=null
```

我们也可以验证`WeakMap`是弱引用

```javascript
// 创建注册表
const registryTable = new FinalizationRegistry((obj)=>{
    console.log(`${obj}对象被垃圾回收了！`)
})

let obj1 = {age:18}
let weakMap = new WeakMap()
weakMap.set(obj1, 'flten')
// 注册到registry中
registryTable.register(obj1,'obj1')

obj1=null

/*
obj1对象被垃圾回收了！
*/
```

#### WeakRef

将对象作为`弱引用`

```javascript
const registryTable = new FinalizationRegistry((obj)=>{
    console.log(`${obj}对象被垃圾回收了！`)
})

let obj1 = {age:18}
let obj2 = new WeakRef(obj1)
// 注册到registry中
registryTable.register(obj1,'obj1')
obj1=null
// obj1对象被垃圾回收了！

setTimeout(function(){
    // 若引用到的对象已被垃圾回收，返回的是undefined
    console.log(obj2.deref()) // undefined
},5000)
```

#### 逻辑或赋值 `||=`

```javascript
let obj = undefined

obj ||= 'flten'

console.log(obj) //flten
```

等价于

```javascript
let obj = undefined
let obj2 = obj || 'fltenw'
```

#### 逻辑与赋值 `&&=`
```javascript
let obj = 'flten'

obj &&= 'wall'

console.log(obj) //wall
```

```javascript
let obj = {
    foo:function(){
        return 'flten'
    }
}

let obj2 = {}
obj2 &&= obj.foo
console.log(obj2) 
```
#### 逻辑空赋值 `??=`

```javascript
let obj = {
    age :18
}

let age = undefined
age ??= obj.age
console.log(age)  // 18
```









