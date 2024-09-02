export default {
    userName(state) {
        return state.firstName;
    },
    hasUser(state) {
        return state.user && state.user.length > 0;
    },
    token(state) {
        return state.token;
    },
    userId(state) {
        return state.userId;
    },
    isAuthenticated(state) {
        return !!state.token;
    },
    userRole(state) {
        return state.role;
    }
};