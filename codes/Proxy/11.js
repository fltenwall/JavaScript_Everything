const obj = {
    _name:'flten',
    get name(){
        return this._name
    },
    set name(newValue){
        this._name = newValue
    }
}

const proxy = new Proxy(obj, {
    get: function(target, key, receiver){
        console.log(`get方法访问监听了${key}属性`, target, receiver)
        console.log(Object.is(target, receiver))
        console.log(Object.is(proxy, receiver))
        // receiver 可以将 this 指向改为代理对象 proxy
        return Reflect.get(target, key, receiver)
    },
    set: function(target, key, newValue){
        Reflect.set(target, key, newValue)
    }
})

console.log(proxy.name)

/*

get方法访问监听了name属性 {_name: 'flten'} Proxy(Object) {_name: 'flten'}
false
true
get方法访问监听_name属性 {_name: 'flten'} Proxy(Object) {_name: 'flten'}
false
true
flten
*/
