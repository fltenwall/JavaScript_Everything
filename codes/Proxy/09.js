const obj = {
    name:'flten',
    age:16,
}

const proxy = new Proxy(obj, {
    get: function(target, key, receiver){
        console.log(`监听到了${target.name}对象${key}的get操作`)
        return Reflect.get(target, key)
    },
    set: function(target, key, newValue, receiver){
        console.log(`监听到了${target.name}对象${key}的set操作`)
        Reflect.set(target, key, newValue)
    },
})

proxy.age = 18
console.log(proxy.age)

/*
监听到了flten对象age的set操作
监听到了flten对象age的get操作
18
*/