
### 基本理解

1. Vuex 使用的是单一状态树，使用一个对象就包含了全部的应用层级状态
2. 可以在store中设置模块
3. 改变状态必须通过`mutation`

### 快速上手

创建store文件，创建store和mutations

```javascript
import {createStore} from 'vuex'

const store = createStore({
    state: ()=>({
        counter: 0
    }),
    mutations:{
        increment(state){
            state.counter++
        }
    }
})

export default store
```
注册store

```javascript
import './assets/main.css'

import { createApp } from 'vue'
import store from './store'
import App from './App.vue'

const app = createApp(App)
app.use(store)
app.mount('#app')

```
组件中使用store，必须提交`mutation`

```vue
<template>
  <div class="app">
    <h1>{{ $store.state.counter }}</h1>
    <button @click="increment">增加计数</button>
  </div>
</template>

<script setup>
import {useStore} from 'vuex'

const store = useStore()
function increment(){
  store.commit('increment')
}
</script>
```

### 将`store`中的状态映射到组件中

1. 使用`mapState`

在`options`中使用非常方便

```html
<template>
  <div class="app">
    <h1>{{ counter }}</h1>
    <h1>{{ newCounter }}</h1>
    <button @click="increament">改变计数</button>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default{
  computed:{
    ...mapState(['counter']),
    ...mapState({
      newCounter: state=> state.counter
    })
  },
  methods:{
    increament(){
      this.$store.state.counter++
    }
  }
}
</script>
```


在setup中`mapState`并不好用，因为setup中是`this`指向上下文的，所以需要手动修改函数的`this`指向

```vue
<template>
  <div class="app">
    <h1>{{ counter }}</h1>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {mapState, useStore} from 'vuex'

const {counterFn} = mapState(['counter'])
const store = useStore()
const counter = computed(counterFn.bind({$store:store}))
</script>
```
2. 在`setup`中解构store，包装响应式

```html
<template>
  <div class="app">
    <h1>{{ counter }}</h1>
  </div>
</template>

<script setup>
import {toRefs} from 'vue'
import {useStore} from 'vuex'

const store = useStore
const {counter} = toRefs(store.state)
```

### getters进行状态逻辑处理

1. 用于状态计算

```javascript
import {createStore} from 'vuex'

const store = createStore({
    state: ()=>({
        counter: 1,
        user:[
            {age:18},
            {age:15},
            {age:14},
        ]
    }),
    getters:{
        totalAges(state){
            return state.user.reduce((prev, ele)=>{
                return prev + ele.age
            }, 0)
        }
    },
})

export default store
```

组件直接使用

```javascript

<template>
  <div class="app">
    <h1>{{ $store.getters.totalAges }}</h1>
  </div>
</template>
```

2. 在getters中使用其他getters函数

`getters`提供了第二个默认参数来获取getters对象

```javascript
    getters:{
        totalAges(state){
            return state.user.reduce((prev, ele)=>{
                return prev + ele.age
            }, 0)
        },
        message(state, getters){
            return `totalAges is ${getters.totalAges}`
        }
    },
```

然后在组件中直接使用

```html
<template>
  <div class="app">
    <h1>{{ $store.getters.totalAges }}</h1>
    <h1>{{ $store.getters.message }}</h1>
  </div>
</template>
```

3. getters返回函数，根据组件传参，实现动态获取值

```javascript
const store = createStore({
    state: ()=>({
        users:[
            {id:'1',age:18},
            {id:'2',age:15},
            {id:'3',age:14},
        ]
    }),
    getters:{
        getUserInfo(state, getters){
            return function(id){
                return state.users.find(user => user.id === id)
            }
        }
    },
})
```

组件中直接使用

```html
<template>
  <div class="app">
    <h1>{{ $store.getters.getUserInfo('1') }}</h1>
  </div>
</template>
```

### getters进行映射

#### options中使用getters进行映射

```html
<template>
  <div class="app">
    <h1>{{ totalAges }}</h1>
    <h1>{{ message }}</h1>
    <h1>{{ getUserInfo('1') }}</h1>
    <button @click="increament">改变计数</button>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default{
  computed:{
    ...mapGetters(['totalAges','message','getUserInfo'])
  },
}
</script>
```

#### setup中使用getters进行映射

第一种方式：

```html
<script setup>
import { computed } from 'vue'
import {mapGetters, useStore} from 'vuex'

const store = useStore()
const {totalAges:totalAgesFn} = mapGetters(['totalAges'])
const totalAges = computed(totalAgesFn.bind({$store:store}))

const {message:messageFn} = mapGetters(['message'])
const message = computed(messageFn.bind({$store:store}))

const {getUserInfo:getUserInfoFn} = mapGetters(['getUserInfo'])
const getUserInfo = computed(getUserInfoFn.bind({$store:store}))
</script>
```

第二种方式：

```html
<script setup>
import { toRefs } from 'vue'
import {useStore} from 'vuex'

const store = useStore()
const {totalAges,message,getUserInfo} = toRefs(store.getters)
</script>
```
第三种方式：

```html
<script setup>
import { computed,toRefs } from 'vue'
import {useStore} from 'vuex'

const store = useStore()

const totalAges = computed(()=>store.getters.totalAges)
const message = computed(()=>store.getters.message)
const getUserInfo = computed(()=>store.getters.getUserInfo)
</script>
```

### Mutation

vuex中不应该手动更改状态，而必须通过提交`mutation`

定义`mutations`
```javascript
const store = createStore({
    state: ()=>({
        counter: 1,
    }),
    mutations:{
        increment(state){
            state.counter++
        },
    },
})
```

#### options中使用Mutation

```html
<script>
  export default{
      methods:{
        increment(state){
          this.$store.commit('increment')
        }
      }
  }
</script>
```

#### setup中使用Mutation

```html
<script setup>
import { useStore } from 'vuex';
const store = new useStore()
function increment(){
  store.commit('increment')
}
</script>
```

### Mutation映射到组件中使用

#### options 中使用Mutation映射

```javascript
<script>
  import { mapMutations } from 'vuex';
  export default{
      methods:{
        ...mapMutations(['increment'])
      }
  }
</script>
```

#### setup中使用Mutation映射

需要进行手动绑定，改变`this`

```html
<template>
  <div class="app">
    <h1>{{ store.state.counter }}</h1>
    <button @click="increment">改变计数</button>
  </div>
</template>
<script setup>
import { useStore,mapMutations } from 'vuex';
const store = new useStore()

const mutations = mapMutations(["increment"])
const newMutations = {}
Object.keys(mutations).forEach(key => {
  newMutations[key] = mutations[key].bind({ $store: store })
})
const { increment} = newMutations
</script>
```

### actions

#### actions和mutations的区别

1. 如何有异步操作需要在vuex中执行，应该讲异步操作放入`actions`;mutations中只能放入同步操作

 2. `actions`需要通过`commit`提交`mutation`，进而改变状态；mutaions中可以直接修改状态；
  
  在组件中使用时，对于`mutation`可以直接`commit`,但对于`actions`是`dispatch`提交`action`操作

#### actions 的基本使用(options中)

```javascript
const store = createStore({
    state: ()=>({
        counter: 1,
    }),
    mutations:{
        increment(state){
            state.counter++
        },
    },
    actions:{
        incrementAction(context){
            context.commit('increment')
        },
    },
})
```
组件中使用

```html
<script>
export default {
  methods:{
    increment(){
      this.$store.dispatch('incrementAction')
    }
  }
}
</script>
```

#### setup中使用

```html
<script setup>
import { useStore } from 'vuex';
const store = new useStore()

function incrementAction(){
  store.dispatch('incrementAction')
}

function updateInfoAction(payload){
  store.dispatch('updateInfoAction',payload)
}
</script>
```

### 映射到组件中

#### options 中使用

```javascript
    mutations:{
        increment(state){
            state.counter++
        },
        updateInfo(state,payload){
            state.info.age = payload
        }
    },
    actions:{
        incrementAction(context){
            context.commit('increment')
        },
        updateInfoAction(context, payload){
            context.commit('updateInfo',payload)
        }
    },
```
组件中使用

```html
<template>
  <div class="app">
    <h1>{{ $store.state.counter }}</h1>
    <button @click="incrementAction">改变计数</button>
    <h1>{{ $store.state.info.age }}</h1>
    <button @click="updateInfoAction(27)">改变数据</button>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  methods:{
    ...mapActions(['incrementAction', 'updateInfoAction'])
  }
}
</script>
```

#### setup 中使用

```html
<script setup>
import { useStore, mapActions } from 'vuex';
const store = new useStore()

const actions= mapActions(['incrementAction','updateInfoAction'])
const newActions = {}
Object.keys(actions).forEach((actionName)=>{
  newActions[actionName] = actions[actionName].bind({$store:store})
})
const {incrementAction,updateInfoAction } = newActions
</script>
```

### Modules

作用：给`store`划分模块，将相关的`state`，`mutations`,`actions`放到同一个模块中

### 模块的基本使用

抽离出`user`到一个单独的`store/modules/user.js`文件中：

```javascript
export default {
    state:()=>({
        info:{
            age:20
        }
    }),
    mutations:{
        updateInfo(state,payload){
            state.info.age = payload
        }
    },
    actions:{
        updateInfoAction(context, payload){
            context.commit('updateInfo',payload)
        }
    },
}
```

在store文件中引入：
```javascript
import {createStore} from 'vuex'
import userState from './modules/user'

const store = createStore({
    state: ()=>({
        counter: 1,
    }),
    modules:{
        user:userState,
    }
})

export default store
```
在组件中使用时，要在对象获取时加一层模块：

```javascript
<template>
  <div class="app">
    <h1>{{ $store.state.user.info.age }}</h1>
  </div>
</template>
```



