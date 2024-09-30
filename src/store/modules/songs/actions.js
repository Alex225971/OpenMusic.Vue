import 'vue3-toastify/dist/index.css';
import store from 'C:/Users/duble/Documents/code/OpenMusic.Vue/src/store/index.js'
import playlists from '.';
import { toast } from 'vue3-toastify';
import router from '../../../router';

export default {
    async getSongs(context, data) {
        let token = store.getters['user/token'];

        const response = await fetch('https://localhost:7229/api/Songs', {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        let responseData = await response.json();
        
        context.commit('SET_SONGS', responseData);
    },
    async loadInDetail(context, data) {
        store.getters['songs/currentSong'];
        let token = store.getters['user/token'];

        const response = await fetch('https://localhost:7229/api/Songs/' + data.id, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const responseData = await response.json();

        context.commit('SET_CURRENT_SONG', {
            ...responseData
        });
        console.log("SETTING ID: " + JSON.stringify(data))
        context.commit('artists/SET_CURRENT_ARTIST_ID', responseData.artistId, { root: true });
        context.commit('albums/SET_CURRENT_ALBUM_ID', responseData.albumId, { root: true });
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

        if (response.status > 199 && response.status < 300) {
            toast.success(`Song "${data.name}" created`, {
                autoClose: 2000,
            });
            router.push('/song/menu')
        } else {
            toast.error(`Song could not be created, something went wrong`, {
                autoClose: 2000,
            });
        }
        
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
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json-patch+json"
            }
        });

        if (response.status > 199 && response.status < 300) {
            toast.success(`Song with ID "${data}" deleted`, {
                autoClose: 2000,
            });
            console.log("SONG DELETING SUCCESSFUL")
            store.dispatch('songs/getSongs'); //Update the store to "get rid" of the deleted song
        } else {
            toast.error(`Song could not be deleted, something went wrong`, {
                autoClose: 2000,
            });
        }

        //context.commit('SET_SONG', null);
    },
    async getArtistSongsAndSetQueue(context, data) {
        let token = store.getters['user/token'];
        console.log("DATA: " + JSON.stringify(data))

        const response = await fetch('https://localhost:7229/api/Songs/Artist/' + data, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        var responseData = await response.json();

        if (response.status > 199 && response.status < 300) {
            context.dispatch('queue/updateQueue', responseData, { root: true });
        } else {
            toast.error(`Queueing songs failed, something went wrong`, {
                autoClose: 2000,
            });
        }
    },
    async putSong(context, song) {
        let token = store.getters['user/token'];
        console.log("SONG: " + JSON.stringify(song))
        
        const response = await fetch('https://localhost:7229/api/Songs/' + song.id, {
            method: 'PUT',
            body: JSON.stringify(song),
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json-patch+json"
            }
        });

        if (response.status > 199 && response.status < 300) {
            router.push('/song/menu')
        } else {
            toast.error(`Song updating failed, something went wrong`, {
                autoClose: 2000,
            });
        }
    }

};