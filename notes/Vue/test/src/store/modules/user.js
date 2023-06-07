export default {
    state:()=>({
        info:{
            age:20
        }
    }),
    mutations:{
        updateInfo(state,payload){
            state.info.age = payload
        }
    },
    actions:{
        updateInfoAction(context, payload){
            context.commit('updateInfo',payload)
        }
    },
}