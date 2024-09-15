export default {
    SET_PLAYER_STATE(state, payload) {
        state.player.currentSong = payload.song;
    },
    SET_PLAYER_VOLUME(state, payload) {
        state.volume = payload;
    }
};