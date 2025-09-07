import React from 'react';

const PRODUCTS = [
  { id: 1, name: 'Vanilla Story Cake', price: '₹1,200', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=60' },
  { id: 2, name: 'Chocolate Chronicle', price: '₹1,500', img: 'https://images.unsplash.com/photo-1617196032732-31213c58f62c?auto=format&fit=crop&w=800&q=60' },
  { id: 3, name: 'Strawberry Bliss', price: '₹1,300', img: 'https://images.unsplash.com/photo-1589308078052-69e3f73c2d4b?auto=format&fit=crop&w=800&q=60' },
];

function Products() {
  return (
    <section className="py-20 px-6 bg-white">
      <h2 className="text-3xl font-display text-center text-primary mb-12">Our Products</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="bg-accent rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition">
            <img src={product.img} alt={product.name} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="font-display text-xl text-primary">{product.name}</h3>
              <p className="text-secondary mt-2">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;