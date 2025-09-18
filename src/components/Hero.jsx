import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

function Hero() {
  return (
    <section className="bg-accent py-20 text-center animate-fadeIn">
      <h1 className="text-4xl md:text-6xl font-display text-primary mb-4">
        Welcome to Tales of the Cake
      </h1>
      <p className="text-secondary text-lg md:text-xl">
        Freshly baked treats delivered with love!
      </p>
      {/* Use Link styled as a button */}
      <Link
        to="/products"
        className="inline-block mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition"
      >
        Order Now
      </Link>
    </section>
  );
}

export default Hero;
