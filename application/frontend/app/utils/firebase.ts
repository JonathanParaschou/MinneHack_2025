// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmzZE1MkkCs0zDteZd4XUvbaBLfqi5uss",
  authDomain: "drawit-25b8c.firebaseapp.com",
  projectId: "drawit-25b8c",
  storageBucket: "drawit-25b8c.firebasestorage.app",
  messagingSenderId: "887264139761",
  appId: "1:887264139761:web:c285bbf327dc1377a50c50"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export let user = auth.currentUser;

export async function ensureAuth() {
    await auth.authStateReady();
    user = auth.currentUser;
}

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    await ensureAuth();
    console.log(user);
}