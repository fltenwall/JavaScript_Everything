import {createStore} from 'vuex'

const store = createStore({
    state: ()=>({
        counter: 1,
        users:[
            {id:'1',age:18},
            {id:'2',age:15},
            {id:'3',age:14},
        ]
    }),
    getters:{
        totalAges(state){
            return state.users.reduce((prev, ele)=>{
                return prev + ele.age
            }, 0)
        },
        message(state, getters){
            return `totalAges is ${getters.totalAges}`
        },
        getUserInfo(state, getters){
            return function(id){
                return state.users.find(user => user.id === id)
            }
        }
    },
    mutations:{
        increment(state){
            state.counter++
        },
    },
    modules:{

    }
})

export default store