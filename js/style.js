// Main JavaScript for Amazon-like website

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add to cart function
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

// Update cart count in navigation
function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartElement = document.querySelector('.nav-cart p:last-child');
  if (cartElement) {
    cartElement.textContent = `Cart (${cartCount})`;
  }
}

// Like button functionality
function toggleLike(button) {
  button.classList.toggle('liked');
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();

  // Add event listeners to add-to-cart buttons
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

  // Add event listeners to like buttons
  const likeButtons = document.querySelectorAll('.like-btn');
  likeButtons.forEach(button => {
    button.addEventListener('click', function() {
      toggleLike(button);
    });
  });

  // Search functionality
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

  // Newsletter subscription
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

// Slider functionality (if needed)
let currentSlide = 0;
function moveSlide(direction) {
  const slider = document.getElementById('slider');
  const slides = slider.children;
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  updateDots();
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  const slider = document.getElementById('slider');
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  updateDots();
}

function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}
