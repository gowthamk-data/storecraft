/**
 * Main Store Controller
 * Handles Category Navigation, Real-time Filters, Sorting, Search,
 * Product Grid Rendering, and Quick View Modal.
 */

import { PRODUCTS, CATEGORIES } from './data.js';
import {
  formatINR,
  addToCart,
  toggleWishlist,
  isInWishlist,
  initCartDrawer
} from './cart.js';

// Application state
const state = {
  category: 'all',
  searchQuery: '',
  maxPrice: 15000,
  minRating: 0,
  inStockOnly: false,
  hasDiscountOnly: false,
  sortBy: 'featured'
};

// DOM Elements
const heroCategoriesGrid = document.getElementById('hero-categories-grid');
const categoryPillsContainer = document.getElementById('category-pills');
const productsGrid = document.getElementById('products-grid');
const resultsCountEl = document.getElementById('results-count');
const activeFilterChipsEl = document.getElementById('active-filter-chips');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const priceRangeInput = document.getElementById('price-range');
const priceRangeValue = document.getElementById('price-range-value');
const ratingFilters = document.querySelectorAll('input[name="rating-filter"]');
const inStockCheckbox = document.getElementById('in-stock-checkbox');
const discountCheckbox = document.getElementById('discount-checkbox');
const resetFiltersBtn = document.getElementById('reset-filters-btn');
const mobileFilterToggle = document.getElementById('mobile-filter-toggle');
const filterSidebar = document.getElementById('filter-sidebar');
const closeFilterSidebar = document.getElementById('close-filter-sidebar');
const quickViewModal = document.getElementById('quick-view-modal');
const quickViewModalContent = document.getElementById('quick-view-content');

/**
 * Initialize application
 */
document.addEventListener('DOMContentLoaded', () => {
  initCartDrawer();
  initCategoryCards();
  initCategoryPills();
  initFilterControls();
  checkUrlParams();
  applyFiltersAndRender();
  initQuickViewModal();
});

/**
 * Check if category or search is passed in URL query param
 */
function checkUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get('category');
  const searchParam = params.get('q');

  if (catParam && CATEGORIES.some(c => c.id === catParam)) {
    state.category = catParam;
  }
  if (searchParam) {
    state.searchQuery = searchParam;
    if (searchInput) searchInput.value = searchParam;
  }
}

/**
 * Render visual Hero Category Cards
 */
function initCategoryCards() {
  if (!heroCategoriesGrid) return;

  // Render cards for all specific categories (excluding "all")
  const specificCategories = CATEGORIES.filter(c => c.id !== 'all');

  heroCategoriesGrid.innerHTML = specificCategories.map(cat => {
    const count = PRODUCTS.filter(p => p.category === cat.id).length;
    return `
      <div class="category-card ${state.category === cat.id ? 'is-active' : ''}" data-category="${cat.id}">
        <div class="category-card-img-wrap">
          <img src="${cat.cardImage}" alt="${cat.name}" loading="lazy" />
          <div class="category-card-overlay"></div>
        </div>
        <div class="category-card-content">
          <div class="category-card-icon"><i class="${cat.icon}"></i></div>
          <h3 class="category-card-title">${cat.name}</h3>
          <p class="category-card-count">${count} Products</p>
        </div>
      </div>
    `;
  }).join('');

  heroCategoriesGrid.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const selectedCat = card.dataset.category;
      setCategory(selectedCat);
      scrollToCatalog();
    });
  });
}

/**
 * Render Sticky Category Pills Bar
 */
function initCategoryPills() {
  if (!categoryPillsContainer) return;

  categoryPillsContainer.innerHTML = CATEGORIES.map(cat => {
    const count = cat.id === 'all' 
      ? PRODUCTS.length 
      : PRODUCTS.filter(p => p.category === cat.id).length;
    return `
      <button class="pill-btn ${state.category === cat.id ? 'is-active' : ''}" data-category="${cat.id}">
        <i class="${cat.icon}"></i>
        <span>${cat.name}</span>
        <span class="pill-count">${count}</span>
      </button>
    `;
  }).join('');

  categoryPillsContainer.querySelectorAll('.pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setCategory(btn.dataset.category);
    });
  });
}

/**
 * Set active category and sync UI controls
 */
function setCategory(categoryId) {
  state.category = categoryId;

  // Update URL state without page reload
  const url = new URL(window.location);
  if (categoryId === 'all') {
    url.searchParams.delete('category');
  } else {
    url.searchParams.set('category', categoryId);
  }
  window.history.replaceState({}, '', url);

  // Sync Category Cards
  if (heroCategoriesGrid) {
    heroCategoriesGrid.querySelectorAll('.category-card').forEach(c => {
      c.classList.toggle('is-active', c.dataset.category === categoryId);
    });
  }

  // Sync Category Pills
  if (categoryPillsContainer) {
    categoryPillsContainer.querySelectorAll('.pill-btn').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.category === categoryId);
    });
  }

  // Sync radio in filter sidebar
  const sidebarCategoryInput = document.querySelector(`input[name="sidebar-category"][value="${categoryId}"]`);
  if (sidebarCategoryInput) {
    sidebarCategoryInput.checked = true;
  }

  applyFiltersAndRender();
}

/**
 * Initialize event listeners on filters
 */
function initFilterControls() {
  // Search input with debounce
  let searchTimeout;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        state.searchQuery = e.target.value.trim().toLowerCase();
        applyFiltersAndRender();
      }, 250);
    });
  }

  // Price range slider
  if (priceRangeInput && priceRangeValue) {
    priceRangeInput.addEventListener('input', (e) => {
      state.maxPrice = Number(e.target.value);
      priceRangeValue.textContent = formatINR(state.maxPrice);
      applyFiltersAndRender();
    });
  }

  // Rating radio filters
  ratingFilters.forEach(radio => {
    radio.addEventListener('change', (e) => {
      state.minRating = Number(e.target.value);
      applyFiltersAndRender();
    });
  });

  // Checkboxes
  if (inStockCheckbox) {
    inStockCheckbox.addEventListener('change', (e) => {
      state.inStockOnly = e.target.checked;
      applyFiltersAndRender();
    });
  }

  if (discountCheckbox) {
    discountCheckbox.addEventListener('change', (e) => {
      state.hasDiscountOnly = e.target.checked;
      applyFiltersAndRender();
    });
  }

  // Sort select
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      applyFiltersAndRender();
    });
  }

  // Reset filters button
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', resetAllFilters);
  }

  // Mobile Filter Drawer toggle
  if (mobileFilterToggle && filterSidebar) {
    mobileFilterToggle.addEventListener('click', () => {
      filterSidebar.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeFilterSidebar && filterSidebar) {
    closeFilterSidebar.addEventListener('click', () => {
      filterSidebar.classList.remove('is-active');
      document.body.style.overflow = '';
    });
  }

  // Sidebar category radios
  const sidebarCategoryRadios = document.querySelectorAll('input[name="sidebar-category"]');
  sidebarCategoryRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      setCategory(e.target.value);
    });
  });
}

/**
 * Reset all filters to default
 */
function resetAllFilters() {
  state.category = 'all';
  state.searchQuery = '';
  state.maxPrice = 15000;
  state.minRating = 0;
  state.inStockOnly = false;
  state.hasDiscountOnly = false;
  state.sortBy = 'featured';

  if (searchInput) searchInput.value = '';
  if (priceRangeInput) {
    priceRangeInput.value = 15000;
    priceRangeValue.textContent = formatINR(15000);
  }
  if (sortSelect) sortSelect.value = 'featured';
  if (inStockCheckbox) inStockCheckbox.checked = false;
  if (discountCheckbox) discountCheckbox.checked = false;

  ratingFilters.forEach(radio => {
    radio.checked = radio.value === '0';
  });

  const sidebarCategoryAll = document.querySelector('input[name="sidebar-category"][value="all"]');
  if (sidebarCategoryAll) sidebarCategoryAll.checked = true;

  setCategory('all');
}

/**
 * Filter, sort, and render products
 */
function applyFiltersAndRender() {
  let filtered = [...PRODUCTS];

  // 1. Category Filter
  if (state.category !== 'all') {
    filtered = filtered.filter(p => p.category === state.category);
  }

  // 2. Search Filter
  if (state.searchQuery) {
    filtered = filtered.filter(p => {
      const titleMatch = p.name.toLowerCase().includes(state.searchQuery);
      const descMatch = p.description.toLowerCase().includes(state.searchQuery);
      const catMatch = p.category.toLowerCase().includes(state.searchQuery);
      return titleMatch || descMatch || catMatch;
    });
  }

  // 3. Price Filter
  filtered = filtered.filter(p => p.price <= state.maxPrice);

  // 4. Rating Filter
  if (state.minRating > 0) {
    filtered = filtered.filter(p => p.rating >= state.minRating);
  }

  // 5. In-Stock Only
  if (state.inStockOnly) {
    filtered = filtered.filter(p => p.inStock);
  }

  // 6. Discount Only
  if (state.hasDiscountOnly) {
    filtered = filtered.filter(p => p.originalPrice && p.originalPrice > p.price);
  }

  // 7. Sorting
  switch (state.sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating-desc':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'name-asc':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'discount-desc':
      filtered.sort((a, b) => {
        const discountA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
        const discountB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
        return discountB - discountA;
      });
      break;
    default:
      // Featured: default catalog ordering
      break;
  }

  renderResultsCount(filtered.length);
  renderActiveFilterChips();
  renderProductsGrid(filtered);
}

/**
 * Update the results counter
 */
function renderResultsCount(count) {
  if (!resultsCountEl) return;
  const categoryName = state.category === 'all' 
    ? 'All Products' 
    : (CATEGORIES.find(c => c.id === state.category)?.name || 'Products');

  resultsCountEl.innerHTML = `Showing <strong>${count}</strong> ${count === 1 ? 'item' : 'items'} in <span class="results-category-tag">${categoryName}</span>`;
}

/**
 * Render active filter chips that users can click to dismiss
 */
function renderActiveFilterChips() {
  if (!activeFilterChipsEl) return;

  const chips = [];

  if (state.category !== 'all') {
    const catName = CATEGORIES.find(c => c.id === state.category)?.name || state.category;
    chips.push({
      label: `Category: ${catName}`,
      action: () => setCategory('all')
    });
  }

  if (state.searchQuery) {
    chips.push({
      label: `"${state.searchQuery}"`,
      action: () => {
        state.searchQuery = '';
        if (searchInput) searchInput.value = '';
        applyFiltersAndRender();
      }
    });
  }

  if (state.maxPrice < 15000) {
    chips.push({
      label: `Under ${formatINR(state.maxPrice)}`,
      action: () => {
        state.maxPrice = 15000;
        if (priceRangeInput) {
          priceRangeInput.value = 15000;
          priceRangeValue.textContent = formatINR(15000);
        }
        applyFiltersAndRender();
      }
    });
  }

  if (state.minRating > 0) {
    chips.push({
      label: `${state.minRating}★ & above`,
      action: () => {
        state.minRating = 0;
        ratingFilters.forEach(r => r.checked = r.value === '0');
        applyFiltersAndRender();
      }
    });
  }

  if (state.inStockOnly) {
    chips.push({
      label: `In Stock Only`,
      action: () => {
        state.inStockOnly = false;
        if (inStockCheckbox) inStockCheckbox.checked = false;
        applyFiltersAndRender();
      }
    });
  }

  if (state.hasDiscountOnly) {
    chips.push({
      label: `On Sale`,
      action: () => {
        state.hasDiscountOnly = false;
        if (discountCheckbox) discountCheckbox.checked = false;
        applyFiltersAndRender();
      }
    });
  }

  if (chips.length === 0) {
    activeFilterChipsEl.innerHTML = '';
    activeFilterChipsEl.style.display = 'none';
    return;
  }

  activeFilterChipsEl.style.display = 'flex';
  activeFilterChipsEl.innerHTML = `
    <span class="active-chips-label">Filters:</span>
    ${chips.map((chip, index) => `
      <button class="filter-chip" data-index="${index}">
        ${chip.label}
        <i class="ri-close-line"></i>
      </button>
    `).join('')}
    <button class="clear-all-chips-btn">Clear All</button>
  `;

  activeFilterChipsEl.querySelectorAll('.filter-chip').forEach(btn => {
    const idx = parseInt(btn.dataset.index, 10);
    btn.addEventListener('click', () => chips[idx].action());
  });

  const clearAllBtn = activeFilterChipsEl.querySelector('.clear-all-chips-btn');
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', resetAllFilters);
  }
}

/**
 * Render the product grid cards
 */
function renderProductsGrid(products) {
  if (!productsGrid) return;

  if (products.length === 0) {
    productsGrid.innerHTML = `
      <div class="no-products-found">
        <div class="no-products-icon"><i class="ri-search-eye-line"></i></div>
        <h3>No Products Found</h3>
        <p>We couldn't find any items matching your selected criteria. Try adjusting your filters or search keywords.</p>
        <button class="btn btn-primary" id="empty-state-reset-btn">Reset All Filters</button>
      </div>
    `;
    const resetBtn = document.getElementById('empty-state-reset-btn');
    if (resetBtn) resetBtn.addEventListener('click', resetAllFilters);
    return;
  }

  productsGrid.innerHTML = products.map(product => {
    const discountPercent = product.originalPrice 
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
      : 0;
    const isWished = isInWishlist(product.id);

    return `
      <div class="product-card ${!product.inStock ? 'is-out-of-stock' : ''}" data-id="${product.id}">
        <div class="product-card-top">
          <div class="product-card-badges">
            ${product.badge ? `<span class="product-badge badge-custom">${product.badge}</span>` : ''}
            ${discountPercent > 0 ? `<span class="product-badge badge-discount">${discountPercent}% OFF</span>` : ''}
            ${!product.inStock ? `<span class="product-badge badge-stock">Out of Stock</span>` : ''}
          </div>
          
          <button class="wishlist-btn ${isWished ? 'is-active' : ''}" data-id="${product.id}" aria-label="Toggle wishlist">
            <i class="${isWished ? 'ri-heart-fill' : 'ri-heart-line'}"></i>
          </button>

          <a href="product-detail.html?id=${product.id}" class="product-image-link">
            <img 
              src="${product.image}" 
              alt="${product.name}" 
              class="product-image" 
              loading="lazy" 
            />
          </a>

          <div class="product-card-hover-actions">
            <button class="btn-quick-view" data-id="${product.id}">
              <i class="ri-eye-line"></i> Quick View
            </button>
          </div>
        </div>

        <div class="product-card-body">
          <span class="product-category-tag">${product.category.toUpperCase()}</span>
          <h3 class="product-title">
            <a href="product-detail.html?id=${product.id}">${product.name}</a>
          </h3>

          <div class="product-rating">
            <div class="rating-stars">
              ${renderStars(product.rating)}
            </div>
            <span class="rating-score">${product.rating}</span>
            <span class="rating-reviews">(${product.reviewsCount})</span>
          </div>

          <div class="product-price-row">
            <div class="price-wrap">
              <span class="current-price">${formatINR(product.price)}</span>
              ${product.originalPrice ? `<span class="original-price">${formatINR(product.originalPrice)}</span>` : ''}
            </div>
          </div>

          <div class="product-card-footer">
            <button 
              class="btn btn-add-cart btn-primary ${!product.inStock ? 'btn-disabled' : ''}" 
              data-id="${product.id}"
              ${!product.inStock ? 'disabled' : ''}
            >
              <i class="ri-shopping-cart-2-line"></i>
              <span>${product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Bind Card Action Listeners
  bindProductCardEvents();
}

/**
 * Render star icons from numeric rating
 */
export function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = (rating % 1) >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  let starsHtml = '';
  for (let i = 0; i < fullStars; i++) {
    starsHtml += '<i class="ri-star-fill star-icon"></i>';
  }
  if (hasHalfStar) {
    starsHtml += '<i class="ri-star-half-fill star-icon"></i>';
  }
  for (let i = 0; i < emptyStars; i++) {
    starsHtml += '<i class="ri-star-line star-icon star-empty"></i>';
  }
  return starsHtml;
}

/**
 * Event bindings on rendered product cards
 */
function bindProductCardEvents() {
  // Add to cart buttons
  productsGrid.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.dataset.id;
      addToCart(id, 1);
    });
  });

  // Wishlist toggle buttons
  productsGrid.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.dataset.id;
      const isNowWished = toggleWishlist(id);
      btn.classList.toggle('is-active', isNowWished);
      btn.querySelector('i').className = isNowWished ? 'ri-heart-fill' : 'ri-heart-line';
    });
  });

  // Quick view buttons
  productsGrid.querySelectorAll('.btn-quick-view').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.dataset.id;
      openQuickView(id);
    });
  });
}

/**
 * Quick View Modal Logic
 */
function initQuickViewModal() {
  if (!quickViewModal) return;

  const closeBtn = document.getElementById('close-quick-view');
  const overlay = document.getElementById('quick-view-overlay');

  if (closeBtn) closeBtn.addEventListener('click', closeQuickView);
  if (overlay) overlay.addEventListener('click', closeQuickView);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && quickViewModal.classList.contains('is-open')) {
      closeQuickView();
    }
  });
}

function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product || !quickViewModalContent) return;

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  quickViewModalContent.innerHTML = `
    <div class="quick-view-layout">
      <div class="quick-view-media">
        <img src="${product.image}" alt="${product.name}" class="quick-view-img" id="quick-view-main-img" />
        <div class="quick-view-gallery">
          ${(product.gallery || [product.image]).map((img, i) => `
            <img src="${img}" alt="${product.name} ${i+1}" class="quick-thumb ${i === 0 ? 'is-active' : ''}" data-src="${img}" />
          `).join('')}
        </div>
      </div>
      <div class="quick-view-details">
        <span class="quick-view-cat">${product.category.toUpperCase()}</span>
        <h2 class="quick-view-title">${product.name}</h2>
        
        <div class="quick-view-rating">
          <div class="rating-stars">${renderStars(product.rating)}</div>
          <span class="rating-val">${product.rating}</span>
          <span class="reviews-val">(${product.reviewsCount} customer reviews)</span>
        </div>

        <div class="quick-view-price-wrap">
          <span class="qv-price">${formatINR(product.price)}</span>
          ${product.originalPrice ? `<span class="qv-original">${formatINR(product.originalPrice)}</span>` : ''}
          ${discountPercent > 0 ? `<span class="qv-discount-badge">${discountPercent}% OFF</span>` : ''}
        </div>

        <p class="quick-view-desc">${product.description}</p>

        <ul class="quick-view-features">
          ${product.features.slice(0, 3).map(f => `<li><i class="ri-check-line"></i> ${f}</li>`).join('')}
        </ul>

        <div class="quick-view-stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}">
          <i class="${product.inStock ? 'ri-checkbox-circle-fill' : 'ri-close-circle-fill'}"></i>
          <span>${product.inStock ? 'In Stock — Ships within 24 Hours' : 'Currently Out of Stock'}</span>
        </div>

        <div class="quick-view-actions">
          <div class="quantity-picker">
            <button class="qty-btn" id="qv-qty-minus">&minus;</button>
            <input type="number" id="qv-qty-input" value="1" min="1" max="10" readonly />
            <button class="qty-btn" id="qv-qty-plus">&plus;</button>
          </div>
          <button class="btn btn-primary btn-lg qv-add-btn" id="qv-add-cart-btn" ${!product.inStock ? 'disabled' : ''}>
            <i class="ri-shopping-cart-2-line"></i> Add to Cart
          </button>
        </div>

        <div class="quick-view-more-link">
          <a href="product-detail.html?id=${product.id}">
            View full details and technical specs &rarr;
          </a>
        </div>
      </div>
    </div>
  `;

  // Gallery thumb switching
  const mainImg = quickViewModalContent.querySelector('#quick-view-main-img');
  const thumbs = quickViewModalContent.querySelectorAll('.quick-thumb');
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('is-active'));
      thumb.classList.add('is-active');
      mainImg.src = thumb.dataset.src;
    });
  });

  // Quantity controls
  const qtyMinus = quickViewModalContent.querySelector('#qv-qty-minus');
  const qtyPlus = quickViewModalContent.querySelector('#qv-qty-plus');
  const qtyInput = quickViewModalContent.querySelector('#qv-qty-input');
  const addBtn = quickViewModalContent.querySelector('#qv-add-cart-btn');

  let curQty = 1;
  qtyMinus.addEventListener('click', () => {
    if (curQty > 1) {
      curQty--;
      qtyInput.value = curQty;
    }
  });
  qtyPlus.addEventListener('click', () => {
    if (curQty < 10) {
      curQty++;
      qtyInput.value = curQty;
    }
  });

  if (addBtn && product.inStock) {
    addBtn.addEventListener('click', () => {
      addToCart(product.id, curQty);
      closeQuickView();
    });
  }

  quickViewModal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  if (quickViewModal) {
    quickViewModal.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}

function scrollToCatalog() {
  const catalogEl = document.getElementById('catalog-section');
  if (catalogEl) {
    catalogEl.scrollIntoView({ behavior: 'smooth' });
  }
}
