<!-- vscode-markdown-toc -->
* 1. [margin与padding的不同](#marginpadding)
* 2. [vw与百分比的区别](#vw)
* 3. [行内元素与块级元素](#)
* 4. [如何让谷歌浏览器支持小字体](#-1)
* 5. [盒子模型](#-1)
* 6. [移动响应式布局开发方案](#-1)
* 7. [px / % 百分比 / em / rem / vw-vh 有什么区别](#pxemremvw-vh)
* 8. [首行缩进](#-1)
* 9. [使用css 让一个div消失，](#cssdiv)
* 10. [z-index的 工作原理，适用范围](#z-index)
* 11. [谈谈对 HTML5 的理解](#HTML5)
* 12. [如何使一个div里面的文字垂直居中，且文字大小随屏幕自适应](#div)
* 13. [下面哪种渲染性能高](#-1)
* 14. [offsetHeight-scrollHeight-clientHeight有什么区别](#offsetHeight-scrollHeight-clientHeight)
* 15. [15. css中哪些属性是可以继承的 ？](#css)
* 16. [16. 清除浮动有哪些方法, 各有什么优缺点？](#-1)
* 17. [requestIdleCallback和requestAnimationFrame有什么区别](#requestIdleCallbackrequestAnimationFrame)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

####  1. <a name='marginpadding'></a>margin与padding的不同

`作用对象不同`，padding作用于自身(内边距)，margin作用于外部对象(外边距)

####  2. <a name='vw'></a>vw与百分比的区别

百分比有`继承关系`，是相对于`父元素`的

vm是相对于`屏幕宽度`的，只于屏幕宽度有关

####  3. <a name=''></a>行内元素与块级元素

块级元素有`继承关系`，独占一行，不设置宽高的情况下直接继承父级宽高

行内元素`无继承关系`，宽高由内容决定

####  4. <a name='-1'></a>如何让谷歌浏览器支持小字体 

默认最小`12px`

可以通过`transform:scale(0.8)`进行缩放

####  5. <a name='-1'></a>盒子模型

1.标准盒子模型`box-sizing:content-box`

`width/height`指的是content的宽和高

盒子的高度=`height`+`padding`+`margin`+`border`

2.IE 盒模型`box-sizing:border-box`

`width/height`指的是盒子的宽和高，设置`padding`,`margin`,`border`不会扩大盒子，只会压缩`content`内容

`Bootstrap`默认采用`boder-box`

3.flex弹性伸缩盒模型

4.column多列布局


####  6. <a name='-1'></a>移动响应式布局开发方案

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

####  7. <a name='pxemremvw-vh'></a>px / % 百分比 / em / rem / vw-vh 有什么区别

px是绝对单位，其他都是相对单位

% 百分比是相对`父元素`的宽高比例

em 是相对`当前元素`的`font-size`

rem 是相对于`根元素`的`font-size`，可以配合`@media`对不同屏幕做一些适配

`vw`-`vh`：相对`屏幕高度/宽度`

`vmin`-`vmax`：取宽高值小的那个；取宽高值大的那个


####  8. <a name='-1'></a>首行缩进

```css
"text-indent: 2em"
```
####  9. <a name='cssdiv'></a>使用css 让一个div消失，

####  10. <a name='z-index'></a>z-index的 工作原理，适用范围

不同文档流建立不同层级

浮动、定位都能脱离文档流

transform变形可以脱离层级

animation 帧动画，产生虚拟平面，只引发一次回流

####  11. <a name='HTML5'></a>谈谈对 HTML5 的理解

####  12. <a name='div'></a>如何使一个div里面的文字垂直居中，且文字大小随屏幕自适应

####  13. <a name='-1'></a>下面哪种渲染性能高

第二种高，因为选择器从右向左查询，第一种进行了二次筛选，先找所有的`a`，才找`box`下的`a`。

```css
.box a{

}

a{

}
```

####  14. <a name='offsetHeight-scrollHeight-clientHeight'></a>offsetHeight-scrollHeight-clientHeight有什么区别

offsetHeight = border + padding + content

clientHeight = padding + content

scrollHeight = padding + 实际内容尺寸(子元素的大小)

####  15. <a name='css'></a>15. css中哪些属性是可以继承的 ？

字体：font, font-family, font-size, font-style, font-variant, font-weight

字母间距：letter-spacing

文字展示：line-height, text-align, text-indent, text-transform

可见性：visibility

字间距：work-spacing

####  16. <a name='-1'></a>16. 清除浮动有哪些方法, 各有什么优缺点？

为什么要清除浮动？因为在不清楚浮动的情况下可能会出现高度塌陷

清除浮动的方法：

基本结构

```html
    <div class="container">
        <img class="img" src="../../imgs/imgs/vip.gif" alt="" srcset="">
        <div class="rightbox">
            <div>javascript</div>
            <div>python</div>
        </div>
    </div>
```

1. 父元素固定宽高

优点：简单，没有兼容问题

缺点：内部元素高度不确定的情况下无法使用

```css
.container{
    width: 200px;
    height: 45px;
    padding: 10px;
    border: 1px solid salmon;
}
.img{
    background-color: aquamarine;
    width: 120px;
    height: 45px;
    float: left;
}
.rightbox{
    float: right;
}
```

2. 添加新元素

优点：简单，没有兼容问题

缺点：需要添加额外的 HTML元素

```html
    <style>
        .container{
            width: 200px;
            padding: 10px;
            border: 1px solid salmon;
        }
        .img{
            background-color: aquamarine;
            width: 120px;
            height: 45px;
            float: left;
        }
        .rightbox{
            float: right;
        }
        .clear-element{
            clear: both;
        }
    </style>
</head>
<body>
    <div class="container">
        <img class="img" src="../../imgs/imgs/vip.gif" alt="" srcset="">
        <div class="rightbox">
            <div>javascript</div>
            <div>python</div>
        </div>
        <div class="clear-element"></div>
    </div>
</body>
```

3. 使用伪元素

优点：仅用css 实现

缺陷：IE8以下不支持

```css
.container::after{
    content: "";
    display: block;
    height: 0;
    clear: both;
}
```

4. 触发父元素的 BFC

优点：仅用 CSS 实现，兼容性好

缺陷：用`overflow:hidden`触发 BFC 的情况下，可能使内部本该正常显示的内容被裁剪掉

```css
.container{
    width: 200px;
    padding: 10px;
    border: 1px solid salmon;
    overflow: hidden;
}
```

```css
.container{
    width: 200px;
    padding: 10px;
    border: 1px solid salmon;
    position: absolute;
}
```

```css
.container{
    width: 200px;
    padding: 10px;
    border: 1px solid salmon;
    display: inline-block;
}
```

使用`overflow:hidden`触发 BFC 使内部本该正常显示的内容被裁剪的情况

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
    <style>
        .container{
            width: 200px;
            padding: 10px;
            border: 1px solid salmon;
            overflow: hidden;
        }
        .img{
            background-color: aquamarine;
            width: 120px;
            height: 45px;
            float: left;
        }
        .rightbox{
            float: right;
        }
        .content{
            width: 400px;
            height: 45px;
            background-color: red;
        }
    </style>
</head>
<body>
    <div class="container">
        <img class="img" src="../../imgs/imgs/vip.gif" alt="" srcset="">
        <div class="rightbox">
            <div>javascript</div>
            <div>python</div>
        </div>
        <div class="content"></div>
    </div>
</body>
</html>
```

####  17. <a name='requestIdleCallbackrequestAnimationFrame'></a>requestIdleCallback和requestAnimationFrame有什么区别

`requestIdleCallback` 可以用来`判断浏览器是否空闲`, 空闲时才执行，低优先级

`requestAnimationFrame` 每次渲染完都会执行，高优先级

requestIdleCallback和requestAnimationFrame 都是宏任务

