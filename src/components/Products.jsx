import React, { useContext, useState } from 'react';
import { ShopContext } from './ShopContext';

const PRODUCTS = [
  { id: 1, name: 'Vanilla Story Cake', price: '₹1,200', img: '/images/choco-cake.jfif' },
  { id: 2, name: 'Chocolate Chronicle', price: '₹1,500', img: '/images/pineapple-cake.jfif' },
  { id: 3, name: 'Strawberry Bliss', price: '₹1,300', img: '/images/vanila-cake.jfif' },
  { id: 4, name: 'Blueberry Heaven', price: '₹1,400', img: '/images/blueberry-cake.jfif' },
  { id: 5, name: 'Lemon Delight', price: '₹1,250', img: '/images/lemon-cake.jfif' },
  { id: 6, name: 'Red Velvet Charm', price: '₹1,600', img: '/images/red-velvet-cake.jfif' },
  { id: 7, name: 'Coffee Crunch', price: '₹1,350', img: '/images/coffee-cake.jfif' },
];

function Products() {
  const { cart, addToCart, favorites, toggleFavorite } = useContext(ShopContext);
  const [popup, setPopup] = useState({ visible: false, message: '' });
  const [cartAnimation, setCartAnimation] = useState(false);
  const [favAnimation, setFavAnimation] = useState(false);

  const showPopup = (message) => {
    setPopup({ visible: true, message });
    setTimeout(() => setPopup({ visible: false, message: '' }), 1500);
  };

  const handleFavorite = (product) => {
    const isAlreadyFavorite = favorites.find((item) => item.id === product.id);
    toggleFavorite(product);
    if (isAlreadyFavorite) {
      showPopup(`${product.name} removed from favorites 💔`);
    } else {
      showPopup(`${product.name} added to favorites ❤️`);
      setFavAnimation(true);
      setTimeout(() => setFavAnimation(false), 500);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    showPopup(`${product.name} added to cart 🛒`);
    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 500);
  };

  return (
    <section className="py-20 px-6 bg-white relative">
      <h2 className="text-3xl font-display text-center text-primary mb-12">Our Popular Products</h2>

      {popup.visible && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-2 rounded shadow-lg z-50 animate-fade-in">
          {popup.message}
        </div>
      )}

      {/* Horizontal scroll container */}
      <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {PRODUCTS.map((product) => {
          const cartItem = cart.find((item) => item.id === product.id);
          const inCartQty = cartItem ? cartItem.quantity : 0;
          const isFavorite = favorites.find((item) => item.id === product.id);

          return (
            <div
              key={product.id}
              className="min-w-[250px] bg-accent rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition relative flex-shrink-0"
            >
              <img src={product.img} alt={product.name} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="font-display text-xl text-primary">{product.name}</h3>
                <p className="text-secondary mt-2">{product.price}</p>
                <div className="mt-4 flex gap-2 relative">
                  <button
                    onClick={() => handleFavorite(product)}
                    className={`px-4 py-2 rounded transition relative ${
                      isFavorite ? 'bg-pink-600 text-white' : 'bg-pink-500 text-white hover:bg-pink-600'
                    }`}
                  >
                    {isFavorite ? '❤️ Favorited' : '🤍 Favorite'}
                    {favAnimation && isFavorite && (
                      <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full px-2 py-1 text-xs animate-bounce">
                        {favorites.length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`px-4 py-2 rounded transition relative ${
                      inCartQty > 0 ? 'bg-green-600 text-white' : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {inCartQty > 0 ? `🛒 ${inCartQty} in Cart` : '🛒 Add to Cart'}
                    {cartAnimation && inCartQty > 0 && (
                      <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full px-2 py-1 text-xs animate-bounce">
                        {cart.length}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-in-out;
          }

          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          .animate-bounce {
            animation: bounce 0.4s ease;
          }

          /* Optional scrollbar styling */
          .scrollbar-thin::-webkit-scrollbar {
            height: 6px;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb {
            background-color: #888;
            border-radius: 3px;
          }
          .scrollbar-thin::-webkit-scrollbar-track {
            background-color: #f1f1f1;
          }
        `}
      </style>
    </section>
  );
}

export default Products;
