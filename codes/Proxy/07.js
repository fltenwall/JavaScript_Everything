function fn(){

}

const proxy = new Proxy(fn, {
    apply: function(target, thisArg, argArray){
        console.log(`对${target.name}对象进行了apply操作`)
        return target.apply(thisArg, argArray)
    }
})

proxy.apply({}, ['age'])

/*
对fn对象进行了apply操作
*/