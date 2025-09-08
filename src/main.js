import {
    createApp
} from 'vue'
import './styles/style.css'
import App from './App.vue'
import router from './routes/index.js' // tambahkan import router

createApp(App)
    .use(router) // gunakan router
    .mount('#app')