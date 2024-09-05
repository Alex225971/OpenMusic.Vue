import { createRouter, createWebHistory } from 'vue-router';
import store from './store/index.js';
import Register from './pages/login/Register.vue';
import NotFound from './pages/NotFound.vue';
import Profile from './pages/profile/Profile.vue'
import Home from './pages/home/Home.vue';
import CreatePlaylist from './pages/playlists/CreatePlaylist.vue'
import PlaylistDetail from './pages/playlists/PlaylistDetail.vue';
import Library from './pages/library/Library.vue';
import DetailedSearch from './pages/searchResults/DetailedSearchResults.vue'
import CreateArtist from './pages/admin/CreateArtist.vue';
import CreateAlbum from './pages/admin/CreateAlbum.vue';
import CreateSong from './pages/admin/CreateSong.vue';
import AlbumDetail from './pages/album/AlbumDetail.vue';
import ArtistDetail from './pages/artist/ArtistDetail.vue';



const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/register' },
        { path: '/home', component: Home, meta: { guarded: true } },
        { path: '/profile', component: Profile, meta: { guarded: true } },
        { path: '/register', component: Register, meta: { anonymousOnly: true } },
        { path: '/login', component: Register, meta: { anonymousOnly: true } },
        { path: '/explore', component: null, meta: { guarded: true } },
        { path: '/library', component: Library, meta: { guarded: true } },
        { path: '/search?queryString=:queryString', name: 'search', component: DetailedSearch, meta: { guarded : true} },
        {
            path: '/playlist', component: null, meta: { guarded: true },
            children: [{ path: 'new', name: 'playlist', component: CreatePlaylist }],
        },
        { path: '/playlist/:id', component: PlaylistDetail, meta: { guarded: true } },
        {
            path: '/artist', component: null, meta: { guarded: true },
            children: [{ path: 'new', name: 'artist', component: CreateArtist }],
        },
        { path: '/artist/:id', component: ArtistDetail, meta: { guarded: true } },
        {
            path: '/album', component: null, meta: { guarded: true },
            children: [{ path: 'new', name: 'album', component: CreateAlbum }],
        },
        { path: '/album/:id', component: AlbumDetail, meta: { guarded: true } },
        {
            path: '/song', component: null, meta: { guarded: true },
            children: [{ path: 'new', name: 'song', component: CreateSong }],
        },
        { path: '/:notFound(.*)', component: NotFound, meta: { guarded: true } },
    ]
});

router.beforeEach(function (to, from, next) {

    if (to.meta.guarded && !store.getters['user/isAuthenticated']) {
        next('/register');
    } else if (to.meta.anonymousOnly && store.getters['user/isAuthenticated']) {
        next('/home')
    } else {
        next();
    }
})

export default router;