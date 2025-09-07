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

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Products />
      <Testimonials />
      <About />
      <Contact />
      <Cart />
      <Auth />
      <Footer />
    </div>
  );
}

export default App;