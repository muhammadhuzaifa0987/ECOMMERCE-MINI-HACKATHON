

import { db, auth } from "./firebase-config.js";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// 🚀 Ensure only Admins can access this page
auth.onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = "login.html"; // Redirect if not logged in
    }
});

// 📌 Reference to Firestore collection
const productCollection = collection(db, "products");

// 🚀 Function to Fetch and Display Products
async function fetchProducts() {
    try {
        const querySnapshot = await getDocs(productCollection);
        const productList = document.getElementById("product-list");
        productList.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const row = document.createElement("tr");

            row.innerHTML = `
                <td class="border p-2">${product.name}</td>
                <td class="border p-2">$${product.price}</td>
                <td class="border p-2">${product.category}</td>
                <td class="border p-2">
                    <button onclick="editProduct('${doc.id}', '${product.name}', '${product.price}', '${product.image}', '${product.category}')" class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                    <button onclick="deleteProduct('${doc.id}')" class="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
                </td>
            `;

            productList.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching products: ", error);
        alert("Failed to fetch products. Please try again later.");
    }
}

// 🚀 Function to Add Product
document.getElementById("add-product-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("product-name").value;
    const price = document.getElementById("product-price").value;
    const image = document.getElementById("product-image").value;
    const category = document.getElementById("product-category").value;

    if (!name || !price || !image || !category) {
        alert("All fields are required!");
        return;
    }

    try {
        await addDoc(productCollection, { name, price, image, category });
        alert("Product added successfully!");
        e.target.reset(); // Clear form
        fetchProducts(); // Refresh list
    } catch (error) {
        console.error("Error adding product: ", error);
        alert("Failed to add product. Please try again later.");
    }
});

// 🚀 Function to Delete Product
// async function deleteProduct(id) {
//     if (confirm("Are you sure you want to delete this product?")) {
//         try {
//             await deleteDoc(doc(db, "products", id));
//             alert("Product deleted!");
//             fetchProducts(); // Refresh list
//         } catch (error) {
//             console.error("Error deleting product: ", error);
//             alert("Failed to delete product. Please try again later.");
//         }
//     }
// }
// 🚀 Function to Delete Product
async function deleteProduct(id) {
    console.log(`Attempting to delete product with ID: ${id}`); // Debugging log
    if (confirm("Are you sure you want to delete this product?")) {
        try {
            await deleteDoc(doc(db, "products", id));
            alert("Product deleted!");
            fetchProducts(); // Refresh list
        } catch (error) {
            console.error("Error deleting product: ", error);
            alert("Failed to delete product. Please try again later.");
        }
    }
}



// 🚀 Function to Edit Product
window.editProduct = async (id, name, price, image, category) => {
    const newName = prompt("Enter new name:", name);
    const newPrice = prompt("Enter new price:", price);
    const newImage = prompt("Enter new image URL:", image);
    const newCategory = prompt("Enter new category:", category);

    if (newName && newPrice && newImage && newCategory) {
        try {
            await updateDoc(doc(db, "products", id), {
                name: newName,
                price: newPrice,
                image: newImage,
                category: newCategory,
            });

            alert("Product updated!");
            fetchProducts();
        } catch (error) {
            console.error("Error updating product: ", error);
            alert("Failed to update product. Please try again later.");
        }
    } else {
        alert("All fields are required!");
    }
};

// 🚀 Fetch products when page loads
fetchProducts();

window.deleteProduct = deleteProduct;

// 📌 Logout Functionality
document.getElementById("logout-btn").addEventListener("click", async () => {
    try {
        await auth.signOut();
        alert("Logged out successfully!");
        window.location.href = "login.html"; // Redirect to login page
    } catch (error) {
        console.error("Logout error:", error);
    }
});