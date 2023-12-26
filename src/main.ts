import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import TextField from "./components/form_components/TextField.vue";
import Selectbox from "./components/form_components/Selectbox.vue";

const app = createApp(App)
app.component('text-field', TextField);
app.component('selectbox', Selectbox);
app.use(router)

app.mount('#app')
