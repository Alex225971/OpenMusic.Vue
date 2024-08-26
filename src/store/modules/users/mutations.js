export default {
    setUser(state, payload) {
        state.firstName = payload.firstName;
        state.lastName = payload.lastName;
        state.token = payload.token;
        state.userId = payload.userId;
    }
};