const cluster = require('cluster');
const os = require('os');

if(cluster.isMaster){
    // 分发到其他子进程处理Http请求
    for(let i=0;i<os.cpus().length / 2;i++){
        cluster.fork()
    }
}else{
    require('./app.js')
}