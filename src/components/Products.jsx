import React, { useContext, useState } from 'react';
import { ShopContext } from './ShopContext';

const PRODUCTS = [
  { id: 1, name: 'Vanilla Story Cake', price: '₹1,200', img: 'https://instagram.fhyd1-2.fna.fbcdn.net/v/t51.29350-15/462461237_1200758107702812_8551589479188988463_n.webp?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjE0NDB4MTQ0MC5zZHIuZjI5MzUwLmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=instagram.fhyd1-2.fna.fbcdn.net&_nc_cat=100&_nc_oc=Q6cZ2QEy-KmDYwKIiGXwa6_2iEceWd1IoeKMl78QH2gy4bLUjLwsk-FTecy35WZJNbmN49QzPYySv53EiGa1Eq8JcPmd&_nc_ohc=rexHTog_sMYQ7kNvwEM4tqL&_nc_gid=HEQ6MyIV0rV4v4Ze5AoQDQ&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzQ3NTA4OTgwNDEzMDkxMDk4Ng%3D%3D.3-ccb7-5&oh=00_AfbQr80K_nu9YqIPCd7x9UOZd8lXcMKKX7_0JRn8oF6LEw&oe=68CC5C77&_nc_sid=22de04' },
  { id: 2, name: 'Chocolate Chronicle', price: '₹1,500', img: 'https://images.unsplash.com/photo-1617196032732-31213c58f62c?auto=format&fit=crop&w=800&q=60' },
  { id: 3, name: 'Strawberry Bliss', price: '₹1,300', img: 'https://images.unsplash.com/photo-1589308078052-69e3f73c2d4b?auto=format&fit=crop&w=800&q=60' },
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
    toggleFavorite(product);
    if (favorites.find((item) => item.id === product.id)) {
      showPopup(`${product.name} removed from favorites 💔`);
    } else {
      showPopup(`${product.name} added to favorites ❤️`);
      setFavAnimation(true);
      setTimeout(() => setFavAnimation(false), 500);
    }
  };

  const handleAddToCart = (product) => {
    if (!cart.find((item) => item.id === product.id)) {
      addToCart(product);
      showPopup(`${product.name} added to cart 🛒`);
      setCartAnimation(true);
      setTimeout(() => setCartAnimation(false), 500);
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
              <div className="mt-4 flex gap-2 relative">
                <button
                  onClick={() => handleFavorite(product)}
                  className={`px-4 py-2 rounded transition relative ${
                    favorites.find((item) => item.id === product.id) ? 'bg-pink-600 text-white' : 'bg-pink-500 text-white hover:bg-pink-600'
                  }`}
                >
                  {favorites.find((item) => item.id === product.id) ? '❤️ Favorited' : '🤍 Favorite'}
                  {favAnimation && (
                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full px-2 py-1 text-xs animate-bounce">
                      {favorites.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => handleAddToCart(product)}
                  className={`px-4 py-2 rounded transition relative ${
                    cart.find((item) => item.id === product.id) ? 'bg-green-600 text-white' : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {cart.find((item) => item.id === product.id) ? '✔️ In Cart' : '🛒 Add to Cart'}
                  {cartAnimation && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full px-2 py-1 text-xs animate-bounce">
                      {cart.length}
                    </span>
                  )}
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

          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          .animate-bounce {
            animation: bounce 0.4s ease;
          }
        `}
      </style>
    </section>
  );
}

export default Products;
