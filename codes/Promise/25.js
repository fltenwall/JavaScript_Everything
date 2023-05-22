const promise1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('err1')
    },1000)
})

const promise2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('err2')
    },2000)
})

const promise3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('err3')
    },3000)
})

// 若全为 reject , 也会等到全部 Promise 执行都返回reject
Promise.any([promise1,promise2,promise3]).then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err) // AggregateError: All promises were rejected
    console.log(err.errors) // (3) ['err1', 'err2', 'err3']
})