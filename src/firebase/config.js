import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6HF7knkSReWvheqV2xqWqnJQ9lGX91rI",
  authDomain: "nexus-gear-83f98.firebaseapp.com",
  projectId: "nexus-gear-83f98",
  storageBucket: "nexus-gear-83f98.firebasestorage.app",
  messagingSenderId: "308788531098",
  appId: "1:308788531098:web:6bd974d725d1365d637423",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Para el login
const auth = getAuth(app);

export { db, auth };
