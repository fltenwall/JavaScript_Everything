
### 代码分离，分包处理

减小主包体积，加快首页渲染。其他包按需加载

方法：

1. 动态导入：通过模块内联函数调用来分离代码
2. 防止重复：使用`SplitChunkPlugin`去重和分离代码
3. 入口起点：可以多入口，使用`entry`配置手动分离代码

#### 多入口分包

```javascript
{
    entry: {
        index: './src/index.js',
        main: './src/main.js',
    },
    output:{
        path: path.resolve(__dirname, './build'),
        filename: '[name]-bundle.js',
        clear: true,
    }
}
```

多入口共享代码：会将共享文件单独打包，引入到不同的文件里

```javascript
{
    entry: {
        index: {
            import: './src/index.js',
            dependOn: 'sharedAxios',
        },
        main: {
            import: './src/main.js',
            dependOn: 'sharedDayjs',
        },
        sharedAxios: ['axios'],
        sharedDayjs: ['dayjs'],
    },
}
```


#### 动态导入

魔法注释-自定义chunk包名：

```javascript
import(/* webpackChunkName:'about' */'./router/about')
```

#### SplitChunkPlugin 单独分包

默认只对异步文件`import('...')`进行了分包

```javascript
{
    optimization: {
        chunkIds: 'deterministic', // webpack5中提供，名称确定性
        splitChunks: {
            chunks : 'async', // all
            maxSize : 60000, // 对大于 60kb 的包进行再次拆包
            minSize : 5000, // 拆包体积不小于5kb
            // 自定义分包-命名
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    filename: "[id]_vendor.js",
                }
            },
        }
    }
}
```
`optimization.chunkIds`的配置：开发环境使用`named`；生产环境使用`deterministic`，文件内容本身不发生变化的话不会重新打包，有利于优化打包速度以及客户端进行缓存。


### preload和prefetch

prefetch预获取：在父包加载结束后，浏览器空闲时下载文件

```javascript
import(/* webpackPrefetch:true */'./about.js')
```

preload预加载：同主包文件一起下载，以并行方式加载


### CDN 加速服务器配置

1. 打包的所有静态资源都放到 CDN 服务器
2. 一些第三方资源放在 CDN 服务器

### CSS 样式单独抽取

`style-loader`, `css-loader`

`mini-css-extract-plugin`将css提取到单独文件

```javascript
{   
    module:{
        rules:[
            {
                test:'\.css$',
                use:[
                    'style-loader',
                    MiniCssExtractPlugin.loader, // 将css以link插入到js
                    'css-loader',
                ]
            }
        ],
    },
    plugins:[
        new MiniCssExtractPlugin({
            // filename:'[chunkhash]'.css,
            filename:'[contenthash]'.css,
            chunkFilename:'[name]_chunk'.css, // 对动态导入的css进行命名
        })
    ]
}
```

#### hash命名的不同方式

`hash`的生成和项目有关，项目中一个文件发生变化，会影响其他文件hash的命名变化

`chunkhash`根据不同入口生成hash，但如果主包发生变化，主包中引入的文件也会被重命名重新打包

`contenthash`只与内容有关，如果只是主包变化，只对主包进行重命名和重新打包，不影响主包引入的文件

### Terser

webpack本身是不会对代码就行压缩的，默认利用`terser`插件进行压缩和代码混淆

### CSS 压缩

```javascript
{
    optimization: {
        new CSSMinimizerplugin(
            parallel:true, //多进程进行压缩
        )
    }
}
```

### 区分环境，配置分离

`webpack-merge`合并webpack配置文件

package.json
```javascript
{
    "scripts":{
        "build":"webpack --config ./config/common.config.js --env producation",
        "serve":"webpack serve --config ./config/common.config.js --env development",
    }
}
```

common.config.js
```javascript
const {merge} = require('webpack-merge')
const prodConfig = require('./prod.config')
const devConfig = require('./dev.config')
const commonConfig = function(isProduction){
    return {
        ...,
            module:{
        rules:[
            {
                test:'\.css$',
                use:[
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 
                    'css-loader',
                ]
            }
        ],
    },

    }
}

// 判断环境
module.exports = function(env){
    let mergeConfig = env.production ? prodConfig : devConfig;
    return merge(commonConfig, mergeConfig)
}
```

### Tree-Shaking

默认只对主文件进行了Tree-Shaking，去除了无用代码。`生产环境会自动开启`

js的Tree-Shaking

```javascript
{
    optimization:{
        usedExports:true, // 分析无用代码并标识出
    },
    minimizer:[
        new TerserPlugin({
            extractComments: true,
            terserOptions: {
                compress:{
                    arguments:true,
                    unused: true
                },
                mangle:true,
                keep_fnames:true
            }
        })
    ],
}
```

CSS 的Tree-Shaking

`purgecss-webpack-plugin`

使用`glob`三方模块匹配文件夹下的所有指定文件

```javascript
const glob = import('glob') // 匹配文件夹下的所有指定文件


{
    plugins:[
        new PurgeCSSPlugin({
            paths:glob.sync(`${path.resolve(__dirname, "../src")}/**/*`, {nodir:true}),
            safelist:function(){
                return{
                    standard:['body']
                }
            }
        })
    ]
}
```

### 作用域

将函数合并到同一个作用域.

开发环境下不会开启，生成环境下会自动开启

### 文件压缩

`gzip`压缩。浏览器会自动对压缩文件进行解压。

HTTP 压缩流程：

1. HTTP数据在服务器发送之前就已经被压缩
2. 兼容的浏览器在向服务器发送请求时，会告知服务器支持哪些压缩格式`Accept-Encoding:gzip, deflate`
3. 服务器在浏览器支持的压缩格式下，直接返回对应的压缩后的文件，并且在响应头中告知浏览器`Content-Encoding:gzip`

支持的压缩格式`deflate`,`gzip`,`br`

使用插件`compression-webpack-plugin`进行文件压缩

HTML入口文件默认在生产模式下，会由`html-webpack-plugin`进行压缩
```javascript
{
    plugins:[
        new HTMLWebpackPlugin({
            template:'./index.html',
            cache:true, // html文件发生改变时才重新打包
            minify:true, // 默认生产环境下为true
        })
    ]
}
```