/**
 * 词法环境由一个环境记录项(记录变量)和一个外部词法环境记录的引用组成(外层作用域)
 */
class LexicalEnviroment {
    constructor(environmentRecord,outer){
        this.environmentRecord = environmentRecord
        this.outer = outer
    }
    // 登记变量
    createBinding(N){
        this.environmentRecord.bindings[N] = undefined;
    }
    // 设置变量的值
    setBinding(N,V){
        this.environmentRecord.bindings[N] = V
    }
    // 判断变量是否已登记
    hasBinding(N){
        return N in this.environmentRecord.bindings
    }
    // 获取变量的值
    getBindingValue(N){
        return this.environmentRecord.bindings[N]
    }
}

module.exports = LexicalEnviroment