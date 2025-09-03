// firebase.js
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut
} from "firebase/auth";
import {
    getDatabase,
    onValue,
    push,
    ref,
    remove,
    update
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBotRO75rE2PZU4u_1dZXXST1ZC7ntNx9U",
  authDomain: "luminancegraphic-46406.firebaseapp.com",
  databaseURL: "https://luminancegraphic-46406-default-rtdb.firebaseio.com/",
  projectId: "luminancegraphic-46406",
  storageBucket: "luminancegraphic-46406.firebasestorage.app",
  messagingSenderId: "816933321122",
  appId: "1:816933321122:web:df89baa9d5242f38011afb",
  measurementId: "G-VMLC0R5SEW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
    auth, db, onAuthStateChanged, onValue, provider, push, ref, remove, signInWithPopup,
    signOut, update
};
