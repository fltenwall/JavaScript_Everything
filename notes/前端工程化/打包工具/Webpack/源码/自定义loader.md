环境：`webpack`,`webpack-cli`

#### loader的加载顺序

loader主要用于对模块的代码进行转换，本质上是`导出为函数的js模块`，尽量使用commonjs规范进行导出。`loader runner`调用这个函数，然后将上一个loader产生的结果或资源文件传入进去。

```javascript

/**
 * content是上一个loader处理完的结果
 * map是sourcemap元数据
 * meta 元数据
 */
module.exports = function(content, map, meta){
    return content
}
```

loader的执行顺序是从后往前的，但可以通过`enforce`改变顺序

#### 同步loader和异步loader

创建的 loader 默认是同步的，要求必须返回值给下一个 loader作为参数使用

异步loader：

```javascript
module.exports = function(content){
    // const callback = this.callback; // 获取同步的callback
    const callback = this.async();

    // 进行异步操作，该 loader执行结束后，才会向下执行
    setTimeout(()=>{
        callback(null, "...") //将回调内容传递给下一个loader
    },1000)
}
```

#### 传递参数给loader

使用loader会传入一些options：

```javascript
{
    loader:'babel-loader',
    options:{
        plugins:[],
        ...
    }
}
```
自定义loader时接收参数
```javascript
module.exports = function(content){
    const options = this.getOptions() //webpack提供的方法
    return content
}
```

创建schema校验规则：

schema.json
```javascript
{
    'type':'object',
    'properties':{
        'name':{
            'type':'string',
            'description':'error!'
        } 
    }
}
```

参数校验，使用webpack提供的`schema-utils`

```javascript
const {validate} = require('schema-utils')
const loaderSchema = require('./schema.json')

module.exports = function(content){
    const options = this.getOptions() 
    // 进行参数校验
    validate(loaderSchema, options)
    return content
}
```

#### 自定义loader处理markdown

思路：将md中的标签转化为对应的html标签，借用`marked`对md进行解析，转为html标签

webpack.config.js
```javascript
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    modules: {
        rules:[
            {
                test:/\.md$/,
                use:{
                    loader:'md-loader',
                }
            }
        ]
    },
    plugins:[
        new HTMLWebpackPlugin()
    ]
}
```


核心：返回的结果必须是`模块化`的内容

md-loader.js
```javascript
const {marked} = require('marked')
module.exports = function(content){
    const htmlContent = marked(content)
    const innerContent = "`" + htmlContent + "`"
    // 转为模块化,webpack进行解析并插入到js文件中
    const moduleContent = `var code = ${innerContent}; export default code;`
    return moduleContent
}
```

使用loader并查看结果

```javascript
import mdcode from './test.md'

document.body.innerHtml = mdcode
```

#### 样式添加

使用`highlight.js`

