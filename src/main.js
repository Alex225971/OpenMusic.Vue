import { createApp } from 'vue';
import router from './router.js';
import store from './store/index.js';
import VueUploadComponent from 'vue-upload-component'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'
import '../node_modules/flowbite-vue/dist/index.css'


import App from './App.vue';

const app = createApp(App);
app.use(router);
app.use(store);
app.component('file-upload', VueUploadComponent)

app.mount('#app');