const http = require('http')
const cupLength = require('os').cpus().length
const cluster = require('cluster')

// 判断是不是主进程
if(cluster.isMaster) {
    for (let index = 0; index < cupLength; index++) {
        cluster.fork()
    }
    cluster.on('exit', worker => {
        console.info(`${worker.id} exit.`)
        cluster.fork() // 进程守护，退出一个马上开启另外一个
    })
}else {
    const server = http.createServer((req, res)=>{
        res.writeHead(200)
        res.end('server is running')
    })
    server.listen(9000)
}