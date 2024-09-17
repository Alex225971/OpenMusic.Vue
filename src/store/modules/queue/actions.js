import 'vue3-toastify/dist/index.css';
import store from 'C:/Users/duble/Documents/code/OpenMusic.Vue/src/store/index.js'
import playlists from '.';

export default {
    async updateQueue(context, data) {
        context.commit('SET_QUEUE', data);
    },
    async updatePosition(context, data) {
        context.commit('SET_CURRENT_POSITION', data);
    },
    async shuffleQueue(context) {
        console.log("SHUFFLING BEGINS");
        var queueToShuffle = store.getters['queue/currentQueue'];

        console.log("QUEUE TO SHUFFLE: " + JSON.stringify(queueToShuffle));
        let currentIndex = queueToShuffle.length;

        console.log("SHUFFLING QUEUE: " + JSON.stringify(queueToShuffle))

        // While there remain elements to shuffle...
        while (currentIndex != 0) {
            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [queueToShuffle[currentIndex], queueToShuffle[randomIndex]] = [
            queueToShuffle[randomIndex], queueToShuffle[currentIndex]];
        }
        
        console.log("QUEUE AFTER SHUFFLE: " + JSON.stringify(queueToShuffle));

        context.commit('SET_CURRENT_POSITION', 0);
    }
};