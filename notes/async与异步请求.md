
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

如果catch是非链式调用，则then方法需要进行自己的错误捕获，与后面catch的错误捕获是独立的

```javascript
const promise = new Promise((resolve, reject)=>{
    reject('err')
});

promise.then(res=>{
    console.log(res)
},err=>{
    console.log(err,'then中错误捕获')
})

promise.catch(err=>{
    console.log(err, '单独catch捕获')
})

/*
err then中错误捕获
err 单独catch捕获
*/
```
catch方法也是返回一个 Promise 对象

14.js

```javascript
const promise = new Promise((resolve, reject)=>{
    reject('err')
});

// catch方法也是返回一个 Promise 对象
// 如果不是抛出异常，则后面执行then
promise.then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err, '第一个catch')
    return err
}).then(res=>{
    console.log(res,'第二个then')
}).catch(err=>{
    console.log(err)
})

/*
err 第一个catch
err 第二个then
*/
```

若catch方法返回错误，会被后面的catch捕获

15.js

```javascript
const promise = new Promise((resolve, reject)=>{
    reject('err')
});

// catch方法返回错误，会被后面的catch捕获
promise.then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err, '第一个catch')
    return new Error('错误')
}).then(res=>{
    console.log(res,'第二个then')
}).catch(err=>{
    console.log(err)
})

/*
err 第一个catch
Error: 错误
*/
```

#### finally，最后一定会执行

16.js

```javascript
const promise = new Promise((resolve, reject)=>{
    reject('err')
});

promise.then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err)
}).finally(()=>{
    console.log('end')
})
```

#### 类方法-Promise.resolve()

将一个对象直接转为promise对象

17.js

```javascript
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
```

#### 类方法-Promise.reject()

直接返回一个 reject 状态的 Promise 对象

18.js

```javascript
const promise =  Promise.reject('no');

promise.then(res=>{
    console.log(res);
}).catch(err=>{
    console.log(err); // no
})
```

#### 类方法-Promise.all()

传入一个 Promise 对象数组，按数组顺序返回数据

19.js

```javascript
const promise1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(1)
    },1000)
})

const promise2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(2)
    },2000)
})

const promise3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(3)
    },3000)
})

Promise.all([promise1, promise2, promise3]).then(res=>{
    console.log(res) // [ 1, 2, 3 ]
})
```

但其中一个 Promise 对象变成reject状态，则新的 Promise 立即变为reject状态

```javascript
// 20.js

const promise1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(1)
    },1000)
})

const promise2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('err')
    },2000)
})

const promise3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(3)
    },3000)
})

// 其中一个 Promise 对象变成reject状态，则新的 Promise 立即变为reject状态
Promise.all([promise1, promise2, promise3]).then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err) // err
})
```

#### 类方法-Promise.allSettled()

在即使有 reject 状态的情况下，仍然返回全部结果

```javascript
// 21.js
const promise1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(1)
    },1000)
})

const promise2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('err')
    },2000)
})

const promise3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(3)
    },3000)
})

Promise.allSettled([promise1, promise2, promise3]).then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err) 
})

/*
[
  { status: 'fulfilled', value: 1 },
  { status: 'rejected', reason: 'err' },
  { status: 'fulfilled', value: 3 }
]
*/
```

#### 类方法-Promise.race()

返回最先执行结束的Promise

```javascript
// 22.js
const promise1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(1)
    },1000)
})

const promise2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('err')
    },2000)
})

const promise3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(3)
    },3000)
})

Promise.race([promise1,promise2,promise3]).then(res=>{
    console.log(res) // 1
})
```

如果第一个执行结束的是返回 reject 状态，同样返回  reject 的结果

```javascript
// 23.js
const promise1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('err1')
    },1000)
})

const promise2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('err')
    },2000)
})

const promise3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(3)
    },3000)
})

Promise.race([promise1,promise2,promise3]).then(res=>{
    console.log('res',res)
}).catch(err=>{
    console.log('err',err) // err err1
})
```

#### 类方法-Promise.any()

得到一个状态为 fulfilled 之后才会结束，不会因为第一个返回的状态为 reject 而直接结束

```javascript
// 24.js
const promise1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('err1')
    },1000)
})

const promise2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('err')
    },2000)
})

const promise3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(3)
    },3000)
})

// 有一个状态为 fulfilled 之后才会结束
Promise.any([promise1,promise2,promise3]).then(res=>{
    console.log(res) // 3
}).catch(err=>{
    console.log(err) 
})
```

若全为 reject , 也会等到全部 Promise 执行都返回reject
```javascript
// 25.js
const promise1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('err1')
    },1000)
})

const promise2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('err2')
    },2000)
})

const promise3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('err3')
    },3000)
})

// 若全为 reject , 也会等到全部 Promise 执行都返回reject
Promise.any([promise1,promise2,promise3]).then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err) // AggregateError: All promises were rejected
    console.log(err.errors) // (3) ['err1', 'err2', 'err3']
})
```


## API




## Promise 的面试题

## Promise 的实现