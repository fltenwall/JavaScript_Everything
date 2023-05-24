const query = require('./index');

// 前端传入请求
query('{ hello }').then(res=>console.log(res))

/*
{ data: [Object: null prototype] { hello: 'Hello world!' } }
*/