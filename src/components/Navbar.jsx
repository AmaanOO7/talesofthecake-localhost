import React, { useState, useContext } from "react";
import { ShopContext } from "./ShopContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { cart, favorites } = useContext(ShopContext);

  return (
    <nav className="fixed top-0 left-0 w-full bg-primary text-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand Logo + Text */}
        <a href="/" className="flex items-center gap-2">
          <img
            src="/logo.jpg"
            alt="Tales of the Cake Logo"
            className="h-8 w-8 md:h-10 md:w-10 object-contain rounded-full"
          />
          <span className="font-display text-2xl font-bold hidden md:block">
            Tales of the Cake
          </span>
        </a>

        {/* Hamburger (mobile only) */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="relative w-8 h-8 flex items-center justify-center"
          >
            {/* animated hamburger lines */}
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

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-6">
          <li className="cursor-pointer hover:text-secondary">Home</li>
          <li className="cursor-pointer hover:text-secondary">Products</li>
          <li className="cursor-pointer hover:text-secondary">About</li>
          <li className="cursor-pointer hover:text-secondary">Contact</li>

          {/* ❤️ Favorites */}
          <li className="relative cursor-pointer">
            ❤️
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {favorites.length}
              </span>
            )}
          </li>

          {/* 🛒 Cart */}
          <li className="relative cursor-pointer">
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {cart.length}
              </span>
            )}
          </li>

          <li className="cursor-pointer hover:text-secondary">Login</li>
        </ul>
      </div>

      {/* Mobile dropdown menu with smooth slide animation */}
      <div
        className={`md:hidden transform transition-all duration-500 ease-in-out ${
          open
            ? "translate-y-0 opacity-100 max-h-96"
            : "-translate-y-5 opacity-0 max-h-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-4 px-6 py-4 bg-primary">
          <li className="cursor-pointer hover:text-secondary">Home</li>
          <li className="cursor-pointer hover:text-secondary">Products</li>
          <li className="cursor-pointer hover:text-secondary">About</li>
          <li className="cursor-pointer hover:text-secondary">Contact</li>

          {/* ❤️ Favorites (mobile) */}
          <li className="relative cursor-pointer">
            ❤️
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {favorites.length}
              </span>
            )}
          </li>

          {/* 🛒 Cart (mobile) */}
          <li className="relative cursor-pointer">
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {cart.length}
              </span>
            )}
          </li>

          <li className="cursor-pointer hover:text-secondary">Login</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
