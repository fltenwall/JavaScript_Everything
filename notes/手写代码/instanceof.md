
instanceof的作用：检测某构造函数的原型对象是否出现在实例对象的原型链上

```javascript
function Person(name,age){
    this.name = name;
    this.age = age;
}

const obj = new Person()
console.log(obj instanceof Person) // true
```

实现的关键点：

1. 获取实例对象的隐式原型
2. 获取构造函数的原型对象
3. 通过while循环不断向上查找实例对象的原型链
4. 对比是否和构造函数的原型对象相同
5. 如果直到原型链为null，则返回false
6. 如果出现相同的情况，返回true

实现 instanceof

```javascript
/**
 * 
 * @param {*} Obj 要检测的对象
 * @param {*} Constructor 目标构造函数
 * @returns boolean 
 */
function instanceOf(Obj, Constructor){
    let   ObjProto = Obj.__proto__
    const ConstructorPrototype = Constructor.prototype
    while(true){
        if(Object.is(ObjProto, null)){
            return false
        }else if(Object.is(ObjProto, ConstructorPrototype)){
            return true
        }
        ObjProto = ObjProto.__proto__
    }
}

function Person(name,age){
    this.name = name;
    this.age = age;
}

const p = new Person()
console.log(instanceOf(p, Person)) // true
console.log(instanceOf(p, Object)) // true
console.log(instanceOf('a', Person)) // false
```