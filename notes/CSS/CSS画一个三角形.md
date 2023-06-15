
其他边框都设置为透明，然后将目标方向的border进行设置

```html
<head>
    <style>
        .triangle{
            border: 10px solid transparent;
            border-left: 10px solid lightblue;
        }
    </style>
</head>
<body>
    <div class="triangle"></div>
</body>
```

公平处理原则，重叠部分对半划分

```css
.triangle{
    width: 10px;
    border-left: 10px solid lightblue;
    border-right: 10px solid lightcoral;
    border-top: 10px solid lightgoldenrodyellow;
    border-bottom: 10px solid lightseagreen;
}
```