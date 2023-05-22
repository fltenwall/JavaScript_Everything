const promise = new Promise((resolve, reject)=>{
    resolve('ok')
});

promise.then(res =>{
    return new Promise((resolve, reject)=>{
        throw new Error('then方法返回的 Promise 错误')
    })
}).catch(err=>{ // 捕获的是then方法返回的Promise 对象抛出的异常
    console.log(err); // Error: 示例抛出异常
})