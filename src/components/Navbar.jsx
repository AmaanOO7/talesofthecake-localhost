import React, { useState, useContext, useEffect, useRef } from "react";
import { ShopContext } from "./ShopContext";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [cartVisible, setCartVisible] = useState(false);
  const [favoritesVisible, setFavoritesVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  const {
    cart,
    favorites,
    removeFromCart,
    toggleFavorite,
    searchQuery,
    setSearchQuery,
  } = useContext(ShopContext);

  const menuRef = useRef(null);
  const cartRef = useRef(null);
  const favoritesRef = useRef(null);
  const searchRef = useRef(null);

  const navigate = useNavigate();

  // ✅ Show drawer with fade before closing
  const openCart = () => {
    setCartVisible(true);
    setTimeout(() => setCartOpen(true), 10);
  };
  const closeCart = () => {
    setCartOpen(false);
    setTimeout(() => setCartVisible(false), 300);
  };

  const openFavorites = () => {
    setFavoritesVisible(true);
    setTimeout(() => setFavoritesOpen(true), 10);
  };
  const closeFavorites = () => {
    setFavoritesOpen(false);
    setTimeout(() => setFavoritesVisible(false), 300);
  };

  const openSearch = () => {
    setSearchVisible(true);
    setTimeout(() => setSearchOpen(true), 10);
  };
  const closeSearch = () => {
    setSearchOpen(false);
    setTimeout(() => setSearchVisible(false), 300);
  };

  // ✅ Close all drawers if clicked outside or ESC pressed
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        closeCart();
      }
      if (favoritesRef.current && !favoritesRef.current.contains(e.target)) {
        closeFavorites();
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        closeSearch();
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        closeCart();
        closeFavorites();
        closeSearch();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // ✅ Handle Search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      navigate("/products"); // redirect to products page
      closeSearch(); // close overlay
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-primary text-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* ✅ Hamburger (mobile only) */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="relative w-8 h-8 flex flex-col justify-between items-center"
          >
            <span
              className={`h-0.5 w-6 bg-white rounded transition-transform duration-300 ${
                open ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`h-0.5 w-6 bg-white rounded transition-all duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`h-0.5 w-6 bg-white rounded transition-transform duration-300 ${
                open ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Brand Logo */}
        <div className="flex-1 flex items-center justify-center md:justify-start space-x-3">
          <Link to="/" className="flex items-center">
            <img
              src="/logo.jpg"
              alt="Tales of the Cake Logo"
              className="h-16 md:h-20 w-auto object-contain"
            />
            <span className="ml-2 text-2xl md:text-3xl font-cursive text-white hidden sm:inline-block">
              Tales of the Cake
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6">
          <li className="cursor-pointer hover:text-secondary">
            <Link to="/">Home</Link>
          </li>
          <li className="cursor-pointer hover:text-secondary">
            <Link to="/products">Products</Link>
          </li>
          <li className="cursor-pointer hover:text-secondary">
            <a href="#about">About</a>
          </li>
          <li className="cursor-pointer hover:text-secondary">
            <a href="#contact">Contact</a>
          </li>

          {/* ❤️ Favorites */}
          <li className="relative cursor-pointer" onClick={openFavorites}>
            ❤️
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {favorites.length}
              </span>
            )}
          </li>

          {/* 🛒 Cart */}
          <li className="relative cursor-pointer" onClick={openCart}>
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </li>

          {/* 🔍 Search */}
          <li
            className="cursor-pointer hover:text-secondary"
            onClick={openSearch}
          >
            🔍
          </li>

          {/* 👤 Login */}
          <li className="cursor-pointer hover:text-secondary">
            <Link to="/login">👤</Link>
          </li>
        </ul>

        {/* ✅ Mobile right-side icons */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Search */}
          <span
            className="text-xl cursor-pointer hover:text-secondary"
            onClick={openSearch}
          >
            🔍
          </span>

          {/* Favorites */}
          <div className="relative cursor-pointer" onClick={openFavorites}>
            <span className="text-xl hover:text-secondary">❤️</span>
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {favorites.length}
              </span>
            )}
          </div>

          {/* Cart */}
          <div className="relative cursor-pointer" onClick={openCart}>
            <span className="text-xl hover:text-secondary">🛒</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </div>

          {/* Login */}
          <Link to="/login" className="text-xl cursor-pointer hover:text-secondary">
            👤
          </Link>
        </div>
      </div>

      {/* ✅ Mobile Drawer (slide-down animation) */}
      <div
        ref={menuRef}
        className={`absolute top-full left-0 w-full bg-primary shadow-lg transform transition-all duration-500 ease-in-out md:hidden overflow-hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-6 px-6 py-6">
          <li onClick={() => setOpen(false)} className="cursor-pointer hover:text-secondary">
            <Link to="/">Home</Link>
          </li>
          <li onClick={() => setOpen(false)} className="cursor-pointer hover:text-secondary">
            <Link to="/products">Products</Link>
          </li>
          <li onClick={() => setOpen(false)} className="cursor-pointer hover:text-secondary">
            <a href="#about">About</a>
          </li>
          <li onClick={() => setOpen(false)} className="cursor-pointer hover:text-secondary">
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>

      {/* ✅ Cart Drawer with Discounts */}
      {cartVisible && (
        <div
          ref={cartRef}
          className={`fixed top-0 right-0 h-full w-80 bg-white text-black shadow-lg transform transition-transform duration-300 ease-in-out ${
            cartOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
        >
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <h2 className="text-lg font-bold">Your Cart</h2>
            <button onClick={closeCart} className="text-xl">✖</button>
          </div>
          <div className="p-4 overflow-y-auto h-[calc(100%-220px)]">
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <ul className="space-y-4">
                {cart.map((item) => {
                  const productDiscount = item.discount || 0;
                  const originalPrice = item.price * item.quantity;
                  const discountedPrice = originalPrice * (1 - productDiscount);

                  return (
                    <li key={item.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        {productDiscount > 0 ? (
                          <>
                            <p className="text-sm text-gray-400 line-through">
                              ₹{originalPrice}
                            </p>
                            <p className="text-sm text-green-600 font-semibold">
                              ₹{discountedPrice.toFixed(2)} ({productDiscount * 100}% OFF)
                            </p>
                          </>
                        ) : (
                          <p className="text-sm text-gray-600">
                            ₹{originalPrice.toFixed(2)}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* ✅ Bill Summary */}
          {cart.length > 0 && (() => {
            const subtotal = cart.reduce((sum, item) => {
              const productDiscount = item.discount || 0;
              return sum + item.price * item.quantity * (1 - productDiscount);
            }, 0);

            const packagingCharge = subtotal > 0 ? 50 : 0;
            const deliveryCharge = subtotal > 0 ? 100 : 0;
            const gst = subtotal * 0.05;
            const grandTotal = subtotal + packagingCharge + deliveryCharge + gst;

            return (
              <div className="p-4 border-t bg-gray-50">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Packaging:</span>
                  <span>₹{packagingCharge}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span>₹{deliveryCharge}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%):</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                  <span>Total:</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </div>
                <button className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700">
                  Proceed to Checkout
                </button>
              </div>
            );
          })()}
        </div>
      )}

      {/* ✅ Favorites Drawer */}
      {favoritesVisible && (
        <div
          ref={favoritesRef}
          className={`fixed top-0 right-0 h-full w-80 bg-white text-black shadow-lg transform transition-transform duration-300 ease-in-out ${
            favoritesOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
        >
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <h2 className="text-lg font-bold">Your Favorites</h2>
            <button onClick={closeFavorites} className="text-xl">✖</button>
          </div>
          <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
            {favorites.length === 0 ? (
              <p className="text-gray-500">No favorites yet 💔</p>
            ) : (
              <ul className="space-y-4">
                {favorites.map((item) => (
                  <li key={item.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.price}</p>
                    </div>
                    <button
                      onClick={() => toggleFavorite(item)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* ✅ Search Overlay */}
      {searchVisible && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50 transition-opacity duration-300 ${
            searchOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            ref={searchRef}
            className="bg-white w-full max-w-lg rounded-lg shadow-lg p-4 relative"
          >
            <button onClick={closeSearch} className="absolute top-2 right-2 text-xl">✖</button>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchSubmit}
              className="w-full border border-gray-300 rounded p-2 text-black placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
