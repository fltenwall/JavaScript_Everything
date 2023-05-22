// 返回一个Promise 对象
const promise = async function(){
    return new Promise((resolve,reject)=>{
        setTimeout(function(){
            console.log('ok')
        },1000)
    })
}

promise().then(res=>{
    console.log(res)  // ok
})