
GET: 通过url传参，url有最长大小限制；会产生缓存且不可控；一般用于从接口获取数据

可以通过随机数或者时间戳去除 GET 缓存
`'list?xxx=yyy&_='+Math.random()`

DELETE: 从服务器删除数据

HEAD: 只获取响应头

OPTIONS: 试探性请求

POST: 设置请求主体传参，不容易被劫持；一般用于传递参数到服务端

PUT: 