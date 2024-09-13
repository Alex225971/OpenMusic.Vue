import 'vue3-toastify/dist/index.css';

export default {
    setPlayerState(context, data) {
        console.log("CURRENT PLAYER STATE: " + JSON.stringify(data));
        context.commit("SET_PLAYER_STATE", data.volume);
    },
    setVolume(context, volume) {
        context.commit("SET_PLAYER_VOLUME", volume);
    }
};