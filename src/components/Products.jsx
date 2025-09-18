import React, { useContext, useState, useRef, useEffect } from "react";
import { ShopContext } from "./ShopContext";
import POPULAR_PRODUCTS from "./popularProductsData";

function Products() {
  const { cart, addToCart, favorites, toggleFavorite } = useContext(ShopContext);
  const [popup, setPopup] = useState({ visible: false, message: "" });
  const [cartAnimation, setCartAnimation] = useState(false);
  const [favAnimation, setFavAnimation] = useState(false);

  const scrollRef = useRef();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const showPopup = (message) => {
    setPopup({ visible: true, message });
    setTimeout(() => setPopup({ visible: false, message: "" }), 1500);
  };

  const handleFavorite = (product) => {
    const isAlreadyFavorite = favorites.find((item) => item.id === product.id);
    toggleFavorite(product);
    if (isAlreadyFavorite) {
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

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      setCanScrollLeft(scrollRef.current.scrollLeft > 0);
      setCanScrollRight(
        scrollRef.current.scrollLeft <
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth
      );
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "right" ? 300 : -300,
        behavior: "smooth",
      });
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) scroll("right");
    else if (distance < -50) scroll("left");
  };

  // ✅ Auto-scroll effect
  useEffect(() => {
    updateScrollButtons();
    const container = scrollRef.current;

    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
    }

    const interval = setInterval(() => {
      if (container) {
        // Scroll smoothly by 300px
        container.scrollBy({ left: 300, behavior: "smooth" });

        // If reached end, go back to start
        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth - 10
        ) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 3000); // every 3 seconds

    return () => {
      if (container) container.removeEventListener("scroll", updateScrollButtons);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="py-20 px-6 bg-white relative">
      <h2 className="text-3xl font-display text-center text-primary mb-12">
        Our Popular Products
      </h2>

      {popup.visible && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-2 rounded shadow-lg z-50 animate-fade-in">
          {popup.message}
        </div>
      )}

      <div className="relative group">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-black bg-opacity-50 text-white rounded-full opacity-80 hover:opacity-100 transition"
          >
            ◀
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-black bg-opacity-50 text-white rounded-full opacity-80 hover:opacity-100 transition"
          >
            ▶
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth hide-scrollbar"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {POPULAR_PRODUCTS.map((product) => {
            const cartItem = cart.find((item) => item.id === product.id);
            const inCartQty = cartItem ? cartItem.quantity : 0;
            const isFavorite = favorites.find((item) => item.id === product.id);

            return (
              <div
                key={product.id}
                className="group w-[180px] sm:w-[200px] md:w-[220px] bg-accent rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition relative flex-shrink-0"
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-display text-lg text-primary truncate">
                    {product.name}
                  </h3>
                  <p className="text-secondary mt-1">{product.price}</p>

                  {/* Buttons only on hover */}
                  <div className="mt-3 flex gap-2 relative opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleFavorite(product)}
                      className={`px-3 py-1 rounded transition relative text-sm ${
                        isFavorite
                          ? "bg-pink-600 text-white"
                          : "bg-pink-500 text-white hover:bg-pink-600"
                      }`}
                    >
                      {isFavorite ? "❤️ Favorited" : "🤍 Favorite"}
                      {favAnimation && isFavorite && (
                        <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full px-2 py-1 text-xs animate-bounce">
                          {favorites.length}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`px-3 py-1 rounded transition relative text-sm ${
                        inCartQty > 0
                          ? "bg-green-600 text-white"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      {inCartQty > 0
                        ? `🛒 ${inCartQty} in Cart`
                        : "🛒 Add to Cart"}
                      {cartAnimation && inCartQty > 0 && (
                        <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full px-2 py-1 text-xs animate-bounce">
                          {cart.length}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.3s ease-in-out; }

          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          .animate-bounce { animation: bounce 0.4s ease; }

          /* Hide scrollbars */
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>
    </section>
  );
}

export default Products;
