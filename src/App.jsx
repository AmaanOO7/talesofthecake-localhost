import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Contact from './components/Contact';
import Cart from './components/Cart';
import Auth from './components/Auth';
import Footer from './components/Footer';
import { CartProvider } from './components/CartContext';

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
     <CartProvider>
      <Products />
      <Testimonials />
      <About />
      <Contact />
      <Cart />
      </CartProvider>
      <Auth />
      <Footer />
    </div>
  );
}

export default App;
