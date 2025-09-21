import React, { createContext, useState, useContext } from "react";
import ALL_PRODUCTS from "./productsData"; // ✅ import products data

export const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // ✅ global search state

  // ✅ Normalize products with discount as number (default 0)
  const [products, setProducts] = useState(
    ALL_PRODUCTS.map((p) => ({
      ...p,
      discount: typeof p.discount === "number" ? p.discount : 0,
    }))
  );

  // ✅ Admin function to update discount (safe number)
  const updateDiscount = (productId, discount) => {
    let parsed = parseFloat(discount);
    if (isNaN(parsed) || parsed < 0) parsed = 0;
    if (parsed > 100) parsed = 100;

    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, discount: parsed } : p
      )
    );
  };

  // ✅ Cart functions with quantity support
  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(
      cart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: (item.quantity || 1) - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ✅ Favorites
  const addToFavorites = (product) => {
    if (!favorites.find((item) => item.id === product.id)) {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromFavorites = (productId) => {
    setFavorites(favorites.filter((item) => item.id !== productId));
  };

  const toggleFavorite = (product) => {
    if (favorites.find((item) => item.id === product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  // ✅ Products filtered by searchQuery
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        favorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        searchQuery,
        setSearchQuery,
        filteredProducts, // ✅ filtered list
        products, // ✅ full products with discounts
        updateDiscount, // ✅ admin can update discounts
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

// ✅ custom hook for easy access
export const useShop = () => useContext(ShopContext);
