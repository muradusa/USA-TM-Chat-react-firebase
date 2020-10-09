import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBUgQ38deVDX6Tg7QfFdw0XtHqTByy--vQ",
  authDomain: "discord-clone-9079e.firebaseapp.com",
  databaseURL: "https://discord-clone-9079e.firebaseio.com",
  projectId: "discord-clone-9079e",
  storageBucket: "discord-clone-9079e.appspot.com",
  messagingSenderId: "26475339994",
  appId: "1:26475339994:web:036ac040efcbfb225985e3",
  measurementId: "G-B8WLC2LDQB",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { provider, auth };

export default db;
