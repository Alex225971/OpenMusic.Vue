import { createStore } from "vuex";
import userModule from './modules/users/index.js'
import playlistsModule from './modules/playlists/index.js'
import searchModule from "./modules/search/index.js";

const store = createStore({
    modules: {
        user: userModule,
        playlists: playlistsModule,
        search: searchModule
    }
});

export default store;