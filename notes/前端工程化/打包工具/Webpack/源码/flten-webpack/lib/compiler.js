const fs = require('fs')
const path = require('path')
// const process = require('process')

class Compiler {
    constructor(config){
        this.config = config
        this.entryId; //入口文件路径
        this.modules = {} // 模块依赖
        this.entry = config.entry // 入口路径
        this.root = process.pwd  //工作路径
    }
    getSource(modulePath){
        let content = fs.readFileSync(modulePath, 'utf-8')
        return content
    }
    parse(source, parentPath){

    }
    buildModule(modulePath, isEntry){
        let source = this.getSource(modulePath) // 模块内容
        let moduleName = './' + path.relative(this.root, modulePath) // 获取相对路径
        if(isEntry){
            this.entryId = moduleName
        }
        let {sourceCode, dependecies} = this.parse(source, path.dirname(moduleName)) // 解析文件
        this.modules[moduleName] = sourceCode
    }
    emitFile(){

    }
    run(){
        console.log(111,this.root, this.entry)
        this.buildModule(path.resolve(this.root, this.entry), true) //依赖关系
        this.emitFile() // 打包后的路径
    }
}

module.exports = Compiler