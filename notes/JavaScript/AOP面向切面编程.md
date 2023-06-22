```javascript
Function.prototype.before = function before(callback){
    if(typeof callback !== 'function') throw new TypeError('callback must be a function')
    const self = this
    // 实现链式调用：返回一个函数
    return function proxy(...args){
        callback.call(this, ...args) // after中的回调先执行
        return self.call(this, ...args) // call函数执行，并返回func返回值
    }
}

Function.prototype.after = function after(callback){
    if(typeof callback !== 'function') throw new TypeError('callback must be a function')
    const self = this
    // 实现链式调用：返回一个函数
    return function proxy(...args){
        let res = self.call(this, ...args) // 前一个proxy先执行(before和func)
        callback.call(this, ...args) // after再执行
        return res // 返回func返回值
    }
};

const func = () => console.log('func');

func.before(()=>{console.log('before')}).after(()=>{
    console.log('after')
})();

/*
before
func
after
*/


// 函数有返回值
const funcHasResult = () => {
    console.log('func')
    return 111
};

let a = funcHasResult.before(()=>{
    console.log('before')
}).after(()=>{
    console.log('after')
})()

console.log(a)

/*
before
func
after
111
*/
```