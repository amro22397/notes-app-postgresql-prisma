// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_cG0RRWVy2qrbO4c3Uw1A3-FcTSNBRE0",
  authDomain: "tutorial-819e5.firebaseapp.com",
  projectId: "tutorial-819e5",
  storageBucket: "tutorial-819e5.firebasestorage.app",
  messagingSenderId: "279497004816",
  appId: "1:279497004816:web:e4516ca5a68769e1507795"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);