import React, { useState, useContext, useEffect, useRef } from "react";
import { ShopContext } from "./ShopContext";
import { Link, useNavigate } from "react-router-dom";

// ✅ Import Heroicons safely
import {
  HeartIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  UserIcon,
  XMarkIcon,
  Bars3Icon,
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
        {/* Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="w-8 h-8 flex items-center justify-center"
          >
            <Bars3Icon className="h-6 w-6 text-white" />
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

      {/* ✅ Cart Drawer */}
      {cartVisible && (
        <div
          ref={cartRef}
          className={`fixed top-0 right-0 h-full w-80 bg-white text-black shadow-lg transition-transform ${
            cartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <h2 className="text-lg font-bold">Your Cart</h2>
            <XMarkIcon className="h-6 w-6 cursor-pointer" onClick={closeCart} />
          </div>
          <div className="p-4 overflow-y-auto h-[calc(100%-220px)]">
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <ul className="space-y-4">
                {cart.map((item) => {
                  const productDiscount = item.discount || 0; // e.g. 20
                  const discountFactor = 1 - productDiscount / 100;
                  const originalPrice = item.price * item.quantity;
                  const discountedPrice = originalPrice * discountFactor;

                  return (
                    <li key={item.id} className="flex justify-between">
                      <div>
                        <p>{item.name}</p>
                        <p className="text-sm">Qty: {item.quantity}</p>
                        {productDiscount > 0 ? (
                          <>
                            <p className="line-through text-gray-400">₹{originalPrice}</p>
                            <p className="text-green-600 font-semibold">
                              ₹{discountedPrice.toFixed(2)} ({productDiscount}% OFF)
                            </p>
                          </>
                        ) : (
                          <p>₹{originalPrice.toFixed(2)}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Remove
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

         {/* ✅ Bill Summary (Invoice Style) */}
{cart.length > 0 && (() => {
  // Calculate values
  const baseTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountTotal = cart.reduce((sum, item) => {
    const discountAmount = (item.price * item.quantity * (item.discount || 0)) / 100;
    return sum + discountAmount;
  }, 0);

  const subtotal = baseTotal - discountTotal;
  const packagingCharge = subtotal > 0 ? 50 : 0;
  const deliveryCharge = subtotal > 0 ? 100 : 0;
  const gst = subtotal * 0.05;
  const grandTotal = subtotal + packagingCharge + deliveryCharge + gst;

  return (
    <div className="p-4 border-t bg-gray-50 text-sm">
      <h3 className="text-lg font-semibold mb-2">Bill Summary</h3>

      <div className="flex justify-between py-1">
        <span>Base Price:</span>
        <span>₹{baseTotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between py-1 text-green-600">
        <span>Discount:</span>
        <span>-₹{discountTotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between py-1">
        <span>Subtotal:</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between py-1">
        <span>Packaging:</span>
        <span>₹{packagingCharge}</span>
      </div>
      <div className="flex justify-between py-1">
        <span>Delivery:</span>
        <span>₹{deliveryCharge}</span>
      </div>
      <div className="flex justify-between py-1">
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
          className={`fixed top-0 right-0 h-full w-80 bg-white text-black shadow-lg transition-transform ${
            favoritesOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <h2>Your Favorites</h2>
            <XMarkIcon className="h-6 w-6 cursor-pointer" onClick={closeFavorites} />
          </div>
          <div className="p-4 overflow-y-auto">
            {favorites.length === 0 ? (
              <p className="text-gray-500">No favorites yet 💔</p>
            ) : (
              <ul className="space-y-4">
                {favorites.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <p>{item.name} - ₹{item.price}</p>
                    <button
                      onClick={() => toggleFavorite(item)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
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
          className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center pt-20 transition-opacity ${
            searchOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div ref={searchRef} className="bg-white w-full max-w-lg rounded p-4 relative">
            <XMarkIcon className="h-6 w-6 absolute top-2 right-2 cursor-pointer" onClick={closeSearch} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchSubmit}
              className="w-full border rounded p-2"
            />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
