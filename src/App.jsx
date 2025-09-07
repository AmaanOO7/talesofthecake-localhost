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
import { ShopProvider, ShopContext } from './components/ShopContext';

function Header() {
  const { cart, favorites } = useContext(ShopContext);

  return (
    <header className="fixed top-0 left-0 w-full flex justify-end gap-6 p-4 bg-white shadow z-50">
      <div className="relative">
        <span className="text-2xl">❤️</span>
        {favorites.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
            {favorites.length}
          </span>
        )}
      </div>
      <div className="relative">
        <span className="text-2xl">🛒</span>
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
            {cart.length}
          </span>
        )}
      </div>
    </header>
  );
}

function App() {
  return (
    <ShopProvider>
    <Header />
    <div className="pt-20"> {/* padding to prevent header overlap */}
      <Navbar />
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
