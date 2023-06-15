#### 加载阶段

优化 CSS 的解析：

CSS放在head中，不要异步加载 CSS

JS 使用`<script defer>`

`<img>`提前定义好 `width`和`height`


#### 减少重排/重绘

1. 集中修改css样式，或者直接修改class
2. 修改之前设置`display:none`，脱离文档流，修改完之后再设置`display:block`加入到文档流中
3. 使用 BFC 特性，只修改内部元素，不影响其他元素位置
4. 频繁触发的使用节流和防抖
5. 使用文档碎片方法`createDocumentFragment`批量操作 DOM，将多个dom放在一个div容器中，只触发一次重排
6. 优化动画，使用 CSS3和`requestAnimationFrame`,触发浏览器动画优化机制及 GPU 加速

#### 使用BFC

Block Format Context,块级格式化上下文

特性:内部元素无论如何改动，都不会影响其他元素的位置

触发条件：

1. 根节点html
2. `float:left/right` 浮动
3. `overflow:auto/scroll/hidden`滚动
4. `display:inline-block/table/table-row/table-cell`
5. `display:flex/grid`的直接子元素
6. `postion:absolute/fixed`定位

####  属性编写


1. 属性设置使用简写
2. 删除不必要的 0和单位
```css
.box {
    width:0.2px
}
.box{
    width:.2px
}
```
#### 用精灵图🧚🏻‍♀️替代多个单独文件加载

#### 用 CSS 替换图片，减少http请求

用css画三角形替代箭头图片

