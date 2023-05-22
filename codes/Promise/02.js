// 若传入的是另一个promise对象，则状态由传入的promise对象决定 

const promise = new Promise((resolve, reject)=>{
    reject('no');
})

new Promise((resolve, reject)=>{
    resolve(promise) // 传入的promise决定状态
}).then((res)=>{
    console.log(res,'yes');
},(err)=>{
    console.log(err, 'no');  // 执行
})