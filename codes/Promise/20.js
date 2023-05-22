const promise1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(1)
    },1000)
})

const promise2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('err')
    },2000)
})

const promise3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(3)
    },3000)
})

// 其中一个 Promise 对象变成reject状态，则新的 Promise 立即变为reject状态
Promise.all([promise1, promise2, promise3]).then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err) // err
})