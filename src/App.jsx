import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Contact from './components/Contact';
import Auth from './components/Auth';
import Footer from './components/Footer';
import Favorites from './components/Favorites';
import { ShopProvider } from './components/ShopContext';
import Test from './components/Test';

function App() {
  return (
    <ShopProvider>
      <Test />
      <Navbar />
      <div className="pt-20">
        <Hero />
        <Products />
        <Testimonials />
        <About />
        <Contact />
        <Favorites />
        <Auth />
        <Footer />
      </div>
    </ShopProvider>
  );
}

export default App;
