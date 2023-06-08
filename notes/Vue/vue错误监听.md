#### 全局 JS 错误监听

1. `window.onerror`全局监听所有 JS 的报错，但问题是无法识别vue中的错误

在最上层的`App.vue`中进行全局监听：

```html
<script>
export default {
    mounted(){
        /**
         * msg 错误信息
         * source 报错的文件
         * line 哪一行报错
         * column 哪一列报错
         * error 错误的对象实例
         */
        window.onerror = function(msg, source, line, column, error){
            console.log('window.error', msg, source, line, column, error)
        }
    }
}
</script>
```

不过如果错误被`try...catch`捕获后，错误信息不会向上抛出，不会别`window.onerror`监听

2. 使用`window.addEventListener`进行全局错误事件监听，`event`对象中包含了所有错误信息

```html
<script>
export default {
    mounted(){
        /**
         * msg 错误信息
         * source 报错的文件
         * line 哪一行报错
         * column 哪一列报错
         * error 错误的对象实例
         */
        window.addEventListener('error', event => {
            console.log('window error',event)
        })
    }
}
</script>
```

#### vue中的自己错误监听

1. `errorCaptured`监听所有下级组件的错误，返回`false`会阻止事件向上传播

在最上层的`App.vue`中进行全局监听：

```html
<script>
export default {
    mounted(){
        window.onerror = function(msg, source, line, column, error){
            console.log('window.error', msg, source, line, column, error)
        },
        /**
         * err 错误信息
         * vm 报错的组件实例
         * info 报错信息
         */
        errorCaptured:(err, vm, info) => {
            console.log('errorCaptured', err, vm, info)
            // 禁止向上传播，不会被window.onerror重复捕获
            return false
        }

    }
}
</script>
```

2. Vue 全局错误监听 `errorHandler`

所有组件错误都会汇总到这里，但`errorCaptured`返回`false`会阻止事件向上传播，则不会传播到这里

在`main.js`中进行监听

```javascript
import { createApp } from 'vue'

const app = createApp(App)
app.config.errorHandler = (err, vm, info) => {
    console.log('errorHandler', err, vm, info)
}
app.mount('#app')
```

使用`errorHandler`之后，`window.onerror`就不会捕获错误

3. `warnHandler`全局监听警告⚠️


4. 异步错误捕获

异步回调中的错误，`errorHandler`是监听不到的，需要`window.onerror`进行监听

5. Promise 错误监听

Promise未处理的`catch`需要`onunhandledrejection`进行监听


#### 总结

1. `errorCaptured`监听所有下级组件的错误，主要用在监听重要、有风险组价的错误，返回`false`会阻止事件向上传播，可以在`App.vue`中编写
2. `errorHandler`监听全局Vue 组件报错，在`main.js`中编写
3. `window.onerror`监听其他 JS 报错，比如异步
4. Promise未处理的`catch`需要`onunhandledrejection`进行监听


#### JS报错统计

埋点

上报

统计

