import React, { createContext, useState } from "react";
import ALL_PRODUCTS from "./productsData"; // ✅ import here

export const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // ✅ global search state

  // Cart functions with quantity support
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

  // Favorites functions
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

  // ✅ Products filtered globally by searchQuery
  const filteredProducts = ALL_PRODUCTS.filter((p) =>
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
        filteredProducts, // ✅ share filtered list
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}
