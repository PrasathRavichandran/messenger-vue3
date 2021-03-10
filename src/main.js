import { createApp } from "vue";
import VueChatScroll from "vue-chat-scroll";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@fortawesome/fontawesome-free";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./scss/style.scss";
import { auth } from "./services/firebase";

let app;
auth.onAuthStateChanged((user) => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(router)
      .use(VueChatScroll)
      .mount("#app");
  }
  if (user !== null) {
    store.commit("receiveSignup", user);
  }
});
