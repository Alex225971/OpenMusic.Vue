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
        
        //context.commit('SET_SEARCH_RESULTS', responseData);
    },
    async createSong(context, data) {

        var formData = new FormData();
        let token = store.getters['user/token'];

        const playlistData = {
            title: data.title,
            releaseDate: data.releaseDate,
            SongUrl : '1',
            songFile: data.songFile,
            artistId: store.getters['artists/currentArtistId'] || '',
            albumId: store.getters['albums/currentAlbumId'] || '',
            genres: []
        };

        Object.keys(playlistData).forEach(key => formData.append(key, playlistData[key]));

        const response = await fetch('https://localhost:7229/api/Songs', {
            method: 'POST',
            body: formData,
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        var responseData = await response.json();
        
    },
    async getAllSongs(context, data) {
        let token = store.getters['user/token'];

        const response = await fetch('https://localhost:7229/api/Songs/', {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const responseData = await response.json();

        context.commit('SET_SONGS', responseData);
    },
    async deleteSong(context, data) {
        let token = store.getters['user/token'];

        const response = await fetch('https://localhost:7229/api/Songs/' + data, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const responseData = await response.json();

        context.commit('SET_SONG', null);
    }

};