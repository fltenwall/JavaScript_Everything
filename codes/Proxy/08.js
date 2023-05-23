function fn(){

}

const proxy = new Proxy(fn, {
    construct: function(target, argArray, newTarget){
        console.log(`对${target.name}对象进行了new操作`)
        return new target(...argArray)
    }
})

new proxy('age')

/*
对fn对象进行了new操作
*/