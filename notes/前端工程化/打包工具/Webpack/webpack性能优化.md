
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

文件预加载


### CDN 加速服务器配置

### CSS 样式单独抽取

### Terser

webpack本身是不会对代码就行压缩的，利用`terser`插件进行压缩