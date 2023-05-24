const net = require('net');

const socket = new net.Socket({});

// 手动建立与服务器的连接
socket.connect({
    host: '127.0.0.1',
    port: 3001,
})

const list = [1,2,3];

let buffer = Buffer.alloc(2);
let index = Math.floor(Math.random()*list.length);
buffer.writeInt16BE(list[index])

socket.write(buffer)

socket.on('data', function(buffer){
    console.log(list[index],buffer.toString());

    buffer = Buffer.alloc(2);
    index = Math.floor(Math.random()*list.length);
    buffer.writeInt16BE(list[index])

    socket.write(buffer)
})