import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useShop } from "./ShopContext";
import { ShoppingCart, Heart, Menu, X } from "lucide-react";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const { cart, removeFromCart, favorites } = useShop();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ✅ Calculate total items in cart
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-pink-200 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-pink-700 hover:text-pink-900"
        >
          Tales of the Cake
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 mx-6">
          <input
            type="text"
            placeholder="Search cakes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          {/* Favorites */}
          <Link to="/favorites" className="relative">
            <Heart className="h-6 w-6 text-pink-600 hover:text-pink-800 cursor-pointer" />
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs px-2 py-0.5 rounded-full">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <div
            className="relative cursor-pointer"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <ShoppingCart className="h-6 w-6 text-pink-600 hover:text-pink-800" />
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs px-2 py-0.5 rounded-full">
                {totalCartItems}
              </span>
            )}
          </div>

          {/* Mobile Menu */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-pink-700" />
            ) : (
              <Menu className="h-6 w-6 text-pink-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-3">
          <input
            type="text"
            placeholder="Search cakes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
      )}

      {/* Mobile Menu Links */}
      {isMenuOpen && (
        <div className="md:hidden bg-pink-100 px-4 py-2 space-y-2">
          <Link
            to="/"
            className="block text-pink-700 hover:text-pink-900"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="block text-pink-700 hover:text-pink-900"
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/favorites"
            className="block text-pink-700 hover:text-pink-900"
            onClick={() => setIsMenuOpen(false)}
          >
            Favorites
          </Link>
          <Link
            to="/login"
            className="block text-pink-700 hover:text-pink-900"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 z-50 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => {
                const productDiscount = Number(item.discount) || 0;
                const price = Number(item.price) || 0;
                const originalPrice = price * item.quantity;
                const discountedPrice =
                  originalPrice * (1 - productDiscount / 100);

                return (
                  <li key={item.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                      {productDiscount > 0 ? (
                        <>
                          <p className="text-sm text-gray-400 line-through">
                            ₹{originalPrice.toFixed(2)}
                          </p>
                          <p className="text-sm text-green-600 font-semibold">
                            ₹{discountedPrice.toFixed(2)} ({productDiscount}% OFF)
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-gray-600">
                          ₹{originalPrice.toFixed(2)}
                        </p>
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

          {/* ✅ Bill Summary */}
          {cart.length > 0 && (() => {
            const subtotal = cart.reduce((sum, item) => {
              const productDiscount = Number(item.discount) || 0;
              const price = Number(item.price) || 0;
              const finalPrice =
                price * item.quantity * (1 - productDiscount / 100);
              return sum + finalPrice;
            }, 0);

            const packagingCharge = subtotal > 0 ? 50 : 0;
            const deliveryCharge = subtotal > 0 ? 100 : 0;
            const gst = subtotal * 0.05;
            const grandTotal = subtotal + packagingCharge + deliveryCharge + gst;

            return (
              <div className="p-4 border-t bg-gray-50">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Packaging:</span>
                  <span>₹{packagingCharge}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span>₹{deliveryCharge}</span>
                </div>
                <div className="flex justify-between">
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
    </nav>
  );
};

export default Navbar;
