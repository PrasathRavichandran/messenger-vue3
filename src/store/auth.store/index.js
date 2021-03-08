import { auth, db } from "../../services/firebase";

const authstore = {
  state: {
    isLoggingIn: false,
    isLoggingOut: false,
    isVerifying: false,
    loginError: false,
    signupError: false,
    logoutError: false,
    isAuthenticated: false,
    user: {},
  },
  mutations: {
    receiveSignup(state, val) {
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        ...val,
      };
    },
  },
  actions: {
    async signUp({ commit }, user) {
      console.log("From user", user);
      auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((data) => {
          const currentUsr = auth.currentUser;
          if (currentUsr != null) {
            currentUsr
              .updateProfile({
                displayName: user.username,
              })
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
                    commit("receiveSignup", data);
                  })
                  .catch((error) => {
                    console.log("db error", error);
                  });
              })
              .catch((error) => {
                console.log("current usr Error", error);
              });
          }
        });
    },
  },
};
export default authstore;
