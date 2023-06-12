
#### 打包时间分析

对每个`loader`和`plugin`打包时间进行分析：`speed-measure-webpack-plugin`

```javascript
const smp = new SpeedMeasureWebpackPlugin()

...

const commonConfig = function(env){
    return {
        module:{
        rules:[
                {
                    test:/\.jsx?$/,
                    exclude:/node_modules/, // 三方包一般会自行处理
                    use:{
                        loader:"babel-loader",
                    }
                }
            ],
        },
    }

    ...
}

let mergeConfig = env.production ? prodConfig : devConfig;
return smp.wrap(merge(commonConfig, mergeConfig))
```

#### 打包后文件分析

1. 生成一个`stats.json`文件，分析每个包大小

配置`package.json`
```javascript
{
    "scripts":{
        "build":"webpack --config ./config/common.config.js --env producation --profile --json=stats.json",
        "serve":"webpack serve --config ./config/common.config.js --env development",
    }
}
```
查看 `stats.json`

2. `webpack-bundle-analyzer`

当成插件进行使用

```javascript
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
module.exports={
        plugins:[
            new BundleAnalyzerPlugin(),
        ]
    }
```