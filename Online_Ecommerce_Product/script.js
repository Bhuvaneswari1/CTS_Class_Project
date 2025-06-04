// Product data array
const products = [
  { id: 1, name: "Laptop", price: 750, rating: 4.5, category: "Electronics", stock: 12 },
  { id: 2, name: "Phone", price: 500, rating: 4.7, category: "Electronics", stock: 20 },
  { id: 3, name: "Tablet", price: 600, rating: 4.3, category: "Electronics", stock: 8 },
  { id: 4, name: "Monitor", price: 300, rating: 4.2, category: "Accessories", stock: 15 },
  { id: 5, name: "Keyboard", price: 50, rating: 4.0, category: "Accessories", stock: 30 },
  { id: 6, name: "Mouse", price: 25, rating: 3.9, category: "Accessories", stock: 50 },
  { id: 7, name: "Smartwatch", price: 200, rating: 4.4, category: "Wearables", stock: 10 },
];

// Current filter/sort state
let currentCategory = "All";
let currentSort = "";

// DOM Elements
const productGrid = document.getElementById("productGrid");
const sortSelect = document.getElementById("sortSelect");
const categoryButtons = document.querySelectorAll(".category-btn");

// Render product cards
function renderProducts(list) {
  productGrid.innerHTML = "";

  if (list.length === 0) {
    productGrid.innerHTML = "<p>No products found.</p>";
    return;
  }

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    if (p.stock < 10) {
      card.classList.add("low-stock");
    }

    card.innerHTML = `
      <div class="product-name">${p.name}</div>
      <div class="product-category">Category: ${p.category}</div>
      <div class="product-price">₹${p.price}</div>
      <div class="product-rating">⭐ ${p.rating.toFixed(1)}</div>
      <div class="product-stock">${p.stock} in stock</div>
    `;

    productGrid.appendChild(card);
  });
}

// Apply current filters and sorting
function applyFilters() {
  let filtered = [...products];

  // Filter by category
  if (currentCategory !== "All") {
    filtered = filtered.filter(p => p.category === currentCategory);
  }

  // Sort
  switch(currentSort) {
    case "priceAsc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "priceDesc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "nameAsc":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "nameDesc":
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "ratingAsc":
      filtered.sort((a, b) => a.rating - b.rating);
      break;
    case "ratingDesc":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "stockAsc":
      filtered.sort((a, b) => a.stock - b.stock);
      break;
    case "stockDesc":
      filtered.sort((a, b) => b.stock - a.stock);
      break;
  }

  renderProducts(filtered);
}

// Event Listeners
sortSelect.addEventListener("change", (e) => {
  currentSort = e.target.value;
  applyFilters();
});

categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Remove active from all
    categoryButtons.forEach(b => b.classList.remove("active"));
    // Add active to clicked
    btn.classList.add("active");

    currentCategory = btn.getAttribute("data-category");
    applyFilters();
  });
});

// Initial render
applyFilters();
