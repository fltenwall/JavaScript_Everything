const net = require('net');

const socket = new net.Socket({});

// 手动建立与服务器的连接
socket.connect({
    host: '127.0.0.1',
    port: 3001,
})

const list = [1000,2000,3000];
let index = Math.floor(Math.random()*list.length);
socket.on('data', function(buffer){
    const seqBuffer = buffer.slice(0,2);
    const titleBuffer = buffer.slice(2);
    console.log(seqBuffer.readInt16BE(),titleBuffer.toString());
    socket.write(encode(index))
})


let seq = 0;
function encode(index){
    buffer = Buffer.alloc(6);
    buffer.writeInt16BE(seq);
    buffer.writeInt32BE(list[index],2);
    console.log(seq,list[index])
    seq++;
    return buffer;
}

setTimeout(function(){
    socket.write(encode(index))
},50)