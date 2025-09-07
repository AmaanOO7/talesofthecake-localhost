import React, { useState, useContext } from 'react';
import { ShopContext } from './components/ShopContext';

function Navbar() {
  const [open, setOpen] = useState(false);
  const { cart, favorites } = useContext(ShopContext);

  return (
    <nav className="fixed top-0 left-0 w-full bg-primary text-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="font-display text-2xl font-bold">Tales of the Cake</h1>

        {/* Hamburger / Close Button */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="relative w-8 h-8 focus:outline-none flex items-center justify-center"
          >
            <span
              className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
                open ? 'rotate-45 translate-y-1.5' : '-translate-y-2'
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-6 bg-white transition duration-300 ease-in-out ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
                open ? '-rotate-45 -translate-y-1.5' : 'translate-y-2'
              }`}
            ></span>
          </button>
        </div>

        {/* Desktop & Tablet Menu */}
        <ul className="hidden md:flex md:items-center md:gap-6">
          <li className="cursor-pointer hover:text-secondary">Home</li>
          <li className="cursor-pointer hover:text-secondary">Products</li>
          <li className="cursor-pointer hover:text-secondary">About</li>
          <li className="cursor-pointer hover:text-secondary">Contact</li>

          {/* Cart */}
          <li className="relative cursor-pointer">
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {cart.length}
              </span>
            )}
          </li>

          {/* Favorites */}
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
      </div>

      {/* Mobile Menu with Slide Animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col gap-4 px-6 py-4 bg-primary">
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
      </div>
    </nav>
  );
}

export default Navbar;
