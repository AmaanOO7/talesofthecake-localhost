import React, { useState } from 'react';

const TESTIMONIALS = [
  { name: 'Anita', text: 'Best cakes I have ever tasted!' },
  { name: 'Rohan', text: 'Fresh and delicious every time.' },
  { name: 'Priya', text: 'Love the chocolate cakes!' },
  { name: 'Simran', text: 'Amazing designs and flavors!' },
  { name: 'Karan', text: 'Perfect for birthdays and events.' },
];

function Testimonials() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="py-20 bg-secondary text-white text-center relative">
      <h2 className="text-3xl font-display mb-12">Happy Customers</h2>

      <div className="overflow-hidden max-w-3xl mx-auto relative">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="min-w-full bg-primary p-6 rounded-lg mx-2 shadow-lg"
            >
              <p className="mb-4">&quot;{t.text}&quot;</p>
              <h4 className="font-display font-bold">{t.name}</h4>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={prevSlide}
          className="bg-accent text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition"
        >
          ◀
        </button>
        <button
          onClick={nextSlide}
          className="bg-accent text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition"
        >
          ▶
        </button>
      </div>
    </section>
  );
}

export default Testimonials;