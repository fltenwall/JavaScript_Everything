class Depend{
    constructor(){
        this.reactiveArr = new Set()
    }

    depend() {
        if (activeReactiveFn) {
          this.reactiveArr.add(activeReactiveFn)
        }
      }

    notify(){
        this.reactiveArr.forEach(fn=>fn())
    }
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

function reactive(obj){
    return new Proxy(obj, {
            get: function(target, key, receiver){
                const depend = getDepend(target, key)
                depend.depend()
                return Reflect.get(target, key, receiver)
            },
            set: function(target, key, newValue, receiver){
                Reflect.set(target, key, newValue, receiver)
                const depend = getDepend(target, key)
                depend.notify()
            }
        })
}

const obj1 = {age:16}
const obj2 = {age:17}
const obj3 = {age:18}

const proxy1 = reactive(obj1)
const proxy2 = reactive(obj2)
const proxy3 = reactive(obj3)

watch(function(){console.log(proxy1.age)})
watch(function(){console.log(proxy2.age)})
watch(function(){console.log(proxy3.age)})

// age数据更新
proxy1.age = 20
proxy1.age = 21
proxy1.age = 22

/*
16
17
18
20
21
22
*/