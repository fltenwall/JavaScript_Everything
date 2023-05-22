const promise = new Promise((resolve, reject)=>{
    reject('err')
});

promise.then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err)
}).finally(()=>{
    console.log('end')
})