import React, { useState, useContext, useEffect, useRef } from "react";
import { ShopContext } from "./ShopContext";
import { Link, useNavigate } from "react-router-dom";

// ✅ Heroicons
import {
  ShoppingCartIcon,
  HeartIcon,
  Bars3Icon,
  XMarkIcon,
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
          <button onClick={() => setOpen(!open)} className="relative w-8 h-8">
            {open ? (
              <XMarkIcon className="h-8 w-8 text-white" />
            ) : (
              <Bars3Icon className="h-8 w-8 text-white" />
            )}
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
            <HeartIcon className="h-6 w-6 text-pink-600 hover:text-pink-800" />
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {favorites.length}
              </span>
            )}
          </li>

          {/* 🛒 Cart */}
          <li className="relative cursor-pointer" onClick={openCart}>
            <ShoppingCartIcon className="h-6 w-6 text-green-600 hover:text-green-800" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </li>

          {/* 🔍 Search */}
          <li className="cursor-pointer hover:text-secondary" onClick={openSearch}>
            <MagnifyingGlassIcon className="h-6 w-6 text-white hover:text-gray-300" />
          </li>

          {/* 👤 Login */}
          <li className="cursor-pointer hover:text-secondary">
            <Link to="/login">
              <UserIcon className="h-6 w-6 text-white hover:text-gray-300" />
            </Link>
          </li>
        </ul>

        {/* ✅ Mobile right-side icons */}
        <div className="flex items-center gap-4 md:hidden">
          <MagnifyingGlassIcon
            onClick={openSearch}
            className="h-6 w-6 text-white hover:text-gray-300 cursor-pointer"
          />
          <div className="relative cursor-pointer" onClick={openFavorites}>
            <HeartIcon className="h-6 w-6 text-pink-600 hover:text-pink-800" />
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {favorites.length}
              </span>
            )}
          </div>
          <div className="relative cursor-pointer" onClick={openCart}>
            <ShoppingCartIcon className="h-6 w-6 text-green-600 hover:text-green-800" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </div>
          <Link to="/login">
            <UserIcon className="h-6 w-6 text-white hover:text-gray-300" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
