export default {
    player(state) {
        return state.player;
    },
    volume(state) {
        console.log("GETTERS VOLUME: " + state.volume);
        return state.volume;
    },
    currentSong(state) {
        return state.player.currentSong;
    },
}