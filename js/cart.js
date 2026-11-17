/**
 * Cart & State Management Service
 * Handles localStorage persistence, currency formatting, toast notifications,
 * and cart drawer interactions.
 */

import { PRODUCTS } from './data.js';

const CART_STORAGE_KEY = 'ecom_cart_v1';
const WISHLIST_STORAGE_KEY = 'ecom_wishlist_v1';

/**
 * Format a number as Indian Rupee (₹)
 * e.g., 9999 -> ₹9,999
 */
export function formatINR(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) {
    amount = 0;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Read current cart from localStorage
 * Returns array of { product, quantity, addedAt }
 */
export function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    const stored = raw ? JSON.parse(raw) : [];
    // Hydrate each stored item with latest product data
    return stored.map(item => {
      const fullProduct = PRODUCTS.find(p => p.id === item.id);
      return {
        id: item.id,
        quantity: Math.max(1, parseInt(item.quantity, 10) || 1),
        product: fullProduct || null
      };
    }).filter(item => item.product !== null);
  } catch (e) {
    console.error('Failed to parse cart storage:', e);
    return [];
  }
}

/**
 * Save cart array to localStorage and notify listeners
 */
function saveCart(cartItems) {
  const minimal = cartItems.map(item => ({
    id: item.id,
    quantity: item.quantity
  }));
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(minimal));
  window.dispatchEvent(new CustomEvent('cart:updated', { detail: { count: getCartCount(), cart: getCart() } }));
}

/**
 * Add a product to the cart
 */
export function addToCart(productId, quantity = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) {
    showToast('Product not found.', 'error');
    return false;
  }
  if (!product.inStock) {
    showToast('Sorry, this product is currently out of stock.', 'warning');
    return false;
  }

  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === productId);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: productId,
      quantity: quantity,
      product: product
    });
  }

  saveCart(cart);
  showToast(`Added "${product.name.slice(0, 30)}..." to your cart!`, 'success');
  return true;
}

/**
 * Update the quantity of a specific item in the cart
 */
export function updateCartQuantity(productId, newQuantity) {
  let cart = getCart();
  if (newQuantity <= 0) {
    return removeFromCart(productId);
  }

  const target = cart.find(item => item.id === productId);
  if (target) {
    target.quantity = newQuantity;
    saveCart(cart);
  }
  return cart;
}

/**
 * Remove an item from the cart
 */
export function removeFromCart(productId) {
  const cart = getCart();
  const updated = cart.filter(item => item.id !== productId);
  saveCart(updated);
  showToast('Item removed from cart.', 'info');
  return updated;
}

/**
 * Clear the entire cart
 */
export function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('cart:updated', { detail: { count: 0, cart: [] } }));
}

/**
 * Total item count across all quantities in cart
 */
export function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Subtotal in ₹ of all items in cart
 */
export function getCartSubtotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

// ----------------- WISHLIST MANAGEMENT -----------------

export function getWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function toggleWishlist(productId) {
  const list = getWishlist();
  const exists = list.includes(productId);
  let updated;
  if (exists) {
    updated = list.filter(id => id !== productId);
    showToast('Removed from wishlist.', 'info');
  } else {
    updated = [...list, productId];
    showToast('Saved to wishlist!', 'success');
  }
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent('wishlist:updated', { detail: { wishlist: updated } }));
  return !exists;
}

export function isInWishlist(productId) {
  const list = getWishlist();
  return list.includes(productId);
}

// ----------------- TOAST NOTIFICATIONS -----------------

export function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;
  
  let iconClass = 'ri-information-line';
  if (type === 'success') iconClass = 'ri-checkbox-circle-line';
  if (type === 'error') iconClass = 'ri-close-circle-line';
  if (type === 'warning') iconClass = 'ri-alert-line';

  toast.innerHTML = `
    <i class="${iconClass} toast-icon"></i>
    <span class="toast-message">${message}</span>
    <button class="toast-close" aria-label="Close">&times;</button>
  `;

  container.appendChild(toast);

  const removeToast = () => {
    toast.classList.add('toast-hiding');
    setTimeout(() => {
      toast.remove();
    }, 300);
  };

  toast.querySelector('.toast-close').addEventListener('click', removeToast);
  setTimeout(removeToast, 3500);
}

// ----------------- CART DRAWER & HEADER BADGE -----------------

export function updateHeaderBadges() {
  const badgeEls = document.querySelectorAll('.cart-count-badge');
  const count = getCartCount();
  badgeEls.forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'inline-flex' : 'none';
  });

  const wishlistBadgeEls = document.querySelectorAll('.wishlist-count-badge');
  const wishlistCount = getWishlist().length;
  wishlistBadgeEls.forEach(el => {
    el.textContent = wishlistCount;
    el.style.display = wishlistCount > 0 ? 'inline-flex' : 'none';
  });
}

/**
 * Render drawer contents
 */
export function renderCartDrawer() {
  const drawerBody = document.getElementById('cart-drawer-items');
  const drawerSubtotal = document.getElementById('cart-drawer-subtotal');
  if (!drawerBody) return;

  const cart = getCart();

  if (cart.length === 0) {
    drawerBody.innerHTML = `
      <div class="cart-empty-state">
        <i class="ri-shopping-bag-3-line empty-icon"></i>
        <p class="empty-title">Your shopping cart is empty</p>
        <p class="empty-subtitle">Explore our handpicked collection and add your favorite items!</p>
        <button class="btn btn-primary btn-sm close-drawer-btn">Start Shopping</button>
      </div>
    `;
    const startShopBtn = drawerBody.querySelector('.close-drawer-btn');
    if (startShopBtn) {
      startShopBtn.addEventListener('click', closeCartDrawer);
    }
    if (drawerSubtotal) drawerSubtotal.textContent = formatINR(0);
    return;
  }

  drawerBody.innerHTML = cart.map(item => `
    <div class="drawer-item" data-id="${item.id}">
      <img src="${item.product.image}" alt="${item.product.name}" class="drawer-item-img" />
      <div class="drawer-item-info">
        <a href="product-detail.html?id=${item.id}" class="drawer-item-title">${item.product.name}</a>
        <div class="drawer-item-price">${formatINR(item.product.price)}</div>
        <div class="drawer-item-actions">
          <div class="quantity-stepper-sm">
            <button class="step-btn step-minus" data-id="${item.id}" aria-label="Decrease">&minus;</button>
            <span class="step-val">${item.quantity}</span>
            <button class="step-btn step-plus" data-id="${item.id}" aria-label="Increase">&plus;</button>
          </div>
          <button class="drawer-remove-btn" data-id="${item.id}" aria-label="Remove item">
            <i class="ri-delete-bin-line"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  if (drawerSubtotal) {
    drawerSubtotal.textContent = formatINR(getCartSubtotal());
  }

  // Bind drawer action buttons
  drawerBody.querySelectorAll('.step-minus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const curItem = cart.find(i => i.id === id);
      if (curItem) {
        updateCartQuantity(id, curItem.quantity - 1);
        renderCartDrawer();
      }
    });
  });

  drawerBody.querySelectorAll('.step-plus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const curItem = cart.find(i => i.id === id);
      if (curItem) {
        updateCartQuantity(id, curItem.quantity + 1);
        renderCartDrawer();
      }
    });
  });

  drawerBody.querySelectorAll('.drawer-remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      removeFromCart(btn.dataset.id);
      renderCartDrawer();
    });
  });
}

export function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (drawer && overlay) {
    renderCartDrawer();
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
}

export function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (drawer && overlay) {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}

/**
 * Initialize shared cart listener and drawer bindings
 */
export function initCartDrawer() {
  updateHeaderBadges();

  window.addEventListener('cart:updated', () => {
    updateHeaderBadges();
    renderCartDrawer();
  });

  window.addEventListener('wishlist:updated', () => {
    updateHeaderBadges();
  });

  const cartTriggers = document.querySelectorAll('.cart-drawer-trigger');
  cartTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCartDrawer();
    });
  });

  const closeBtn = document.getElementById('close-drawer-btn');
  if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);

  const overlay = document.getElementById('drawer-overlay');
  if (overlay) overlay.addEventListener('click', closeCartDrawer);

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCartDrawer();
    }
  });
}
