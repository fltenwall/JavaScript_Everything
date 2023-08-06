
### JSX

#### JSX 是什么

JSX会被编译为`React.createElement()`,而这个函数会返回一个`React Element`的 js 对象

#### JSX是如何映射为 DOM 的

`createElement(type, config, children)`

`type`用于标识节点的类型

`config`以对象形式传入，组件所有的属性都会以键值对形式存储在config对象中

`children`以对象形式传入,记录组件嵌套的内容

```javascript
React.createElement("ul", {
    className:"list"
},React.createElement("li", {
    key:"1"
}, "1"),React.createElement("li", {
    key:"2"
}, "2"))
```

对应的 JSX 为：

```html
<ul className="list">
    <li key="1">1</li>
    <li key="2">2</li>
</ul>
```

`React.createElement()`格式化参数 -> `ReactElement()`生成虚拟 DOM -> `ReactDOM.render()`渲染处理为真实 DOM

### React 生命周期

生命周期的演变