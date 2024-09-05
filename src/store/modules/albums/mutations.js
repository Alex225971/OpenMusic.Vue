export default {
    SET_ALBUMS(state, payload) {
        state.albums = payload;
    },
    SET_CURRENT_ALBUM(state, payload) {
        state.currentAlbum = payload;
    },
    SET_CURRENT_ALBUM_ID(state, payload) {
        console.log("Current album ID: " + payload);
        state.currentAlbumId = payload;
    }
};