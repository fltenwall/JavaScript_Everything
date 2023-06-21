#### Promise读取文件

```javascript
const fs = require('fs')
const path = require('path')
const promise = new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname + '/File/test.txt'),(err,data)=>{
        if(err) reject(err)
        resolve(data)
    })
})

promise.then(val => {
    console.log(val.toString())
},err => {
    console.log(err)
})
```

封装为函数

```javascript
const path = require('path')

function readFilePromsie(path){
    return new Promise((resolve, reject)=>{
        require('fs').readFile(path, (err,data)=>{
            if(err) reject(err)
            resolve(data)
        })
    })
}

readFilePromsie(path.resolve(__dirname + '/File/test.txt')).then(data=>{
    console.log(data.toString())
},err=>{
    console.log(err)
})
```

使用`promisify`返回一个promise对象

```javascript
const path = require('path')
const util = require('util')
const fs = require('fs')

const readFilePromsie = util.promisify(fs.readFile)

readFilePromsie(path.resolve(__dirname + '/File/test.txt')).then(data=>{
    console.log(data.toString())
},err=>{
    console.log(err)
})
```

#### Promise 发送ajax请求

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button id="btn">获取数据</button>
    <script>
        const btn = document.querySelector('#btn')
        btn.addEventListener('click', function(){
            const p = new Promise((resolve,reject)=>{
                const xhr = new XMLHttpRequest()
                xhr.open('GET','https://api.apiopen.top/api/sentences')
                xhr.send()
                xhr.onreadystatechange = function(){
                    if(xhr.readyState === 4){
                        if(xhr.status>= 200 && xhr.status < 300){
                            resolve(xhr.response)
                        }else{
                            reject(xhr.status)
                        }
                    }
                }
            })
            p.then((val)=>{
                console.log(val)
            },(err)=>{
                console.warn(err)
            })
        })
    </script>
</body>
</html>
```

promise封装ajax请求

```html
<script>
function sendAjax(url){
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.send()
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status >= 200 && xhr.status < 300){
                    resolve(xhr.response)
                }else{
                    reject(xhr.status)
                }
            }
        }
    })
}

sendAjax('https://api.apiopen.top/api/sentences').then(data=>{
    console.log(data)
},err=>{
    console.log(err)
})
</script>
```

#### async/await 发送ajax请求

```html
<body>
    <button id="btn">获取数据</button>
    <script>
        const btn = document.querySelector('#btn')
        function sendAjax(url){
            return new Promise((resolve, reject)=>{
                const xhr = new XMLHttpRequest()
                xhr.open('GET', url)
                xhr.send()
                xhr.onreadystatechange = function(){
                    if(xhr.readyState === 4){
                        if(xhr.status >= 200 && xhr.status < 300){
                            resolve(xhr.response)
                        }else{
                            reject(xhr.status)
                        }
                    }
                }
            })
        }
        btn.addEventListener('click', async function(){
            const data = await sendAjax('https://api.apiopen.top/api/sentences')
            console.log(data)
        })
    </script>
</body>
```