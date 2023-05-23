const obj = {
    name:'flten',
    age:16,
}

Object.keys(obj).forEach(key => {
    Object.defineProperty(obj,key, {
        get: function(){
            console.log(`${key} 属性被获取`)
            // 无返回值默认返回 undefined
        },
        set: function(){
            console.log(`${key} 属性被设置`)
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
undefined
age 属性被获取
undefined
*/