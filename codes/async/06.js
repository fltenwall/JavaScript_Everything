// 异步函数报错
// 异步函数中的异常会作为返回的 Promise 对象的reject，不会阻断程序
async function fn(){
    throw new Error('err')
}

fn().catch(err=>{
    console.log(err)
})

console.log('......')

/*
......
Error: err
*/