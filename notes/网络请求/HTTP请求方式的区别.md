
#### 请求方式

GET: 通过url传参，url有最长大小限制；会产生缓存且不可控；一般用于从接口获取数据

可以通过随机数或者时间戳去除 GET 缓存
`'list?xxx=yyy&_='+Math.random()`

DELETE: 从服务器删除数据

HEAD: 只获取响应头

OPTIONS: 试探性请求

POST: 设置请求主体传参，不容易被劫持；一般用于传递参数到服务端

PUT: 修改服务器上的资源

#### GET和 POST 的区别

1. get 获取数据，post提交数据
2. get参数有长度限制，受限于url长度限制，最长 2048 字节
3. get是明文传输，post放在请求体中

#### http协议中的header及含义

`accept`:代表客户端希望接收的数据类型

`accept-encoding`:浏览器发送给服务器，声明浏览器支持的编码类型

`accept-language`:浏览器所支持的语言类型

`Cache-Control`:缓存开关，no-cache表示禁用缓存

`referer`:防止盗链和恶意请求