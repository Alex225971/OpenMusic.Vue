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

        var formData = new FormData();
        let token = store.getters['user/token'];

        const playlistData = {
            name: data.title,
            bio: data.bio,
            started: data.startDate,
            ended: data.endDate
        };

        Object.keys(playlistData).forEach(key => formData.append(key, playlistData[key]));

        const response = await fetch('https://localhost:7229/api/Artists', {
            method: 'POST',
            body: formData,
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        let responseData = await response.json();
        
        console.log("RESPONSE DATA:" + JSON.stringify(responseData));
    },
    async selectArtist(context, data) {
        console.log("SELECTED ARTIST: " + data);
        context.commit('SET_CURRENT_ARTIST_ID', data);
    },
    async loadInDetail(context, data) {
        store.getters['artists/currentArtistId'];
        let token = store.getters['user/token'];

        const response = await fetch('https://localhost:7229/api/Artists/' + data.id, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const responseData = await response.json();

        console.log("RESPONSE DATA (ARTIST):" + JSON.stringify(responseData));

        context.commit('SET_CURRENT_ARTIST', {
            ...responseData
        });
    },
    async getAllArtists(context, data) {
        let token = store.getters['user/token'];

        const response = await fetch('https://localhost:7229/api/Artists/', {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const responseData = await response.json();
        console.log("RESPONSE DATA (ARTISTS):" + JSON.stringify(responseData));

        context.commit('SET_ARTISTS', responseData);

    },
    async deleteArtist(context, data) {
        let token = store.getters['user/token'];

        const response = await fetch('https://localhost:7229/api/Artists/' + data, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const responseData = await response.json();

        console.log("DELETE ARTIST:" + JSON.stringify(responseData));

        context.commit('SET_ARTIST', null);
    }

};