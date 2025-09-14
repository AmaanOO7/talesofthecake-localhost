import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AllProducts from './components/AllProducts';
import Home from './components/Home';
import Hero from './components/Hero';
import Products from './components/Products';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Contact from './components/Contact';
import Auth from './components/Auth';
import Footer from './components/Footer';
import Favorites from './components/Favorites';
import { ShopProvider } from './components/ShopContext';

function App() {
  return (
    <ShopProvider>
      <Router>
        {/* Navbar always inside Router */}
        <Navbar />

        {/* Main content */}
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<AllProducts />} />
          </Routes>

          {/* Components that are not route-specific can stay outside Routes */}
          <Hero />
          <Products />
          <Testimonials />
          <About />
          <Contact />
          <Favorites />
          <Auth />
          <Footer />
        </div>
      </Router>
    </ShopProvider>
  );
}

export default App;
