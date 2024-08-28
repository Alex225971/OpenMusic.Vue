export default {
    currentPlaylistId(state) {
        return state.currentPlaylistId;
    },
    currentPlaylist(state) {
        console.log("GETTERS DATA:" + state.currentPlaylist)
        return state.currentPlaylist;
    },
    playlistDetails(state) {
        return state.playlists;
    },
    playlistsAreLoaded(state) {
        return state.playlists && state.playlists.length > 0;
    }
}