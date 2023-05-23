
const obj = {
    name:'flten'
}

Object.defineProperty(obj, 'name', {
    set: function(){
        console.log('name 属性被设置')
    },

    get: function(){
        console.log('name 属性被获取')
    }
})

obj.name = 'fltenwall'
console.log(obj.name)

/*
name 属性被设置
name 属性被获取
*/