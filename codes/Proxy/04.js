const obj = {
    name:'flten',
    age:20,
}

const proxy = new Proxy(obj, {
    get: function(target, key){
        console.log(`${key} 属性被获取`)
        return target[key]
    },
    set: function(target, key, newValue){
        console.log(`${key} 属性被设置`)
        target[key] = newValue
    },
})

proxy.name='fltenwall'
proxy.age=18

console.log(proxy.name)
console.log(proxy.age)
console.log('---------')
console.log(obj.name)
console.log(obj.age)

/*
name 属性被设置
age 属性被设置
name 属性被获取
fltenwall
age 属性被获取
18
---------
fltenwall
18
*/

