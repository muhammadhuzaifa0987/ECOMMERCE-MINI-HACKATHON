import {
    auth,
    db,
    signOut,
    getDoc,
    deleteUser,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    setDoc,
    doc,
    onAuthStateChanged,
  } from "./firebaseconfig.js";
  
  // sign up
  
  window.signup = async () => {
    console.log("Signup form submitted");
    const fullname = document.getElementById("full-name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
  
    try {
  
      await setDoc(doc(db, "users", user.uid), {
        fullname: fullname,
        email: user.email,
        role: role,
      });
  
      alert("Signup successful! You can now login.");
      window.location.href = "./login.html";
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert(error.message);
    }
  };
  // ==================================================================================================================
  
  // login
  
  window.signin = async (e) => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
  
      localStorage.setItem("userid", user.uid);
  
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();
  
      if (userData.role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "products.html";
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      alert(error.message);
    }
  };
  
  // ==================================================================================================================
  
  // logout
  window.logout = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await signOut(auth);
        console.log("User signed out successfully");
        localStorage.removeItem("userid");
        await deleteUser(user);
        alert("User account deleted successfully");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Error deleting account: " + error.message);
  
        return;
      }
    }
  };
  
  // protected routes
  
  onAuthStateChanged(auth, async (user) => {
    const storedUserId = localStorage.getItem("userid");
  
    if (!storedUserId) {
      if (
        [
          "/public/pages/products.html",
          "/public/pages/cart.html",
          "/public/pages/favorite.html"
        ].includes(window.location.pathname)
      ) {
        alert("You must be logged in!");
        window.location.href = "login.html";
      }
      return;
    }
  
    if (user) {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();
  
      if (
        window.location.pathname === "/admin.html" &&
        userData.role !== "admin"
      ) {
        alert("Access denied. Admins only.");
        window.location.href = "index.html";
        return;
      }
    }
  });
  
 
 
 
 
 
 