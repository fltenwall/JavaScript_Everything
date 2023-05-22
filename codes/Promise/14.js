const promise = new Promise((resolve, reject)=>{
    reject('err')
});

// catch方法也是返回一个 Promise 对象
promise.then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err, '第一个catch')
    return err
}).then(res=>{
    console.log(res,'第二个then')
}).catch(err=>{
    console.log(err)
})

/*
err 第一个catch
err 第二个then
*/