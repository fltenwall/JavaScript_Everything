
#### 三种模式

Hash

History

MemoryHistory(v4之前叫Abstract History)

Hash是基于`location.hash`

Histroy 是基于 H5 的 API `history.pushState`和`window.onpopState`

MemoryHistory没有路由变化，前进后退不可用。网页不会变化，不会进行刷新。

React-router中的三种模式与 Vue中是完全相同的