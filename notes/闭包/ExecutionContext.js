
// 执行上下文类
class ExecutionContext {
    // 词法环境，this指针
    constructor(lexicalEnviroments, thisBinding){
        this.lexicalEnviroments = lexicalEnviroments
        this.thisBinding = thisBinding
    }
}

module.exports = ExecutionContext