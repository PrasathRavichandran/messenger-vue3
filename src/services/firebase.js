import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmFaFTco9j9eq3RaiVsKsW7CwdHE6MZ3M",
  authDomain: "chat-app-vue-f11b0.firebaseapp.com",
  projectId: "chat-app-vue-f11b0",
  storageBucket: "chat-app-vue-f11b0.appspot.com",
  messagingSenderId: "340566119240",
  appId: "1:340566119240:web:c7a6d11bb76b73ff4cd97d",
  measurementId: "G-MM0SMJ6EQZ",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = app.firestore();
export default app;
