const promise = new Promise((resolve,reject)=>{
    // 此处的代码同步立即执行
    resolve('ok'); // pendding状态
});

// 状态不可更改
promise.then((res)=>{
    console.log(res); // fulfilled/resolved 状态
},(err)=>{
    console.log(res); // rejected状态
})