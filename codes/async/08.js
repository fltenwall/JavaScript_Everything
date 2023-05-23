async function fn(){
    const res = await Promise.reject('res')
    // 不会继续往下执行,reject作为整个异步函数的返回值 
    console.log('next',res)
}

fn().then(res=>{
    console.log('then',res)
}).catch(err=>{
    console.log('err',err) // err res
})