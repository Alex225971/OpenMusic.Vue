export default {
    player(state) {
        return state.player;
    },
    volume(state) {
        console.log("GETTERS VOLUME: " + state.volume);
        console.log("GETTERS USER VOLUME: " + localStorage.getItem('userVolume'));
        return localStorage.getItem('userVolume') || state.volume; //Get localStorage volume for users who have set it, state.volume as backup
    },
    currentSong(state) {
        return state.player.currentSong;
    },
}