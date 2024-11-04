 // Mock API URL for demonstration
const API_URL = 'https://fakestoreapi.com/products';

// Fetch products from API
async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch products");
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Render products to the DOM
function renderProducts(products) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = ''; // Clear any existing content

  products.forEach(({ id, title, price, image }) => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
      <img src="${image}" alt="${title}" width="150">
      <h2>${title}</h2>
      <p>Price: $${price.toFixed(2)}</p>
      <button onclick="addToCart(${id}, '${title}', ${price})">Add to Cart</button>
    `;
    productList.appendChild(productDiv);
  });
}

// Handle adding items to the cart
function addToCart(id, title, price) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ id, title, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${title} has been added to your cart.`);
}

// View cart contents
function viewCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  let cartContent = "Your Cart:\n\n";
  cart.forEach(({ title, price }, index) => {
    cartContent += `${index + 1}. ${title} - $${price.toFixed(2)}\n`;
  });
  cartContent += `\nTotal Items: ${cart.length}`;
  
  alert(cartContent);
}

// Update the cart count in the header
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.getElementById('cart-count').textContent = cart.length;
}

// Initialize the app
async function init() {
  const products = await fetchProducts();
  renderProducts(products);
  updateCartCount();
}

// Start the application
init();
