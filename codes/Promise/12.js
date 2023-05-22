const promise = new Promise((resolve, reject)=>{
    reject('err')
});

promise.then(res =>{
    return new Promise((resolve, reject)=>{
        throw new Error('then方法返回的 Promise 错误')
    })
}).catch(err=>{ // 捕获的是第一个Promise 的reject信息
    console.log(err); // err
})

