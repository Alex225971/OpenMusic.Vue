import { createRouter, createWebHistory } from 'vue-router';
import Login from './pages/login/Login.vue';
import Register from './pages/login/Register.vue';
import NotFound from './pages/NotFound.vue';
import Home from './pages/home/Home.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/register' },
        { path: '/home', component: Home },
        { path: '/register', component: Register },
        { path: '/login', component: Login },
        { path: '/explore', component: null },
        { path: '/library', component: null },
        { path: '/playlist/:id', component: null },
        { path: '/artist/:id', component: null },
        { path: '/search', component: null },
        { path: '/:notFound(.*)', component: NotFound },
    ]
});

export default router;