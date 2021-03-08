import { createLogger, createStore } from "vuex";
import router from "../router";
import { auth, db } from "../services/firebase";

export default createStore({
  plugins: process.env.NODE_ENV === "development" ? [createLogger()] : [],
  state: {
    isAuthenticated: false,
    user: {},
  },
  mutations: {
    receiveSignup(state, value) {
      state.user = value;
      state.isAuthenticated = true;
    },
    receiveLogout(state) {
      state.user = {};
      state.isAuthenticated = false;
    },
  },
  getters: {},
  actions: {
    // signup
    async signUp({ commit }, user) {
      auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((data) => {
          const currentUsr = auth.currentUser;
          if (currentUsr != null) {
            currentUsr
              .updateProfile({ displayName: user.username })
              .then(() => {
                db.collection("users")
                  .doc(data.user.uid)
                  .set({
                    username: user.username,
                    uid: data.user.uid,
                    createdAt: new Date(),
                    isOnline: true,
                  })
                  .then(() => {
                    commit("receiveSignup", data.user);
                    router.push("/");
                  })
                  .catch((err) => console.error(err));
              })
              .catch((err) => console.error(err));
          }
        })
        .catch((err) => console.error(err));
    },

    // login
    async logIn({ commit }, user) {
      auth
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
          db.collection("users")
            .doc(data.user.uid)
            .update({
              isOnline: true,
              createdAt: new Date(),
            })
            .then(() => {
              commit("receiveSignup", data.user);
              router.push("/");
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    },

    // Logout
    async logOut({ commit }, user) {
      db.collection("users")
        .doc(user.uid)
        .update({
          isOnline: false,
          createdAt: new Date(),
        })
        .then(() => {
          auth
            .signOut()
            .then(() => {
              commit("receiveLogout");
              router.push("/login");
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    },
  },
});
