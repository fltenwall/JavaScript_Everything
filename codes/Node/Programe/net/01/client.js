const net = require('net');

const socket = new net.Socket({});

// 手动建立与服务器的连接
socket.connect({
    host: '127.0.0.1',
    port: 3001,
})

setInterval(function(){
    socket.write('fltenwall');
},1000)