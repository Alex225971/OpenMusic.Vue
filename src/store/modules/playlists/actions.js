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

        console.log("playlistData: " + JSON.stringify(playlistData));

        Object.keys(playlistData).forEach(key => formData.append(key, playlistData[key]));
        //formData.append("image", new Blob([data.image], { type: "image/png" }), renamedImage + ".png");

        console.log("form data: " + formData.image);
        const response = await fetch('https://localhost:7229/api/Playlists', {
            method: 'POST',
            body: formData,
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const responseData = await response.json();

        console.log("Committing playlist: " + JSON.stringify(playlistData))
        context.commit('setPlaylist', {
            ...playlistData
        });
        console.log("Id being used for redirect: " + responseData.id)
        context.commit('setCurrentPlaylistId', {
            id: responseData.id
        });
    },
    async getUserPlaylists(context, data) {
        let token = store.getters['user/token'];
        let query = '?creatorId=' + store.getters['user/userId'];

        console.log("Getting playlists with user ID: " + store.getters['user/userId']);

        const response = await fetch('https://localhost:7229/api/Playlists' + query, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const responseData = await response.json();
        const playlists = [];

        for(var key in responseData) {
            const playlist = {
                id: responseData[key].id,
                name: responseData[key].name,
                description: responseData[key].description,
                imageUrl: responseData[key].imageUrl
            };
            playlists.push(playlist);
        }
        console.log("Data being committed " + JSON.stringify(playlists));

        context.commit('setUserPlaylists', playlists);
    }


};