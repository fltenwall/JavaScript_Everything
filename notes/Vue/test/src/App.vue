<template>
  <div class="app">
    <h1>{{ $store.state.counter }}</h1>
    <button @click="incrementAction">改变计数</button>
    <h1>{{ $store.state.user.info.age }}</h1>
    <button @click="updateInfoAction(27)">改变数据</button>
  </div>
</template>
<!-- <script>
import { mapActions } from 'vuex';
export default {
  methods:{
    ...mapActions(['incrementAction', 'updateInfoAction'])
  }
}
</script> -->
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