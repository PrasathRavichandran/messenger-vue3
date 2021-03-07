import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "./services/firebase";

import "@fortawesome/fontawesome-free";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./scss/style.scss";

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(router)
      .mount("#app");
  }
});
