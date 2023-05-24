const net = require('net');

const server = net.createServer(socket=>{
    socket.on('data', function(buffer){
        const id = buffer.readInt16BE();
        setInterval(function(){
            socket.write(Buffer.from(data[id]))
        },1000)
    })
})

server.listen(3001)

const data = {
    1:'java',
    2:'javascript',
    3:'python',
}