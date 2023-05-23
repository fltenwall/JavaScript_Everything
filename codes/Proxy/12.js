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
    set: function(target, key, newValue){
        console.log(`对${key}属性进行了set操作`)
        Reflect.set(target, key, newValue)
    }
})

proxy.name = 'fltenwall'

/*
对name属性进行了set操作
*/