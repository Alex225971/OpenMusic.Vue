import { createApp } from 'vue';
import router from './router.js';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from './App.vue';

const app = createApp(App);
app.use(router);

app.mount('#app');