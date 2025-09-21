import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "./ShopContext";

const AdminPanel = () => {
  const { products, updateDiscount } = useShop();
  const navigate = useNavigate();

  // ✅ Toast state
  const [toast, setToast] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");

    // ✅ Show toast
    setToast("✅ Logged out successfully!");

    // Redirect after short delay
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  // ✅ Auto hide toast after 3 sec
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className="p-6 max-w-4xl mx-auto relative">
      {/* 🔹 Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500">
          {toast}
        </div>
      )}

      {/* 🔹 Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>

      <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel - Set Discounts</h1>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Product</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Discount (%)</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="text-center">
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">{p.price}</td>
              <td className="p-2 border">
                <input
                  type="number"
                  value={p.discount}
                  min="0"
                  max="100"
                  onChange={(e) => updateDiscount(p.id, e.target.value)}
                  className="border px-2 py-1 w-20 text-center"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
