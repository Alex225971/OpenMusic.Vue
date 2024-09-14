import 'vue3-toastify/dist/index.css';
import store from 'C:/Users/duble/Documents/code/OpenMusic.Vue/src/store/index.js'
import playlists from '.';

export default {
    async createPlaylist(context, data) {
        var formData = new FormData();
        var renamedImage = "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
        );

        let token = store.getters['user/token'];
        const playlistData = {
            name: data.name,
            description: data.description,
            imageUrl: '',
            image: data.image
        };

        Object.keys(playlistData).forEach(key => formData.append(key, playlistData[key]));

        const response = await fetch('https://localhost:7229/api/Playlists', {
            method: 'POST',
            body: formData,
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const responseData = await response.json();

        context.commit('ADD_PLAYLIST', {
            responseData
        });

        context.commit('setCurrentPlaylistId', {
            id: responseData.id
        });
    },
    async getUserPlaylists(context, data) {
        let token = store.getters['user/token'];
        let query = '?creatorId=' + store.getters['user/userId'];

        const response = await fetch('https://localhost:7229/api/Playlists' + query, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const responseData = await response.json();
        const playlists = [];

        for (var key in responseData) {
            const playlist = {
                id: responseData[key].id,
                name: responseData[key].name,
                description: responseData[key].description,
                imageUrl: responseData[key].imageUrl
            };
            playlists.push(playlist);
        }

        context.commit('setUserPlaylists', playlists);
    },
    async loadInDetail(context, data) {
        store.getters['playlists/currentPlaylistId'];
        let token = store.getters['user/token'];

        const response = await fetch('https://localhost:7229/api/Playlists/' + data.id, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const responseData = await response.json();

        context.commit('setCurrentPlaylist', {
            ...responseData
        });
    },
    async addSongToPlaylist(context, data) {
        let token = store.getters['user/token'];
        let playlistId = data.id;
        let songId = data.songId;

        const response = await fetch('https://localhost:7229/api/Playlists/' + playlistId + '?songId=' + songId, {
            method: 'PUT',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const responseData = await response.json();
        console.log("PLAYLIST UPDATED: " + responseData);


    }

};