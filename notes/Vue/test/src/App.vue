<template>
  <div class="app">
    <Info :name="name" :age="age" ref="infoRef"></Info>
    <router-view></router-view>
    <div class="nav">
      <!-- 路由链接 -->
      <router-link to="home">首页</router-link>
      <router-link to="about">关于</router-link>
      <span @click="clickUser">我的</span>
      <button @click="back">返回</button>
    </div>
  </div>
</template>

<script setup>
import Info from './components/Info.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('flten1')
const age = ref(17)

const infoRef = ref()
onMounted(()=>{
  infoRef.value.childFn()
  console.log(infoRef.value.info)
})

const router = useRouter()
function clickUser(){
  router.push({
    path:'/about',
    query:{
      name:'flten',
      age:18,
    }
  })
}

function back(){
    router.back()
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
