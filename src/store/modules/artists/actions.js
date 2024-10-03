import 'vue3-toastify/dist/index.css';
import { toast } from 'vue3-toastify';
import store from 'C:/Users/duble/Documents/code/OpenMusic.Vue/src/store/index.js'
import router from '../../../router';

export default {
    async getArtists(context, data) {
        let token = store.getters['user/token'];

        const response = await fetch(process.env.VUE_APP_BASE_API_URL + 'Artists', {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        let responseData = await response.json();
        
        context.commit('SET_ARTISTS', responseData);
    },
    async getArtistsForSelect(context, data) {
        let token = store.getters['user/token'];

        const response = await fetch(process.env.VUE_APP_BASE_API_URL + 'Artists/ArtistsForSelect', {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        let responseData = await response.json();
        
        context.commit('SET_ARTISTS_FOR_SELECT', responseData);
    },
    async getArtist(context, data) {
        let token = store.getters['user/token'];

        const response = await fetch(process.env.VUE_APP_BASE_API_URL + 'Artists/' + data.id, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        let responseData = await response.json();
        
        context.commit('artists/SET_CURRENT_ARTIST', {...responseData}, { root: true });
    },
    async createArtist(context, data) {

        console.log("REQUEST BODY: " + JSON.stringify(data))
        var formData = new FormData();
        let token = store.getters['user/token'];

        const response = await fetch(process.env.VUE_APP_BASE_API_URL + 'Artists', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json-patch+json"
            }
        });

        if (response.status > 199 && response.status < 300) {
            toast.success(`Artist "${data.name}" created`, {
                autoClose: 2000,
            });
            router.push('/artist/menu')
        }
    },
    async selectArtist(context, data) {
        context.commit('SET_CURRENT_ARTIST_ID', data);
    },
    async loadInDetail(context, data) {
        store.getters['artists/currentArtistId'];
        let token = store.getters['user/token'];

        const response = await fetch(process.env.VUE_APP_BASE_API_URL + 'Artists/' + data.id, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const responseData = await response.json();

        context.commit('SET_CURRENT_ARTIST', {
            ...responseData
        });
    },
    async getAllArtists(context, data) {
        let token = store.getters['user/token'];

        const response = await fetch(process.env.VUE_APP_BASE_API_URL + 'Artists/', {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const responseData = await response.json();

        context.commit('SET_ARTISTS', responseData);

    },
    async deleteArtist(context, data) {
        let token = store.getters['user/token'];

        console.log("DELETING ARTIST: " + data)

        const response = await fetch(process.env.VUE_APP_BASE_API_URL + 'Artists/' + data, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (response.status > 199 && response.status < 300) {
            context.commit('SET_ARTIST', null);
            store.dispatch('artists/getArtists'); //Update the store to "get rid" of the deleted artist
            toast.success(`Artist with ID ${data} deleted`, {
                autoClose: 2000,
            });
        } else {
            toast.error(`Artist could not be deleted, something went wrong`, {
                autoClose: 2000,
            });
        }
    }

};