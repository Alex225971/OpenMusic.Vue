export default {
    player(state) {
        return state.player;
    },
    volume(state) {
        return localStorage.getItem('userVolume') || state.volume; //Get localStorage volume for users who have set it, state.volume as backup
    },
    currentSong(state) {
        return state.player.currentSong;
    },
}