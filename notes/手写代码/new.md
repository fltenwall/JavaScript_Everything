1. 要实例化出一个对象
2. 实例化出的对象内部的this应该指向实例对象
3. 应该将实例化对象的隐式原型指向构造函数的原型对象
4. 构造函数如果有返回值，那构造函数的返回值，就是实例化对象的返回值
5. 如果构造函数无返回值，则返回空对象


```javascript
const ObjectFactory = (...args) => {
    // 1.初始化对象
    const obj = {}
    // 2.获取到构造函数
    const constructor = [].shift.call(args)
    // 3.指定原型
    obj.__proto__ = constructor.prototype
    // 4.将构造函数内部的this指向实例对象，并执行构造函数
    const res = constructor.apply(obj, args)
    // 5.保证返回的是对象，如果构造函数无返回值则返回空对象
    return typeof res === 'object' ? res : obj
 }

function Person(name,age){
    this.name = name;
    this.age = age;
    return {
        name: this.name,
        age: this.age,
    }
}

function Person2(name,age){
    this.name = name;
    this.age = age;
}

const obj = ObjectFactory(Person, 'flten', 24)
console.log(obj) // { name: 'flten', age: 24 }

const obj2 = ObjectFactory(Person2, 'flten', 24)
console.log(obj2) // Person2 { name: 'flten', age: 24 }
```