import { createApp } from 'vue';
import router from './router.js';
import store from './store/index.js';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

import App from './App.vue';

const app = createApp(App);
app.use(router);
app.use(store);

app.mount('#app');