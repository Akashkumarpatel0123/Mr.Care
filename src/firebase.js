// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCNVXRVxg3Owl51HlxPGPK_2jzEFVPliUg",
  authDomain: "nursebuddy-3e47b.firebaseapp.com",
  projectId: "nursebuddy-3e47b",
  storageBucket: "nursebuddy-3e47b.appspot.com", // fixed typo (.app -> .appspot.com)
  messagingSenderId: "193366279179",
  appId: "1:193366279179:web:49470fa46188d21ebeb30e",
  measurementId: "G-8FR4RGBDHP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
