const promise = new Promise((resolve,reject)=>{
    resolve('ok')
});

promise.then((res)=>{
    return obj = {
        then: function(){
            console.log('thenable');
        }
    }
}).then(res=>{
    console.log(res);
});

// thenable