import { createStore } from "vuex";

const store = createStore({
    state: {
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false
    }
});

export default store;