export default {
    setPlaylist(state, payload) {
        state.name = payload.name;
        state.description = payload.description;
        state.imageUrl = '';
        state.creatorId = state.userId;
        state.image = payload.image;
    },
    hasPlaylists(state) {
        return state.playlists && state.playlists.length > 0;
    },
    setUserPlaylists(state, payload) {
        state.playlists = payload
    },
    setCurrentPlaylistId(state, payload) {
        state.currentPlaylistId = payload.id
        console.log("PAYLOAD ID: " + payload.id)
    },
    setCurrentPlaylist(state, payload) {
        console.log("PAYLOAD: " + JSON.stringify(payload))
        state.currentPlaylist = payload
    }
};