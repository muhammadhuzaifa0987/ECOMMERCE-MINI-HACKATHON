// Firebase Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
// Add your Firebase project configuration here
const firebaseConfig = {

        apiKey: "AIzaSyAZFGVbQlwv0ku3_eTxYP5ekChW0ba16Vo",
        authDomain: "practice-firebase-436ec.firebaseapp.com",
        projectId: "practice-firebase-436ec",
        storageBucket: "practice-firebase-436ec.firebasestorage.app",
        messagingSenderId: "775705394699",
        appId: "1:775705394699:web:6958b6f3f3d7635c37510e",
        measurementId: "G-T6QEW6M3ED"
      
};

// Initialize Firebase
// Initialize Firebase Services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
