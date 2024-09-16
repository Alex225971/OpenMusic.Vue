export default {
    SET_QUEUE(state, payload) {
        state.queue = payload;
    },
    SET_CURRENT_POSITION(state, payload) {
        state.current_position = payload;
    },
};