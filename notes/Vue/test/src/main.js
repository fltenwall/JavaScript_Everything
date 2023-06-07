import './assets/main.css'

import { createApp } from 'vue'
// import router from './router'
// import store from './store'
import pinia from '../pinia/src/store'
// import App from './App.vue'
import App from '../pinia/src/Views/App.vue'

const app = createApp(App)
app.use(pinia)
// app.use(router)
// app.use(store)
app.mount('#app')
