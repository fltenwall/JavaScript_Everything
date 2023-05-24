const reactiveArr = [];

function addReactive(fn){
    reactiveArr.push(fn)
}

const obj = {
    name: 'flten',
    age: 16,
}

function fn1(){
    console.log(obj.name)
}

addReactive(fn1)

function fn2(){
    console.log(obj.name)
}

addReactive(fn2)

reactiveArr.forEach(fn=>{
    fn()
})