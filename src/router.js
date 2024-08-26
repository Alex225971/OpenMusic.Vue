import { createRouter, createWebHistory } from 'vue-router';
import Register from './pages/login/Register.vue';
import NotFound from './pages/NotFound.vue';
import Profile from './pages/profile/Profile.vue'
import Home from './pages/home/Home.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/register' },
        { path: '/home', component: Home },
        { path: '/profile', component: Profile },
        { path: '/register', component: Register },
        { path: '/login', component: Register },
        { path: '/explore', component: null },
        { path: '/library', component: null },
        { path: '/playlist/:id', component: null },
        { path: '/artist/:id', component: null },
        { path: '/search', component: null },
        { path: '/:notFound(.*)', component: NotFound },
    ]
});

export default router;