# Project Report: StoreCraft — Ecommerce Product Listing & Management System

---

## 1. Cover Page

```
========================================================================================
                                     PROJECT REPORT
                                           ON
                STORECRAFT: DYNAMIC ECOMMERCE PRODUCT LISTING PLATFORM
========================================================================================

Course Title:         Web Development & Frontend Engineering
Course Code:          CS-WD201
Project Title:        Ecommerce Product Listing Platform (StoreCraft)
Student Name:         Gowtham [Student ID / Roll No.]
Instructor Name:      [Instructor / Professor Name]
Department:           Department of Computer Science & Engineering
Institution:          [University / College Name]
Date of Submission:   November 17, 2026
========================================================================================
```

---

## 2. Introduction

### 2.1 Project Overview
**StoreCraft** is a dynamic, modern, responsive ecommerce product listing and storefront web application. The platform provides shoppers with an intuitive interface to browse, discover, filter, and inspect products across diverse commercial categories including Electronics, Apparel, Handcrafted Accessories, Footwear, and Home Goods.

The project demonstrates hands-on implementation of foundational and modern web development principles:
- DOM manipulation and dynamic template rendering using vanilla modern JavaScript (ES6+).
- Real-time client-side multi-parameter filtering, searching, and sorting algorithms.
- Persistent state management using the Web Storage API (`localStorage`).
- Responsive, mobile-first CSS architecture with CSS Grid, Flexbox, custom design tokens, and glassmorphism styling.
- Localized pricing in Indian Rupees (₹ INR) using the ECMAScript Internationalization API (`Intl.NumberFormat`).

### 2.2 Objectives
1. **Interactive Categorization**: Implement dual-channel category browsing (visual featured category cards + sticky navigation pills).
2. **Instant Dynamic Filtering**: Allow real-time search, price range boundary filtering, star rating thresholds, and deal filters without full-page reloads.
3. **Comprehensive Product Details**: Provide both an on-page Quick View modal and a dedicated, URL-parameterized Product Details page (`product-detail.html?id=...`) with gallery thumbnail switching and technical specification tables.
4. **Persistent Shopping Cart**: Maintain cart quantities, line totals, coupon calculations, and checkout simulation with complete state persistence.
5. **Cross-Device Usability**: Deliver seamless responsive layouts spanning mobile phones, tablets, and desktop viewports.

---

## 3. Project Structure

The project follows a clean modular separation of concerns without requiring external bundlers or build steps:

```
Ecom product listing/
│
├── index.html                   # Primary storefront: Hero, Category cards, Filter sidebar, Product grid
├── product-detail.html          # Deep-linked product detail view (specs, gallery, related recommendations)
├── cart.html                    # Shopping cart interface, coupon validation engine, simulated checkout modal
├── README.md                    # Project documentation, feature summary, and local execution guide
├── PROJECT_REPORT.md            # Comprehensive project report and technical documentation
│
├── css/
│   ├── style.css                # Global design tokens, typography, resets, header, footer, toast, drawer
│   ├── products.css             # Hero banner, category card grids, filter controls, product card styles
│   ├── detail.css               # Two-column detail page layout, gallery switcher, tabs, specs table
│   └── cart.css                 # Cart table, order summary sidebar, promo badges, checkout modal
│
├── js/
│   ├── data.js                  # Centralized product catalog dataset (25 products, 5 departments in ₹ INR)
│   ├── cart.js                  # State service: localStorage synchronization, currency formatting, toast
│   ├── app.js                   # Homepage controller: search, dynamic filters, sorting, quick view modal
│   ├── detail.js                # Detail controller: URL query parsing, image gallery, specification tabs
│   └── cart-page.js             # Cart controller: quantity updates, coupon calculation, checkout simulation
│
└── images/
    └── hero-bg.jpg              # High-resolution collage artwork backdrop for the storefront hero
```

### Module Responsibilities:
- **`js/data.js`**: Functions as the single source of truth for all catalog items, specifications, image galleries, stock flags, and category metadata.
- **`js/cart.js`**: Centralized service managing cart operations, wishlist toggles, `localStorage` serialization, and cross-tab/drawer event synchronization via `CustomEvent('cart:updated')`.
- **`js/app.js`**: Drives real-time UI state on `index.html`, combining search queries, price ranges, and category filters into a single dynamic query pipeline.

---

## 4. Technical Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Markup** | HTML5 | Semantic page structure, accessible ARIA roles, modern dialog elements |
| **Styling** | CSS3 | CSS Variables (design tokens), CSS Grid, Flexbox, Glassmorphism, animations |
| **Scripting** | JavaScript (ES6+) | Vanilla ES Modules (`import`/`export`), DOM manipulation, Event delegation |
| **Icons** | Remix Icon (CDN) | Lightweight, scalable vector iconography |
| **Typography** | Google Fonts (Inter) | Modern geometric sans-serif font stack |
| **State Storage** | Web Storage API | `localStorage` for offline cart and wishlist persistence |
| **Localization** | `Intl.NumberFormat` | Native Indian Rupee (`₹` INR) currency and numbering formatting |
| **Images** | Unsplash & Custom Assets | High-resolution commercial photography and collage illustration |

---

## 5. Features and Functionalities

### 5.1 Dual Category Navigation
- **Hero Category Cards**: Visual cards showcasing featured categories with background imagery, icon badges, and product counts. Clicking any card updates the active category and scrolls smoothly to the catalog.
- **Sticky Filter Category Pills**: Persistent, horizontally scrollable pill navigation directly below the header allowing one-click filtering between "All Products" and individual departments.

### 5.2 Dynamic Real-Time Filtering & Search
- **Instant Search**: Real-time substring matching across product names, categories, and descriptions with 250ms debounce.
- **Price Range Slider**: Interactive range slider filtering products between ₹1,000 and ₹15,000 with real-time numeric readouts.
- **Customer Ratings Filter**: Radio buttons filtering items by $\ge 4.8\star$, $\ge 4.5\star$, or all.
- **Deal & Availability Toggles**: Checkboxes for "In Stock Only" and "On Sale / Discounted".
- **Multi-parameter Sorting**: Supports Featured, Price (Low to High), Price (High to Low), Rating (Highest first), Discount percentage, and Alphabetical order.
- **Active Filter Dismissible Chips**: Interactive chips displaying active filter criteria with individual dismissal and a "Clear All" reset trigger.

### 5.3 Product Display & Quick View
- **Product Cards**: Displays primary image with hover zoom, discount tags, dynamic wishlist heart button, star rating graphics, formatted INR prices, and stock indicators.
- **Quick View Modal**: Lightweight preview modal allowing users to inspect image galleries, key bullet points, and add quantities to cart without leaving the catalog page.

### 5.4 Dedicated Product Details Page (`product-detail.html`)
- **Query Parameter Routing**: Reads `?id=productId` to render targeted product details.
- **Image Gallery Switcher**: Thumbnail selector allowing users to switch active high-resolution images.
- **Savings Callout**: Automatically computes savings amount in ₹ and percentage off MRP.
- **Tabbed Information Architecture**:
  - *Specifications*: Technical table of attributes (Brand, Materials, Weight, Warranty).
  - *Overview*: Narrative description and feature checklist.
  - *Shipping & Policies*: Free shipping threshold rules and return policies.
  - *Customer Reviews*: Rating distribution with verified buyer reviews.
- **Related Recommendations**: Dynamic grid rendering related items belonging to the same category.

### 5.5 Shopping Cart, Coupons & Simulated Checkout (`cart.html` + Drawer)
- **Slide-over Cart Drawer**: Accessible globally from the header across all pages.
- **Full Cart View**: Interactive table with quantity increment/decrement steppers, line subtotals, and delete actions.
- **Shipping Threshold Meter**: Dynamic progress callout (*"Add ₹X more for FREE Delivery!"*).
- **Coupon Validation Engine**:
  - `SAVE10`: 10% discount on cart subtotal.
  - `FLAT500`: Flat ₹500 discount on orders exceeding ₹2,000.
  - `WELCOME`: 15% discount for first-time buyers.
- **Simulated Checkout Modal**: Validated form collecting recipient details, delivery address, PIN code, and payment method (UPI, Card, Net Banking, COD) leading to an order confirmation screen with a generated order reference ID (`#IND-XXXXXX`).

---

## 6. Screenshots and Visuals

### 6.1 Hero Section & Dual Category Navigation
The storefront hero section features custom collage artwork with a glassmorphic container and twin frosted glass action buttons:

```
+-----------------------------------------------------------------------------------------+
| [StoreCraft Logo]      [ Search products by title, keyword... ]         [Wishlist] [Cart] |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|      * Festive Season Sale Live Across All Departments                                  |
|                                                                                         |
|            Curated Quality Essentials Crafted for Daily Life                            |
|                                                                                         |
|        [ (o) Explore Full Catalog ]        [ [#] Browse by Category ]                   |
|                                                                                         |
|      (Truck) Free Delivery > ₹999   (Shield) 100% Genuine   (Arrow) 7-Day Returns       |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
| Shop by Category:                                                                       |
| [Electronics (5)] [Clothing (5)] [Accessories (5)] [Footwear (5)] [Home & Living (5)]  |
+-----------------------------------------------------------------------------------------+
| (All Products) (Electronics) (Clothing) (Accessories) (Footwear) (Home & Living)        |
+-----------------------------------------------------------------------------------------+
```
*Figure 1: Storefront Header, Hero Banner with custom artwork, and Dual Category Navigation.*

### 6.2 Catalog Section & Dynamic Filter Sidebar
The catalog section pairs an interactive filter sidebar with a responsive product grid:

```
+-----------------------------------------------------------------------------------------+
| FILTERS                   |  Showing 18 items in All Products      [Sort: Price: Low-High v]|
|---------------------------+-------------------------------------------------------------|
| Category:                 |  [Active Filters: Category: Electronics (x)] [Clear All]    |
| (o) All Categories        |                                                             |
| ( ) Electronics           |  +-------------------+  +-------------------+  +----------+ |
| ( ) Clothing              |  | [Badge: SALE] (H) |  | [Badge: TOP]  (H) |  | ...      | |
|                           |  | [Headphones Img]  |  | [Smartwatch Img]  |  |          | |
| Max Price: [===o====]     |  | Wireless ANC 45h  |  | Apex Pulse AMOLED |  |          | |
| Limit: ₹12,000            |  | **** 4.8 (428)    |  | **** 4.6 (312)    |  |          | |
|                           |  | ₹9,999  ~~₹14,999~~|  | ₹4,499  ~~₹7,999~~|  |          | |
| Customer Rating:          |  | [ Add to Cart ]   |  | [ Add to Cart ]   |  |          | |
| (o) All Ratings           |  +-------------------+  +-------------------+  +----------+ |
| ( ) 4.5 & above           |                                                             |
+-----------------------------------------------------------------------------------------+
```
*Figure 2: Real-time multi-attribute filter sidebar and dynamic product grid.*

### 6.3 Dedicated Product Details Page
```
+-----------------------------------------------------------------------------------------+
| Home > Electronics > Aura Sound Pro Wireless Noise-Cancelling Headphones                |
+-----------------------------------------+-----------------------------------------------+
|                                         | ELECTRONICS                                   |
|   +---------------------------------+   | Aura Sound Pro Wireless ANC Headphones        |
|   |                                 |   | ***** 4.8 (428 verified ratings)  SKU: ELEC-1 |
|   |      [Main Product Image]       |   |                                               |
|   |                                 |   | ₹9,999   ~~₹14,999~~  Save ₹5,000 (33% OFF)   |
|   +---------------------------------+   | (v) In Stock - Ready to ship from warehouse   |
|                                         |                                               |
|   [Thumb 1] [Thumb 2] [Thumb 3]         | Quantity: [-] [ 1 ] [+]                       |
|                                         | [ + Add to Cart ]   [ Buy Now ]   [ (Heart) ] |
+-----------------------------------------+-----------------------------------------------+
| [Specifications]  [Overview & Details]  [Shipping & Policies]  [Customer Reviews (428)] |
+-----------------------------------------------------------------------------------------+
```
*Figure 3: Product Detail view with gallery switcher, specs tabs, and stock status.*

---

## 7. Database Structure & Data Architecture

### 7.1 Architecture Overview
Because the application runs in client-side standard browser environments without external server databases, data is organized into structured JSON entities and synchronized with `localStorage`.

### 7.2 Entity-Relationship Diagram

```
[CATEGORY] (1) <---> (N) [PRODUCT]
                           |
                           +---> (N) [CART_ITEM] (stored in localStorage)
                           |
                           +---> (N) [WISHLIST_ITEM] (stored in localStorage)

[ORDER] (1) <---> (N) [ORDER_ITEM] (simulated checkout flow)
```

### 7.3 Data Schemas

#### 1. Product Entity Schema (`js/data.js`)
```javascript
{
  id: "elec-1",                              // Unique alphanumeric SKU identifier
  name: "Aura Sound Pro Wireless...",        // Full product title
  category: "electronics",                   // Foreign key referencing CATEGORIES.id
  price: 9999,                               // Selling price in Indian Rupees (₹)
  originalPrice: 14999,                      // Maximum Retail Price (MRP)
  rating: 4.8,                               // Mean customer review score (1.0 - 5.0)
  reviewsCount: 428,                         // Total count of verified buyer reviews
  badge: "Best Seller",                      // Custom promotional badge (or null)
  image: "https://images.unsplash.com/...", // Primary image URI
  gallery: ["url1", "url2", "url3"],         // Additional gallery angles
  description: "Experience acoustic...",    // Narrative description
  features: ["45h Battery", "ANC..."],       // Bulleted highlights
  specs: {                                   // Key-value specifications
    "Brand": "AuraSound",
    "Connectivity": "Bluetooth 5.3",
    "Battery Life": "45 Hours",
    "Warranty": "1 Year"
  },
  inStock: true                              // Availability boolean flag
}
```

#### 2. Cart Storage Schema (`localStorage['ecom_cart_v1']`)
```json
[
  { "id": "elec-1", "quantity": 2 },
  { "id": "cloth-2", "quantity": 1 }
]
```

---

## 8. Challenges Faced & Solutions

| Challenge Encountered | Root Cause | Technical Solution Implemented |
| :--- | :--- | :--- |
| **White-on-White Button Invisibility** | The secondary hero button inherited `.btn-outline`'s opaque `#ffffff` background while applying an inline style `color: #ffffff`, causing the label "Browse by Category" to blend into the white button background. | Engineered a dedicated `.btn-hero-secondary` class with translucent glassmorphism (`background: rgba(255, 255, 255, 0.14)`), `backdrop-filter: blur(12px)`, crisp white text, and glowing border hover states. Applied the same design to both hero action buttons for visual harmony. |
| **Hero Background Aesthetic & Readability** | Initial dark blue gradient background lacked organic depth and human warmth; simply slapping text over a raw illustration created visual clash and poor contrast. | Integrated custom collage illustration as a full-cover backdrop while nesting text inside an elevated frosted glass container (`.hero-inner`) with `backdrop-filter: blur(14px)` and `rgba(15, 23, 42, 0.68)`. The artwork frames the content without sacrificing typography contrast. |
| **Real-time Filter Combination Without Stutter** | Filtering across 5 criteria (category, text search, price slider, star rating, stock status) simultaneously can trigger DOM thrashing if not handled synchronously. | Built a centralized `applyFiltersAndRender()` controller in `app.js` that applies a pure JavaScript filter pipeline over memory-cached data and updates the DOM in a single pass with debounced text input. |
| **Cross-Page Cart Synchronization** | Changes to the cart on `product-detail.html` or through the slide-over drawer needed to reflect instantly on the header counter and cart page without full page reloads. | Implemented custom browser event dispatching (`window.dispatchEvent(new CustomEvent('cart:updated'))`) so all active listeners update badge numbers and line totals in real time. |
| **Indian Rupee (₹ INR) Formatting** | Standard JavaScript `.toFixed(2)` produces plain numbers without Indian numbering separators (lakhs/crores). | Utilized `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })` for authentic Indian currency formatting (e.g. `₹9,999`). |

---

## 9. Conclusion

### 9.1 Achievements
The **StoreCraft** project successfully achieved all core and advanced ecommerce requirements outlined in the project brief:
1. Developed a dynamic, attractive, and accessible storefront operating entirely on standards-based HTML5, CSS3, and modern JavaScript.
2. Implemented dual category navigation, real-time multi-parameter search/filtering, and six-way sorting without external dependencies or heavy frontend frameworks.
3. Created both a Quick View modal and a dedicated, URL-parameterized Product Details page with multi-angle galleries, specifications, and related recommendations.
4. Engineered a persistent shopping cart with promo coupon calculations and an interactive checkout flow backed by the Web Storage API.
5. Successfully resolved UI contrast and background design challenges, delivering a cohesive and polished visual identity.

### 9.2 Key Learning Outcomes
- **Architecture & Modularity**: Gained deep appreciation for modular JavaScript (ES Modules) to structure state, catalog data, and view controllers cleanly.
- **Modern Responsive Design**: Mastered responsive techniques using CSS Grid auto-fill patterns, Flexbox alignments, and backdrop filters for glassmorphism.
- **Client-Side Data Manipulation**: Strengthened proficiency in higher-order JavaScript array methods (`filter`, `reduce`, `map`, `sort`) for real-time querying.
- **User Experience & Feedback**: Learned the value of micro-interactions, toast notifications, and defensive styling (e.g., preventing button text collisions and ensuring accessibility).
