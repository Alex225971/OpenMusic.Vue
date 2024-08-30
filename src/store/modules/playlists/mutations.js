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
    },
    setCurrentPlaylist(state, payload) {
        state.currentPlaylist = payload
    },
    ADD_PLAYLIST(state, playlist) {
        state.playlists.push(playlist.responseData);
    },
    CLEAR_PLAYLISTS(state) {
        state.currentPlaylist = null;
        state.currentPlaylistId = null;
        state.playlists = [];
        state.name = null;
        state.description = null;
        state.imageUrl = '';
        state.creatorId = null;
        state.image = null;
    }
};