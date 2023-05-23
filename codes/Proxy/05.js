const obj = {
    name:'flten',
    age:20,
}

const proxy = new Proxy(obj, {
    has: function(target, key){
        console.log(`对象的${key}属性存在性检查操作`)
        return key in target
    },
})

console.log('name' in proxy)

/*
对象的name属性存在性检查操作
true
*/