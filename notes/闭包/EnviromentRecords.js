// 环境记录项，记录所有变量
class EnviromentRecords {
    constructor(bindings){
        this.bindings = bindings || {}
    }
    createBinding(N){
        this.bindings[N] = undefined;
    }
    setBinding(N,V){
        this.bindings[N] = V
    }
    hasBinding(N){
        return N in this.bindings
    }
    getBindingValue(N){
        return this.bindings[N]
    }
}

module.exports = EnviromentRecords