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