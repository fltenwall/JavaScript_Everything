const promise = new Promise((resolve,reject)=>{
    resolve('ok')
});

// then方法返回 Promise 时，将 Promise用 Promise 进行包裹，即返回了一个参数为 Promise 对象的 Promise
promise.then((res)=>{
    return new Promise((resolve, reject)=>{
        resolve('return promise')
    })
}).then(res=>{
    console.log(res); // return promise
})

// return promise