function Person(name, age){
    this.name = name
    this.age = age
}

const p = new Person('flten', 16)
console.log(Object.is(p.__proto__, Person.prototype)) // true