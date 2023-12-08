// import firebase from "firebase/compat/app";
import firebase from "firebase/compat/app";

import "firebase/compat/auth";
import "firebase/compat/firestore";
// import firebase from "firebase/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC9YG6seB7NRtVaB-XtKO1hX_FBvuZ-Sas",
  authDomain: "terii-media.firebaseapp.com",
  projectId: "terii-media",
  storageBucket: "terii-media.appspot.com",
  messagingSenderId: "883893540615",
  appId: "1:883893540615:web:2be36ca39b2c3e2f8257a2",
};

firebase.initializeApp(firebaseConfig);
// const storage = firebase.storage();
const storage = firebase.storage();
export default storage;
