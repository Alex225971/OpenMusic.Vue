import { createStore } from "vuex";
import userModule from './modules/users/index.js'
import playlistsModule from './modules/playlists/index.js'
import searchModule from "./modules/search/index.js";
import artistsModule from "./modules/artists/index.js";
import albumsModule from "./modules/albums/index.js";
import songsModule from "./modules/songs/index.js";
import playerModule from "./modules/player/index.js";



const store = createStore({
    modules: {
        user: userModule,
        playlists: playlistsModule,
        searchResults: searchModule,
        artists: artistsModule,
        albums: albumsModule,
        songs: songsModule,
        player: playerModule
    }
});

export default store;