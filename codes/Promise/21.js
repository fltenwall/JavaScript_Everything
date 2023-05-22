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

Promise.allSettled([promise1, promise2, promise3]).then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err) 
})

/*
[
  { status: 'fulfilled', value: 1 },
  { status: 'rejected', reason: 'err' },
  { status: 'fulfilled', value: 3 }
]
*/