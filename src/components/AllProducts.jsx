import React, { useContext } from 'react';
import { ShopContext } from './ShopContext';

const PRODUCTS = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: `₹${1000 + i * 10}`,
  img: `/images/product${(i % 5) + 1}.jpg`, // example images
}));

function AllProducts() {
  const { cart, addToCart, favorites, toggleFavorite } = useContext(ShopContext);

  return (
    <section className="py-20 px-6 bg-white">
      <h2 className="text-3xl font-display text-center text-primary mb-12">Our Products</h2>

      <div className="grid md:grid-cols-4 gap-8">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="bg-accent rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition relative">
            <img src={product.img} alt={product.name} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="font-display text-xl text-primary">{product.name}</h3>
              <p className="text-secondary mt-2">{product.price}</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => toggleFavorite(product)}
                  className={`px-4 py-2 rounded text-white ${favorites.find((p) => p.id === product.id) ? 'bg-pink-600' : 'bg-pink-500 hover:bg-pink-600'}`}
                >
                  {favorites.find((p) => p.id === product.id) ? '❤️ Favorited' : '🤍 Favorite'}
                </button>
                <button
                  onClick={() => addToCart(product)}
                  className={`px-4 py-2 rounded text-white ${cart.find((p) => p.id === product.id) ? 'bg-green-600' : 'bg-green-500 hover:bg-green-600'}`}
                >
                  {cart.find((p) => p.id === product.id) ? '✔️ In Cart' : '🛒 Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AllProducts;
