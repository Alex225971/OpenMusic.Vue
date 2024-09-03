export default {
    currentAlbumId(state) {
        return state.currentArtistId;
    },
    currentAlbum(state) {
        return state.currentArtist;
    },
    getAlbums(state) {
        return state.artists;
    }
}