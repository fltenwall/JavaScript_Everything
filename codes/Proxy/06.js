const obj = {
    name:'flten',
    age:20,
}

const proxy = new Proxy(obj, {
    deleteProperty: function(target,key){
        console.log(`监听到删除了属性${key}`)
        delete target[key]
    }
})

delete proxy.age

/*
监听到删除了属性age
*/