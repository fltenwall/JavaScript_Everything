<!-- vscode-markdown-toc -->
		* 1. [快速上手](#)
		* 2. [await](#await)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->####  1. <a name=''></a>快速上手

async函数本身是同步执行的

```javascript
//01.js
async function fn(){
    console.log('async');
}

console.log('start')
fn()
console.log('end')

/*
start
async
end
*/ 

```
async函数默认返回一个状态为 reject, 值为 undefined 的 Promise 对象

```javascript
// 02.js
const promise = async function(){}

promise().then(res=>{
    console.log(res) // undefined
})
```

上面的代码和下面的是等效的

```javascript
// 03.js
const promise = new Promise((resolve,reject)=>{
    resolve(undefined)
})

promise.then(res=>{
    console.log(res) // undefined
})

```

返回一个实现then方法的对象,then调用时得到的值是对象 then 方法执行的结果

```javascript
// 04.js
const promise = async function(){
    return {
        then: function(resolve,reject){
            console.log('flten');
        }
    }
}

promise().then(res=>{
    console.log(res) // flten
})
```

返回一个Promise 对象

```javascript
// 05.js
const promise = async function(){
    return new Promise((resolve,reject)=>{
        setTimeout(function(){
            console.log('ok')
        },1000)
    })
}

promise().then(res=>{
    console.log(res)  // ok
})
```

异步函数中的异常会作为返回的 Promise 对象的reject，不会阻断程序，这与普通函数有很大的不同

```javascript
// 06.js
async function fn(){
    throw new Error('err')
}

fn().catch(err=>{
    console.log(err)
})

console.log('......')

/*
......
Error: err
*/
```
####  2. <a name='await'></a>await

```javascript
//07.js
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
```

await 报错时，直接将reject作为整个异步函数的返回值 

```javascript
// 08.js
async function fn(){
    const res = await Promise.reject('res')
    // 不会继续往下执行,reject作为整个异步函数的返回值 
    console.log('next',res)
}

fn().then(res=>{
    console.log('then',res)
}).catch(err=>{
    console.log('err',err) // err res
})
```