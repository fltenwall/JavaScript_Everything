const promise = new Promise((resolve,reject)=>{
    resolve(undefined)
})

promise.then(res=>{
    console.log(res) // undefined
})

