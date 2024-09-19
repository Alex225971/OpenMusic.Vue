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
import AlbumsMenu from './pages/admin/Albums/AlbumsMenu.vue';
import ArtistsMenu from './pages/admin/Artists/ArtistsMenu.vue';
import SongsMenu from './pages/admin/Songs/SongsMenu.vue';
import SongsEdit from './pages/admin/Songs/SongsEdit.vue';
import ArtistEdit from './pages/artist/ArtistEdit.vue';
import AlbumEdit from './pages/album/AlbumEdit.vue';



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
        { path: '/search', name: 'search', component: DetailedSearch, meta: { guarded : true} },
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
        { path: '/artist/edit/:id', component: ArtistEdit, meta: { guarded: true } },
        { path: '/artist/menu', component: ArtistsMenu, meta: { guarded: true } },
        {
            path: '/album', component: null, meta: { guarded: true },
            children: [{ path: 'new', name: 'album', component: CreateAlbum }],
        },
        { path: '/album/:id', component: AlbumDetail, meta: { guarded: true } },
        { path: '/album/edit/:id', component: AlbumEdit, meta: { guarded: true } },
        { path: '/album/menu', component: AlbumsMenu, meta: { guarded: true } },
        {
            path: '/song', component: null, meta: { guarded: true },
            children: [{ path: 'new', name: 'song', component: CreateSong }],
        },
        { path: '/song/menu', component: SongsMenu, meta: { guarded: true } },
        { path: '/song/edit/:id', component: SongsEdit, meta: { guarded: true } },
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