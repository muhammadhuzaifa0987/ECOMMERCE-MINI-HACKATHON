
import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Signup
document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const role = document.getElementById("signup-role").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store user role in Firestore
        await setDoc(doc(db, "users", user.uid), {
            email: email,
            role: role
        });

        // Redirect based on role
        if (role === "admin") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "products.html";
        }
    } catch (error) {
        alert("Signup Failed: " + error.message);
    }
});

// Login
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Fetch user role from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const role = userDoc.data().role;
            if (role === "admin") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "products.html";
            }
        } else {
            alert("User role not found. Please contact support.");
        }
    } catch (error) {
        alert("Invalid Credentials");
    }
});



function logout() {
    // Implement logout functionality
}
