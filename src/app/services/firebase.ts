// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6ii43Lir_c5CulZgYVtSjZwYRrcOHwLM",
  authDomain: "nasra-class-report-app.firebaseapp.com",
  projectId: "nasra-class-report-app",
  storageBucket: "nasra-class-report-app.firebasestorage.app",
  messagingSenderId: "708401721458",
  appId: "1:708401721458:web:e5955406d95f3c8bd992eb",
  measurementId: "G-16P2KR9RZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)
auth.useDeviceLanguage()

// project-708401721458 (google)