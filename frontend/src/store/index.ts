import { createStore } from "vuex";
import { auth } from "./auth.modules";
import { Store } from "vuex/types/index.js";

const store: Store<any> = createStore({
  modules: {
    auth,
  },
});

export default store;