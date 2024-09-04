export default {
    currentArtistId(state) {
        console.log("Getters current artist ID: " + state.currentArtistId);
        return state.currentArtistId;
    },
    currentArtist(state) {
        return state.currentArtist;
    },
    getArtists(state) {
        return state.artists;
    }
}