/**
 * Shopping Cart Page Controller
 * Handles line-item rendering, quantity adjustments, item deletions,
 * coupon/promo code calculations, and simulated checkout flow.
 */

import {
  formatINR,
  getCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  initCartDrawer
} from './cart.js';

// Available mock promo codes
const PROMO_CODES = {
  'SAVE10': { type: 'percent', value: 10, label: '10% Off' },
  'FLAT500': { type: 'flat', value: 500, minOrder: 2000, label: '₹500 Off (Orders > ₹2,000)' },
  'WELCOME': { type: 'percent', value: 15, label: '15% Off Welcome Bonus' }
};

let appliedCoupon = null;

document.addEventListener('DOMContentLoaded', () => {
  initCartDrawer();
  renderCartPage();
  initCouponHandler();
  initCheckoutModal();

  window.addEventListener('cart:updated', () => {
    renderCartPage();
  });
});

/**
 * Render main cart page items & summary
 */
function renderCartPage() {
  const container = document.getElementById('cart-items-container');
  const emptyView = document.getElementById('cart-empty-view');
  const cartContent = document.getElementById('cart-content-view');
  if (!container || !emptyView || !cartContent) return;

  const cart = getCart();

  if (cart.length === 0) {
    emptyView.style.display = 'flex';
    cartContent.style.display = 'none';
    return;
  }

  emptyView.style.display = 'none';
  cartContent.style.display = 'grid';

  // Render item rows
  container.innerHTML = cart.map(item => {
    const lineTotal = item.product.price * item.quantity;
    return `
      <div class="cart-table-row" data-id="${item.id}">
        <div class="cart-col-product">
          <img src="${item.product.image}" alt="${item.product.name}" class="cart-product-thumb" />
          <div class="cart-product-meta">
            <span class="cart-item-cat">${item.product.category.toUpperCase()}</span>
            <a href="product-detail.html?id=${item.id}" class="cart-product-title">${item.product.name}</a>
            <span class="cart-unit-price-mobile">${formatINR(item.product.price)} each</span>
          </div>
        </div>

        <div class="cart-col-price">
          <span class="cart-cell-price">${formatINR(item.product.price)}</span>
        </div>

        <div class="cart-col-qty">
          <div class="cart-qty-stepper">
            <button class="cart-step-btn btn-minus" data-id="${item.id}" aria-label="Decrease">&minus;</button>
            <span class="cart-qty-val">${item.quantity}</span>
            <button class="cart-step-btn btn-plus" data-id="${item.id}" aria-label="Increase">&plus;</button>
          </div>
        </div>

        <div class="cart-col-total">
          <span class="cart-line-total">${formatINR(lineTotal)}</span>
        </div>

        <div class="cart-col-remove">
          <button class="cart-item-remove-btn" data-id="${item.id}" aria-label="Remove item">
            <i class="ri-delete-bin-6-line"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Bind cart row actions
  container.querySelectorAll('.btn-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const item = cart.find(i => i.id === id);
      if (item) {
        updateCartQuantity(id, item.quantity - 1);
      }
    });
  });

  container.querySelectorAll('.btn-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const item = cart.find(i => i.id === id);
      if (item) {
        updateCartQuantity(id, item.quantity + 1);
      }
    });
  });

  container.querySelectorAll('.cart-item-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(btn.dataset.id);
    });
  });

  updateOrderSummary(cart);
}

/**
 * Recalculate and update the order summary card
 */
function updateOrderSummary(cart) {
  const subtotalEl = document.getElementById('summary-subtotal');
  const shippingEl = document.getElementById('summary-shipping');
  const discountRow = document.getElementById('summary-discount-row');
  const discountEl = document.getElementById('summary-discount');
  const totalEl = document.getElementById('summary-total');
  const shippingNotice = document.getElementById('shipping-threshold-notice');

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  // Free shipping threshold: ₹999
  const isFreeShipping = subtotal >= 999;
  const shippingFee = (subtotal === 0 || isFreeShipping) ? 0 : 99;

  if (shippingNotice) {
    if (subtotal < 999 && subtotal > 0) {
      const remaining = 999 - subtotal;
      shippingNotice.innerHTML = `<i class="ri-information-line"></i> Add <strong>${formatINR(remaining)}</strong> more for <strong>FREE Delivery</strong>!`;
      shippingNotice.style.display = 'block';
    } else {
      shippingNotice.innerHTML = `<i class="ri-checkbox-circle-fill"></i> Congratulations! You unlocked <strong>FREE Delivery</strong>.`;
      shippingNotice.style.display = 'block';
    }
  }

  // Calculate discount if coupon applied
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      discountAmount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.type === 'flat') {
      if (subtotal >= (appliedCoupon.minOrder || 0)) {
        discountAmount = appliedCoupon.value;
      } else {
        // Condition no longer met
        appliedCoupon = null;
        discountAmount = 0;
      }
    }
  }

  if (discountRow && discountEl) {
    if (discountAmount > 0) {
      discountRow.style.display = 'flex';
      discountEl.textContent = `-${formatINR(discountAmount)}`;
    } else {
      discountRow.style.display = 'none';
    }
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  if (subtotalEl) subtotalEl.textContent = formatINR(subtotal);
  if (shippingEl) {
    shippingEl.innerHTML = shippingFee === 0 
      ? '<span class="text-free-shipping">FREE</span>' 
      : formatINR(shippingFee);
  }
  if (totalEl) totalEl.textContent = formatINR(grandTotal);
}

/**
 * Coupon input handler
 */
function initCouponHandler() {
  const couponInput = document.getElementById('coupon-input');
  const couponBtn = document.getElementById('apply-coupon-btn');
  const couponMsg = document.getElementById('coupon-message');
  const couponAppliedTag = document.getElementById('coupon-applied-tag');

  if (!couponBtn || !couponInput) return;

  couponBtn.addEventListener('click', () => {
    const code = couponInput.value.trim().toUpperCase();
    if (!code) {
      showCouponMessage('Please enter a coupon code.', 'error');
      return;
    }

    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    const coupon = PROMO_CODES[code];
    if (!coupon) {
      showCouponMessage('Invalid code. Try "SAVE10", "WELCOME", or "FLAT500".', 'error');
      return;
    }

    if (coupon.minOrder && subtotal < coupon.minOrder) {
      showCouponMessage(`Minimum order value of ${formatINR(coupon.minOrder)} required for ${code}.`, 'warning');
      return;
    }

    appliedCoupon = { code, ...coupon };
    showCouponMessage(`Coupon ${code} applied successfully!`, 'success');
    
    if (couponAppliedTag) {
      couponAppliedTag.style.display = 'flex';
      couponAppliedTag.innerHTML = `
        <span><i class="ri-price-tag-3-fill"></i> ${code} (${coupon.label})</span>
        <button id="remove-coupon-btn" aria-label="Remove coupon">&times;</button>
      `;

      const removeBtn = document.getElementById('remove-coupon-btn');
      if (removeBtn) {
        removeBtn.addEventListener('click', () => {
          appliedCoupon = null;
          couponAppliedTag.style.display = 'none';
          couponInput.value = '';
          couponMsg.style.display = 'none';
          updateOrderSummary(getCart());
        });
      }
    }

    updateOrderSummary(cart);
  });

  function showCouponMessage(msg, type) {
    if (!couponMsg) return;
    couponMsg.textContent = msg;
    couponMsg.className = `coupon-msg msg-${type}`;
    couponMsg.style.display = 'block';
  }
}

/**
 * Checkout Modal & Simulated Flow
 */
function initCheckoutModal() {
  const checkoutBtn = document.getElementById('proceed-checkout-btn');
  const modal = document.getElementById('checkout-modal');
  const overlay = document.getElementById('checkout-overlay');
  const closeBtn = document.getElementById('close-checkout-modal');
  const form = document.getElementById('checkout-form');
  const stepShipping = document.getElementById('checkout-step-form');
  const stepSuccess = document.getElementById('checkout-step-success');

  if (!checkoutBtn || !modal) return;

  const openCheckout = () => {
    const cart = getCart();
    if (cart.length === 0) return;

    if (stepShipping) stepShipping.style.display = 'block';
    if (stepSuccess) stepSuccess.style.display = 'none';

    // Update modal total
    const modalTotalEl = document.getElementById('modal-payable-total');
    if (modalTotalEl) {
      const summaryTotal = document.getElementById('summary-total');
      modalTotalEl.textContent = summaryTotal ? summaryTotal.textContent : '₹0';
    }

    modal.classList.add('is-open');
    if (overlay) overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeCheckout = () => {
    modal.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  checkoutBtn.addEventListener('click', openCheckout);
  if (closeBtn) closeBtn.addEventListener('click', closeCheckout);
  if (overlay) overlay.addEventListener('click', closeCheckout);

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="ri-loader-4-line spin-icon"></i> Processing Order...`;

      // Simulate payment network processing
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        const orderId = `IND-${Math.floor(100000 + Math.random() * 900000)}`;
        const orderIdEl = document.getElementById('success-order-id');
        if (orderIdEl) orderIdEl.textContent = orderId;

        // Display success view
        if (stepShipping) stepShipping.style.display = 'none';
        if (stepSuccess) stepSuccess.style.display = 'block';

        // Clear cart
        clearCart();
      }, 1500);
    });
  }

  const successContinueBtn = document.getElementById('success-continue-shopping');
  if (successContinueBtn) {
    successContinueBtn.addEventListener('click', () => {
      closeCheckout();
      window.location.href = 'index.html';
    });
  }
}
