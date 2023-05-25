### cookie

#### 作用与特点

本身用于浏览器和 server 通讯。

被“借用”到本地存储来的。

可用 document.cookie = '...' 来修改

#### 缺陷 

存储大小限制为 `4KB`。

http 请求时需要发送到服务端，增加请求数量。

只能用 document.cookie = '...' 来修改，太过简陋

### localStorage 和 sessionStorage

#### 作用及特点

HTML5 专门为存储来设计的，最大可存 `5M`。

API 简单易用， `localStorage.setItem()`以及 `localStorage.getItem()`。

不会随着 http 请求被发送到服务端

可以保存服务器发送过来的`token`

保存用户账户密码

#### 缺点

只能存储基本数据类型，不能存储对象类型

#### 区别

localStorage 数据会`永久存储`，除非代码删除或手动删除。

sessionStorage 数据只存在于`当前会话`，浏览器关闭则清空。

一般用 localStorage 会多一些

#### 页面跳转操作对Storage的影响

1.关闭网页重新打开：localStorage保留，sessionStorage清除

2.页面内跳转：都会保留(因为还在当前会话)

3.打开新的网页(页面外跳转)：localStorage保留，sessionStorage清除(跳出当前页面就离开了当前会话)

#### sessionStorage的使用场景

在相互跳转的页面之间(不是打开新的页面)进行数据传递，可以使用sessionStorage

#### 使用

localStorage的使用场景：保存服务器传递过来的token进行身份验证

```javascript
// 取出数据
let token = localStorage.getItem('token');
if(!token){
    console.log('从服务器获取值')
    token = 'token'
    // 设置值
    localStorage.setItem('token',token);
}
console.log('token',token);
```

sessionStorage的使用场景：页面共享数据。在`index3.html`也可以取到sessionStorage设置的数据

```html
<!-- web存储/index2.html -->
<a href="./index3.html">主页面</a>
<script>
    sessionStorage.setItem('name','flten');
</script>   
```
#### 常用属性和方法

`localStorage.length` 获取存储数据个数

`localStorage.setItem(key, value)`设置数据

`localStorage.getItem(key)`获取数据

`localStorage.removeItem(key)`删除一条数据

`localStorage.clear()`清除所有数据

`localStorage.key(index)`根据索引获取对应的`key`

#### 封装工具类，扩展Storage功能

目标：(1)支持对象类型的存储;(2)将localStorage和sessionStorage封装为一个类

```javascript
// web存储/index.js
class Cache {
    constructor(isLocal = true){
        this.storage = isLocal ? localStorage : sessionStorage
    }
    setCache(key,value){
        if(value){
            this.storage.setItem(key,JSON.stringify(value))
        }
    }
    getCache(key){
        const result = this.storage.getItem(key)
        if(result) return JSON.parse(result) 
    }
    removeItem(key){
        this.storage.removeItem(key)
    }
    clear(){
        this.storage.clear()
    }
}
```
