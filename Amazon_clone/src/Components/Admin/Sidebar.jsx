import React from "react";
import { Link } from "react-router-dom";

/**
 * Admin Sidebar Component
 */
const AdminSidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
      <nav className="space-y-2">
        <Link
          to="/admin"
          className="block px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Dashboard
        </Link>
        <Link
          to="/admin/products"
          className="block px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Products
        </Link>
        <Link
          to="/admin/orders"
          className="block px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Orders
        </Link>
        <Link
          to="/admin/users"
          className="block px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Users
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
