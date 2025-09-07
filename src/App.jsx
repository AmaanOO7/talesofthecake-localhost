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
import Favorites from './components/Favorites';
import { ShopProvider } from './components/ShopContext';

function App() {
  return (
    <ShopProvider>
      <Navbar />
      <div className="pt-20">
        <Hero />
        <Products />
        <Testimonials />
        <About />
        <Contact />
        <Favorites />
        <Cart />
        <Auth />
        <Footer />
      </div>
    </ShopProvider>
  );
}

export default App;
