// To ensure DOM is loaded before executing scripts
document.addEventListener("DOMContentLoaded", () => {
  // Initialize product rendering
  renderProducts();

  // Toggle Cart Panel
  const cartIcon = document.getElementById("cart");
  const cartCloseButton = document.getElementById("cartClose");
  const cartPanel = document.getElementById("cartPanel");

  cartIcon.addEventListener("click", () => {
    cartPanel.classList.toggle("open");
  });

  if (cartCloseButton) {
    cartCloseButton.addEventListener("click", () => {
      cartPanel.classList.remove("open");
    });
  }
});

// Render Products
function renderProducts() {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  products.forEach(product => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");
    productItem.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="openModal(${product.id})">View Details</button>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(productItem);
  });
}

// Open Product Modal
function openModal(productId) {
  const product = products.find(p => p.id === productId);
  document.getElementById("modalProductImage").src = product.image;
  document.getElementById("modalProductName").textContent = product.name;
  document.getElementById("modalProductDescription").textContent = product.description;
  document.getElementById("modalProductPrice").textContent = `$${product.price.toFixed(2)}`;
  document.getElementById("modalAddToCart").setAttribute("onclick", `addToCart(${product.id})`);
  productModal.style.display = "flex";
  productModal.setAttribute("aria-hidden", "false");
}

// Close Modal
function closeModal() {
  productModal.style.display = "none";
  productModal.setAttribute("aria-hidden", "true");
}

// Add to Cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingProduct = cart.find(item => item.id === productId);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
}

function addToCartFromModal() {
  const productId = parseInt(document.getElementById("modalAddToCart").getAttribute("onclick").match(/\d+/)[0]);
  addToCart(productId);
  closeModal();
}

// Remove from Cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
}

// Cart UI
function updateCartUI() {
  cartItems.innerHTML = "";
  let total = 0;
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    const table = document.createElement("table");
    table.innerHTML = `
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Cost</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${cart.map(item => `
          <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button onclick="removeFromCart(${item.id})">Remove</button></td>
          </tr>
        `).join("")}
      </tbody>
    `;
    cartItems.appendChild(table);
    total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
  cartCount.textContent = cart.length;
  totalPrice.textContent = `Total: $${total.toFixed(2)}`;
}

// Filter Products
function filterProducts() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm)
  );

  productList.innerHTML = "";
  filteredProducts.forEach(product => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");
    productItem.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="openModal(${product.id})">View Details</button>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(productItem);
  });
}

// Product Data
const products = [
  { id: 1, name: "Sneaker", price: 20.99, description: "A great product", image: "images/sneaker.png" },
  { id: 2, name: "Bag", price: 35.99, description: "Another great product", image: "images/bag.png" },
  { id: 3, name: "Socks", price: 15.49, description: "Yet another great product", image: "images/socks.png" },
  { id: 4, name: "Watch", price: 50.00, description: "Top-quality product", image: "images/watch.png" },
  { id: 5, name: "Cap", price: 29.99, description: "A great product", image: "images/cap.png" },
  { id: 6, name: "Shirt", price: 39.99, description: "Another great product", image: "images/shirt.png" },
  { id: 7, name: "Shorts", price: 59.49, description: "Yet another great product", image: "images/shorts.png" },
  { id: 8, name: "Glasses", price: 60.00, description: "Top-quality product", image: "images/glasses.png" }
];

let cart = [];

// DOM Elements
const productList = document.getElementById("productList");
const productModal = document.getElementById("productModal");
const cartPanel = document.getElementById("cartPanel");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");
