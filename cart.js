

let cart = JSON.parse(localStorage.getItem("cart")) || [];


const cartContainer = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");


function displayCart() {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty 😢</p>";
    totalPriceEl.innerText = "0.00";
    return;
  }

  let total = 0;

 
  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");

    cartItem.innerHTML = `
      <img src="${item.image}" class="cart-img" alt="product" />

      <div class="cart-info">
        <p class="cart-name">${item.name}</p>
        <p class="cart-price">$${item.price}</p>
      </div>

      <div class="cart-qty">
        Qty:
        <input type="number"
               value="${item.quantity}"
               min="1"
               onchange="updateQuantity(${index}, this.value)" />
      </div>

      <div class="cart-total">
        $${(item.price * item.quantity).toFixed(2)}
      </div>

      <button class="remove-btn" onclick="removeItem(${index})">
        🗑️
      </button>
    `;

    cartContainer.appendChild(cartItem);

  
    total += item.price * item.quantity;
  });

  
  totalPriceEl.innerText = total.toFixed(2);
}



function removeItem(index) {
  cart.splice(index, 1); // remove item
  updateStorage();
  displayCart();
}


function updateQuantity(index, qty) {
  const quantity = parseInt(qty);


  if (quantity < 1 || isNaN(quantity)) return;

  cart[index].quantity = quantity;
  updateStorage();
  displayCart();
}


function updateStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

displayCart();



document.addEventListener("DOMContentLoaded", function () {

  const checkoutBtn = document.getElementById("checkoutBtn");

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {

      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      window.location.href = "checkout.html";
    });
  }

});

