const promise = new Promise((resolve, reject)=>{
    reject('err')
});

// catch方法返回错误，会被后面的catch捕获
promise.then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err, '第一个catch')
    return new Error('错误')
}).then(res=>{
    console.log(res,'第二个then')
}).catch(err=>{
    console.log(err)
})

/*
err 第一个catch
Error: 错误
*/