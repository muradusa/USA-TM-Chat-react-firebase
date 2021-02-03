import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDGPdw_K6hQ5CmGw_m-1H69s8ij5hlkpgw",
  authDomain: "cholukov-family-chat.firebaseapp.com",
  projectId: "cholukov-family-chat",
  storageBucket: "cholukov-family-chat.appspot.com",
  messagingSenderId: "335289675647",
  appId: "1:335289675647:web:8ad89fb1be34631db4f44a",
  measurementId: "G-R26SVHHXM6",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { provider, auth, storage };

export default db;

// delete later'
