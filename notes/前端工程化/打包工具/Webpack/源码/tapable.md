webpack的主要依赖:`tapable`库，使用hook进行事件监听

#### 基本使用

```javascript
const {Synchook} = require('tapable')

class Compiler{
    constructor(){
        this.hooks = {
            syncHook:new Synchook(['name'])
        }
    }

    // 用hook监听事件
    this.hooks.syncHook.tap('event1', (name)=>{
        console.log('event1',name)
    })
}
const compiler = new Compiler()
// 发送事件
compiler.hooks.syncHook.call('fltenwall');
```

#### 同步监听事件

`SyncbailHook`: 事件发出去后，如果有返回值，可以阻断后续事件继续执行

`SyncLoopHook`: 事件发出去，如果结果为`true`会一直执行，可以指定执行次数。返回`undefined`会停止执行

`SyncWaterfallHook`: 如果返回不为undefine，会将本次返回值作为下一次事件执行的第一个参数

#### 异步监听事件

`AsyncparallelHook`: 并行监听，不会等到上一个事件回调执行结束，才执行事件回调

`AsyncseriesHook`: 串行监听，会等上一个事件回调执行结束，才执行事件回调

webpack中使用的主要是`AsyncseriesHook`