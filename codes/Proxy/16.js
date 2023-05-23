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