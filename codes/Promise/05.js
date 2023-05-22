const promise = new Promise((resolve,reject)=>{
    resolve('ok')
});

promise.then((res)=>{
    console.log('old1',res) // old1 ok
    // 无返回值默认返回 undefined, 作为新返回的 Promise对象resolve值
}).then(res=>{
    console.log('old2',res) // old2 undefined
})

//old1 ok
//old2 undefined