import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllProducts from "./components/AllProducts";
import Home from "./components/Home";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Testimonials from "./components/Testimonials";
import About from "./components/About";
import Contact from "./components/Contact";
import Auth from "./components/Auth";
import Footer from "./components/Footer";
import Favorites from "./components/Favorites";
import { ShopProvider } from "./components/ShopContext";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

<Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

<Route path="/products" element={<AllProducts searchTerm={searchTerm} />} />
  return (
    <ShopProvider>
      <Router>
        <Navbar onSearch={setSearchTerm} />

        <div className="pt-20">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Products />
                  <Testimonials />
                  <About />
                  <Contact />
                  <Footer />
                </>
              }
            />

            {/* All Products Page */}
            <Route
              path="/products"
              element={<AllProducts searchTerm={searchTerm} />}
            />

            {/* Login/Auth */}
            <Route path="/login" element={<Auth />} />

            {/* Favorites Page */}
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </Router>
    </ShopProvider>
  );
}

export default App;
