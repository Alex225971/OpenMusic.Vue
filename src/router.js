import { createRouter, createWebHistory } from 'vue-router';
import store from './store/index.js';
import Register from './pages/login/Register.vue';
import NotFound from './pages/NotFound.vue';
import Profile from './pages/profile/Profile.vue'
import Home from './pages/home/Home.vue';
import CreatePlaylist from './pages/playlists/CreatePlaylist.vue'
import PlaylistDetail from './pages/playlists/PlaylistDetail.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/register' },
        { path: '/home', component: Home, meta: { guarded: true } },
        { path: '/profile', component: Profile, meta: { guarded: true } },
        { path: '/register', component: Register, meta: { anonymousOnly: true } },
        { path: '/login', component: Register, meta: { anonymousOnly: true } },
        { path: '/explore', component: null, meta: { guarded: true } },
        { path: '/library', component: null, meta: { guarded: true } },
        {
            path: '/playlist', component: null, meta: { guarded: true },
            children: [{ path: 'new', name: 'user', component: CreatePlaylist }],
        },
        { path: '/playlist/:id', component: PlaylistDetail, meta: { guarded: true } },
        { path: '/artist/:id', component: null, meta: { guarded: true } },
        { path: '/search', component: null, meta: { guarded: true } },
        { path: '/:notFound(.*)', component: NotFound, meta: { guarded: true } },
    ]
});

router.beforeEach(function (to, from, next) {
    console.log("isAuthenticated: " + store.getters['user/isAuthenticated']);
        console.log("anonymous only route: " + to.meta.anonymousOnly);

    if (to.meta.guarded && !store.getters['user/isAuthenticated']) {
        next('/register');
    } else if (to.meta.anonymousOnly && store.getters['user/isAuthenticated']) {
        next('/home')
    } else {
        next();
    }
})

export default router;