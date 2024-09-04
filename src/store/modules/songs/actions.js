import 'vue3-toastify/dist/index.css';
import store from 'C:/Users/duble/Documents/code/OpenMusic.Vue/src/store/index.js'
import playlists from '.';

export default {
    async getSongs(context, data) {
        let token = data.token;

        const response = await fetch('https://localhost:7229/api/Songs', {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        let responseData = await response.json();
        
        console.log("RESPONSE DATA:" + JSON.stringify(responseData));

        //context.commit('SET_SEARCH_RESULTS', responseData);
    },
    async createSongs(context, data) {
        console.log("song created: " + JSON.stringify(data));
    }

};