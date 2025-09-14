import React, { useState, useContext } from "react";
import { ShopContext } from "./ShopContext";

function Navbar() {
  const [open, setOpen] = useState(false); // mobile menu
  const [cartOpen, setCartOpen] = useState(false); // cart drawer
  const [favoritesOpen, setFavoritesOpen] = useState(false); // favorites drawer
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

          <li className="cursor-pointer hover:text-secondary">Login</li>
        </ul>
      </div>

      {/* Background Overlay */}
      {(open || cartOpen || favoritesOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-500 md:hidden"
          onClick={() => {
            setOpen(false);
            setCartOpen(false);
            setFavoritesOpen(false);
          }}
        ></div>
      )}

      {/* Mobile Drawer Menu (Left) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-primary shadow-lg transform transition-transform duration-500 ease-in-out md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-6 px-6 py-8">
          <li
            className="cursor-pointer hover:text-secondary"
            onClick={() => setOpen(false)}
          >
            Home
          </li>
          <li
            className="cursor-pointer hover:text-secondary"
            onClick={() => setOpen(false)}
          >
            Products
          </li>
          <li
            className="cursor-pointer hover:text-secondary"
            onClick={() => setOpen(false)}
          >
            About
          </li>
          <li
            className="cursor-pointer hover:text-secondary"
            onClick={() => setOpen(false)}
          >
            Contact
          </li>

          {/* ❤️ Favorites (mobile) */}
          <li
            className="relative cursor-pointer"
            onClick={() => {
              setOpen(false);
              setFavoritesOpen(true);
            }}
          >
            ❤️
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {favorites.length}
              </span>
            )}
          </li>

          {/* 🛒 Cart (mobile) */}
          <li
            className="relative cursor-pointer"
            onClick={() => {
              setOpen(false);
              setCartOpen(true);
            }}
          >
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {cart.length}
              </span>
            )}
          </li>

          <li
            className="cursor-pointer hover:text-secondary"
            onClick={() => setOpen(false)}
          >
            Login
          </li>
        </ul>
      </div>

      {/* Cart Drawer (Right) */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white text-black shadow-lg transform transition-transform duration-500 ease-in-out ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button onClick={() => setCartOpen(false)} className="text-xl">
            ✖
          </button>
        </div>

        <div className="p-4 flex flex-col gap-4 overflow-y-auto h-[calc(100%-64px)]">
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>{item.name}</span>
                <span className="font-semibold">{item.price}</span>
              </div>
            ))
          )}
        </div>

        {/* Checkout Button */}
        {cart.length > 0 && (
          <div className="p-4 border-t">
            <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Checkout
            </button>
          </div>
        )}
      </div>

      {/* Favorites Drawer (Right) */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white text-black shadow-lg transform transition-transform duration-500 ease-in-out ${
          favoritesOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Your Favorites</h2>
          <button onClick={() => setFavoritesOpen(false)} className="text-xl">
            ✖
          </button>
        </div>

        <div className="p-4 flex flex-col gap-4 overflow-y-auto h-[calc(100%-64px)]">
          {favorites.length === 0 ? (
            <p className="text-gray-500">No favorites yet</p>
          ) : (
            favorites.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>{item.name}</span>
                <span className="font-semibold">{item.price}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
