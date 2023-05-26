
#### setTimeout

```javascript
setTimeout(function(){
    console.log(this) // Window
})

```

#### 数组中的函数

forEach传入的函数，执行时`this`默认指向`Window`

```javascript
let arr = [1,2,3,4,5]
arr.forEach(function(itme){
    console.log(this) // Window
})
```

forEach的第二个参数可以改变`this`的指向

```javascript
let arr = [1,2,3,4,5]
arr.forEach(function(itme){
    console.log(this)  // {'a':'b'}
}, {'a':'b'})
```

map/filter/find 都是相同的情况
