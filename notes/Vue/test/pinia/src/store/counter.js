import {defineStore} from 'pinia'
import userUse  from '../store/user';

const userCounter = defineStore('counter', {
    state:()=>({
        counter: 1,
        userList:[],
    }),
    getters:{
        doubleCounter(state){
            return state.counter * 2
        },
        doubleCounterPlus(state, payload){
            // this指向store实例
            return function(payload){
                return this.doubleCounter + payload
            }
        },
        showUserInfo(state){
            const useUserInfo = userUse()
            return `${useUserInfo.user.name}'s counter is ${state.counter}`
        }
    },
    actions:{
        async fetchUserData(){
            const res = await fetch('http://127.0.0.1:3000/')
            const data = await res.json(res)
            this.userList = data
        }
    }
})

export default userCounter