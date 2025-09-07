import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';

const PRODUCTS = [
  { id: 1, name: 'Vanilla Story Cake', price: '₹1,200', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=60' },
  { id: 2, name: 'Chocolate Chronicle', price: '₹1,500', img: 'https://images.unsplash.com/photo-1617196032732-31213c58f62c?auto=format&fit=crop&w=800&q=60' },
  { id: 3, name: 'Strawberry Bliss', price: '₹1,300', img: 'https://images.unsplash.com/photo-1589308078052-69e3f73c2d4b?auto=format&fit=crop&w=800&q=60' },
];

function Products() {
  const { cart, addToCart } = useContext(CartContext);
  const [favorites, setFavorites] = useState([]);
  const [popup, setPopup] = useState({ visible: false, message: '' });

  const showPopup = (message) => {
    setPopup({ visible: true, message });
    setTimeout(() => setPopup({ visible: false, message: '' }), 1500);
  };

  const handleFavorite = (product) => {
    if (!favorites.includes(product.id)) {
      setFavorites([...favorites, product.id]);
      showPopup(`${product.name} added to favorites! ❤️`);
    } else {
      setFavorites(favorites.filter((id) => id !== product.id));
      showPopup(`${product.name} removed from favorites 💔`);
    }
  };

  const handleAddToCart = (product) => {
    if (!cart.find((item) => item.id === product.id)) {
      addToCart(product);
      showPopup(`${product.name} added to cart! 🛒`);
    }
  };

  return (
    <section className="py-20 px-6 bg-white relative">
      <h2 className="text-3xl font-display text-center text-primary mb-12">Our Products</h2>
      {popup.visible && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-2 rounded shadow-lg z-50 animate-fade-in">
          {popup.message}
        </div>
      )}
      <div className="grid md:grid-cols-3 gap-8">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="bg-accent rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition relative">
            <img src={product.img} alt={product.name} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="font-display text-xl text-primary">{product.name}</h3>
              <p className="text-secondary mt-2">{product.price}</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleFavorite(product)}
                  className={`px-4 py-2 rounded transition ${
                    favorites.includes(product.id) ? 'bg-pink-600 text-white' : 'bg-pink-500 text-white hover:bg-pink-600'
                  }`}
                >
                  {favorites.includes(product.id) ? '❤️ Favorited' : '🤍 Favorite'}
                </button>
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`px-4 py-2 rounded transition ${
                    cart.find((item) => item.id === product.id) ? 'bg-green-600 text-white' : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {cart.find((item) => item.id === product.id) ? '✔️ In Cart' : '🛒 Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
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
        `}
      </style>
    </section>
  );
}

export default Products;
