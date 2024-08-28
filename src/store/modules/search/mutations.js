export default {
    setUser(state, payload) {
        state.artists = payload.artists;
        state.albums = payload.albums;
        state.songs = payload.songs;
        state.playlists = payload.playlists;
    }
};