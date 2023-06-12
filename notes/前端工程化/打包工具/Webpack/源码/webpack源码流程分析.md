
#### 编译入口文件分析

```javascript
const config = require('./webpack.config')
const compiler = webpack(config)

compiler.run((err, stats)=>{

})
```

创建`compiler`文件，调用`compiler.run()`开始进行编译和打包。从主入口文件开始，生成依赖图。

#### 注册所有的plugins

```javascript
for(const plugin of options.plugins){
    if(typeof plugin === 'function'){
        plugin.call(compiler, compiler)
    }else{
        // plugin是对象
        plugin.apply(compiler)
    }
}
```

可以使用`compiler`取到`hooks`进行事件监听

除`loader`外，`entry`,`output`,`devtool`等配置选项也是转为插件进行处理

```javascript
new WebpackOptionsApply().process(options, compiler);
compiler.hooks.initialize.call();
return compiler;
```

```javascript
apply(compiler){
    ...
    compiler.hooks.make.tapAsync('EnterPlugin',(compiler,callback)=>{
        compiler.addEntry(context,dep, options,err=>{
            callback(err)
        })
    })
}
```

开始编译模块：

将入口作为模块加入图结构
```javascript
this.addMoudleTree({

})
```

创建为模块并查找依赖，将依赖模块进行分解，逐一向下进行依赖查找。将模块加入队列中

加载loader,执行模块的转化  利用三方包`loader-runner`进行处理

```javascript
runloader(){}
```

webpack => compiler => hooks => 注册所有插件 => compilization(addEntry => factoryModule => addModule => needBild => buildModule => buildQueue => _build => module.build => do_Build => runloader() ) => seal => 输入文件 => emitAssets 输入结果