import React, { useState, useEffect } from "react";

const TESTIMONIALS = [
  { name: "Anita", text: "Best cakes I have ever tasted!" },
  { name: "Rohan", text: "Fresh and delicious every time." },
  { name: "Priya", text: "Love the chocolate cakes!" },
  { name: "Simran", text: "Amazing designs and flavors!" },
  { name: "Karan", text: "Perfect for birthdays and events." },
];

function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [sparkles, setSparkles] = useState([]);

  // ✅ Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    createSparkles();
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  };
  const prevSlide = () => {
    createSparkles();
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // ✅ Generate sparkles
  const createSparkles = () => {
    const newSparkles = Array.from({ length: 10 }).map((_, i) => ({
      id: i + Math.random(),
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
      size: Math.random() * 6 + 4, // 4-10px
      duration: Math.random() * 0.8 + 0.7, // 0.7-1.5s
    }));
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 1500);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white text-center relative overflow-hidden">
      <h2 className="text-4xl font-display mb-12">✨ Happy Customers ✨</h2>

      {/* Testimonials Container */}
      <div className="relative max-w-3xl mx-auto h-60">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            className={`absolute inset-0 p-6 transition-all duration-1000 ease-in-out transform ${
              i === current
                ? "opacity-100 z-10 scale-105 -translate-y-2"
                : "opacity-0 z-0 scale-95 translate-y-2"
            }`}
          >
            <div className="bg-white text-primary p-8 rounded-2xl shadow-xl flex flex-col justify-center h-full transition-transform duration-700 hover:scale-105 hover:shadow-2xl">
              <p className="mb-6 italic text-lg">&quot;{t.text}&quot;</p>
              <h4 className="font-display font-bold text-xl">— {t.name}</h4>
            </div>
          </div>
        ))}

        {/* Sparkles */}
        {sparkles.map((s) => (
          <span
            key={s.id}
            style={{
              left: s.left,
              top: s.top,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDuration: `${s.duration}s`,
            }}
            className="absolute bg-yellow-400 rounded-full opacity-80 animate-sparkle pointer-events-none"
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={prevSlide}
          className="bg-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-primary transition"
        >
          ◀
        </button>
        <button
          onClick={nextSlide}
          className="bg-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-primary transition"
        >
          ▶
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-6 gap-3">
        {TESTIMONIALS.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-500 ${
              i === current ? "bg-white scale-125" : "bg-white/50 scale-100"
            }`}
            onClick={() => {
              createSparkles();
              setCurrent(i);
            }}
          ></span>
        ))}
      </div>

      <style>{`
        @keyframes sparkle {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          50% { transform: translateY(-10px) scale(1.2); opacity: 0.8; }
          100% { transform: translateY(-20px) scale(0); opacity: 0; }
        }
        .animate-sparkle {
          animation-name: sparkle;
          animation-timing-function: ease-out;
        }
      `}</style>
    </section>
  );
}

export default Testimonials;
