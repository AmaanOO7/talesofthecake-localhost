// src/popularProductsData.jsx
import ALL_PRODUCTS from "./productsData";

// 👇 Pick specific product IDs to be "popular"
const POPULAR_PRODUCTS = ALL_PRODUCTS.filter((p) =>
  [5, 6, 15, 17].includes(p.id) // ✅ change IDs as needed
);

export default POPULAR_PRODUCTS;
