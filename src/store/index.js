import authStore from "./auth.store";
import { createStore } from "vuex";
const store = createStore({
    modules: {
        auth: authStore
    },
});

export default store;