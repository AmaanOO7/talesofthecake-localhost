import React, { useState, useContext } from "react";
import { ShopContext } from "./ShopContext";
import { Link, useLocation } from "react-router-dom";

function Navbar({ onSearch }) {
  const [open, setOpen] = useState(false); // mobile menu
  const [cartOpen, setCartOpen] = useState(false); // cart drawer
  const [favoritesOpen, setFavoritesOpen] = useState(false); // favorites drawer
  const [searchOpen, setSearchOpen] = useState(false); // search drawer
  const { cart, favorites, addToCart, removeFromCart, removeFromFavorites } =
    useContext(ShopContext);

  const location = useLocation(); // know if we are on /products page
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) onSearch(value); // pass search to AllProducts
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-primary text-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Hamburger (mobile only) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setOpen(!open)}
            className="relative w-8 h-8 flex items-center justify-center"
          >
            <span
              className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 ${
                open ? "rotate-45 translate-y-1.5" : "-translate-y-2"
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-6 bg-white transition duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 ${
                open ? "-rotate-45 -translate-y-1.5" : "translate-y-2"
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

        {/* Desktop menu */}
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
          <li
            className="relative cursor-pointer"
            onClick={() => setFavoritesOpen(true)}
          >
            ❤️
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {favorites.length}
              </span>
            )}
          </li>

          {/* 🛒 Cart */}
          <li
            className="relative cursor-pointer"
            onClick={() => setCartOpen(true)}
          >
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {cart.length}
              </span>
            )}
          </li>

          {/* 🔍 Search (only works on /products page) */}
          <li
            className="cursor-pointer hover:text-secondary text-xl"
            onClick={() =>
              location.pathname === "/products"
                ? setSearchOpen(true)
                : alert("Go to Products page to search!")
            }
          >
            🔍
          </li>

          {/* 👤 Login */}
          <li className="cursor-pointer hover:text-secondary text-xl">
            <Link to="/login">👤</Link>
          </li>
        </ul>

        {/* Mobile right-side icons */}
        <div className="flex items-center gap-4 md:hidden">
          <span
            className="text-xl cursor-pointer hover:text-secondary"
            onClick={() => setSearchOpen(true)}
          >
            🔍
          </span>
          <div
            className="relative cursor-pointer"
            onClick={() => setCartOpen(true)}
          >
            <span className="text-xl hover:text-secondary">🛒</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {cart.length}
              </span>
            )}
          </div>
          <Link to="/login" className="text-xl cursor-pointer hover:text-secondary">
            👤
          </Link>
        </div>
      </div>

      {/* Background Overlay */}
      {(open || cartOpen || favoritesOpen || searchOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-500 md:hidden"
          onClick={() => {
            setOpen(false);
            setCartOpen(false);
            setFavoritesOpen(false);
            setSearchOpen(false);
          }}
        ></div>
      )}

      {/* Search Drawer (right) */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white text-black shadow-lg transform transition-transform duration-500 ease-in-out ${
          searchOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Search Products</h2>
          <button
            onClick={() => setSearchOpen(false)}
            className="text-xl"
          >
            ✖
          </button>
        </div>

        <div className="p-4">
          <input
            type="text"
            placeholder="Search for cakes..."
            value={searchValue}
            onChange={handleSearchChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
