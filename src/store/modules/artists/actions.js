import 'vue3-toastify/dist/index.css';
import store from 'C:/Users/duble/Documents/code/OpenMusic.Vue/src/store/index.js'
import playlists from '.';

export default {
    async getArtists(context, data) {
        let token = store.getters['user/token'];

        const response = await fetch('https://localhost:7229/api/Artists', {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        let responseData = await response.json();
        
        console.log("RESPONSE DATA:" + JSON.stringify(responseData));

        context.commit('SET_ARTISTS', responseData);
    },
    async createArtist(context, data) {
        console.log("artist created: " + JSON.stringify(data));
    }

};