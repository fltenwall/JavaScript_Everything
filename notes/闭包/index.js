const ExecutionContext = require('./ExecutionContext')
const ObjectEnvironmentRecords = require('./ObjectEnvironmentRecords')

// 创建全局环境记录项，登记变量
let globalEnvironmentRecord = new ObjectEnvironmentRecords(global)
// 创建全局词法环境(声明和查找变量)
// 将全局变量记录传给全局词法环境
let globalLexicalEnviroments = new LexicalEnviroment(globalEnvironmentRecord)
// 全局执行上下文
const globalExecutionContext = new ExecutionContext()
