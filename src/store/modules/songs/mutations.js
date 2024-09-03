export default {
    SET_SONGS(state, payload) {
        state.name = payload.name;
    },
    SET_CURRENT_SONG(state, payload) {
        state.currentSong = payload;
    },
    SET_CURRENT_SONG_ID(state, payload) {
        state.currentSongId = payload;
    }
};