import 'vue3-toastify/dist/index.css';
import store from '../../index.js'
import router from '../../../router';
import { toast } from 'vue3-toastify';

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

        const response = await fetch(process.env.VUE_APP_BASE_API_URL + 'Playlists', {
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

        const response = await fetch(process.env.VUE_APP_BASE_API_URL + 'Playlists' + query, {
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

        const response = await fetch(process.env.VUE_APP_BASE_API_URL + 'Playlists/' + data.id, {
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

        const response = await fetch(process.env.VUE_APP_BASE_API_URL + 'Playlists/' + playlistId + '?songId=' + songId, {
            method: 'PUT',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const responseData = await response.json();

    },
    async deletePlaylist(context, data) {
        let token = store.getters['user/token'];

        const response = await fetch(process.env.VUE_APP_BASE_API_URL + 'Playlists/' + data, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (response.status > 199 && response.status < 300) {
            store.dispatch('playlists/getUserPlaylists'); //Update the store to "get rid" of the deleted playlist
            router.push('/home');
            toast.success(`Playlist with ID "${data}" deleted`, {
                autoClose: 2000,
            });
        } else {
            toast.error(`Playlist could not be deleted, something went wrong`, {
                autoClose: 2000,
            });
        }


    }

};