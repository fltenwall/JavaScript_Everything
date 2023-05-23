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
    get: function(target, key){
        console.log(`get方法访问监听了${key}属性`, target)
        return Reflect.get(target, key)
    },
    set: function(target, key, newValue){
        Reflect.set(target, key, newValue)
    }
})

console.log(proxy.name)

/*
get方法访问监听了name属性 {_name: 'flten'}
flten
*/
