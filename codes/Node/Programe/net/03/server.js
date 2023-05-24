const net = require('net');

const server = net.createServer(socket=>{
    socket.on('data', function(buffer){
        const seqBuffer = buffer.slice(0,2);
        const id = buffer.readInt32BE(2);
        setTimeout(function(){
            const buffer = Buffer.concat([seqBuffer,Buffer.from(data[id])])
            socket.write(buffer);
        },10+Math.random()*1000)
    })
})

server.listen(3001)

const data = {
    1000:'java',
    2000:'javascript',
    3000:'python',
}