const reactiveNameArr = [];
const reactiveAgeArr = [];

function addNameReactive(fn){
    reactiveNameArr.push(fn)
}

function addAgeReactive(fn){
    reactiveAgeArr.push(fn)
}

const obj = {
    name: 'flten',
    age: 16,
}

// name 属性的使用收集
function fn1(){
    console.log(obj.name)
}

addNameReactive(fn1)

function fn2(){
    console.log(obj.name)
}

addNameReactive(fn2)

reactiveNameArr.forEach(fn=>{
    fn()
})

// age属性的使用收集

function fn3(){
    console.log(obj.age)
}

addAgeReactive(fn3)

function fn4(){
    console.log(obj.age)
}

addAgeReactive(fn4)

reactiveAgeArr.forEach(fn=>{
    fn()
})