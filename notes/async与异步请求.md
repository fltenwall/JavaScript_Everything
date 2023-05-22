
## Promise 的使用

#### 快速上手

01快手上手.js

```javascript
const promise = new Promise((resolve,reject)=>{
    // 此处的代码同步立即执行
    resolve('ok'); // pending状态
});

// 状态不可更改
promise.then((res)=>{
    console.log(res); // fulfilled/resolved 状态
},(err)=>{
    console.log(res); // rejected状态
})
```

02.若传入的是另一个promise对象，则状态由传入的promise对象决定 

```javascript
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
```

03.若传入了一个实现了 then 方法的对象，则执行该then方法且由此方法决定状态

```javascript
// 若传入了一个实现了 then 方法的对象，则执行该then方法且由此方法决定状态

const testObj = {
    then : function(resolve, reject){
        resolve('ok');
    }
}

new Promise((resolve, reject)=>{
    resolve(testObj);
}).then((res)=>{
    console.log('res', res); // 执行
}, (err)=>{
    console.log('err', err);
})
```


#### API




## Promise 的面试题

## Promise 的实现