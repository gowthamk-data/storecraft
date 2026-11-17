/**
 * Ecommerce Product Catalog Data
 * Currency: Indian Rupee (₹ INR)
 */

export const CATEGORIES = [
  {
    id: "all",
    name: "All Products",
    description: "Explore our entire collection of handpicked essentials.",
    icon: "ri-apps-2-line",
    bannerImage: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&auto=format&fit=crop&q=80"
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Cutting-edge audio, computing accessories, and smart devices.",
    icon: "ri-headphone-line",
    cardImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    itemCount: 5
  },
  {
    id: "clothing",
    name: "Clothing & Apparel",
    description: "Timeless fits, premium fabrics, and comfortable everyday wear.",
    icon: "ri-t-shirt-line",
    cardImage: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=600&auto=format&fit=crop&q=80",
    itemCount: 5
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Elevate your daily carry with genuine leather and eyewear.",
    icon: "ri-handbag-line",
    cardImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    itemCount: 5
  },
  {
    id: "footwear",
    name: "Footwear",
    description: "Engineered sneakers, handcrafted boots, and casual shoes.",
    icon: "ri-footprint-line",
    cardImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    itemCount: 5
  },
  {
    id: "home",
    name: "Home & Living",
    description: "Modern decor, artisan kitchenware, and serene lighting.",
    icon: "ri-home-smile-line",
    cardImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80",
    itemCount: 5
  }
];

export const PRODUCTS = [
  // --- ELECTRONICS ---
  {
    id: "elec-1",
    name: "Aura Sound Pro Wireless Noise-Cancelling Headphones",
    category: "electronics",
    price: 9999,
    originalPrice: 14999,
    rating: 4.8,
    reviewsCount: 428,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Experience acoustic precision with 40mm neodymium drivers, hybrid active noise cancellation, and up to 45 hours of ultra-long battery life with fast charging.",
    features: [
      "Active Hybrid Noise Cancellation (up to 38dB)",
      "45 Hours continuous playback on single charge",
      "Multipoint Bluetooth 5.3 connection",
      "Memory foam leatherette ear cushions for all-day comfort",
      "Quick charge: 10 mins gives 5 hours playback"
    ],
    specs: {
      "Brand": "AuraSound",
      "Connectivity": "Bluetooth 5.3 & 3.5mm Aux",
      "Battery Life": "45 Hours (ANC On)",
      "Weight": "250g",
      "Warranty": "1 Year Manufacturer Warranty"
    },
    inStock: true
  },
  {
    id: "elec-2",
    name: "Apex Pulse Fitness Smartwatch with AMOLED Display",
    category: "electronics",
    price: 4499,
    originalPrice: 7999,
    rating: 4.6,
    reviewsCount: 312,
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Stay ahead of your wellness goals with real-time SpO2, continuous 24/7 heart rate monitoring, built-in GPS, and a stunning 1.43\" Always-On AMOLED screen.",
    features: [
      "1.43\" AMOLED Display with 1000 nits peak brightness",
      "Built-in GPS with 120+ sports workout modes",
      "Bluetooth calling with noise reduction microphone",
      "5ATM water resistance rating (up to 50m)",
      "Up to 14 days typical battery endurance"
    ],
    specs: {
      "Brand": "Apex Tech",
      "Display": "1.43-inch AMOLED (466x466)",
      "Battery": "14 Days Typical Use",
      "Water Resistance": "5ATM / 50m",
      "Warranty": "1 Year Replacement"
    },
    inStock: true
  },
  {
    id: "elec-3",
    name: "Chronos Mechanical RGB Gaming Keyboard",
    category: "electronics",
    price: 3299,
    originalPrice: 4999,
    rating: 4.7,
    reviewsCount: 189,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Compact 75% mechanical keyboard engineered with hot-swappable tactile brown switches, double-shot PBT keycaps, and customizable per-key RGB backlighting.",
    features: [
      "Hot-swappable PCB compatible with 3-pin and 5-pin switches",
      "Double-shot durable PBT dye-sub keycaps",
      "Tri-mode connectivity: 2.4GHz wireless, Bluetooth, and Type-C",
      "Sound-dampening silicone foam layers",
      "Full N-key rollover and anti-ghosting"
    ],
    specs: {
      "Brand": "Chronos Gear",
      "Layout": "75% Compact (82 Keys)",
      "Switch Type": "Gateron Brown Tactile",
      "Interface": "USB-C / 2.4GHz / Bluetooth 5.0",
      "Warranty": "2 Years"
    },
    inStock: true
  },
  {
    id: "elec-4",
    name: "VibeBox Waterproof 360° Portable Bluetooth Speaker",
    category: "electronics",
    price: 2499,
    originalPrice: 3999,
    rating: 4.5,
    reviewsCount: 275,
    badge: "20% OFF",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Room-filling 360-degree sound with deep punchy bass, IP67 dust and waterproof rating, and convenient rugged strap for outdoor adventures.",
    features: [
      "20W RMS room-filling omnidirectional audio",
      "IP67 dustproof and waterproof (floatable in water)",
      "TWS pairing: connect two speakers for stereo sound",
      "18-hour continuous battery life on single charge",
      "Integrated hands-free microphone"
    ],
    specs: {
      "Brand": "VibeBox",
      "Power Output": "20W RMS",
      "Battery": "5200mAh (18 hrs)",
      "Waterproof": "IP67 Rated",
      "Warranty": "1 Year"
    },
    inStock: true
  },
  {
    id: "elec-5",
    name: "HyperSpeed 1TB Portable External NVMe SSD",
    category: "electronics",
    price: 6899,
    originalPrice: 9499,
    rating: 4.9,
    reviewsCount: 154,
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Blazing fast data transfer speeds up to 1050 MB/s housed in an ultra-compact, shock-resistant aerospace-grade aluminum enclosure with hardware encryption.",
    features: [
      "Read/Write speeds up to 1,050 MB/s via USB 3.2 Gen 2",
      "Drop resistant up to 2 meters with rubberized bumper",
      "AES 256-bit hardware password encryption",
      "Cross-compatible with Windows, Mac, Android & iPadOS",
      "Ultra-lightweight 58g pocket profile"
    ],
    specs: {
      "Brand": "HyperSpeed",
      "Capacity": "1TB",
      "Interface": "USB 3.2 Gen 2 Type-C",
      "Transfer Rate": "Up to 1050 MB/s",
      "Warranty": "3 Years Limited Warranty"
    },
    inStock: true
  },

  // --- CLOTHING ---
  {
    id: "cloth-1",
    name: "Vintage Washed Denim Trucker Jacket",
    category: "clothing",
    price: 2299,
    originalPrice: 3499,
    rating: 4.7,
    reviewsCount: 219,
    badge: "Classic",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Crafted from 100% heavyweight cotton denim with authentic distressing, classic shank button closure, and dual chest button-flap pockets.",
    features: [
      "100% premium rigid cotton denim",
      "Hand-finished vintage stonewash look",
      "Reinforced dual needle topstitching",
      "Side welt hand pockets & interior pockets",
      "Adjustable waist tabs for customized fit"
    ],
    specs: {
      "Material": "100% Cotton Denim (13.5 oz)",
      "Fit": "Regular Relaxed Fit",
      "Closure": "Metal Shank Buttons",
      "Care": "Machine wash cold, inside out",
      "Origin": "Crafted in India"
    },
    inStock: true
  },
  {
    id: "cloth-2",
    name: "Classic 100% Organic Cotton Oxford Button-Down Shirt",
    category: "clothing",
    price: 1499,
    originalPrice: 2299,
    rating: 4.6,
    reviewsCount: 168,
    badge: "Essential",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80"
    ],
    description: "A tailored wardrobe staple woven from breathable combed organic cotton with a button-down collar, chest pocket, and curved hem.",
    features: [
      "GOTS certified 100% organic long-staple cotton",
      "Button-down collar that stays structured",
      "Tailored fit through the torso and sleeves",
      "Single patch chest pocket",
      "Mother-of-pearl style durable resin buttons"
    ],
    specs: {
      "Material": "100% Organic Oxford Cotton",
      "Fit": "Tailored / Slim Straight",
      "Sleeve": "Full Sleeve with button cuffs",
      "Pattern": "Solid Oxford Weave",
      "Care": "Gentle Machine Wash"
    },
    inStock: true
  },
  {
    id: "cloth-3",
    name: "Heavyweight French Terry Pullover Hoodie",
    category: "clothing",
    price: 1899,
    originalPrice: 2999,
    rating: 4.8,
    reviewsCount: 290,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Luxuriously soft 400 GSM French terry fleece engineered for maximum warmth and structure without pilling or shrinkage over time.",
    features: [
      "400 GSM loopback cotton French terry",
      "Double-layer insulated warm hood",
      "Kangaroo pouch front pocket with reinforced bar tacks",
      "Heavy-rib cuffs and hem band",
      "Pre-shrunk fabric to prevent post-wash changes"
    ],
    specs: {
      "Material": "80% Combed Cotton, 20% Polyester",
      "Fabric Weight": "400 GSM Heavyweight",
      "Fit": "Slightly Oversized Streetwear Fit",
      "Care": "Machine wash warm, tumble dry low",
      "Origin": "Made in India"
    },
    inStock: true
  },
  {
    id: "cloth-4",
    name: "Everyday Stretch Chino Pants",
    category: "clothing",
    price: 1699,
    originalPrice: 2499,
    rating: 4.5,
    reviewsCount: 142,
    badge: null,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Versatile casual-to-formal trousers with 4-way comfort stretch, clean flat-front tailoring, and hidden zippered security pocket.",
    features: [
      "98% Cotton with 2% Spandex for flexible movement",
      "Wrinkle-resistant garment wash finish",
      "Deep slant side pockets and button-through rear pockets",
      "YKK brass zipper fly with sturdy button closure",
      "Tapered leg opening for a modern silhouette"
    ],
    specs: {
      "Material": "Cotton Stretch Twill",
      "Fit": "Slim Straight Tapered",
      "Rise": "Mid Rise",
      "Care": "Machine Washable",
      "Origin": "Made in India"
    },
    inStock: true
  },
  {
    id: "cloth-5",
    name: "Breezy Pure Linen Summer Midi Dress",
    category: "clothing",
    price: 2499,
    originalPrice: 3899,
    rating: 4.8,
    reviewsCount: 198,
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Effortlessly elegant pure European linen midi dress featuring a flattering A-line silhouette, breathable airy drape, and hidden side seam pockets.",
    features: [
      "100% Washed European Flax Linen",
      "Functional deep side pockets",
      "Breathable, lightweight, natural cooling properties",
      "Subtle V-neckline with adjustable tie belt",
      "Pre-washed for signature lived-in texture"
    ],
    specs: {
      "Fabric": "100% Pure Linen",
      "Length": "Midi (Calf Length)",
      "Lining": "Unlined, opaque weave",
      "Care": "Cold Hand Wash or Gentle Cycle",
      "Season": "Spring / Summer"
    },
    inStock: true
  },

  // --- ACCESSORIES ---
  {
    id: "acc-1",
    name: "Artisan Full-Grain Leather Messenger Briefcase",
    category: "accessories",
    price: 4999,
    originalPrice: 7499,
    rating: 4.9,
    reviewsCount: 310,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Handcrafted from vegetable-tanned full-grain buffalo leather that develops a magnificent patina over time. Fits up to a 15.6-inch laptop with dedicated padded sleeve.",
    features: [
      "100% Genuine Full-Grain Vegetable-Tanned Leather",
      "Dedicated padded compartment for up to 15.6\" laptops",
      "Solid antique brass hardware and heavy-duty YKK zippers",
      "Detachable padded ergonomic shoulder strap",
      "Rear luggage trolley slip sleeve"
    ],
    specs: {
      "Material": "Full-Grain Leather",
      "Dimensions": "40 x 30 x 10 cm",
      "Laptop Fit": "Up to 15.6 inches",
      "Weight": "1.2 kg",
      "Warranty": "2 Years Leather Craftsmanship"
    },
    inStock: true
  },
  {
    id: "acc-2",
    name: "Aviator Polarized Sunglasses with UV400 Protection",
    category: "accessories",
    price: 1299,
    originalPrice: 2499,
    rating: 4.6,
    reviewsCount: 182,
    badge: "50% OFF",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Iconic teardrop metal frames paired with triacetate polarized lenses that eliminate blinding glare and offer 100% UVA/UVB optical protection.",
    features: [
      "Triacetate Cellulose (TAC) Polarized Lenses",
      "UV400 Category 3 Sun Protection",
      "Corrosion-resistant lightweight metal alloy frame",
      "Soft silicone adjustable nose pads",
      "Includes hard clam-shell case and microfiber cleaning cloth"
    ],
    specs: {
      "Frame Material": "Monel Metal Alloy",
      "Lens Material": "TAC Polarized",
      "Lens Width": "58 mm",
      "Bridge Width": "14 mm",
      "Warranty": "6 Months"
    },
    inStock: true
  },
  {
    id: "acc-3",
    name: "Minimalist RFID-Blocking Slim Leather Wallet",
    category: "accessories",
    price: 899,
    originalPrice: 1499,
    rating: 4.7,
    reviewsCount: 420,
    badge: "Essential",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Sleek bifold front-pocket design with German engineered RFID blocking mesh to keep your cards safe from unauthorized wireless scans.",
    features: [
      "Certified RFID protection tested at 13.56 MHz frequency",
      "Holds 8-10 cards plus full-sized cash notes",
      "Quick-draw front thumb slot for daily transit/credit card",
      "Ultra-slim 0.8cm thickness when loaded",
      "Supple top-grain oil pull-up leather"
    ],
    specs: {
      "Material": "Top-Grain Cowhide Leather",
      "Dimensions": "10.5 x 7.8 x 0.8 cm",
      "Capacity": "Up to 10 cards + Cash clip",
      "Weight": "45g",
      "Warranty": "1 Year"
    },
    inStock: true
  },
  {
    id: "acc-4",
    name: "Chronograph Stainless Steel Luxury Watch",
    category: "accessories",
    price: 5499,
    originalPrice: 8999,
    rating: 4.8,
    reviewsCount: 167,
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Precision Japanese quartz chronograph movement encased in 316L surgical-grade stainless steel with sapphire-coated crystal glass.",
    features: [
      "Japanese Miyota Quartz Chronograph Movement",
      "316L Surgical grade stainless steel case and link bracelet",
      "Scratch-resistant sapphire crystal glass face",
      "5 ATM / 50m water resistance",
      "Luminescent hands and date calendar display"
    ],
    specs: {
      "Case Diameter": "42 mm",
      "Case Thickness": "11 mm",
      "Movement": "Japanese Quartz Chronograph",
      "Glass": "Sapphire-Coated Mineral",
      "Warranty": "2 Years International Warranty"
    },
    inStock: true
  },
  {
    id: "acc-5",
    name: "Rugged Canvas & Leather Commuter Backpack",
    category: "accessories",
    price: 2999,
    originalPrice: 4299,
    rating: 4.6,
    reviewsCount: 135,
    badge: null,
    image: "https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Weather-resistant 16oz waxed cotton canvas backpack with genuine leather trim, 25L capacity, and dedicated side water bottle sleeves.",
    features: [
      "16oz water-repellent waxed canvas fabric",
      "Padded compartment holds up to 16\" MacBook / laptop",
      "Comfortable breathable mesh back panel",
      "Magnetic quick-snap leather buckle straps",
      "25-liter volume ideal for everyday commute or weekend trips"
    ],
    specs: {
      "Material": "Waxed Canvas & Leather Trim",
      "Capacity": "25 Liters",
      "Dimensions": "45 x 32 x 15 cm",
      "Weight": "950g",
      "Warranty": "1 Year"
    },
    inStock: false
  },

  // --- FOOTWEAR ---
  {
    id: "foot-1",
    name: "Velocity Aero Cushion Road Running Shoes",
    category: "footwear",
    price: 3499,
    originalPrice: 5499,
    rating: 4.8,
    reviewsCount: 384,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Engineered with nitrogen-infused midsole foam for responsive propulsion, engineered mesh upper for maximum airflow, and high-traction rubber outsole.",
    features: [
      "Nitrogen-infused ultra-responsive cushioning midsole",
      "Seamless breathable engineered jacquard mesh",
      "Carbon rubber outsole with multi-directional grip lugs",
      "Molded ergonomic heel cup for Achilles tendon support",
      "Super light: only 220g per shoe"
    ],
    specs: {
      "Category": "Neutral Road Running",
      "Drop": "8 mm heel-to-toe drop",
      "Weight": "220g (Size 9)",
      "Closure": "Lace-up",
      "Warranty": "6 Months Manufacturing Defect"
    },
    inStock: true
  },
  {
    id: "foot-2",
    name: "Heritage Handcrafted Leather Chelsea Boots",
    category: "footwear",
    price: 4299,
    originalPrice: 6999,
    rating: 4.7,
    reviewsCount: 215,
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Handcrafted from supple burnished crust leather featuring durable elastic side gussets, Goodyear-welted construction, and rugged anti-slip rubber lug soles.",
    features: [
      "100% Genuine Full Crust Calfskin Leather",
      "High-elasticity side gore panels for easy slip on/off",
      "Breathable leather footbed with arch-support memory foam",
      "Goodyear-welted style durable stitched sole",
      "Reinforced woven rear pull-tab"
    ],
    specs: {
      "Upper": "Calfskin Leather",
      "Lining": "Breathable Leather",
      "Sole": "Durable Lugged Rubber",
      "Shaft Height": "Ankle",
      "Origin": "Handmade in India"
    },
    inStock: true
  },
  {
    id: "foot-3",
    name: "Urban Low-Top Canvas Casual Sneakers",
    category: "footwear",
    price: 1599,
    originalPrice: 2499,
    rating: 4.5,
    reviewsCount: 178,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Classic vulcanized canvas sneakers with cushioned insole, reinforced rubber toe cap, and timeless waffle tread for daily urban adventures.",
    features: [
      "12oz heavy-duty washed cotton canvas upper",
      "Vulcanized gum rubber sole with waffle tread",
      "Ortholite moisture-wicking comfort footbed",
      "Double-stitched stress zones for long wear",
      "Metal eyelets and 100% cotton laces"
    ],
    specs: {
      "Upper Material": "Cotton Canvas",
      "Sole": "Vulcanized Rubber",
      "Closure": "Lace-up",
      "Style": "Low-Top Casual",
      "Care": "Spot clean with damp cloth"
    },
    inStock: true
  },
  {
    id: "foot-4",
    name: "Summit Grip All-Terrain Hiking Trail Shoes",
    category: "footwear",
    price: 3999,
    originalPrice: 5999,
    rating: 4.8,
    reviewsCount: 145,
    badge: "Outdoor",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Built for tough mountain trails with waterproof HydroShield membrane, protective TPU toe guard, and Vibram-inspired deep traction lugs.",
    features: [
      "Waterproof breathable inner membrane barrier",
      "Reinforced TPU abrasion-resistant toe cap",
      "Dual-density EVA shock absorption midsole",
      "Gusseted tongue keeps rocks and debris out",
      "5mm deep multi-directional traction lugs"
    ],
    specs: {
      "Terrain": "Trail, Mud, Rock & Mixed Terrain",
      "Waterproof": "Yes (HydroShield)",
      "Upper": "Ripstop Nylon & Synthetic Suede",
      "Weight": "380g per shoe",
      "Warranty": "1 Year"
    },
    inStock: true
  },
  {
    id: "foot-5",
    name: "Classic Suede Penny Loafers",
    category: "footwear",
    price: 2799,
    originalPrice: 4199,
    rating: 4.6,
    reviewsCount: 112,
    badge: null,
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Refined Italian-style slip-on loafers in premium brushed suede with traditional penny strap detailing and flexible leather-rubber combo sole.",
    features: [
      "Silky soft brushed genuine suede leather",
      "Padded leather lining for sockless comfort",
      "Flexible driver-inspired hybrid sole",
      "Hand-stitched moccasin toe seam",
      "Classic timeless dress-casual profile"
    ],
    specs: {
      "Material": "Genuine Suede Leather",
      "Lining": "Soft Sheepskin Leather",
      "Sole": "Flexible Rubber Non-Slip",
      "Type": "Slip-On Penny Loafer",
      "Origin": "Made in India"
    },
    inStock: true
  },

  // --- HOME & LIVING ---
  {
    id: "home-1",
    name: "Artisan Ceramic Pour-Over Coffee Dripper Set",
    category: "home",
    price: 1899,
    originalPrice: 2899,
    rating: 4.9,
    reviewsCount: 240,
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Handcrafted matte ceramic V-shaped dripper paired with a 600ml heat-resistant borosilicate glass carafe for the ultimate pour-over coffee ritual.",
    features: [
      "High-fired thermal ceramic maintains brewing temperature",
      "Spiral interior ribs for optimal water extraction flow",
      "600ml heat-resistant borosilicate glass carafe with pour spout",
      "Includes natural walnut wood collar and 40 paper filters",
      "Dishwasher safe and food-grade certified"
    ],
    specs: {
      "Capacity": "600 ml (2-4 Cups)",
      "Material": "Ceramic & Borosilicate Glass",
      "Included": "Dripper, Carafe, Wood Collar, 40 Filters",
      "Care": "Dishwasher Safe (Glass & Ceramic)",
      "Warranty": "6 Months"
    },
    inStock: true
  },
  {
    id: "home-2",
    name: "Zen Mist Ultrasonic Aroma Essential Oil Diffuser",
    category: "home",
    price: 1699,
    originalPrice: 2499,
    rating: 4.7,
    reviewsCount: 308,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Quiet 2.4MHz ultrasonic cool mist humidifier encased in elegant natural wood grain finish with 7 soothing ambient LED mood light colors.",
    features: [
      "500ml high-capacity water tank runs up to 12 hours",
      "Ultra-quiet operation below 23dB (whisper quiet)",
      "Auto shut-off protection when water runs out",
      "4 timer settings: 1H / 3H / 6H / Continuous",
      "7-color LED ambient nightlight with dimming controls"
    ],
    specs: {
      "Tank Capacity": "500 ml",
      "Coverage Area": "Up to 350 sq. ft.",
      "Noise Level": "< 23 dB",
      "Power": "AC Adapter Included (12W)",
      "Warranty": "1 Year Replacement"
    },
    inStock: true
  },
  {
    id: "home-3",
    name: "Nordic Minimalist Adjustable Brass Desk Lamp",
    category: "home",
    price: 2899,
    originalPrice: 4499,
    rating: 4.8,
    reviewsCount: 162,
    badge: "Design Pick",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Sculptural mid-century modern task lamp with brushed brass finish, adjustable swivel head, and heavy weighted base for stable illumination.",
    features: [
      "Brushed brass finish with matte black accents",
      "180-degree rotatable lampshade for focused task lighting",
      "Braided fabric cable with integrated in-line rotary switch",
      "Solid cast iron base prevents tipping",
      "Standard E27 socket (warm LED bulb included)"
    ],
    specs: {
      "Dimensions": "48 cm (H) x 18 cm (Base Dia)",
      "Bulb Type": "E27 (6W Warm LED Included)",
      "Material": "Spun Steel & Brushed Brass",
      "Cable Length": "1.8 meters braided cord",
      "Warranty": "1 Year"
    },
    inStock: true
  },
  {
    id: "home-4",
    name: "Pure Waffle Weave Washed Cotton Throw Blanket",
    category: "home",
    price: 1399,
    originalPrice: 2199,
    rating: 4.6,
    reviewsCount: 195,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Textured honeycomb waffle weave woven from pre-washed combed cotton, offering lightweight year-round breathability for couches or beds.",
    features: [
      "100% Breathable Combed Cotton (350 GSM)",
      "Deep three-dimensional waffle texture traps warm air in winter and breathes in summer",
      "Pre-shrunk garment wash prevents shrinkage",
      "Generous 150 x 200 cm throw size",
      "Lint-free and skin friendly"
    ],
    specs: {
      "Dimensions": "150 x 200 cm",
      "Material": "100% Combed Cotton",
      "Weave": "Honeycomb Waffle Weave",
      "Care": "Machine wash cold, gentle cycle",
      "Origin": "Made in India"
    },
    inStock: true
  },
  {
    id: "home-5",
    name: "Pre-Seasoned Heavy Duty Cast Iron Skillet (10-Inch)",
    category: "home",
    price: 1599,
    originalPrice: 2299,
    rating: 4.9,
    reviewsCount: 380,
    badge: "Chef's Choice",
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Pre-seasoned with 100% natural vegetable flax oil for a natural, easy-release finish that improves with every single cook on any stovetop or oven.",
    features: [
      "Pre-seasoned with pure edible flaxseed oil",
      "Superior heat retention and even heat distribution",
      "Dual pour spouts for mess-free draining of sauces and oils",
      "Compatible with induction, gas, electric, oven, and campfire",
      "Sturdy loop helper handle for easy two-handed lifting"
    ],
    specs: {
      "Diameter": "10.25 Inches (26 cm)",
      "Depth": "2 Inches (5 cm)",
      "Weight": "2.4 kg",
      "Material": "Virgin Heavy Cast Iron",
      "Warranty": "Lifetime Durability Warranty"
    },
    inStock: true
  }
];
