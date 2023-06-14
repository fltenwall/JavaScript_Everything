

#### margin与padding的不同

`作用对象不同`，padding作用于自身(内边距)，margin作用于外部对象(外边距)

#### vw与百分比的区别

百分比有`继承关系`，是相对于`父元素`的

vm是相对于`屏幕宽度`的，只于屏幕宽度有关

#### 行内元素与块级元素

块级元素有`继承关系`，独占一行，不设置宽高的情况下直接继承父级宽高

行内元素`无继承关系`，宽高由内容决定

#### 如何让谷歌浏览器支持小字体 

默认最小`12px`

可以通过`transform:scale(0.8)`进行缩放

#### 盒子模型

1.标准盒子模型`box-sizing:content-box`

`width/height`指的是content的宽和高

盒子的高度=`height`+`padding`+`margin`+`border`

2.IE 盒模型`box-sizing:border-box`

`width/height`指的是盒子的宽和高，设置`padding`,`margin`,`border`不会扩大盒子，只会压缩`content`内容

`Bootstrap`默认采用`boder-box`

3.flex弹性伸缩盒模型

4.column多列布局


#### 移动响应式布局开发方案

1.media(一套代码运行多端)
```css
@media only screen and (max-width: 375) {
    html{
        font-size: 86px
    }
}
```

2.rem(移动端与PC端两套代码，移动端完全使用rem)

3.flex

4.vh/vw(百分比布局)

#### px / % 百分比 / em / rem / vw-vh 有什么区别

px是绝对单位，其他都是相对单位

% 百分比是相对`父元素`的宽高比例

em 是相对`当前元素`的`font-size`

rem 是相对于`根元素`的`font-size`，可以配合`@media`对不同屏幕做一些适配

`vw`-`vh`：相对`屏幕高度/宽度`

`vmin`-`vmax`：取宽高值小的那个；取宽高值大的那个


#### 首行缩进

```css
"text-indent: 2em"
```
#### 使用css 让一个div消失，

#### z-index的 工作原理，适用范围

不同文档流建立不同层级

浮动、定位都能脱离文档流

transform变形可以脱离层级

animation 帧动画，产生虚拟平面，只引发一次回流

#### 谈谈对 HTML5 的理解

#### 如何使一个div里面的文字垂直居中，且文字大小随屏幕自适应

#### 下面哪种渲染性能高

第二种高，因为选择器从右向左查询，第一种进行了二次筛选，先找所有的`a`，才找`box`下的`a`。

```css
.box a{

}

a{

}
```

#### offsetHeight-scrollHeight-clientHeight有什么区别

offsetHeight = border + padding + content

clientHeight = padding + content

scrollHeight = padding + 实际内容尺寸