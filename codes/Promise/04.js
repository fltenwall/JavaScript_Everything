// then方法返回一个 Promise，如果直接在then方法里返回一个普通对象，则会将其包裹为一个 Promise 对象

const promise = new Promise((resolve,reject)=>{
    resolve('ok')
});

promise.then((res)=>{
    return 'new';
}).then(res=>{
    console.log('new',res) // new new
})

promise.then((res)=>{
    console.log('old1',res) // old1 ok
    // 无返回值默认返回 undefined, 作为新返回的 Promise对象resolve值
}).then(res=>{
    console.log('old2',res) // old2 undefined
})



/*执行结果
old1 ok
new new
old2 undefined
*/