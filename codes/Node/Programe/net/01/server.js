const net = require('net');

const server = net.createServer(socket=>{
    socket.on('data', function(buffer){
        console.log(buffer.toString())
    })
})

server.listen(3001)