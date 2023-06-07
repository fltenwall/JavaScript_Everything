<template>
  <div class="app">
    <h1>{{ counter }}</h1>
    <h1>{{ counterStore.doubleCounter }}</h1>
    <h1>{{ counterStore.doubleCounterPlus(10) }}</h1>
    <h1>{{ counterStore.showUserInfo }}</h1>
    <button @click="increment">增加</button>
    <button @click="incrementAction(1)">action增加</button>
    <button @click="reset">重置</button>
    <button @click="changeState">批量修改数据</button>
    <ul>
        <template v-for="user in counterStore.userList">
            <li>{{ user.name }}</li>
        </template>
    </ul>
  </div>
</template>

<script setup>
import useCounter from '../store/counter'
import { storeToRefs } from 'pinia';

const counterStore = useCounter()
// 获取服务端数据
counterStore.fetchUserData().then(res => {
    console.log('数据已获取')
})

const {counter} = storeToRefs(counterStore)

function increment(){
    counterStore.counter++
}
function reset(){
    counterStore.reset()
}
function changeState(){
    counterStore.$patch({
        counter:100,
    })
}
function replaceState(){
    counterStore.$state = {
        name : 'flten'
    }
}
</script>

<style>

</style>