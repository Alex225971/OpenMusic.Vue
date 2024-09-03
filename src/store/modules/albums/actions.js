import 'vue3-toastify/dist/index.css';
import store from 'C:/Users/duble/Documents/code/OpenMusic.Vue/src/store/index.js'

export default {
    async getAlbumsByArtist(context, data) {
        let token = store.getters['user/token'];

        const response = await fetch('https://localhost:7229/api/Albums/Artist/' + data.artistId, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        let responseData = await response.json();
        
        console.log("RESPONSE DATA:" + JSON.stringify(responseData));

        //context.commit('SET_ARTISTS', responseData);
    },

};