import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDTBVPgqkQGVrZvxpyRSwVthp8gFiiINtY",
  authDomain: "medium-a5f6d.firebaseapp.com",
  projectId: "medium-a5f6d",
  storageBucket: "medium-a5f6d.appspot.com",
  messagingSenderId: "673260516154",
  appId: "1:673260516154:web:1795a0873203232d279603",
});

export const database = firebase.firestore();

export const auth = app.auth();
export default app;
