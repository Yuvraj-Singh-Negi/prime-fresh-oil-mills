/* ========================================
   Prime Fresh Oil Mills — Main JavaScript
   ======================================== */

// Product catalog (shared data)
const products = [
  { id: "groundnut-seeds", name: "Groundnut Seeds", subtitle: "(B2B Bulk)", description: "Bulk pricing available / Price on Request", image: "assets/groundnut.jpg", inStock: true },
  { id: "sesame-seeds", name: "Sesame Seeds", subtitle: "(Black & White)", description: "Bulk pricing available / Price on Request", image: "assets/sesame.jpg", inStock: true },
  { id: "deoiled-cakes", name: "De-Oiled Cakes", subtitle: "(Cattle Feed)", description: "Bulk pricing available / Price on Request", image: "assets/deoiled-cake.jpg", inStock: true },
  { id: "yellow-mustard-seeds", name: "Yellow Mustard Seeds", description: "Bulk pricing available / Price on Request", image: "assets/mustard.jpg", inStock: true },
  { id: "seed-cakes", name: "Seed Cakes", subtitle: "(Organic)", description: "Bulk pricing available / Price on Request", image: "assets/seed-cake.jpg", inStock: true },
];

// Cart state
const CART_KEY = "prime-fresh-oil-mills:cart:v1";
let cart = [];

// Load cart from localStorage
function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        cart = parsed.filter(item => 
          item.productId && typeof item.quantity === "number" && item.quantity > 0
        );
      }
    }
  } catch (e) {
    cart = [];
  }
  updateCartCount();
}

// Save cart to localStorage
function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    console.warn("Storage unavailable");
  }
  updateCartCount();
}

// Add item to cart
function addToCart(productId, quantity = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.productId === productId);
  if (existing) {
    existing.quantity = Math.min(existing.quantity + quantity, 100000);
  } else {
    cart.push({ productId, quantity: Math.max(quantity, 0.001) });
  }

  saveCart();
  showToast(`${product.name} added to quote`);
  updateProductButtons();
}

// Remove item from cart
function removeFromCart(productId) {
  const product = products.find(p => p.id === productId);
  cart = cart.filter(item => item.productId !== productId);
  saveCart();
  if (product) showToast(`${product.name} removed from quote`);
  renderCartPage();
  updateProductButtons();
}

// Update item quantity
function updateCartQuantity(productId, quantity) {
  quantity = Math.max(0.001, Math.min(quantity, 100000));
  const item = cart.find(i => i.productId === productId);
  if (item) {
    item.quantity = quantity;
    saveCart();
    renderCartPage();
  }
}

// Clear cart
function clearCart() {
  if (confirm("Clear your entire quote cart? This cannot be undone.")) {
    cart = [];
    saveCart();
    renderCartPage();
    updateProductButtons();
    showToast("Quote cart cleared");
  }
}

// Get cart totals
function getCartTotals() {
  const itemCount = cart.length;
  const totalMetricTons = cart.reduce((sum, item) => sum + item.quantity, 0);
  return { itemCount, totalMetricTons };
}

// Update cart count badge in header
function updateCartCount() {
  const { itemCount } = getCartTotals();
  const badges = document.querySelectorAll(".cart-badge");
  badges.forEach(badge => {
    badge.textContent = itemCount;
    badge.style.display = itemCount > 0 ? "flex" : "none";
  });
}

// Update product card buttons (added state)
function updateProductButtons() {
  document.querySelectorAll(".product-btn").forEach(btn => {
    const productId = btn.dataset.productId;
    const inCart = cart.some(item => item.productId === productId);
    if (inCart) {
      btn.classList.add("added");
      btn.innerHTML = '<span>✓</span> Added';
    } else {
      btn.classList.remove("added");
      btn.innerHTML = '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg> Request Quote';
    }
  });
}

// Show toast notification
function showToast(message) {
  // Remove existing toasts
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <div class="toast-body">
      <span class="toast-icon">✓</span>
      <span class="toast-message">${message}</span>
    </div>
    <button class="toast-close">&times;</button>
  `;
  toast.style.cssText = `
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text);
    padding: 1rem 1.5rem;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    z-index: 1000;
    animation: slideIn 0.3s ease forwards;
  `;

  const closeBtn = toast.querySelector(".toast-close");
  closeBtn.style.cssText = `
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--muted);
    padding: 0;
    line-height: 1;
  `;
  closeBtn.onclick = () => toast.remove();

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Mobile menu toggle
function initMobileMenu() {
  const toggle = document.querySelector(".mobile-toggle");
  const menu = document.querySelector(".mobile-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
    const isOpen = menu.classList.contains("active");
    toggle.setAttribute("aria-expanded", isOpen);
  });

  // Close menu on link click
  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Initialize cart on all pages
function initCart() {
  loadCart();
  updateProductButtons();
}

// Format metric tons
function formatMT(value) {
  if (value % 1 === 0) return value.toLocaleString() + " MT";
  return value.toFixed(3).replace(/\.0+$/, "") + " MT";
}

// Render cart page items
function renderCartPage() {
  const container = document.getElementById("cart-items");
  const emptyState = document.getElementById("cart-empty");
  const summary = document.getElementById("cart-summary");
  const { itemCount, totalMetricTons } = getCartTotals();

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = "";
    if (emptyState) emptyState.style.display = "block";
    if (summary) summary.style.display = "none";
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  if (summary) summary.style.display = "block";

  container.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    if (!product) return "";

    return `
      <div class="cart-item fade-in">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'">
        </div>
        <div class="cart-item-details">
          <h4 class="cart-item-name">${product.name}</h4>
          <p class="cart-item-desc" style="font-size:0.85rem;color:var(--muted);margin:0.25rem 0 0 0;">${product.description}</p>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="updateCartQuantity('${item.productId}', ${item.quantity - 1})">−</button>
          <input type="text" class="qty-input" value="${item.quantity % 1 === 0 ? item.quantity : item.quantity.toFixed(3)}" onchange="updateCartQuantity('${item.productId}', parseFloat(this.value))">
          <button class="qty-btn" onclick="updateCartQuantity('${item.productId}', ${item.quantity + 1})">+</button>
        </div>
        <span style="font-weight:600;color:var(--text);">${formatMT(item.quantity)}</span>
        <button class="remove-btn" onclick="removeFromCart('${item.productId}')">&times;</button>
      </div>
    `;
  }).join("");

  // Update summary
  const summaryItems = document.getElementById("summary-items");
  const summaryTotal = document.getElementById("summary-total");
  if (summaryItems) summaryItems.textContent = itemCount;
  if (summaryTotal) summaryTotal.textContent = formatMT(totalMetricTons);
}

// Mock RFQ submission
function initRFQForm() {
  const form = document.getElementById("rfq-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast("Please add products to your quote first.");
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span style="display:flex;align-items:center;gap:0.5rem;"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/><path d="M9 10h.5M9 15h.5M12 10v.01M12 15v.01"/></svg> Preparing...</span>';
    btn.disabled = true;

    setTimeout(() => {
      const refId = "PFO-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      const snapshot = cart.map(item => {
        const p = products.find(prod => prod.id === item.productId);
        return { productName: p ? p.name : item.productId, quantity: item.quantity };
      });
      const total = getCartTotals().totalMetricTons;

      cart = [];
      saveCart();
      updateProductButtons();

      btn.innerHTML = originalText;
      btn.disabled = false;

      showRFQSuccess(refId, snapshot, total);
    }, 1200);
  });
}

// Show RFQ success modal
function showRFQSuccess(refId, items, total) {
  const modal = document.createElement("div");
  modal.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    animation: fadeIn 0.3s ease;
  `;
  modal.innerHTML = `
    <div class="rfq-modal" style="
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 2.5rem;
      max-width: 450px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: var(--shadow);
      text-align: center;
    ">
      <div style="width:56px;height:56px;background:rgba(57,115,74,0.1);color:var(--success);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;font-size:1.75rem;">✓</div>
      <h2 style="font-family:Georgia,serif;font-size:1.75rem;margin-bottom:0.5rem;">Demo RFQ Prepared</h2>
      <p style="color:var(--muted);font-size:0.95rem;margin-bottom:1.5rem;">Your mock request for quotation has been prepared. No data was transmitted to a server.</p>
      <div style="background:rgba(230,185,67,0.1);border:1px solid rgba(230,185,67,0.3);color:var(--gold);padding:1rem;border-radius:8px;margin-bottom:1.5rem;text-align:left;">
        <div style="font-size:0.8rem;color:var(--muted);margin-bottom:0.25rem;">Reference ID</div>
        <div style="font-family:monospace;font-weight:600;font-size:1.1rem;">${refId}</div>
      </div>
      <div style="margin-bottom:1.5rem;text-align:left;">
        <div style="font-size:0.8rem;color:var(--muted);margin-bottom:0.25rem;">Items (${items.length})</div>
        <div style="font-size:0.9rem;color:var(--text);">${items.map(i => `${i.productName} × ${formatMT(i.quantity)}`).join(", ")}</div>
        <div style="margin-top:0.5rem;font-weight:600;color:var(--primary);">Total: ${formatMT(total)}</div>
      </div>
      <button onclick="this.closest('[style]').remove()" class="btn-primary" style="width:100%;">Close</button>
    </div>
  `;
  document.body.appendChild(modal);

  // Close on backdrop click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });
}

// Toast animation
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initCart();
  renderCartPage();
  initRFQForm();
});

// Expose to global for inline handlers
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.clearCart = clearCart;
