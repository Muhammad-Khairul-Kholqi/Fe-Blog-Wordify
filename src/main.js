import {
    createApp
} from 'vue'
import './styles/style.css'
import App from './App.vue'
import router from './routes/index.js'
import {
    MotionPlugin
} from '@vueuse/motion'

const app = createApp(App)

app.use(router)
app.use(MotionPlugin)
app.mount('#app')