import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, Auth, indexedDBLocalPersistence, initializeAuth } from "firebase/auth"; 
import { getFirestore, Firestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyBzgNTj7du3Lxqia9R843H2dIi9hrEi5CQ",
  authDomain: "cine-150ce.firebaseapp.com",
  projectId: "cine-150ce",
  storageBucket: "cine-150ce.firebasestorage.app",
  messagingSenderId: "8299292305",
  appId: "1:8299292305:web:d5e23ff17b7d0080ab0130",
  measurementId: "G-Z9Z3C5HDQV"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Analytics
export const analytics = getAnalytics(app);


export const firebaseAuth: Auth = initializeAuth(app, {
  persistence: [indexedDBLocalPersistence]
});

export const firestoreDb: Firestore = getFirestore(app);

export default app;
