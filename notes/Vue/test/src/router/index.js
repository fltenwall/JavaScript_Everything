import {createRouter, createWebHistory} from 'vue-router'

// const Home  = () => import(/*webpackChunkName:'home.chunk'*/'../Views/Home.vue')
// const About = () => import(/*webpackChunkName:'about.chunk'*/'../Views/About.vue')

// 创建路由表
const router = createRouter({
    // 指定路由模式
    history: createWebHistory(),
    // 存放映射关系
    routes:[
        {path:"/",},
        {
            path:"/home", 
            component: import(/*webpackChunkName:'home.chunk'*/'../Views/Home.vue')
        },
        {
            path:"/about", 
            component: () => import(/*webpackChunkName:'about.chunk'*/'../Views/About.vue')
        },
        {
            path:"/user:id",
            component:() => import('../Views/User.vue')
        },
        // {
        //     path:"/:pathMatch(.*)",
        //     component:() => import('../Views/NotFound.vue')
        // }
    ]
})

router.beforeEach(()=>{
    return '/login'
})

export default router