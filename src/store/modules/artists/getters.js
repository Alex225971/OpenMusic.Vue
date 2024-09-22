export default {
    currentArtistId(state) {
        console.log("Getters current artist ID: " + state.currentArtistId);
        return state.currentArtistId;
    },
    currentArtist(state) {
        console.log("Getter artist " + JSON.stringify(state.currentArtist));
        return state.currentArtist;
    },
    getArtists(state) {
        console.log("Getter triggered " + JSON.stringify(state.artists));
        return state.artists;
    }
}