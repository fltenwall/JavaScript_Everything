
通过`jsbridge`对象调用JS 本地方法

构造jsbirdge请求：用`iframe`，设置`src`请求

```javascript
const iframe = document.createElement('iframe')
iframe.src = "jsbridge://xxx?a=111"
document.body.appendChild(iframe)
```
native对webview进行拦截监听，判断JS 是调用哪些方法以及是否合法。然后native调用js回调
