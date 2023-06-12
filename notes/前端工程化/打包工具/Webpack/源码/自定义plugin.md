#### plugin 如何注册到webpack的生命周期中

1. 在`createComplier`方法中注册了所有插件
2. 注册插件时，会调用插件函数，如果不是函数，需要实现一个apply方法供调用
3. 插件方法会接受`compiler`对象，通过complier对象来注册hook事件
4. 有些对象也会传入`compilation`对象，可以监听`compilation`的事件

#### 开发plugin

根据事件对应的打包编译阶段，选取不同的hook进行监听执行,选用`afterEmit`，在静态资源输出后再执行plugin自动上传到服务器

通过`node-ssh`连接远程服务器，

```javascript
const {NodeSSH} = require('node-ssh')
class AutoUploadPlugin {
    // 通过complier发出很多事件
    apply(complier){
        complier.hooks.afterEmit.tapAsync('autoLoad', async (compliation, callback)=>{
            const outputPath = compliation.outputOptions.path // 获取输出文件夹
            await this.connetServe() //与服务器建立ssh连接
            const remotePath =  "/root/demo/"
            this.ssh.execCommand(`rm rf ${remotePath}*`)
            await this.uploadFiles(outputPath, remotePath)
            this.ssh.dispose()
            callback() // 完成所有操作后，调用callback，往下继续执行
        })
    }   
    async connetServe(){
        const ssh = new NodeSSH()
        await ssh.connect({
                host:"127.0.0.1",
                username:"root",
                password:"12345678",
            })
    }
    async uploadFiles(localPath, remotePath){
        await this.ssh.putDirectory(localPath, remotePath, {
            recursive:true, // 递归上传
            concurrency:10, // 并发上传数
        })
    }
}

module.exports = AutoUploadPlugin
module.exports.AutoUploadPlugin = AutoUploadPlugin
```

使用

```javascript
{
    plugins:[
        new AutoUploadPlugin()
    ]
}
```

接收options选项参数：

```javascript
{
    plugins:[
        new AutoUploadPlugin({
            host:'',
            username:'',
            password:'',
            remotePath:"",
        })
    ]
}
```

```javascript
const {NodeSSH} = require('node-ssh')
class AutoUploadPlugin {
    // 通过complier发出很多事件
    apply(complier){
        complier.hooks.afterEmit.tapAsync('autoLoad', async (compliation, callback)=>{
            const outputPath = compliation.outputOptions.path // 获取输出文件夹
            await this.connetServe() //与服务器建立ssh连接
            const remotePath =  this.options.remotePath;
            this.ssh.execCommand(`rm rf ${remotePath}*`)
            await this.uploadFiles(outputPath, remotePath)
            this.ssh.dispose()
            callback() // 完成所有操作后，调用callback，往下继续执行
        })
    }   
    async connetServe(){
        const ssh = new NodeSSH()
        await ssh.connect({
                host:this.options.host,
                username:this.options.username,
                password:this.options.password,
            })
    }
    async uploadFiles(localPath, remotePath){
        await this.ssh.putDirectory(localPath, remotePath, {
            recursive:true, // 递归上传
            concurrency:10, // 并发上传数
        })
    }
}

module.exports = AutoUploadPlugin
module.exports.AutoUploadPlugin = AutoUploadPlugin
```