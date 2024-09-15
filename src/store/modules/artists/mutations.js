export default {
    SET_ARTISTS(state, payload) {
        state.artists = payload;
    },
    SET_CURRENT_ARTIST(state, payload) {
        state.currentArtist = payload;
    },
    SET_CURRENT_ARTIST_ID(state, payload) {
        state.currentArtistId = payload;
    }
};