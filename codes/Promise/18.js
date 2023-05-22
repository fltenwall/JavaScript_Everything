const promise =  Promise.reject('no');

promise.then(res=>{
    console.log(res);
}).catch(err=>{
    console.log(err); // no
})