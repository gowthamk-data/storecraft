/**
 * Product Details Page Controller
 * Reads URL parameter ?id=..., renders rich product gallery, detailed specs,
 * customer reviews, and dynamic related products.
 */

import { PRODUCTS, CATEGORIES } from './data.js';
import {
  formatINR,
  addToCart,
  toggleWishlist,
  isInWishlist,
  initCartDrawer
} from './cart.js';
import { renderStars } from './app.js';

document.addEventListener('DOMContentLoaded', () => {
  initCartDrawer();
  loadProductDetails();
});

function loadProductDetails() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  const container = document.getElementById('product-detail-container');
  if (!container) return;

  const product = PRODUCTS.find(p => p.id === productId);

  if (!product) {
    renderNotFound(container);
    return;
  }

  // Update document title
  document.title = `${product.name} — StoreCraft`;

  // Render Breadcrumb
  const categoryObj = CATEGORIES.find(c => c.id === product.category);
  const categoryName = categoryObj ? categoryObj.name : product.category;

  const breadcrumbEl = document.getElementById('detail-breadcrumb');
  if (breadcrumbEl) {
    breadcrumbEl.innerHTML = `
      <a href="index.html">Home</a>
      <i class="ri-arrow-right-s-line"></i>
      <a href="index.html?category=${product.category}">${categoryName}</a>
      <i class="ri-arrow-right-s-line"></i>
      <span class="breadcrumb-current">${product.name}</span>
    `;
  }

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;
  const savingsAmount = product.originalPrice ? (product.originalPrice - product.price) : 0;
  const isWished = isInWishlist(product.id);
  const galleryImages = product.gallery && product.gallery.length ? product.gallery : [product.image];

  container.innerHTML = `
    <div class="detail-grid">
      <!-- Media Gallery Column -->
      <div class="detail-gallery-col">
        <div class="detail-main-img-box">
          <img src="${galleryImages[0]}" alt="${product.name}" id="detail-main-image" class="detail-main-img" />
          ${product.badge ? `<span class="product-badge badge-custom detail-badge">${product.badge}</span>` : ''}
          ${discountPercent > 0 ? `<span class="product-badge badge-discount detail-discount-badge">${discountPercent}% OFF</span>` : ''}
        </div>
        
        <div class="detail-thumbnails">
          ${galleryImages.map((img, idx) => `
            <button class="thumb-btn ${idx === 0 ? 'is-active' : ''}" data-src="${img}" aria-label="View image ${idx + 1}">
              <img src="${img}" alt="${product.name} thumbnail ${idx + 1}" />
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Product Information Column -->
      <div class="detail-info-col">
        <div class="detail-category-label">
          <a href="index.html?category=${product.category}">${categoryName}</a>
        </div>

        <h1 class="detail-title">${product.name}</h1>

        <div class="detail-rating-row">
          <div class="rating-stars">${renderStars(product.rating)}</div>
          <span class="detail-rating-num">${product.rating}</span>
          <span class="detail-reviews-num">(${product.reviewsCount} verified ratings)</span>
          <span class="divider">&bull;</span>
          <span class="detail-sku">SKU: ${product.id.toUpperCase()}</span>
        </div>

        <div class="detail-price-card">
          <div class="detail-price-row">
            <span class="detail-price">${formatINR(product.price)}</span>
            ${product.originalPrice ? `<span class="detail-original-price">${formatINR(product.originalPrice)}</span>` : ''}
          </div>
          ${savingsAmount > 0 ? `
            <div class="detail-savings">
              <i class="ri-price-tag-3-line"></i>
              You save ${formatINR(savingsAmount)} (${discountPercent}% off MRP, inclusive of all taxes)
            </div>
          ` : ''}
        </div>

        <div class="detail-stock-row ${product.inStock ? 'is-in-stock' : 'is-out-of-stock'}">
          <i class="${product.inStock ? 'ri-checkbox-circle-fill' : 'ri-error-warning-fill'}"></i>
          <span>${product.inStock ? 'In Stock — Ready to ship from warehouse' : 'Currently Out of Stock'}</span>
        </div>

        <p class="detail-description">${product.description}</p>

        <!-- Key Highlights -->
        <div class="detail-highlights">
          <h4 class="highlights-title">Key Highlights</h4>
          <ul class="highlights-list">
            ${product.features.map(f => `
              <li><i class="ri-checkbox-circle-line"></i> ${f}</li>
            `).join('')}
          </ul>
        </div>

        <!-- Quantity & Purchase Actions -->
        <div class="detail-purchase-section">
          <div class="purchase-row">
            <div class="quantity-controller">
              <button class="qty-step-btn" id="detail-qty-minus" aria-label="Decrease quantity">&minus;</button>
              <input type="number" id="detail-qty-input" value="1" min="1" max="10" readonly />
              <button class="qty-step-btn" id="detail-qty-plus" aria-label="Increase quantity">&plus;</button>
            </div>

            <button 
              class="btn btn-primary btn-lg flex-1" 
              id="detail-add-cart-btn"
              ${!product.inStock ? 'disabled' : ''}
            >
              <i class="ri-shopping-cart-2-line"></i>
              <span>${product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
            </button>

            <button class="wishlist-action-btn ${isWished ? 'is-active' : ''}" id="detail-wishlist-btn" aria-label="Add to wishlist">
              <i class="${isWished ? 'ri-heart-fill' : 'ri-heart-line'}"></i>
            </button>
          </div>

          <button 
            class="btn btn-secondary btn-lg btn-buy-now" 
            id="detail-buy-now-btn"
            ${!product.inStock ? 'disabled' : ''}
          >
            <i class="ri-flashlight-line"></i> Buy Now
          </button>
        </div>

        <!-- Trust Badges -->
        <div class="detail-trust-badges">
          <div class="trust-item">
            <i class="ri-truck-line"></i>
            <div>
              <strong>Free Fast Delivery</strong>
              <span>On all orders over ₹999</span>
            </div>
          </div>
          <div class="trust-item">
            <i class="ri-arrow-go-back-line"></i>
            <div>
              <strong>7-Day Easy Returns</strong>
              <span>Hassle-free replacement</span>
            </div>
          </div>
          <div class="trust-item">
            <i class="ri-shield-check-line"></i>
            <div>
              <strong>100% Genuine Item</strong>
              <span>Verified seller warranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Tabs: Specifications, Description, Reviews -->
    <div class="detail-tabs-section">
      <div class="tab-nav">
        <button class="tab-btn is-active" data-tab="tab-specs">Specifications</button>
        <button class="tab-btn" data-tab="tab-desc">Overview & Details</button>
        <button class="tab-btn" data-tab="tab-shipping">Shipping & Policies</button>
        <button class="tab-btn" data-tab="tab-reviews">Customer Reviews (${product.reviewsCount})</button>
      </div>

      <div class="tab-panes">
        <!-- Tab 1: Specs -->
        <div class="tab-pane is-active" id="tab-specs">
          <table class="specs-table">
            <tbody>
              ${Object.entries(product.specs || {}).map(([key, value]) => `
                <tr>
                  <th>${key}</th>
                  <td>${value}</td>
                </tr>
              `).join('')}
              <tr>
                <th>Category</th>
                <td>${categoryName}</td>
              </tr>
              <tr>
                <th>Stock Availability</th>
                <td>${product.inStock ? 'Ready for Dispatch' : 'Backorder Expected'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Tab 2: Full Description -->
        <div class="tab-pane" id="tab-desc">
          <div class="tab-prose">
            <h3>Designed for Modern Living</h3>
            <p>${product.description}</p>
            <p>Every element of this item has been crafted to satisfy high standards of durability, performance, and everyday aesthetic appeal. Enjoy peace of mind backed by our customer satisfaction commitment.</p>
            <h4>Feature Checklist</h4>
            <ul>
              ${product.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- Tab 3: Shipping & Returns -->
        <div class="tab-pane" id="tab-shipping">
          <div class="tab-prose">
            <h3>Fast & Insured Shipping Across India</h3>
            <p>We partner with top-tier courier networks (BlueDart, Delhivery, DTDC) to deliver your purchases safely.</p>
            <ul>
              <li><strong>Standard Delivery:</strong> 3-5 business days across metros and major cities.</li>
              <li><strong>Express Delivery:</strong> 1-2 business days for select PIN codes.</li>
              <li><strong>Shipping Charge:</strong> Free on all orders exceeding ₹999. Flat ₹99 for smaller orders.</li>
              <li><strong>Returns Policy:</strong> 7-day doorstep pickup if damaged or defective on arrival.</li>
            </ul>
          </div>
        </div>

        <!-- Tab 4: Reviews -->
        <div class="tab-pane" id="tab-reviews">
          <div class="reviews-summary-card">
            <div class="reviews-overall">
              <span class="overall-score">${product.rating}</span>
              <div class="rating-stars">${renderStars(product.rating)}</div>
              <p>Based on ${product.reviewsCount} customer experiences</p>
            </div>
          </div>

          <div class="reviews-list">
            <div class="review-item">
              <div class="review-header">
                <strong>Aarav Sharma</strong>
                <span class="verified-tag"><i class="ri-checkbox-circle-fill"></i> Verified Purchase</span>
                <span class="review-date">3 days ago</span>
              </div>
              <div class="rating-stars">${renderStars(5)}</div>
              <p class="review-body">Exceptional quality! Delivered in just 2 days in immaculate packaging. Performs exactly as described, easily 5 stars.</p>
            </div>

            <div class="review-item">
              <div class="review-header">
                <strong>Priya Natarajan</strong>
                <span class="verified-tag"><i class="ri-checkbox-circle-fill"></i> Verified Purchase</span>
                <span class="review-date">1 week ago</span>
              </div>
              <div class="rating-stars">${renderStars(4.5)}</div>
              <p class="review-body">Extremely satisfied with the build quality and premium finish. Value for money is unmatched compared to competitors.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Products Section -->
    <div class="related-products-section">
      <div class="section-header">
        <h2 class="section-title">You May Also Like</h2>
        <p class="section-subtitle">More popular items from ${categoryName}</p>
      </div>
      <div class="related-grid" id="related-grid"></div>
    </div>
  `;

  // Bind thumbnails
  bindThumbnails(galleryImages);

  // Bind quantity picker
  bindQuantityPicker(product);

  // Bind tabs
  bindTabs();

  // Render related products
  renderRelatedProducts(product);
}

function bindThumbnails(images) {
  const mainImg = document.getElementById('detail-main-image');
  const thumbBtns = document.querySelectorAll('.thumb-btn');

  thumbBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      thumbBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      mainImg.src = btn.dataset.src;
    });
  });
}

function bindQuantityPicker(product) {
  const qtyMinus = document.getElementById('detail-qty-minus');
  const qtyPlus = document.getElementById('detail-qty-plus');
  const qtyInput = document.getElementById('detail-qty-input');
  const addCartBtn = document.getElementById('detail-add-cart-btn');
  const buyNowBtn = document.getElementById('detail-buy-now-btn');
  const wishlistBtn = document.getElementById('detail-wishlist-btn');

  let currentQty = 1;

  if (qtyMinus && qtyPlus && qtyInput) {
    qtyMinus.addEventListener('click', () => {
      if (currentQty > 1) {
        currentQty--;
        qtyInput.value = currentQty;
      }
    });

    qtyPlus.addEventListener('click', () => {
      if (currentQty < 10) {
        currentQty++;
        qtyInput.value = currentQty;
      }
    });
  }

  if (addCartBtn && product.inStock) {
    addCartBtn.addEventListener('click', () => {
      addToCart(product.id, currentQty);
    });
  }

  if (buyNowBtn && product.inStock) {
    buyNowBtn.addEventListener('click', () => {
      addToCart(product.id, currentQty);
      window.location.href = 'cart.html';
    });
  }

  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
      const isNowWished = toggleWishlist(product.id);
      wishlistBtn.classList.toggle('is-active', isNowWished);
      wishlistBtn.querySelector('i').className = isNowWished ? 'ri-heart-fill' : 'ri-heart-line';
    });
  }
}

function bindTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('is-active'));
      tabPanes.forEach(p => p.classList.remove('is-active'));

      btn.classList.add('is-active');
      const targetPane = document.getElementById(btn.dataset.tab);
      if (targetPane) targetPane.classList.add('is-active');
    });
  });
}

function renderRelatedProducts(currentProduct) {
  const relatedGrid = document.getElementById('related-grid');
  if (!relatedGrid) return;

  const related = PRODUCTS
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 4);

  if (related.length === 0) {
    relatedGrid.closest('.related-products-section').style.display = 'none';
    return;
  }

  relatedGrid.innerHTML = related.map(p => `
    <div class="product-card">
      <div class="product-card-top">
        ${p.badge ? `<span class="product-badge badge-custom">${p.badge}</span>` : ''}
        <a href="product-detail.html?id=${p.id}" class="product-image-link">
          <img src="${p.image}" alt="${p.name}" class="product-image" loading="lazy" />
        </a>
      </div>
      <div class="product-card-body">
        <span class="product-category-tag">${p.category.toUpperCase()}</span>
        <h3 class="product-title">
          <a href="product-detail.html?id=${p.id}">${p.name}</a>
        </h3>
        <div class="product-rating">
          <div class="rating-stars">${renderStars(p.rating)}</div>
          <span class="rating-score">${p.rating}</span>
        </div>
        <div class="product-price-row">
          <span class="current-price">${formatINR(p.price)}</span>
        </div>
        <div class="product-card-footer">
          <button class="btn btn-primary btn-sm btn-related-add" data-id="${p.id}">
            <i class="ri-shopping-cart-2-line"></i> Add
          </button>
        </div>
      </div>
    </div>
  `).join('');

  relatedGrid.querySelectorAll('.btn-related-add').forEach(btn => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.id, 1);
    });
  });
}

function renderNotFound(container) {
  container.innerHTML = `
    <div class="product-not-found">
      <i class="ri-file-search-line not-found-icon"></i>
      <h2>Product Not Found</h2>
      <p>The product you are looking for may have been removed, renamed, or is temporarily unavailable.</p>
      <a href="index.html" class="btn btn-primary btn-lg">
        <i class="ri-arrow-left-line"></i> Return to Store Catalog
      </a>
    </div>
  `;
}
