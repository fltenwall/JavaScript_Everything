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