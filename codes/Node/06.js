const http = require('http')
const fs = require('fs')

http.createServer(function(req,res){
    res.writeHead(200)
    fs.createReadStream(`${__dirname}/HTML/01.html`).pipe(res)
}).listen(3000)