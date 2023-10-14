import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import './assets/style.css'


import App from './App.vue'
import router from './router'

const app = createApp(App)

const options = {
    // You can set your default options here
};

app.use(Toast, options);
app.use(createPinia())
app.use(router)

app.mount('#app')
