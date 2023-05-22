const promise = new Promise((resolve, reject)=>{
    throw new Error('示例抛出异常')
});

promise.then(res, err=>{
    console.log(err);
});