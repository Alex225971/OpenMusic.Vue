export default {
    SET_SONGS(state, payload) {
        state.songs = payload;
    },
    SET_CURRENT_SONG(state, payload) {
        state.currentSong = payload;
    },
    SET_CURRENT_SONG_ID(state, payload) {
        state.currentSongId = payload;
    }
};