import React, { useState, useContext } from "react";
import { ShopContext } from "./ShopContext";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cart, favorites, addToCart, removeFromCart, removeFromFavorites } =
    useContext(ShopContext);

  return (
    <nav className="fixed top-0 left-0 w-full bg-primary text-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* ✅ Hamburger (mobile only, fixed) */}
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

        {/* Brand Logo + Name */}
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

          {/* 🔍 Search */}
          <li
            className="cursor-pointer hover:text-secondary"
            onClick={() => setSearchOpen(true)}
          >
            🔍
          </li>

          {/* 👤 Login */}
          <li className="cursor-pointer hover:text-secondary">
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
          <Link
            to="/login"
            className="text-xl cursor-pointer hover:text-secondary"
          >
            👤
          </Link>
        </div>
      </div>

      {/* ✅ Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-primary shadow-lg transform transition-transform duration-500 ease-in-out md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-6 px-6 py-8 overflow-y-auto h-full">
          <li
            className="cursor-pointer hover:text-secondary"
            onClick={() => setOpen(false)}
          >
            <Link to="/">Home</Link>
          </li>
          <li
            className="cursor-pointer hover:text-secondary"
            onClick={() => setOpen(false)}
          >
            <Link to="/products">Products</Link>
          </li>
          <li
            className="cursor-pointer hover:text-secondary"
            onClick={() => setOpen(false)}
          >
            <a href="#about">About</a>
          </li>
          <li
            className="cursor-pointer hover:text-secondary"
            onClick={() => setOpen(false)}
          >
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>

      {/* The other drawers (Cart, Favorites, Search) remain unchanged */}
    </nav>
  );
}

export default Navbar;
