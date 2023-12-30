import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import TextField from "./components/form_components/TextField.vue";
import SelectBox from "./components/form_components/SelectBox.vue";
import RadioBox from "./components/form_components/RadioBox.vue";
import AddressBox from './components/form_components/AddressBox.vue';
import router from './router';

const app = createApp(App)
app.component('TextField', TextField);
app.component('SelectBox', SelectBox);
app.component('RadioBox', RadioBox);
app.component('AddressBox', AddressBox);
app.use(router);

app.mount('#app')
