import firebase from "firebase";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBZcojF8RPe8FPBfBcPr2Wch6TA16hiOVU",
  authDomain: "drive-clone-8e00f.firebaseapp.com",
  projectId: "drive-clone-8e00f",
  storageBucket: "drive-clone-8e00f.appspot.com",
  messagingSenderId: "1020436443258",
  appId: "1:1020436443258:web:d1685840e189a4fca6cbc3",
});

export const auth = app.auth();
export default app;
