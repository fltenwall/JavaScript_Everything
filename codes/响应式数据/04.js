class Depend{
    constructor(){
        this.reactiveArr = []
    }

    addDepend(fn){
        this.reactiveArr.push(fn)
    }

    notify(){
        this.reactiveArr.forEach(fn=>fn())
    }
}

const obj = {
    name: 'flten',
    age: 16,
}

const dependName = new Depend();
const dependAge = new Depend();

// name 属性的使用收集
function fn1(){
    console.log(obj.name)
}

dependName.addDepend(fn1)

function fn2(){
    console.log(obj.name)
}

dependName.addDepend(fn2)

dependName.notify()

// age属性的使用收集

function fn3(){
    console.log(obj.age)
}

dependAge.addDepend(fn3)

function fn4(){
    console.log(obj.age)
}

dependAge.addDepend(fn4)

dependAge.notify()

/*
flten
flten
16
16
*/