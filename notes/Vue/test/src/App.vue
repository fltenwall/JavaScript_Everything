<template>
  <div class="app">
    <h1>{{message}}</h1>
    <button @click="message = 'bad'">改变数据</button>
    <h1>{{info.city.name}}</h1>
    <button @click="info.city.name = '北京'">改变info数据</button>
  </div>
</template>

<script>
import { reactive, ref, watch } from 'vue'

export default{
  setup(){
    const message = ref('good')
    const info = reactive({
      name : 'fltenwall',
      city: {
        name: 'ShenZhen'
      }
    })
    watch(message, (newValue, oldValue)=>{
      console.log(newValue, oldValue)
    })
    // watch(info, (newValue, oldValue)=>{
    //   console.log(newValue, oldValue)
    // },{
    //   immediate: true
    // })
    watch(()=>({...info}), (newValue, oldValue)=>{
      console.log(newValue, oldValue)
    },{
      immediate:true,
      deep:true,
    })
    return {
      message,
      info,
    }
  }
}
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
