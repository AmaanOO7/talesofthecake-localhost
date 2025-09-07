import React, { useContext } from 'react';
import { CartContext } from './CartContext';

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <section className="py-20 px-6 bg-accent text-center">
      <h2 className="text-3xl font-display text-primary mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-secondary">Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {cart.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow p-4">
              <img src={product.img} alt={product.name} className="w-full h-40 object-cover rounded" />
              <h3 className="font-display text-xl mt-2">{product.name}</h3>
              <p className="text-secondary">{product.price}</p>
              <button
                onClick={() => removeFromCart(product.id)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Cart;
