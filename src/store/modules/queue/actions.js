import 'vue3-toastify/dist/index.css';
import store from 'C:/Users/duble/Documents/code/OpenMusic.Vue/src/store/index.js'
import playlists from '.';

export default {
    async updateQueue(context, data) {
        context.commit('SET_QUEUE', data);
    },
    async updatePosition(context, data) {
        context.commit('SET_CURRENT_POSITION', data);
    }
};