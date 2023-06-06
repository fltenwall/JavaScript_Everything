<template>
  <div class="user">
    <h1>{{ $route.params }}</h1>
    
  </div>
</template>

<script setup>
import {onBeforeRouteUpdate, useRoute} from 'vue-router'

// 第一次获取
const route = useRoute()
console.log(route.params.id)

// 路由跳转改变后获取
onBeforeRouteUpdate((to, from)=>{
    console.log(to.params.id)
    console.log(from.params.id)
})


</script>

<style>

</style>