import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import store from './store'
import 'element-plus/dist/index.css'
import installSvgIcon from "@/components/svgIcon"

const app = createApp(App)
app.use(router).use(store);

installSvgIcon(app)

app.mount('#app')
