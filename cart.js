// Get references
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count"); // Optional if you show count in header

// Show cart items
function displayCart() {
  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "Total: ₹0";
    updateCartCount();
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const card = document.createElement("div");
    card.className = "cart-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>Price: ₹${item.price}</p>
      <p>Quantity: ${item.quantity}</p>
      <p>Subtotal: ₹${item.price * item.quantity}</p>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartContainer.appendChild(card);
  });

  cartTotal.textContent = `Total: ₹${total}`;
  updateCartCount();
}

// Remove an item
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Clear entire cart
function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  displayCart();
}

// Update cart count in header (if shown)
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countSpan = document.getElementById("cart-count");
  if (countSpan) {
    countSpan.textContent = count;
  }
}
function buyNow(index) {
    const item = cart[index];
    orders.push(item);
    localStorage.setItem("orders", JSON.stringify(orders));
  
    cart.splice(index, 1); // Remove only the bought item
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
  
    // ✅ Show Thank You Message
    const msg = document.querySelector(".thanks-message");
    if (msg) {
      msg.style.display = "block";
      setTimeout(() => {
        msg.style.display = "none";
      }, 3000); // Message hides after 3 seconds
    }
  }
  

// Run on load
displayCart();

