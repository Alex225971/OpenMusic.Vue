import 'vue3-toastify/dist/index.css';
import store from 'C:/Users/duble/Documents/code/OpenMusic.Vue/src/store/index.js'

export default {
    async createAlbum(context, data) {
        var formData = new FormData();
        let token = store.getters['user/token'];

        const playlistData = {
            title: data.title,
            year: data.year,
            image: data.image,
            artistId: store.getters['artists/currentArtistId'] || '',
            genres: [],
            songs: []
        };

        Object.keys(playlistData).forEach(key => formData.append(key, playlistData[key]));

        const response = await fetch('https://localhost:7229/api/Albums', {
            method: 'POST',
            body: formData,
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        let responseData = await response.json();
        
        console.log("RESPONSE DATA:" + JSON.stringify(responseData));

        //context.commit('SET_ALBUMS', responseData);
    },
    async getAlbumsByArtist(context, data) {
        let token = store.getters['user/token'];

        console.log("ARTIST ID: " + data);
        
        const response = await fetch('https://localhost:7229/api/Albums/Artist/' + data, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        let responseData = await response.json();
        
        console.log("RESPONSE DATA:" + JSON.stringify(responseData));

        context.commit('SET_ALBUMS', responseData);
    },
    async loadInDetail(context, data) {
        store.getters['albums/currentAlbumId'];
        let token = store.getters['user/token'];

        const response = await fetch('https://localhost:7229/api/Albums/' + data.id, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const responseData = await response.json();

        console.log("RESPONSE DATA:" + JSON.stringify(responseData));

        context.commit('SET_CURRENT_ALBUM', {
            ...responseData
        });
    },
    async selectAlbum(context, data) {
        context.commit('SET_CURRENT_ALBUM_ID', data);
    },
    async getAllAlbums(context, data) {
        let token = store.getters['user/token'];

        const response = await fetch('https://localhost:7229/api/Albums/', {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const responseData = await response.json();

        console.log("ALL ALBUMS:" + JSON.stringify(responseData));

        context.commit('SET_ALBUMS', responseData);
    },
    async deleteAlbum(context, data) {
        let token = store.getters['user/token'];

        const response = await fetch('https://localhost:7229/api/Albums/' + data, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const responseData = await response.json();

        console.log("DELETE ALBUM:" + JSON.stringify(responseData));

        context.commit('SET_ALBUM', null);
    }

};