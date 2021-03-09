import { createLogger, createStore } from "vuex";
import router from "../router";
import { auth, db } from "../services/firebase";

export default createStore({
  plugins: process.env.NODE_ENV === "development" ? [createLogger()] : [],
  state: {
    isAuthenticated: false,
    user: {},
    users: [],
    conversations: [],
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
    getUserSuccess(state, value) {
      state.users = value;
    },
    getRealTimeConversations(state, value) {
      state.conversations = value;
    },
    getRealTimeConversationsFailure(state) {
      state.conversations = [];
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

    // get Real time users
    async getRealTimeUsers({ commit }, uid) {
      db.collection("users").onSnapshot((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().uid !== uid) {
            users.push(doc.data());
          }
        });
        // commit the users to state
        commit("getUserSuccess", users);
      });
    },

    // updateMessage
    async updateMessage({ commit }, msgObj) {
      db.collection("conversations")
        .add({
          ...msgObj,
          isView: false,
          createdAt: new Date(),
        })
        .then((data) => {
          console.log(data);
        })
        .then((error) => {
          console.log(error);
        });
    },

    // get Real time Conversations
    async getRealTimeConversations({ commit }, user) {
      db.collection("conversations")
        .where("uid_1", "in", [user.uid_1, user.uid_2])
        .orderBy("createdAt", "asc")
        .onSnapshot((querySnapshot) => {
          const conversations = [];
          querySnapshot.forEach((doc) => {
            if (
              (doc.data().uid_1 === user.uid_1 &&
                doc.data().uid_2 === user.uid_2) ||
              (doc.data().uid_1 === user.uid_2 &&
                doc.data().uid_2 === user.uid_1)
            ) {
              conversations.push(doc.data());
            }
            if (conversations.length > 0) {
              // commit success conversations
              commit("getRealTimeConversations", conversations);
            } else {
              // commit failure conversations (reset the conversation)
              commit("getRealTimeConversationsFailure");
            }
          });
        });
    },
  },
});
