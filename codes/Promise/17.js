

const promise = new Promise((resolve, reject)=>{
    resolve({name:'flten'});
});

promise.then(res=>{
    console.log(res); // { name: 'flten' }
})

const promise2 = Promise.resolve({name:'flten'});

promise2.then(res=>{
    console.log(res); // { name: 'flten' }
})