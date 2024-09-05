export default {
    currentAlbumId(state) {
        console.log("Getters current album ID: " + state.currentAlbumId);
        return state.currentAlbumId;
    },
    currentAlbum(state) {
        return state.currentAlbum;
    },
    getAlbums(state) {
        return state.albums;
    }
}