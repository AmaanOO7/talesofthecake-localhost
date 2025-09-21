import React, { useState, useContext, useEffect, useRef } from "react";
import { ShopContext } from "./ShopContext";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const {
    cart,
    favorites,
    removeFromCart,
    searchQuery,
    setSearchQuery,
  } = useContext(ShopContext);

  const menuRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Close drawer if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // ✅ Handle Search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      navigate("/products"); // redirect to products page
      setSearchOpen(false); // close overlay
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
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
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
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
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
        ref={menuRef}
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

      {/* ✅ Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white text-black shadow-lg transform transition-transform duration-500 ease-in-out ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button onClick={() => setCartOpen(false)} className="text-xl">
            ✖
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
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

      {/* ✅ Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-4 relative">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-2 right-2 text-xl"
            >
              ✖
            </button>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchSubmit}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
