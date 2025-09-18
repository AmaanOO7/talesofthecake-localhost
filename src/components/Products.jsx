import React, { useContext, useState, useRef, useEffect } from "react";
import { ShopContext } from "./ShopContext";

const PRODUCTS = [
  { id: 1, name: "Vanilla Story Cake", price: "₹1,200", img: "/images/choco-cake.jfif" },
  { id: 2, name: "Chocolate Chronicle", price: "₹1,500", img: "/images/pineapple-cake.jfif" },
  { id: 3, name: "Strawberry Bliss", price: "₹1,300", img: "/images/vanila-cake.jfif" },
  { id: 4, name: "Blueberry Heaven", price: "₹1,400", img: "/images/blueberry-cake.jfif" },
  { id: 5, name: "Lemon Delight", price: "₹1,250", img: "/images/lemon-cake.jfif" },
  { id: 6, name: "Red Velvet Charm", price: "₹1,600", img: "/images/red-velvet-cake.jfif" },
  { id: 7, name: "Coffee Crunch", price: "₹1,350", img: "/images/coffee-cake.jfif" },
  { id: 8, name: "Caramel Swirl", price: "₹1,450", img: "/images/caramel-cake.jfif" },
  { id: 9, name: "Pistachio Dream", price: "₹1,550", img: "/images/pistachio-cake.jfif" },
  { id: 10, name: "Mango Melody", price: "₹1,300", img: "/images/mango-cake.jfif" },
];

function Products() {
  const { cart, addToCart, favorites, toggleFavorite } = useContext(ShopContext);
  const [popup, setPopup] = useState({ visible: false, message: "" });
  const [cartAnimation, setCartAnimation] = useState(false);
  const [favAnimation, setFavAnimation] = useState(false);

  const scrollRef = useRef();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // For touch swipe
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
        scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth
      );
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === "right" ? 300 : -300, behavior: "smooth" });
    }
  };

  // Touch events for swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) scroll("right"); // swipe left
    else if (distance < -50) scroll("left"); // swipe right
  };

  useEffect(() => {
    updateScrollButtons();
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
    }
    return () => {
      if (container) container.removeEventListener("scroll", updateScrollButtons);
    };
  }, []);

  return (
    <section className="py-16 px-6 bg-white relative">
      <h2 className="text-3xl font-display text-center text-primary mb-10">
        Our Popular Products
      </h2>

      {popup.visible && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-2 rounded shadow-lg z-50 animate-fade-in">
          {popup.message}
        </div>
      )}

      <div className="relative group">
        {/* Scroll buttons (desktop only) */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-black bg-opacity-50 text-white rounded-full opacity-80 hover:opacity-100 transition"
          >
            ◀
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-black bg-opacity-50 text-white rounded-full opacity-80 hover:opacity-100 transition"
          >
            ▶
          </button>
        )}

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scroll-smooth"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {PRODUCTS.map((product) => {
            const cartItem = cart.find((item) => item.id === product.id);
            const inCartQty = cartItem ? cartItem.quantity : 0;
            const isFavorite = favorites.find((item) => item.id === product.id);

            return (
              <div
                key={product.id}
                className="relative w-[160px] sm:w-[180px] bg-accent rounded-lg overflow-hidden shadow-md hover:scale-105 transform transition flex-shrink-0 group/item"
              >
                <img src={product.img} alt={product.name} className="w-full h-36 object-cover" />
                <div className="p-3">
                  <h3 className="font-display text-base text-primary truncate">{product.name}</h3>
                  <p className="text-secondary text-sm mt-1">{product.price}</p>
                </div>

                {/* Action buttons (hidden until hover/tap) */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-0 group-hover/item:opacity-100 transition">
                  <button
                    onClick={() => handleFavorite(product)}
                    className={`px-2 py-1 rounded text-xs ${
                      isFavorite ? "bg-pink-600 text-white" : "bg-pink-500 text-white hover:bg-pink-600"
                    }`}
                  >
                    {isFavorite ? "❤️" : "🤍"}
                  </button>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`px-2 py-1 rounded text-xs ${
                      inCartQty > 0
                        ? "bg-green-600 text-white"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    🛒
                  </button>
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

          .scrollbar-thin::-webkit-scrollbar { height: 6px; }
          .scrollbar-thin::-webkit-scrollbar-thumb { background-color: #888; border-radius: 3px; }
          .scrollbar-thin::-webkit-scrollbar-track { background-color: #f1f1f1; }
        `}
      </style>
    </section>
  );
}

export default Products;
