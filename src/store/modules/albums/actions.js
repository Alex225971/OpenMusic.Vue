import 'vue3-toastify/dist/index.css';
import store from '../../index.js'
import { toast } from 'vue3-toastify';
import router from '../../../router';



export default {
    async createAlbum(context, data) {
        var formData = new FormData();
        let token = store.getters['user/token'];

        const albumData = {
            title: data.title,
            year: data.year,
            image: data.image,
            artistId: store.getters['artists/currentArtistId'] || '',
            genres: [],
        };

        Object.keys(albumData).forEach(key => formData.append(key, albumData[key]));


        //Songs set after, hopefully this means they don't get ignored
        data.songs.forEach((song, index) => {
        formData.append(`songs[${index}].title`, song.title);
        formData.append(`songs[${index}].releaseDate`, song.releaseDate);
        formData.append(`songs[${index}].songUrl`, '1');
        
        // If you need to upload song files as well, append the files
            if (song.songFile) {
                formData.append(`songs[${index}].songFile`, song.songFile);
            }
        });

        const response = await fetch(process.env.VUE_APP_BASE_API_URL + 'Albums', {
            method: 'POST',
            body: formData,
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        let responseData = await response.json();

        if (response.status > 199 && response.status < 300) {
            toast.success(`Album "${data.name}" created`, {
                autoClose: 2000,
            });
            router.push('/album/menu')
        } else {
            toast.error(`Album could not be created, something went wrong`, {
                autoClose: 2000,
            });
        }
        
        //context.commit('SET_ALBUMS', responseData);
    },
    async getAlbumsByArtist(context, data) {
        let token = store.getters['user/token'];
        console.log("GETTING ALBUMS FOR ARTIST: " + JSON.stringify(data))
        
        const response = await fetch(process.env.VUE_APP_BASE_API_URL + 'Albums/Artist/' + data, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        let responseData = await response.json();
        console.log("ALBUMS SET: " + JSON.stringify(responseData))
        context.commit('SET_ALBUMS', responseData);
    },
    async loadInDetail(context, data) {
        store.getters['albums/currentAlbumId'];
        let token = store.getters['user/token'];

        const response = await fetch(process.env.VUE_APP_BASE_API_URL + 'Albums/' + data.id, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const responseData = await response.json();

        context.commit('SET_CURRENT_ALBUM', {
            ...responseData
        });
        console.log("SETTING ID: " + data.id)
        console.log("CURRENT ARTIST ID: " + JSON.stringify(responseData.artistId));

        context.commit('artists/SET_CURRENT_ARTIST_ID', responseData.artistId, { root: true });
    },
    async selectAlbum(context, data) {
        console.log("SELECTING ALBUM, DATA = " + data);
        context.commit('SET_CURRENT_ALBUM_ID', data);
    },
    async deSelectAlbum(context, data) {
        context.commit('SET_CURRENT_ALBUM_ID', null);
    },
    async getAllAlbums(context, data) {
        let token = store.getters['user/token'];

        const response = await fetch(process.env.VUE_APP_BASE_API_URL + 'Albums/', {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const responseData = await response.json();

        context.commit('SET_ALBUMS', responseData);
    },
    async deleteAlbum(context, data) {
        let token = store.getters['user/token'];

        const response = await fetch(process.env.VUE_APP_BASE_API_URL + 'Albums/' + data, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (response.status > 199 && response.status < 300) {
            toast.success(`Album with ID "${data}" deleted`, {
                autoClose: 2000,
            });
            store.dispatch('albums/getAllAlbums'); //Update the store to "get rid" of the deleted album
        } else {
            toast.error(`Album could not be deleted, something went wrong`, {
                autoClose: 2000,
            });
        }
    },
    async putAlbum(context, data) {
        var formData = new FormData();
        let token = store.getters['user/token'];

        const albumData = {
            title: data.title,
            year: data.year,
            artistId: data.artistId
        };

        Object.keys(albumData).forEach(key => formData.append(key, albumData[key]));


        //Songs and files added here
        data.songs.forEach((song, index) => {
            formData.append(`songs[${index}].title`, song.title);
            formData.append(`songs[${index}].releaseDate`, song.releaseDate);
            formData.append(`songs[${index}].songUrl`, '1');
            if(song.id === undefined) {
                song.id = 0;
            }
            formData.append(`songs[${index}].id`, song.id);
        
            //Songs added to a list inside the album DTO
            if (song.songFile) {
                formData.append(`songs[${index}].songFile`, song.songFile);
            }
            
        });
        
        const response = await fetch(process.env.VUE_APP_BASE_API_URL + 'Albums/' + data.id, {
            method: 'PUT',
            body: formData,
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (response.status > 199 && response.status < 300) {
            toast.success(`Album with ID "${data}" updated`, {
                autoClose: 2000,
            });
            store.dispatch('albums/getAllAlbums'); //Update the store to "get rid" of the deleted album
            router.push('/album/menu')
        } else {
            toast.error(`Album could not be updated, something went wrong`, {
                autoClose: 2000,
            });
        }
    }
};