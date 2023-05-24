const childProcess = require('child_process');

const child_process = childProcess.fork(__dirname + '/child.js');

// 给子进程发消息
child_process.send('father');

child_process.on('message', function(str){
    console.log(str);
})