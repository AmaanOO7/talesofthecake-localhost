import React, { useContext } from 'react';
import { ShopContext } from './ShopContext';

function Favorites() {
  const { favorites, toggleFavorite } = useContext(ShopContext);

  return (
    <section className="py-20 px-6 bg-white text-center">
      <h2 className="text-3xl font-display text-primary mb-6">Your Favorites</h2>
      {favorites.length === 0 ? (
        <p className="text-secondary">No favorites yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <div key={product.id} className="bg-accent rounded-lg shadow p-4">
              <img src={product.img} alt={product.name} className="w-full h-40 object-cover rounded" />
              <h3 className="font-display text-xl mt-2">{product.name}</h3>
              <p className="text-secondary">{product.price}</p>
              <button
                onClick={() => toggleFavorite(product)}
                className="mt-2 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
              >
                Remove ❤️
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Favorites;
