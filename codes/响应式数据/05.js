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

function watch(depend, fn){
    depend.addDepend(fn)
}

// name 属性的使用收集
function fn1(){
    console.log(obj.name)
}

watch(dependName,fn1)

function fn2(){
    console.log(obj.name)
}

watch(dependName,fn2)

dependName.notify()

// age属性的使用收集

function fn3(){
    console.log(obj.age)
}

watch(dependAge,fn3)

function fn4(){
    console.log(obj.age)
}

watch(dependAge,fn4)

dependAge.notify()

/*
flten
flten
16
16
*/