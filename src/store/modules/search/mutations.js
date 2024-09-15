export default {
    SET_SEARCH_RESULTS(state, payload) {
        state.searchResults = payload;
    },
    SET_CURRENT_SEARCH(state, payload) {
        state.currentSearch = payload;
    }
};