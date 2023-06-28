
#### v-if和v-show

v-if会销毁组件，v-show使用css隐藏组件；实际工作中更多使用`v-if`，当组件创建比较慢时可以使用`v-show`

v-for使用`:key`

#### 使用computed进行缓存

组件中数据比较大，需要计算量比较大时，可以使用`computed`进行缓存，减小计算

#### keep-alive缓存组件

频繁切换的组件使用`keep-alive`，比如 Tab，可以使用，避免v-if频繁重建

但过渡到缓存会占用内存，且不好debug

```html
<keep-alive>
    <Tab1 v-if="num===1"></Tab1>
    <Tab2 else></Tab2>
</keep-alive>
```

上面的组件代码中，因为使用了`keep-alive`缓存组件包裹`v-if`，因此它不会被销毁

#### 使用异步组件

体积较大的组件，比如复杂表格、表单等，进行单独拆包，需要时异步加载，减小主包体积

vue3中使用异步组件
```javascript
components:{
    Child: defineAsyncComponent(()=>import(/*child*/'./child.vue'))
}
```

#### 路由懒加载

拆分路由，减小主包体积

1. 利用`import`的分包机制，不直接引入组件，在组件使用时再动态引入。
2. 打包时会对组件进行分包处理，减小包体积，加快首屏渲染速度

```javascript
import {createRouter, createWebHistory} from 'vue-router'

const Home  = () => import(/*webpackChunkName:'home.chunk'*/'../Views/Home.vue')
const About = () => import(/*webpackChunkName:'about.chunk'*/'../Views/About.vue')

// 创建路由表
const router = createRouter({
    // 指定路由模式
    history: createWebHistory(),
    // 存放映射关系
    routes:[
        {path:"/",},
        {path:"/home", component: Home},
        {path:"/about", component: About},
    ]
})
```

#### 服务端渲染 SSR

使用`nuxt.js`进行服务端渲染，但是成本高。