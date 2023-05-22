// 返回一个实现then方法的对象
const promise = async function(){
    return {
        then: function(resolve,reject){
            console.log('flten');
        }
    }
}

promise().then(res=>{
    console.log(res) // flten
})