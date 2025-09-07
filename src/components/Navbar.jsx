import React, { useState, useContext } from 'react';
import { ShopContext } from './ShopContext';

function Navbar() {
  const [open, setOpen] = useState(false);
  const { cart, favorites } = useContext(ShopContext);

  return (
    <nav className="fixed top-0 left-0 w-full bg-primary text-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="font-display text-2xl font-bold">Tales of the Cake</h1>

        {/* Hamburger for mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="text-3xl focus:outline-none"
          >
            ☰
          </button>
        </div>

        {/* Desktop & Tablet Menu */}
        <ul
          className={`md:flex md:items-center md:gap-6 ${
            open ? 'block' : 'hidden'
          }`}
        >
          <li className="py-2 md:py-0 cursor-pointer hover:text-secondary">Home</li>
          <li className="py-2 md:py-0 cursor-pointer hover:text-secondary">Products</li>
          <li className="py-2 md:py-0 cursor-pointer hover:text-secondary">About</li>
          <li className="py-2 md:py-0 cursor-pointer hover:text-secondary">Contact</li>

          {/* Cart Icon */}
          <li className="relative py-2 md:py-0 cursor-pointer">
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {cart.length}
              </span>
            )}
          </li>

          {/* Favorites Icon */}
          <li className="relative py-2 md:py-0 cursor-pointer">
            ❤️
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {favorites.length}
              </span>
            )}
          </li>

          <li className="py-2 md:py-0 cursor-pointer hover:text-secondary">Login</li>
        </ul>
      </div>

      {/* Mobile Menu */}
      <ul
        className={`md:hidden px-6 pb-4 bg-primary ${
          open ? 'block' : 'hidden'
        } space-y-2`}
      >
        <li className="cursor-pointer hover:text-secondary">Home</li>
        <li className="cursor-pointer hover:text-secondary">Products</li>
        <li className="cursor-pointer hover:text-secondary">About</li>
        <li className="cursor-pointer hover:text-secondary">Contact</li>
        <li className="relative cursor-pointer">
          🛒
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
              {cart.length}
            </span>
          )}
        </li>
        <li className="relative cursor-pointer">
          ❤️
          {favorites.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
              {favorites.length}
            </span>
          )}
        </li>
        <li className="cursor-pointer hover:text-secondary">Login</li>
      </ul>
    </nav>
  );
}

export default Navbar;
