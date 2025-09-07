import React, { useState } from 'react';

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-primary text-white px-6 py-4 flex justify-between items-center">
      <h1 className="font-display text-2xl">Tales of the Cake</h1>
      <div className="md:hidden">
        <button onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>
      <ul className={`md:flex md:items-center gap-6 ${open ? 'block' : 'hidden'}`}>
        <li>Home</li>
        <li>Products</li>
        <li>About</li>
        <li>Contact</li>
        <li>Cart</li>
        <li>Login</li>
      </ul>
    </nav>
  );
}

export default Navbar;