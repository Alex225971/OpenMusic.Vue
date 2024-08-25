import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', redirect: '/register' },
        { path: '/register', component: null },
        { path: '/login', component: null },
        { path: '/explore', component: null },
        { path: '/library', component: null },
        { path: '/playlist/:id', component: null },
        { path: '/artist/:id', component: null },
        { path: '/search', component: null },
        { path: '/:notFound(.*)', component: null },
    ]
});

export default router;