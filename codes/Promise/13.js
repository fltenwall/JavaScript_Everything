const promise = new Promise((resolve, reject)=>{
    reject('err')
});

promise.then(res=>{
    console.log(res)
},err=>{
    console.log(err,'then中错误捕获')
})

promise.catch(err=>{
    console.log(err, '单独catch捕获')
})