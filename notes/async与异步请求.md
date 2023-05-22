
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

#### then 方法

then方法返回一个新的 Promise 对象;

then方法返回一个 Promise，如果直接在then方法里返回一个普通对象，则会将其包裹为一个 Promise 对象;

4.js
```javascript
const promise = new Promise((resolve,reject)=>{
    resolve('ok')
});

promise.then((res)=>{
    return 'new';
}).then(res=>{
    console.log('new',res) // new new
})


/*执行结果
old1 ok
new new
old2 undefined
*/
```
无返回值时，默认返回undefined

5.js

```javascript
const promise = new Promise((resolve,reject)=>{
    resolve('ok')
});

promise.then((res)=>{
    console.log('old1',res) // old1 ok
    // 无返回值默认返回 undefined, 作为新返回的 Promise对象resolve值
}).then(res=>{
    console.log('old2',res) // old2 undefined
})

//old1 ok
//old2 undefined
```

若返回 Promise 时，将 Promise用 Promise 进行包裹，即返回了一个参数为 Promise 对象的 Promise;

6.js

```javascript
const promise = new Promise((resolve,reject)=>{
    resolve('ok')
});

// then方法返回 Promise 时，将 Promise用 Promise 进行包裹，即返回了一个参数为 Promise 对象的 Promise
promise.then((res)=>{
    return new Promise((resolve, reject)=>{
        resolve('return promise')
    })
}).then(res=>{
    console.log(res); // return promise
})

// return promise
```

若传入了一个实现了 then 方法的对象，将 Promise用 Promise 进行包裹，执行该then方法且由此方法决定状态;

7.js

```javascript
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
```

#### catch方法与异常捕获与错误

用then方法的第二个回调函数捕获错误

08.js

```javascript
const promise = new Promise((resolve, reject)=>{
    throw new Error('示例抛出异常')
});

promise.then(res, err=>{
    console.log(err);
});
```
catch捕获错误

09.js

```javascript
const promise = new Promise((resolve, reject)=>{
    throw new Error('示例抛出异常')
});

promise.catch(err=>{
    console.log(err);
});
```

链式调用中，catch优先捕获的是第一个Promise 对象抛出的异常

10.js
```javascript
const promise = new Promise((resolve, reject)=>{
    throw new Error('示例抛出异常')
});

promise.then(res =>{
    return new Promise((resolve, reject)=>{
        throw new Error('then方法返回的 Promise 错误')
    })
}).catch(err=>{ // 捕获的是第一个Promise 对象抛出的异常
    console.log(err); // Error: 示例抛出异常
})
```

若第一个 Promise 没有抛出异常，则捕获then方法返回的 Promise 对象的异常

11.js

```javascript
const promise = new Promise((resolve, reject)=>{
    resolve('ok')
});

promise.then(res =>{
    return new Promise((resolve, reject)=>{
        throw new Error('then方法返回的 Promise 错误')
    })
}).catch(err=>{ // 捕获的是then方法返回的Promise 对象抛出的异常
    console.log(err); // Error: 示例抛出异常
})
```
catch可以捕获reject异常

12.js

```javascript
const promise = new Promise((resolve, reject)=>{
    reject('err')
});

promise.then(res =>{
    return new Promise((resolve, reject)=>{
        throw new Error('then方法返回的 Promise 错误')
    })
}).catch(err=>{ // 捕获的是第一个Promise 的reject信息
    console.log(err); // err
})

```


13.js

```javascript

```
## API




## Promise 的面试题

## Promise 的实现