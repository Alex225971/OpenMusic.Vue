import 'vue3-toastify/dist/index.css';

export default {
    setPlayerState(context, data) {
        context.commit("SET_PLAYER_STATE", data.volume);
    },
    setVolume(context, volume) {
        context.commit("SET_PLAYER_VOLUME", volume);
        localStorage.setItem('userVolume', volume);
    }
};