
import { db } from "./firebase-config.js";
import { collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Reference to the "products" collection in Firestore
const productsCollection = collection(db, "products");

async function fetchProducts() {
    try {
        const querySnapshot = await getDocs(productsCollection);
        const productsContainer = document.getElementById("products-container");

        productsContainer.innerHTML = ""; // Clear existing content

        querySnapshot.forEach((doc) => {
            const product = doc.data();
            
            // Create Product Card
            const productCard = `
                <div class="border rounded-lg p-4 shadow-lg bg-white">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover rounded-lg">
                    <h3 class="text-xl font-semibold mt-2">${product.name}</h3>
                    <p class="text-gray-600">$${product.price}</p>
                    <button class="bg-blue text-blackpx-4 py-2 mt-2 rounded-md add-to-cart" data-id="${doc.id}">
                        Add to Cart
                    </button>
                </div>
            `;

            productsContainer.innerHTML += productCard;
        });

        // Add event listeners for "Add to Cart" buttons
        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", (event) => {
                const productId = event.target.dataset.id;
                addToCart(productId);
            });
        });

    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Function to add a product to the cart
async function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Prevent duplicate entries
    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to cart!");
    } else {
        alert("Product is already in the cart!");
    }
}

// Load products when the page loads
fetchProducts();
