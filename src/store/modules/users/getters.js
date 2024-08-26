export default {
    user(state) {
        return state.firstName;
    },
    hasUser(state) {
        return state.user && state.user.length > 0;
    },
    token(state) {
        return state.token;
    },
    isAuthenticated(state) {
        return !!state.token;
    }
};