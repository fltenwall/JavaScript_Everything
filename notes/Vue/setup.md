
#### options api的弊端

代码结构分散，对同一个数据的不同操作分散到了不同的options选项中。

####  composition api的优势

对同一个数据的操作在同一个函数中完成。


#### 开启使用setup

`setup()`

`<script setup><script>`

参数：

`props`：父组件传递过来的属性

`context`：

返回值：

1. 可以在`template`模板中使用
2. 通过`setup`函数返回值替代`data`

注意：

`setup`里的数据不是默认响应式的，需要引入响应式函数对目标数据进行包裹

#### 将数据包装为响应式数据的两种方式

1. `ref`函数，主要对简单类型数据进行包裹，也可以处理复杂类型数据。需要通过`ref.value`获取到数据，但是在`template`下不需要，会进行自动解包。

```javascript
<template>
  <div class="app">
    <h2>{{ info.age }}</h2>
  </div>
</template>

<script>
  import {ref} from 'vue'
  export default{
    setup(){
      let info = ref({'age':18})
      return {
        info
      }
    }
}
```

2. 引入`reactive`函数，将复杂类型的数据包装为响应式数据

使用`ref`和`reactive`处理数据之后，数据再次使用就会进行依赖收集，数据改变时所有收集的依赖都是对应进行对应的响应式操作。

`const state = reactive({...})`

#### 简单的实例：计数器的实现

```javascript
<template>
  <div class="app">
    <!-- template中的数据会自动解包 -->
    <h2>计数器{{ counter }}</h2>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
  </div>
</template>

<script>
  import {ref} from 'vue'
  export default{
    setup(){
      // 默认定义的数据不是响应式数据，需要用 ref 包裹
      let counter = ref(10)
      const increment = ()=>{
        counter.value++
      }
      const decrement = ()=>{
        counter.value--
      }
      return {
        counter,
        increment,
        decrement,
      }
    }

  }
</script>
```

抽离为单独的`hook`

hooks/useCounter.js

```javascript
import {ref} from 'vue'
export default function useCounter(){
    let counter = ref(10)
    const increment = ()=>{
      counter.value++
    }
    const decrement = ()=>{
      counter.value--
    }
    return {
      counter,
      increment,
      decrement,
    }
}
```

在`App.vue`中引入：

```javascript
  import useCounter from './hooks/useCounter'
  export default{
    setup(){
      const {counter,increment,decrement} = useCounter()
      return{
        counter,
        increment,
        decrement,
      }
    }
```

或者还可以更简单：

```javascript
  import useCounter from './hooks/useCounter'
  export default{
    setup(){
      return {
        ...useCounter()
      }
    }
```

#### 单向数据流

单向数据流：由于组件传值是引用传值，所以子组件可以改变父组件的数据，从而影响其他同样使用了父组件数据的其他子组件。如果想要更改父组件数据，应该由子组件将改变数据的事情发送给父组件，让父组件去改变数据。

<!-- 父组件 -->
```javascript
<template>
  <div class="app">
    <info :info="info" @changeInfoAge="changeInfoAge"></info>
  </div>
</template>

<script>
import { reactive } from 'vue';
import Info from './components/Info.vue'

export default{
  components:{
    Info
  },
  setup(){
    const info = reactive({
      name:"flten",
      age:20,
      job:"worker",
    })
    const changeInfoAge = (payload)=>{
      info.age = payload
    }
    return {
      info,
      changeInfoAge,
    }
  }

}
</script>
```

<!-- 子组件 -->

```javascript
<template>
    <div>
        <h1>{{ info.age }}</h1>
        <button @click="changeInfo">改变按钮</button>
    </div>
</template>
<script>
export default {
    props:{
        info:{
            type: Object,
            default:()=>({})
        }
    },
    emits:['changeInfoAge'],
    setup(props, context){
        const changeInfo = ()=>{
            context.emit('changeInfoAge', 25)
        }
        return {
            changeInfo
        }
    }
}
</script>
```

#### ref 和 reactive 的使用选择

1. 一般都使用`ref`，简单类型和复杂类型都可以处理；定义从服务器中获取的数据一般也使用`ref`，获取数据会更方便，因为可以将服务器中的数据赋给`ref`响应式数据的`.value`属性
2. `reactive`一般应用于自己定义的聚合数据(多个数据之间有关联),比如收集表单数据

#### readonly

通过`readonly`可以从语法上避免违反单向数据流的原则

`readonly`包裹后返回的数据也是响应式数据，但是不允许对数据进行修改。

注意：`readonly`处理过的原对象是可以更改的。

1. 比如`const info = readonly(obj)`，`readonly`处理后得到的只读对象`info`是不可更改的，但如果源对象`obj`被修改了，那么`readonly`返回的`info`对象也会被修改。
2. 实际情况下，多对`reactive`返回的数据再用`readonly`进行包装。如果是对`reactive`包裹后的数据`A`进行了包装，得到了只读数据`B`，`B`不可被更改。但如果改变可变数据`A`，也会影响只读数据`B`

原理：`readonly`会返回原始对象的只读代理，是对一个`proxy`的`set`方法进行了劫持，保证其不被更改。

#### 进行判断的 API

`isProxy`：判断是否由`reactive`或`readonly`创建的`proxy`

`isReactive`：判断是否由`reactive`创建的`proxy`；即便是由`readonly`包裹了的`reactive`返回的另一个`proxy`，仍然判断为`true`

```javascript
    const info = reactive({
      name:"flten",
      age:20,
      job:"worker",
    })
    const readonlyInfo = readonly(info)
    console.log(isReactive(readonlyInfo)) //true
```

`isReadonly`：判断对象是否由readonly 创建的只读proxy

`toRaw`：返回由`reactive`或`readonly`代理的`原始对象`

`shalloReactive`：不进行深层响应式转化，深层嵌套属性不被代理

`shalloReadonly`：不进行深层只读转化，深层嵌套属性仍然可读可写

#### 保证解构后的数据仍然是响应式`toRefs`

需求：在`setup`中，对`reactive`返回的响应式对象进行解构后，得到的数据不再是响应式数据。

```javascript
const info = reactive({
    name:"flten",
    age:20,
    job:"worker",
})

const {name ,age, job} = info
```

1. 使用`toRefs`可以做到解构后得到的每一个数据都用`ref`进行包装后再返回，保证解构后还是响应式。

2. 如果只想对单个属性进行结构并用`ref`进行包装，则可以使用`toRef`

```javascript
<template>
  <div class="app">
    <h1>{{ name }}, {{ age }},{{ job }}</h1>
    <button @click="changeInfo">改变数据</button>
  </div>
</template>

<script>
import { reactive, toRefs, toRef } from 'vue';

export default{
  setup(){
    const info = reactive({
      name:"flten",
      age:20,
      job:"worker",
    })

    const {name ,age} = toRefs(info)
    const job = toRef(info, 'job')
     
    const changeInfo = ()=>{
      info.name = 'wall'
      info.job = 'leader'
    }
    return {
      name,
      age,
      job,
      changeInfo,
    }
  }

}
</script>
```

#### ref的其他相关 API

`isRef`：判断值是否是一个`Ref`对象

`unref`:如果参数是一个`ref`则直接返回`ref`的值，相当于`ref.value`，否则返回参数本身。在不确定接收到的参数是不是`ref`对象的情况下可以使用，相当于`const val = isRef(obj) ? obj.value : value`

`shallowRef`：创建一个浅层的 Ref 对象，即深层属性不是响应式。

`triggerRef`：手动触发更新，想要对`shallowRef`创建的浅层Ref 对象的某个深层嵌套属性进行响应式操作时，可以进行手动触发更新。

```javascript
// 创建浅层 ref 对象
const info = shallowRef({age:20})
const changeInfo = ()=>{
    // age不是响应式数据
    info.value.age = 18
    // 手动触发更新
    triggerRef(info)
}
```

#### setup中使用computed

注意📢：`computed`的返回值是一个`ref`对象

```javascript
import { reactive, computed } from 'vue';

export default{
  setup(){
    const info = reactive({
      name:"flten",
      age:20,
      job:"worker",
    })
    const fullInfo = computed(()=>{
      return `${info.name} is ${info.age} years old`
    })
    return {
      fullInfo
    }
  }
```

computed中的 get 和 set 使用示例

```javascript
<template>
  <div class="app">
    <h1>{{ fullInfo }}</h1>
    <button @click="setFullInfo">修改值</button>
  </div>
</template>

<script>
import { reactive, computed } from 'vue';

export default{
  setup(){
    const info = reactive({
      name:"flten",
      age:20,
      job:"worker",
    })
    const fullInfo = computed({
      get: ()=>{
        return `${info.name} is ${info.age} years old`
      },
      set: (newValue)=>{
        info.name = newValue
      }
    })
    const setFullInfo = () => {
      fullInfo.value = 'fltenwall'
    }
    return {
      fullInfo,
      setFullInfo,
    }
  }
}
</script>
```

#### setup 中获取元素对象

1. 使用`ref`对象绑定到元素的`ref`属性上
2. 在生命周期函数`onMounted`获取到元素对象

```javascript
<template>
  <div class="app">
    <h1 ref="h1Ref">Hello</h1>
    <button ref="btnRef">修改值</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default{
  setup(){
    const h1Ref = ref()
    const btnRef = ref()
    onMounted(()=>{
      console.log(h1Ref.value)
      console.log(btnRef.value)
    })
    return {
      h1Ref,
      btnRef,
    }
  }
}
</script>
```

#### 在setup中获取组件元素对象

子组件 Info.Vue
```javascript
<template>
    <div>
        <h1>This is Info.</h1>
    </div>
</template>
<script>
export default {
    setup(){
        return {

        }
    }
}
</script>
```

父组件

```javascript
<template>
  <div class="app">
    <Info ref="infoRef"></Info>
  </div>
</template>

<script>
import Info from './components/Info.vue';
import { ref, onMounted } from 'vue';

export default{
  components:{
    Info,
  },
  setup(){
    const infoRef = ref()
    onMounted(()=>{
      console.log(infoRef.value)
    })
    return {
      infoRef
    }
  }
}
</script>
```

#### 在setup中使用声明周期函数

用法：`onName`

注意：没有`created`和`beforeCreated`对应的`onCreated`和`onBeforeCreated`。原本在`created`和`beforeCreated`进行的操作可以在`setup`中执行。

```javascript
import { onBeforeMount, onMounted } from 'vue';

export default{
  setup(){
    onBeforeMount(()=>{})
    onMounted(()=>{})
    return {
      onBeforeMount,
      onMounted,
    }
  }
}
```

也可以注册多个同名生命周期函数，并会依次执行

```javascript
    onMounted(()=>{})
    onMounted(()=>{})
    onMounted(()=>{})
```

#### setup中使用`provide`和 `inject`

用途：组件间的数据共享，父子组件、非父子组件。

`provide`提供数据，`inject`注入数据

父组件

```javascript
<template>
  <div class="app">
    <Info></Info>
    <button @click="changeName">改变数据</button>
  </div>
</template>

<script>
import Info from './components/Info.vue';
import { provide, ref } from 'vue';

export default{
  components:{
    Info
  },
  setup(){
    const name = ref('fltenwall')
    provide('name', name)
    const changeName = ()=>{
      name.value = 'flten'
    }
    return {
      name,
      changeName,
    }
  }
}
</script>
```

子组件

```javascript
<template>
    <div>
        <h1>This is {{name}}.</h1>
    </div>
</template>
<script>
import { inject } from 'vue'
export default {
    setup(){
        // 第二个参数为默认值
        const name = inject('name', 'fltenwal')
        return {
            name
        }
    }
}
</script>
```
#### setup中使用watch监听函数

1. 如果监听的是`reactive`数据，默认深度监听

```javascript
const info = reactive({
    name : 'fltenwall',
    city: {
    name: 'ShenZhen'
    }
})
watch(info, (newValue, oldValue)=>{
    console.log(newValue, oldValue)
},{
    immediate: true
})
```

但如果监听获取到的是普通对象，则需要手动开启深度监听。

```javascript
    const message = ref('good')
const info = reactive({
    city: {
    name: 'ShenZhen'
    }
})
watch(()=>({...info}), (newValue, oldValue)=>{
    console.log(newValue, oldValue)
},{
    immediate:true,
    deep:true,
})
```

同时监听多个数据：

```javascript
    const name = ref('flten')
    const age = ref(20)
    watch([name ,age], (newValue, oldValue)=>{
      console.log(newValue, oldValue)
    })
```



