import React, { useState, useContext, useEffect, useRef } from "react";
import { ShopContext } from "./ShopContext";
import { Link, useNavigate } from "react-router-dom";

// ✅ Import Heroicons safely
import {
  HeartIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

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

  // ✅ Drawer logic
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

  // ✅ Close drawers when clicking outside or ESC
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
      if (cartRef.current && !cartRef.current.contains(e.target)) closeCart();
      if (favoritesRef.current && !favoritesRef.current.contains(e.target)) closeFavorites();
      if (searchRef.current && !searchRef.current.contains(e.target)) closeSearch();
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

  // ✅ Handle search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      navigate("/products");
      closeSearch();
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-primary text-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* ✅ Hamburger with animation */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="w-8 h-8 flex items-center justify-center relative"
          >
            <div className="relative w-6 h-6">
              {/* Top bar */}
              <span
                className={`absolute left-0 top-0 h-0.5 w-6 bg-white transform transition-all duration-500 ease-in-out ${
                  open ? "rotate-45 top-2.5" : "rotate-0 top-0"
                }`}
              />
              {/* Middle bar */}
              <span
                className={`absolute left-0 top-2.5 h-0.5 w-6 bg-white transform transition-all duration-500 ease-in-out ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              {/* Bottom bar */}
              <span
                className={`absolute left-0 bottom-0 h-0.5 w-6 bg-white transform transition-all duration-500 ease-in-out ${
                  open ? "-rotate-45 bottom-2.5" : "rotate-0 bottom-0"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Brand */}
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
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>

          {/* Favorites */}
          <li className="relative cursor-pointer" onClick={openFavorites}>
            <HeartIcon className="h-6 w-6 text-white hover:text-secondary" />
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {favorites.length}
              </span>
            )}
          </li>

          {/* Cart */}
          <li className="relative cursor-pointer" onClick={openCart}>
            <ShoppingCartIcon className="h-6 w-6 text-white hover:text-secondary" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-green-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </li>

          {/* Search */}
          <li onClick={openSearch}>
            <MagnifyingGlassIcon className="h-6 w-6 text-white hover:text-secondary cursor-pointer" />
          </li>

          {/* Login */}
          <li>
            <Link to="/login">
              <UserIcon className="h-6 w-6 text-white hover:text-secondary" />
            </Link>
          </li>
        </ul>

        {/* Mobile right icons */}
        <div className="flex items-center gap-4 md:hidden">
          <MagnifyingGlassIcon className="h-6 w-6 cursor-pointer" onClick={openSearch} />
          <HeartIcon className="h-6 w-6 cursor-pointer" onClick={openFavorites} />
          <ShoppingCartIcon className="h-6 w-6 cursor-pointer" onClick={openCart} />
          <Link to="/login">
            <UserIcon className="h-6 w-6 cursor-pointer" />
          </Link>
        </div>
      </div>

      {/* ✅ Background overlay with blur */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* ✅ Mobile Menu with effects */}
      <div
        ref={menuRef}
        className={`md:hidden bg-primary text-white px-6 overflow-hidden absolute left-0 w-full shadow-lg z-40 transition-all duration-500 ease-in-out transform ${
          open
            ? "max-h-96 py-4 opacity-100 scale-100"
            : "max-h-0 py-0 opacity-0 scale-95"
        }`}
      >
        <ul className="flex flex-col gap-4">
          {[
            { to: "/", label: "Home" },
            { to: "/products", label: "Products" },
            { to: "#about", label: "About" },
            { to: "#contact", label: "Contact" },
            { to: "/login", label: "Login" },
          ].map((item, index) => (
            <li
              key={item.label}
              className={`transform transition-all duration-700 ${
                open
                  ? "translate-y-0 opacity-100 scale-100 ease-out"
                  : "translate-y-4 opacity-0 scale-95 ease-in"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <Link
                to={item.to}
                onClick={() => setOpen(false)}
                className="block hover:text-secondary transition-transform duration-500 ease-out hover:scale-105"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ Cart, Favorites, Search drawers remain the same */}
    </nav>
  );
}

export default Navbar;
