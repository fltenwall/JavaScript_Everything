const promise1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('err1')
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

Promise.race([promise1,promise2,promise3]).then(res=>{
    console.log('res',res)
}).catch(err=>{
    console.log('err',err) // err err1
})