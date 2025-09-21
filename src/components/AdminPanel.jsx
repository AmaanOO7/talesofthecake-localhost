import React from "react";
import { useShop } from "./ShopContext";

const AdminPanel = () => {
  const { products, updateDiscount } = useShop();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Set Discounts</h1>
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
