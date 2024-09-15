export default {
    setUser(state, payload) {
        state.firstName = payload.firstName;
        state.lastName = payload.lastName;
        state.token = payload.token;
        state.userId = payload.userId;
    },
    SET_ROLES(state, payload) {
        state.role = payload;
    },
    CLEAR_AUTH(state) {
        state.token = null;
        state.role = null;
    }
};