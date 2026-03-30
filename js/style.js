

let cart = JSON.parse(localStorage.getItem('cart')) || [];


function addToCart(productName, price, imageSrc) {
  const existingItem = cart.find(item => item.name === productName);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: productName,
      price: parseFloat(price.replace('$', '')),
      image: imageSrc,
      quantity: 1
    });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${productName} added to cart!`);
}


function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartElement = document.querySelector('.nav-cart p:last-child');
  if (cartElement) {
    cartElement.textContent = `Cart (${cartCount})`;
  }
}


function toggleLike(button) {
  button.classList.toggle('liked');
}


document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();


  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const box = button.closest('.box');
      const productName = box.querySelector('h2').textContent;
      const price = box.querySelector('.price').textContent;
      const imageSrc = box.querySelector('img').src.split('/').pop();
      addToCart(productName, price, imageSrc);
    });
  });

 
  const likeButtons = document.querySelectorAll('.like-btn');
  likeButtons.forEach(button => {
    button.addEventListener('click', function() {
      toggleLike(button);
    });
  });


  const searchInput = document.querySelector('.nav-search input');
  const searchSelect = document.querySelector('.search-select');
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const query = searchInput.value;
        const category = searchSelect.value;
        alert(`Searching for "${query}" in ${category}`);
        // In a real app, this would redirect to search results page
      }
    });
  }

  
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = newsletterForm.querySelector('input').value;
      alert(`Thank you for subscribing with ${email}!`);
      newsletterForm.reset();
    });
  }
});
