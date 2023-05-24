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

// 将使用到监听数据的函数包裹为响应式
function watch(depend, fn){
    depend.addDepend(fn)
}

// 创建代理对象进行数据监听

const proxy = new Proxy(obj, {
    get: function(target, key, receiver){
        return Reflect.get(target, key, receiver)
    },
    set: function(target, key, newValue, receiver){
        Reflect.set(target, key, newValue, receiver)
        if(Object.is(key, 'name')){ 
            console.log(`属性${key}发生了变化,值变为${newValue}`)
            dependName.notify
         }
        if(Object.is(key, 'age')){ 
            console.log(`属性${key}发生了变化,值变为${newValue}`)
            dependAge.notify 
        }
    }
})

// name 属性的使用收集
function fn1(){
    console.log(proxy.name)
}

watch(dependName,fn1)

function fn2(){
    console.log(proxy.name)
}

watch(dependName,fn1)

// age 属性的使用收集

function fn3(){
    console.log(proxy.age)
}

watch(dependAge,fn1)

function fn4(){
    console.log(proxy.age)
}

watch(dependAge,fn1)

// age数据更新
proxy.age = 16
proxy.name = 'fltenwall'
proxy.age = 17
proxy.name = 'yj'

/*
属性age发生了变化,值变为16
属性name发生了变化,值变为fltenwall
属性age发生了变化,值变为17
属性name发生了变化,值变为yj
*/