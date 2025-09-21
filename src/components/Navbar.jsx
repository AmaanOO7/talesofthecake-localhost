// src/components/Navbar.jsx
import React, { useState, useContext, useEffect, useRef } from "react";
import { ShopContext } from "./ShopContext";
import { Link, useNavigate } from "react-router-dom";

/*
  INLINE ICONS (small, dependency-free)
  Replace with heroicons components if you have them installed.
*/
const Icon = {
  Bars: (props) => (
    <svg viewBox="0 0 24 24" {...props} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  X: (props) => (
    <svg viewBox="0 0 24 24" {...props} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Heart: (props) => (
    <svg viewBox="0 0 24 24" {...props} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M20.8 7.9c0 5.3-8.8 11.1-8.8 11.1S3.2 13.2 3.2 7.9a4.2 4.2 0 0 1 4.2-4.2c1.6 0 3.1.9 3.8 2.2.7-1.3 2.2-2.2 3.8-2.2a4.2 4.2 0 0 1 4.2 4.2z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Cart: (props) => (
    <svg viewBox="0 0 24 24" {...props} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 3h2l.9 2M7 13h10l3-7H6.2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="10" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </svg>
  ),
  Search: (props) => (
    <svg viewBox="0 0 24 24" {...props} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="11" cy="11" r="6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  User: (props) => (
    <svg viewBox="0 0 24 24" {...props} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 20a8 8 0 0 1 16 0" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

function Navbar() {
  const [open, setOpen] = useState(false); // mobile menu
  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Visibilities used to animate/fade-in before actual drawer transform
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

  const headerRef = useRef(null); // contains hamburger + icons (prevents outside-click from interfering)
  const menuRef = useRef(null); // mobile menu dropdown
  const cartRef = useRef(null);
  const favoritesRef = useRef(null);
  const searchRef = useRef(null);

  const navigate = useNavigate();

  // Helper: robust price parsing (handles "1400", "₹1,400", "1,400" etc.)
  const parsePrice = (val) => {
    if (val == null) return 0;
    if (typeof val === "number") return val;
    const cleaned = String(val).replace(/[^\d.-]/g, "");
    const num = Number(cleaned);
    return Number.isNaN(num) ? 0 : num;
  };
  const formatPrice = (val) => {
    const n = Number(val) || 0;
    return "₹" + n.toLocaleString("en-IN");
  };

  // open/close helpers that animate visibility first (prevents immediate closing race)
  const openCart = () => {
    setCartVisible(true);
    setTimeout(() => setCartOpen(true), 20);
  };
  const closeCart = () => {
    setCartOpen(false);
    setTimeout(() => setCartVisible(false), 220);
  };
  const openFavorites = () => {
    setFavoritesVisible(true);
    setTimeout(() => setFavoritesOpen(true), 20);
  };
  const closeFavorites = () => {
    setFavoritesOpen(false);
    setTimeout(() => setFavoritesVisible(false), 220);
  };
  const openSearch = () => {
    setSearchVisible(true);
    setTimeout(() => setSearchOpen(true), 20);
  };
  const closeSearch = () => {
    setSearchOpen(false);
    setTimeout(() => setSearchVisible(false), 220);
  };

  // Close when clicking outside OR pressing Escape.
  // We listen for "click" (not mousedown) and protect headerRef so icon clicks don't immediately close drawers.
  useEffect(() => {
    const handleClickOutside = (e) => {
      const t = e.target;
      // if clicked inside header (hamburger or icons), don't close (they have own handlers)
      if (headerRef.current && headerRef.current.contains(t)) return;

      // mobile menu
      if (menuRef.current && !menuRef.current.contains(t)) {
        setOpen(false);
      }

      if (cartVisible && cartRef.current && !cartRef.current.contains(t)) {
        closeCart();
      }
      if (favoritesVisible && favoritesRef.current && !favoritesRef.current.contains(t)) {
        closeFavorites();
      }
      if (searchVisible && searchRef.current && !searchRef.current.contains(t)) {
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

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartVisible, favoritesVisible, searchVisible]);

  // Search handlers
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      navigate("/products");
      closeSearch();
    }
  };

  // Derived numbers for bill summary
  const baseTotal = cart.reduce((sum, item) => sum + parsePrice(item.price) * (item.quantity || 1), 0);
  const discountTotal = cart.reduce((sum, item) => {
    const discountPct = Number(item.discount || 0);
    const price = parsePrice(item.price) * (item.quantity || 1);
    return sum + (price * discountPct) / 100;
  }, 0);
  const subtotal = baseTotal - discountTotal;
  const packagingCharge = subtotal > 0 ? 50 : 0;
  const deliveryCharge = subtotal > 0 ? 100 : 0;
  const gst = subtotal * 0.05;
  const grandTotal = subtotal + packagingCharge + deliveryCharge + gst;

  return (
    <nav className="fixed top-0 left-0 w-full bg-primary text-white shadow z-50">
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* mobile hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-8 h-8 flex items-center justify-center"
            aria-label="menu"
          >
            {open ? <Icon.X className="h-6 w-6 text-white" /> : <Icon.Bars className="h-6 w-6 text-white" />}
          </button>
        </div>

        {/* Brand */}
        <div className="flex-1 flex items-center justify-center md:justify-start space-x-3">
          <Link to="/" className="flex items-center">
            <img src="/logo.jpg" alt="Tales of the Cake Logo" className="h-16 md:h-20 w-auto object-contain" />
            <span className="ml-2 text-2xl md:text-3xl font-cursive text-white hidden sm:inline-block">
              Tales of the Cake
            </span>
          </Link>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-6">
          <li className="cursor-pointer hover:text-secondary"><Link to="/">Home</Link></li>
          <li className="cursor-pointer hover:text-secondary"><Link to="/products">Products</Link></li>
          <li className="cursor-pointer hover:text-secondary"><a href="#about">About</a></li>
          <li className="cursor-pointer hover:text-secondary"><a href="#contact">Contact</a></li>

          {/* Favorites */}
          <li className="relative cursor-pointer" onClick={openFavorites}>
            <Icon.Heart className="h-6 w-6 text-white hover:text-secondary" />
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                {favorites.length}
              </span>
            )}
          </li>

          {/* Cart */}
          <li className="relative cursor-pointer" onClick={openCart}>
            <Icon.Cart className="h-6 w-6 text-white hover:text-secondary" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
              </span>
            )}
          </li>

          {/* Search */}
          <li className="cursor-pointer" onClick={openSearch}>
            <Icon.Search className="h-6 w-6 text-white hover:text-secondary" />
          </li>

          {/* Login */}
          <li className="cursor-pointer hover:text-secondary">
            <Link to="/login"><Icon.User className="h-6 w-6 text-white hover:text-secondary" /></Link>
          </li>
        </ul>

        {/* Mobile right icons */}
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={openSearch} className="p-1"><Icon.Search className="h-6 w-6" /></button>

          <div className="relative" onClick={openFavorites}>
            <button className="p-1"><Icon.Heart className="h-6 w-6" /></button>
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {favorites.length}
              </span>
            )}
          </div>

          <div className="relative" onClick={openCart}>
            <button className="p-1"><Icon.Cart className="h-6 w-6" /></button>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
              </span>
            )}
          </div>

          <Link to="/login" className="p-1"><Icon.User className="h-6 w-6" /></Link>
        </div>
      </div>

      {/* Mobile sliding menu */}
      <div
        ref={menuRef}
        className={`md:hidden bg-primary text-white px-6 overflow-hidden absolute left-0 w-full shadow-lg z-40 transition-all duration-400 ease-in-out transform ${open ? "max-h-96 py-4 opacity-100" : "max-h-0 py-0 opacity-0"}`}
      >
        <ul className="flex flex-col gap-4">
          {[
            { to: "/", label: "Home" },
            { to: "/products", label: "Products" },
            { to: "#about", label: "About" },
            { to: "#contact", label: "Contact" },
            { to: "/login", label: "Login" },
          ].map((item, idx) => (
            <li key={item.label} className={`transition-transform duration-300`} style={{ transitionDelay: `${idx * 60}ms` }}>
              <Link to={item.to} onClick={() => setOpen(false)} className="block hover:text-secondary py-2">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Cart drawer */}
      {cartVisible && (
        <aside
          ref={cartRef}
          className={`fixed top-0 right-0 h-full w-80 bg-white text-black shadow-lg z-50 transform transition-transform duration-300 ${cartOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
        >
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <h2 className="text-lg font-bold">Your Cart</h2>
            <button onClick={closeCart} aria-label="close"><Icon.X className="h-5 w-5" /></button>
          </div>

          <div className="p-4 overflow-y-auto h-[calc(100%-220px)]">
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <ul className="space-y-4">
                {cart.map((item) => {
                  const qty = item.quantity || 1;
                  const priceNum = parsePrice(item.price);
                  const productDiscount = Number(item.discount || 0);
                  const originalPrice = priceNum * qty;
                  const discountedPrice = originalPrice * (1 - productDiscount / 100);

                  return (
                    <li key={item.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {qty}</p>

                        {productDiscount > 0 ? (
                          <>
                            <p className="text-sm text-gray-400 line-through">{formatPrice(originalPrice)}</p>
                            <p className="text-sm text-green-600 font-semibold">{formatPrice(discountedPrice)} ({productDiscount}% OFF)</p>
                          </>
                        ) : (
                          <p className="text-sm text-gray-600">{formatPrice(originalPrice)}</p>
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

          {/* bill summary */}
          {cart.length > 0 && (
            <div className="p-4 border-t bg-gray-50 text-sm">
              <h3 className="text-lg font-semibold mb-2">Bill Summary</h3>

              <div className="flex justify-between py-1"><span>Base Price:</span><span>{formatPrice(baseTotal)}</span></div>
              <div className="flex justify-between py-1 text-green-600"><span>Discount:</span><span>-{formatPrice(discountTotal)}</span></div>
              <div className="flex justify-between py-1"><span>Subtotal:</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between py-1"><span>Packaging:</span><span>{formatPrice(packagingCharge)}</span></div>
              <div className="flex justify-between py-1"><span>Delivery:</span><span>{formatPrice(deliveryCharge)}</span></div>
              <div className="flex justify-between py-1"><span>GST (5%):</span><span>{formatPrice(gst)}</span></div>

              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total:</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>

              <button className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700">Proceed to Checkout</button>
            </div>
          )}
        </aside>
      )}

      {/* Favorites drawer */}
      {favoritesVisible && (
        <aside
          ref={favoritesRef}
          className={`fixed top-0 right-0 h-full w-80 bg-white text-black shadow-lg z-50 transform transition-transform duration-300 ${favoritesOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
        >
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <h2 className="text-lg font-bold">Your Favorites</h2>
            <button onClick={closeFavorites} aria-label="close"><Icon.X className="h-5 w-5" /></button>
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
                      <p className="text-sm text-gray-600">{formatPrice(parsePrice(item.price))}</p>
                    </div>
                    <button onClick={() => toggleFavorite(item)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Remove</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      )}

      {/* Search overlay */}
      {searchVisible && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50 transition-opacity ${searchOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <div ref={searchRef} className="bg-white w-full max-w-lg rounded-lg shadow-lg p-4 relative">
            <button onClick={closeSearch} aria-label="close" className="absolute top-2 right-2 text-black"><Icon.X className="h-5 w-5" /></button>
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
