function inheritProperty(subType, superType){
    subType.prototype = Object.create(superType.prototype) 
    Object.defineProperty(subType.prototype, "constructor", { //
        enumerable:false,
        configurable:true,
        writable:true,
        value:subType,
    })
}

function Animal(name,age){
    this.name = name
    this.age = age
}

function Dog(name,age,color){
    // 属性继承
    Animal.call(this, name, age)  
    this.color = color
}

// 原型继承
inheritProperty(Dog, Animal)

let dog = new Dog('yy',16,'black')

console.log(dog.__proto__.constructor) // [Function: Dog]