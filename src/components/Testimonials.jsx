import React, { useState, useEffect } from "react";

const TESTIMONIALS = [
  { name: "Anita", text: "Best cakes I have ever tasted!" },
  { name: "Rohan", text: "Fresh and delicious every time." },
  { name: "Priya", text: "Love the chocolate cakes!" },
  { name: "Simran", text: "Amazing designs and flavors!" },
  { name: "Karan", text: "Perfect for birthdays and events." },
];

const SPARKLE_COLORS = ["#FFD700", "#FF6B6B", "#6BCB77", "#4D96FF", "#FF69B4"];

function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [sparkles, setSparkles] = useState([]);

  // ✅ Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => nextSlide(), 5000);
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

  // ✅ Generate multi-color sparkles
  const createSparkles = () => {
    const newSparkles = Array.from({ length: 12 }).map((_, i) => ({
      id: i + Math.random(),
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
      size: Math.random() * 6 + 4,
      duration: Math.random() * 0.8 + 0.7,
      color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
      rotate: Math.random() * 360,
    }));
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 1500);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white text-center relative overflow-hidden">
      <h2 className="text-4xl font-display mb-12">✨ Happy Customers ✨</h2>

      {/* Testimonials Container */}
      <div className="relative max-w-3xl mx-auto h-64 perspective-1000">
        {TESTIMONIALS.map((t, i) => {
          const isActive = i === current;
          const offset = i - current;

          return (
            <div
              key={i}
              className={`absolute inset-0 p-6 transition-all duration-1000 ease-in-out transform`}
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 10 : 0,
                transform: `translateX(${offset * 30}%) translateY(${
                  offset * 10
                }px) rotateY(${offset * 10}deg) scale(${isActive ? 1 : 0.9})`,
              }}
            >
              <div className="bg-white text-primary p-8 rounded-2xl shadow-xl flex flex-col justify-center h-full transition-transform duration-700 hover:scale-105 hover:shadow-2xl">
                <p className="mb-6 italic text-lg">&quot;{t.text}&quot;</p>
                <h4 className="font-display font-bold text-xl">— {t.name}</h4>
              </div>
            </div>
          );
        })}

        {/* Multi-color Sparkles */}
        {sparkles.map((s) => (
          <span
            key={s.id}
            style={{
              left: s.left,
              top: s.top,
              width: `${s.size}px`,
              height: `${s.size}px`,
              backgroundColor: s.color,
              transform: `rotate(${s.rotate}deg)`,
              animationDuration: `${s.duration}s`,
            }}
            className="absolute rounded-full opacity-80 animate-sparkle pointer-events-none"
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
          0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
          50% { transform: translateY(-10px) rotate(180deg) scale(1.2); opacity: 0.8; }
          100% { transform: translateY(-20px) rotate(360deg) scale(0); opacity: 0; }
        }
        .animate-sparkle {
          animation-name: sparkle;
          animation-timing-function: ease-out;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}

export default Testimonials;
