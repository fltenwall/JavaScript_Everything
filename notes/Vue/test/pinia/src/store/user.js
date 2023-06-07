import {defineStore} from 'pinia'

const userUse = defineStore('user', {
    state:()=>({
        user: {
            name:'fltenwall'
        },
    }),
})

export default userUse