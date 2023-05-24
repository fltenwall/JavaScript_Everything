class Depend{
    constructor(){
        this.reactiveArr = []
    }

    addDepend(){
        if(activeReactiveFn){this.reactiveArr.push(activeReactiveFn)}
    }

    notify(){
        this.reactiveArr.forEach(fn=>fn())
    }
}

const obj = {
    name: 'flten',
    age: 16,
}

let activeReactiveFn = null
// 将使用到监听数据的函数包裹为响应式
function watch(fn){
    activeReactiveFn = fn
    fn()
    activeReactiveFn = null
}

const objMap = new WeakMap()

// obj是对象，key是obj的属性
function getDepend(obj, key){
    // 取出obj对应的map，即取出obj每个属性和其对应的depend的映射表
    let map = objMap.get(obj)
    // 如果还没有对象obj对应的map映射表，则创建映射表
    // 并将其存入objMap
    if(!map){
        map = new Map()
        objMap.set(obj, map)
    }

    // 从映射表中取出obj对象的key属性所对应的depend对象
    let depend = map.get(key)
    // 同样如果还没有key属性对应的depend对象，则创建depend对象
    // 并将key与depend的对应关系存入映射表map
    if(!depend){
        depend = new Depend()
        map.set(key, depend)
    }
    return depend
}

// 创建代理对象进行数据监听

const proxy = new Proxy(obj, {
    get: function(target, key, receiver){
        const depend = getDepend(target, key)
        // 触发set操作时，依赖函数被执行
        // 如果依赖函数有获取值的操作，那么就会同时触发get
        // 而此时activeReactiveFn被重置为了null
        // 因此需要判断activeReactiveFn是否为null来决定是否将其添加到依赖数组
        depend.addDepend()
        return Reflect.get(target, key, receiver)
    },
    set: function(target, key, newValue, receiver){
        Reflect.set(target, key, newValue, receiver)
        const depend = getDepend(target, key)
        depend.notify()
    }
})

// name 属性的使用收集
function fn1(){
    console.log(proxy.age)
}

watch(fn1)

// 匿名函数
watch(function(){console.log(proxy.age)})
watch(function(){console.log(proxy.name)})

// age数据更新
proxy.age = 16
proxy.name = 'fltenwall'
proxy.age = 17
proxy.name = 'yj'
