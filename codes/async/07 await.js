function requestData(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('ok')
        },2000)
    })
}

async function fn(){
    // await语句返回的是一个 Promise 对象 resolve 的结果
    const res = await requestData();
    console.log(res) // ok
    // await后的语句需要等上一个await返回结果才会继续执行
    console.log('end') // end
}

fn()