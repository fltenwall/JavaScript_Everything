const http = require('http');

http.createServer((req, res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.writeHead(200);
    const data = [
        {id:111,name:'fltenwall'},
        {id:222,name:'fltenwall'}
    ]
    res.end(JSON.stringify(data));
}).listen(3000)