export default {
    SET_ARTISTS(state, payload) {
        state.artists = payload;
    },
    SET_ARTISTS_FOR_SELECT(state, payload) {
        state.artistsForSelect = payload;
    },
    SET_CURRENT_ARTIST(state, payload) {
        state.currentArtist = payload;
    },
    SET_CURRENT_ARTIST_ID(state, payload) {
        console.log("SET_CURRENT_ARTIST_ID: " + JSON.stringify(payload))
        state.currentArtistId = payload;
    }
};