import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * 404 Not Found Page
 */
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-lg transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
