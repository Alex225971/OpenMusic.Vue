export default {
    setPlaylist(state, payload) {
        state.name = payload.name;
        state.description = payload.description;
        state.imageUrl = '';
        state.creatorId = state.userId;
        state.image = payload.image;
    }
};