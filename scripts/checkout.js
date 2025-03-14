import { db } from "./firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

async function placeOrder() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    try {
        // Save order to Firestore
        await addDoc(collection(db, "orders"), {
            products: cart,
            timestamp: new Date()
        });

        alert("Order placed successfully!");
        localStorage.removeItem("cart"); // Clear cart after purchase
        window.location.href = "products.html"; // Redirect to products page
    } catch (error) {
        console.error("Error placing order:", error);
    }
}

document.getElementById("place-order").addEventListener("click", placeOrder);
