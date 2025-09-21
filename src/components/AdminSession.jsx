import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminSession = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isAdminLoggedIn) {
      navigate("/login");
      return;
    }

    let timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        localStorage.removeItem("isAdminLoggedIn");
        alert("You were logged out due to inactivity.");
        navigate("/login");
      }, 3 * 60 * 1000); // ✅ 3 minutes
    };

    // Reset on activity
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer(); // Start timer initially

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [navigate]);

  return <>{children}</>;
};

export default AdminSession;
