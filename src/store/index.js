import { createLogger, createStore } from "vuex";
import authstore from "./auth.store";

export default createStore({
  modules: {
    authstore,
  },
  plugins: [createLogger()],
});
