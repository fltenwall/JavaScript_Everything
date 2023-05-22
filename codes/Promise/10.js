const promise = new Promise((resolve, reject)=>{
    throw new Error('示例抛出异常')
});

promise.then(res =>{
    return new Promise((resolve, reject)=>{
        throw new Error('then方法返回的 Promise 错误')
    })
}).catch(err=>{ // 捕获的是第一个Promise 对象抛出的异常
    console.log(err); // Error: 示例抛出异常
})