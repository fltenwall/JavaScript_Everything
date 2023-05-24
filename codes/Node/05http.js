const http = require('http');

http.createServer((req, res)=>{
    res.writeHead(200);
    res.end('http');
}).listen(3000)