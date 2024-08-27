import { createStore } from "vuex";
import userModule from './modules/users/index.js'
import playlistsModule from './modules/playlists/index.js'

const store = createStore({
    modules: {
        user: userModule,
        playlists: playlistsModule
    }
});

export default store;