// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2pSD8Jw5kPY5wr8uZLZBTreZxCkMW1fU",
  authDomain: "dine-time-dd037.firebaseapp.com",
  projectId: "dine-time-dd037",
  storageBucket: "dine-time-dd037.firebasestorage.app",
  messagingSenderId: "982401373442",
  appId: "1:982401373442:web:00030813c6facb1dcd9e1b",
  measurementId: "G-YYSMSVMMZF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
