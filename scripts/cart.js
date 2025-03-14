// import { db } from "./firebase-config.js";
// import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// async function loadCartItems() {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const cartContainer = document.getElementById("cart-container");

//     if (cart.length === 0) {
//         cartContainer.innerHTML = "<p class='text-center text-gray-600'>Your cart is empty.</p>";
//         return;
//     }

//     cartContainer.innerHTML = ""; // Clear previous cart content

//     for (let productId of cart) {
//         const productRef = doc(db, "products", productId);
//         const productSnap = await getDoc(productRef);

//         if (productSnap.exists()) {
//             const product = productSnap.data();
//             const cartItem = `
//                 <div class="border rounded-lg p-4 shadow-lg bg-white flex justify-between items-center">
//                     <div>
//                         <h3 class="text-xl font-semibold">${product.name}</h3>
//                         <p class="text-gray-600">$${product.price}</p>
//                     </div>
//                     <button class="bg-red-500 text-white px-4 py-2 rounded-md remove-item" data-id="${productId}">
//                         Remove
//                     </button>
//                 </div>
//             `;
//             cartContainer.innerHTML += cartItem;
//         }
//     }

//     // Add event listeners for remove buttons
//     document.querySelectorAll(".remove-item").forEach(button => {
//         button.addEventListener("click", (event) => {
//             removeFromCart(event.target.dataset.id);
//         });
//     });
// }

// // Function to remove item from cart
// function removeFromCart(productId) {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     cart = cart.filter(id => id !== productId);
//     localStorage.setItem("cart", JSON.stringify(cart));
//     loadCartItems(); // Reload cart
// }

// // Load cart items when page loads
// loadCartItems();




// function viewCart() {
//     // Get cart container element
//     const cartContainer = document.getElementById("cart-container");
//     // Get total amount element
//     const totalAmountElem = document.getElementById("total-amount");
//     // Get cart items from local storage
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     // Initialize total amount
//     let total = 0;
//     // Clear cart container
//     cartContainer.innerHTML = "";
//     // Loop through cart items
//     cart.forEach(productId => {
//         // Get product data from local storage
//         const product = JSON.parse(localStorage.getItem(productId));
//         // Calculate item total
//         const itemTotal = product.price * product.quantity;
//         // Add item to cart container
//         cartContainer.innerHTML += `
//         <div class="cart-item">
//         <h2>${product.name}</h2>
//         <p>Quantity: ${product.quantity}</p>
//         <p>Price: $${product.price}</p>
//         <p>Total: $${itemTotal}</p>
//         </div>
//         `;
//         // Update total amount
//         total += itemTotal;
//         }); 
//         // Display total amount
//         totalAmountElem.textContent = total;
//         }
//         // Call viewCart function when page loads
//         viewCart();
import { db } from "./firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

async function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-container");
    const totalAmountElem = document.getElementById("total-amount");

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p class='text-center text-gray-600'>Your cart is empty.</p>";
        totalAmountElem.textContent = "$0";
        return;
    }

    cartContainer.innerHTML = ""; // Clear previous cart content
    let total = 0;

    for (let productId of cart) {
        const productRef = doc(db, "products", productId);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
            const product = productSnap.data();
            const itemTotal = product.price * (product.quantity || 1);
            total += itemTotal;

            const cartItem = `
                <div class="border rounded-lg p-4 shadow-lg bg-white flex justify-between items-center">
                    <div>
                        <h3 class="text-xl font-semibold">${product.name}</h3>
                        <p class="text-gray-600">$${product.price}</p>
                        <p>Quantity: ${product.quantity || 1}</p>
                        <p>Total: $${itemTotal}</p>
                    </div>
                    <button class="bg-red-500 text-white px-4 py-2 rounded-md remove-item" data-id="${productId}">
                        Remove
                    </button>
                </div>
            `;
            cartContainer.innerHTML += cartItem;
        }
    }

    totalAmountElem.textContent = `$${total}`;

    // Add event listeners for remove buttons
    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", (event) => {
            removeFromCart(event.target.dataset.id);
        });
    });
}

// Function to remove item from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(id => id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartItems(); // Reload cart
}

// Load cart items when page loads
loadCartItems();
    
        
