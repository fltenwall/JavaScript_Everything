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



