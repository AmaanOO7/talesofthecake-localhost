import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (role === "admin") {
      if (password === "admin123") { // ✅ replace with secure check
        navigate("/admin");
      } else {
        alert("Invalid admin password");
      }
    } else {
      navigate("/"); // normal user goes to homepage
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        >
          <option value="user">User Login</option>
          <option value="admin">Admin Login</option>
        </select>

        {role === "admin" && (
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 mb-4 rounded"
          />
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Auth;
