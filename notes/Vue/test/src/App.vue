<template>
  <div class="app">
    <h1>{{ store.state.counter }}</h1>
    <button @click="increment">改变计数</button>
  </div>
</template>
<!-- <script>
import {mapGetters} from 'vuex'
export default{
  computed:{
    ...mapGetters(['totalAges','message','getUserInfo'])
  },
  methods:{
    increament(){
      this.$store.state.counter++
    }
  }
}
</script> -->
<!-- <script>
  import { mapMutations } from 'vuex';
  export default{
      methods:{
        ...mapMutations(['increment'])
      }
  }
</script> -->
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