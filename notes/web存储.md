### cookie

#### 作用与特点

1. 本身用于浏览器和 server 通讯，HTTP 无状态,被“借用”到本地存储来的。

2. 可用 document.cookie = '...' 来修改

3. 默认有`跨域限制`，`不跨域共享`，`不跨域传递`
   
4. 常用于登录验证，存储用户标识

解决不跨域传递cookie的方法：前端设置`withCredentials=true`，后端同样设置`withCredentials`表示允许跨域传递cookie

解决不跨域共享cookie的方法：主域名相同的情况下，可以设置跨域共享。设置字段`domain`为主域名，即可跨域共享cookie

#### 缺陷 

1. 存储大小限制为 `4KB`。

2. http 请求时需要发送到服务端，增加请求数量。

3. 只能用 document.cookie = '...' 来修改，太过简陋

4. 现在浏览器开始禁止网页第三方JS设置cookie，目的在于打击第三方广告，保护好用户隐私。如果用户访问的 A 网站中嵌入了 B 网站的 网页，当用户直接访问 B 网站时，网站 B 就可以获取被A 网站中嵌入的京东网页cookie。可以使用`SameSite:Strick/Lax/None`进行设置。

### session

session集中存储用户信息，一般存放在服务器缓存，访问速度会很快

需要与cookie结合配合完成用户校验

#### cookie和session配合完成用户登录

1. 用户使用用户名加密码进行登录，客户端发送请求到服务端
2. 服务端登录校验，并将用户用户名密码登信息写入session
3. 服务端`set-cookie`写入到客户端，将用户标识传递给客户端
4. 客户端访问其他接口时可以通过携带cookie进行访问，一般是用户id
5. 服务端根据cookie中的用户id到session中获取用户信息

#### 为什么需要session？

1. 服务端返回数据时可以会被劫持，如果不是返回用户id而是直接返回用户信息，很可能造成用户隐私泄漏
2. 用户画像等信息可能体积很大，直接返回数据并不合适

### token

 1. token是自定义传递，自己在`Request Header`中写入`Authorization`头信息，不像cookie是HTTP 规范，只要不跨越会自己传递
 2. token需要自己存储(主要通过本地storage存储)，浏览器会自动存储cookie
 3. token默认没有跨域限制

### JWT(Json Web Token)登录验证方案

可以取代cookie+session的用户登录方案

1. 前端发起登录，后端验证用户身份信息之后，返回一个加密的token字符串
2. 前端自行存储这个加密的token(一般存入localStorage)，即使包含用户信息，也因为加密而安全
3. 前端访问服务端接口，就携带这个token作为用户信息
4. 服务端得到token解析，进行用户校验，返回数据给前端

### JWT 和 cookie+session的区别

1. session和cookie的配合校验中，中间只传递用户id，而不传递用户，用户数据存储在session中
2. 而 JWT 的校验方案中，用户信息加密后生成 Token并存储在客户端本地，在通信中互相传递，而在服务器没有对应的集中存储

### session与JWT的对比

session优点：session将用户信息存储在服务端，可快速封禁某用户

session缺点：
1. 多进程，多服务时，由于进程间内存隔离，不好进行数据同步，需要使用第三方缓存比如redis；或者通过进程间通信，实时同步
2. 占用服务器内存，硬件成本高
3. 默认有跨域限制

JWT优点：
1. 不占用服务端内存
2. 多进程、多服务不受影响
3.无跨域限制，更加灵活 

JWT缺点：
1. 用户信息存储在客户端，无法快速封禁某用户，需要通过黑名单封禁用户
2. 如果服务端密钥泄漏，用户信息全部丢失
3. token体积更大，会增加请求数据量

总结：

1. 如果需要严格管理用户信息的场景，应该使用session
2. 没有特殊要求的情况下可以使用token
   

### 单点登录

只要登录一个关联网站，则其他不需要输入用户名和密码全部自动登录

 1. 主域名相同情况下，设置cookie主域名为同一个，例如`domin=baidu.com`，实现跨域共享，则主域名相同的网站都可以登录
   
 2. 主域名不同情况下，使用`SSO` 统一登录验证平台。
   
   (1)假设存在三个主域名不相同的网站 A,B,C，用户登录 A 时发现凭证无效，将用户重定向到 SSO

   (2)用户在 SSO 进行登录校验，并在 SSO 页面进行登录验证。
   
   (3)登录成功后 SSO 平台返回一个ticket(token)，客户端存储ticket到localStorage。
   
   (4)客户端再次并携带ticket访问页面A，而其他页面并不能识别该ticket，将ticket转发给 SSO

   (5)SSO进行ticket验证，验证通过后将校验信息及用户信息返回给页面A

   (6)页面 A 接收到SSO校验信息，并完成登录

   (7)用户携带ticket再访问页面 B ，由于localStorage是跨域不共享的，因此在浏览器端 B 页面的localStorage并没有存储 SSO 签发的ticket凭证，B将请求转发到SSO

   (8)SSO 对用户的ticket进行验证，并返回校验结果和用户信息给服务器 B

   (9)服务器 B返回ticket到浏览器，浏览器在B 页面下的localStorage存储ticket

3. OAuth 2.0

通过第三方验证登录，遵循统一的OAuth 2.0规范

(1)用户访问网站 A

(2)网站 A 允许微信扫描登录

(3)用户扫描登录

(4)网站 A 调用微信登录验证服务，并返回一个token

(5)用户得到token并再次请求登录

(6)网站 A 拿到token并调用微信接口进行校验

(7)微信返回校验信息



### localStorage 和 sessionStorage

#### 作用及特点

HTML5 专门为存储来设计的，最大可存 `5M`。

API 简单易用， `localStorage.setItem()`以及 `localStorage.getItem()`。

不会随着 http 请求被发送到服务端

可以保存服务器发送过来的`token`

跨域不共享

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
