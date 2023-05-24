const http = require('http');
const fs = require('fs');

http.createServer((req,res)=>{
    res.writeHead(200);
    fs.createReadStream(__dirname + '/index.html').pipe(res)
}).listen(4000)