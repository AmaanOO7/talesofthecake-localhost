import React, { useContext, useState } from "react";
import { ShopContext } from "./ShopContext";
import ALL_PRODUCTS from "./productsData";

function AllProducts({ searchTerm }) {
  const { cart, addToCart, favorites, toggleFavorite } =
    useContext(ShopContext);
  const [popup, setPopup] = useState({ visible: false, message: "" });
  const [cartAnimation, setCartAnimation] = useState(false);
  const [favAnimation, setFavAnimation] = useState(false);

  const showPopup = (message) => {
    setPopup({ visible: true, message });
    setTimeout(() => setPopup({ visible: false, message: "" }), 1500);
  };

  const handleFavorite = (product) => {
    toggleFavorite(product);
    if (favorites.find((item) => item.id === product.id)) {
      showPopup(`${product.name} removed from favorites 💔`);
    } else {
      showPopup(`${product.name} added to favorites ❤️`);
      setFavAnimation(true);
      setTimeout(() => setFavAnimation(false), 500);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    showPopup(`${product.name} added to cart 🛒`);
    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 500);
  };

  // ✅ Filter by searchTerm
  const filteredProducts = ALL_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes((searchTerm || "").toLowerCase())
  );

  return (
    <section className="py-20 px-6 bg-white">
      <h2 className="text-3xl font-display text-center mb-12">All Products</h2>

      {popup.visible && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-2 rounded shadow-lg z-50 animate-fade-in">
          {popup.message}
        </div>
      )}

      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-accent rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition relative"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-display text-xl">{product.name}</h3>
                <p className="text-secondary mt-2">{product.price}</p>

                <div className="mt-4 flex gap-2 relative opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleFavorite(product)}
                    className={`px-4 py-2 rounded transition relative ${
                      favorites.find((item) => item.id === product.id)
                        ? "bg-pink-600 text-white"
                        : "bg-pink-500 text-white hover:bg-pink-600"
                    }`}
                  >
                    {favorites.find((item) => item.id === product.id)
                      ? "❤️ Favorited"
                      : "🤍 Favorite"}
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`px-4 py-2 rounded transition relative ${
                      cart.find((item) => item.id === product.id)
                        ? "bg-green-600 text-white"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {cart.find((item) => item.id === product.id)
                      ? "✔️ In Cart"
                      : "🛒 Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </section>
  );
}

export default AllProducts;
