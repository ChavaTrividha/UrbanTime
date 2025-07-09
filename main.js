// Load existing cart or start a new one
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count on page load
updateCartCount();

// Add to cart with image and quantity support
function addToCart(name, price, image) {
  // Check if item already exists
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name,
      price,
      image,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${name} added to cart!`);
}

// Update cart count in header
function updateCartCount() {
  const countSpan = document.getElementById("cart-count");
  let totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (countSpan) {
    countSpan.textContent = totalQty;
  }
}
function buyNow(index) {
    const item = cart[index];
    const confirmOrder = confirm(`You are placing an order for ${item.name} (₹${item.price})\nPayment Method: Cash on Delivery`);
  
    if (confirmOrder) {
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      orders.push(item);
      localStorage.setItem("orders", JSON.stringify(orders));
  
      // Remove item from cart after buying
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartDisplay();
  
      // Show success message
      const banner = document.createElement("div");
      banner.textContent = "✅ Order Placed – Thank You!";
      banner.className = "order-success";
      document.body.insertBefore(banner, document.body.firstChild);
  
      setTimeout(() => {
        banner.remove();
      }, 3000);
    }
  }
  
  

