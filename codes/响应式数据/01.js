const reactiveArr = [];

const obj = {
    name: 'flten',
    age: 16,
}

function fn1(){
    console.log(obj.name)
}

reactiveArr.push(fn1)

function fn2(){
    console.log(obj.name)
}

reactiveArr.push(fn2)

reactiveArr.forEach(fn => {
    fn()
})