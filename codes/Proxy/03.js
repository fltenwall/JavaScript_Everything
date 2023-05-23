const obj = {
    name:'flten',
    age:16,
}

Object.keys(obj).forEach(key => {
    let val = obj[key]
    Object.defineProperty(obj,key, {
        get: function(){
            console.log(`${key} 属性被获取`)
            return val
        },
        set: function(newValue){
            console.log(`${key} 属性被设置`)
            val = newValue
        }
    })
});

obj.name='fltenwall'
obj.age=18

console.log(obj.name)
console.log(obj.age)

/*
name 属性被设置
age 属性被设置
name 属性被获取
fltenwall
age 属性被获取
18
*/