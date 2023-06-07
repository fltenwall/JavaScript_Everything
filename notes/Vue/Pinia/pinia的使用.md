
### Pinia 与 Vuex 的区别

1. 提供了 Compistion API
2. Pinia与 TS 一起使用时具有可靠的类型推断支持
3. `支持多 store`，彼此相互独立，通过扁平化方式相互使用
4. Pinia简化了流程，移除了mutation
5. 去除了modules的嵌套结构

### 快速上手
#### 初始化pinia

```javascript
import {createPinia} from 'pinia'

const pinia = createPinia()

export default pinia
```

#### 注册pinia

```javascript
import { createApp } from 'vue'
import pinia from '../pinia/src/store'
import App from '../pinia/src/Views/App.vue'

const app = createApp(App)
app.use(pinia)
app.mount('#app')
```

#### 给每一个`store`单独放一个文件

`counter.js`

```javascript
import {defineStore} from 'pinia'

const useCounter = defineStore('counter', {
    state:()=>({
        counter: 1,
    }),
})

export default useCounter
```

#### 组件中使用pinia定义的状态

```html
<template>
  <div class="app">
    <h1>{{ counterStore.counter }}</h1>
  </div>
</template>

<script setup>
import useCounter from '../store/counter'
const counterStore = useCounter()
</script>
```

#### 状态解构

`解构会让状态失去响应式`，因此不要在模板中使用解构后的数据。

如果要使用解构，需要手动将数据变为响应式

```html
<template>
  <div class="app">
    <h1>{{ counter }}</h1>
    <button @click="increment">增加</button>
  </div>
</template>

<script setup>
import useCounter from '../store/counter'
import { storeToRefs } from 'pinia';
const counterStore = useCounter()
// 手动将数据变为响应式
const {counter} = storeToRefs(counterStore)
function increment(){
    counterStore.counter++
}
</script>
```

### 操作state

#### 读写state

没有像`vuex`中复杂的流程，可以通过store实例直接修改状态

```javascript
import useCounter from '../store/counter'
import { storeToRefs } from 'pinia';
const counteStore = counteStore()
function increment(){
    counteStore.counter++
}
```
#### 重置状态

`$reset`方法可以将状态恢复到原始状态，在pinia内部缓存了初始值

```javascript
function reset(){
    counterStore.$reset()
}
```

#### 批量修改state

```javascript
import useCounter from '../store/counter'
import { storeToRefs } from 'pinia';

const counterStore = useCounter()

function changeState(){
    counterStore.$patch({
        counter:100,
    })
}
```

#### 整体替换state

```javascript
const counteStore = useCounter()
counteStore.$state = {
    name : 'flten'
}
```

### getters

getters扮演的作用相当于`computed`计算函数，对状态进行计算逻辑处理

在`getter`中使用`this`访问到整个`store`的实例

#### 基本使用

getter中访问状态可以使用`state`或者`this`(指向store实例)

定义getter
```javascript
import {defineStore} from 'pinia'

const useCounter = defineStore('counter', {
    state:()=>({
        counter: 1,
    }),
    getters:{
        doubleCounter(state){
            return state.counter * 2
            // return this.counter * 2
        }
    }
})
```

使用getter

```html
<h1>{{ counteStore.doubleCounter }}</h1>
```

#### getter中使用其他getter

```javascript
    getters:{
        doubleCounter(state){
            return state.counter * 2
        },
        doubleCounterPlus(state, payload){
            // this指向store实例
            return function(payload){
                return this.doubleCounter + payload
            }
        }
    }
```

组件中使用：

```javascript
<h1>{{ counteStore.doubleCounterPlus(10) }}</h1>
```

#### getter 中使用其他store中的状态数据

`user.js`定义的`store`
```javascript
import {defineStore} from 'pinia'

const userUse = defineStore('user', {
    state:()=>({
        user: {
            name:'fltenwall'
        },
    }),
})

export default userUse
```

在`counter.js`中使用`user`的状态数据：

```javascript
import {defineStore} from 'pinia'
import userUse  from '../store/user';

const userCounter = defineStore('counter', {
    state:()=>({
        counter: 1,
    }),
    getters:{
        showUserInfo(state){
            const useUserInfo = userUse()
            return `${useUserInfo.user.name}'s counter is ${state.counter}`
        }
    }
})
```

组件中即可直接使用

```html
<h1>{{ counterStore.showUserInfo }}</h1>
```

### action

用途：将网络请求相关的业务逻辑放在`actions`中

在`action`中可以使用`this`访问到整个`store`的实例

同样去除了vuex中的繁琐流程，可以直接在组件中调用

简单用node写一个服务端并返回数据：

```javascript
const http = require('http');

http.createServer((req, res)=>{
    // 处理跨域
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.writeHead(200);
    const data = [
        {id:111,name:'fltenwall'},
        {id:222,name:'fltenwall'}
    ]
    res.end(JSON.stringify(data));
}).listen(3000)
```

`actions`中处理网络请求逻辑：

```javascript
import {defineStore} from 'pinia'
import userUse  from '../store/user';

const userCounter = defineStore('counter', {
    state:()=>({
        userList:[],
    }),
    actions:{
        async fetchUserData(){
            const res = await fetch('http://127.0.0.1:3000/')
            const data = await res.json(res)
            this.userList = data
        }
    }
})

export default userCounter
```
在组件中调用action发起网络数据：

```html
<template>
  <div class="app">
    <ul>
        <li v-for="user in counterStore.userList">{{ user.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import useCounter from '../store/counter'

const counterStore = useCounter()
// 获取服务端数据
counterStore.fetchUserData().then(res => {
    console.log('数据已获取')
})
</script>
```


