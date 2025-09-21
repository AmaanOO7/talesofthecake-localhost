import React, { useState, useContext } from "react";
import { ShoppingCart, Heart, Search, User, Menu, X } from "lucide-react";
import { ShopContext } from "./ShopContext";

function Navbar() {
  const { cart, searchQuery, setSearchQuery } = useContext(ShopContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false); // ✅ Search overlay

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-pink-600">Tales of the Cake</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <a href="/" className="hover:text-pink-500">Home</a>
          <a href="/products" className="hover:text-pink-500">Products</a>
          <a href="/about" className="hover:text-pink-500">About</a>
          <a href="/contact" className="hover:text-pink-500">Contact</a>

          {/* Icons */}
          <div className="flex space-x-4 items-center">
            {/* Search */}
            <Search
              className="w-6 h-6 cursor-pointer hover:text-pink-600"
              onClick={() => setSearchOpen(true)}
            />

            {/* Favorites */}
            <Heart className="w-6 h-6 cursor-pointer hover:text-pink-600" />

            {/* Cart */}
            <div className="relative">
              <ShoppingCart
                className="w-6 h-6 cursor-pointer hover:text-pink-600"
                onClick={() => setCartOpen(true)}
              />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </div>

            {/* Login/User */}
            <User className="w-6 h-6 cursor-pointer hover:text-pink-600" />
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
          <a href="/" className="block hover:text-pink-500">Home</a>
          <a href="/products" className="block hover:text-pink-500">Products</a>
          <a href="/about" className="block hover:text-pink-500">About</a>
          <a href="/contact" className="block hover:text-pink-500">Contact</a>

          {/* Mobile Icons */}
          <div className="flex space-x-4 pt-4">
            <Search
              className="w-6 h-6 cursor-pointer hover:text-pink-600"
              onClick={() => setSearchOpen(true)}
            />
            <Heart className="w-6 h-6 cursor-pointer hover:text-pink-600" />
            <ShoppingCart
              className="w-6 h-6 cursor-pointer hover:text-pink-600"
              onClick={() => setCartOpen(true)}
            />
            <User className="w-6 h-6 cursor-pointer hover:text-pink-600" />
          </div>
        </div>
      )}

      {/* ✅ Cart Side Panel */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
          <div className="bg-white w-80 h-full shadow-lg p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
              onClick={() => setCartOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>

            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <ul className="space-y-3">
                {cart.map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center border-b pb-2">
                    <span>{item.name}</span>
                    <span className="font-semibold">{item.price}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* ✅ Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 z-50">
          <div className="bg-white w-full max-w-2xl mx-4 p-4 rounded shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setSearchOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <input
              type="text"
              placeholder="Search for cakes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
