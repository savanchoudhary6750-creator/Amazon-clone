import React, { useEffect, useState } from "react";
import { productService } from "../../services/productService.js";
import { orderService } from "../../services/orderService.js";
import { authService } from "../../services/authService.js";

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    productsCount: 0,
    ordersCount: 0,
    usersCount: 0,
    totalSales: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [prodRes, orderRes, usersRes] = await Promise.all([
          productService.getAll({ limit: 1 }),
          orderService.getAdminOrders({ limit: 100 }),
          authService.getAdminUsers(),
        ]);

        const productsCount = prodRes?.pagination?.total || 0;
        const ordersCount = orderRes?.pagination?.total || 0;
        const usersCount = Array.isArray(usersRes?.data) ? usersRes.data.length : (usersRes?.length || 0);

        // Sum final prices for all returned admin orders
        const allOrders = orderRes?.orders || [];
        const totalSales = allOrders
          .filter(order => order.paymentStatus === "Paid")
          .reduce((sum, order) => sum + (order.finalPrice || 0), 0);

        setStats({
          productsCount,
          ordersCount,
          usersCount,
          totalSales,
        });
        setError("");
      } catch (err) {
        console.error("Dashboard stats error:", err);
        setError("Failed to fetch dashboard statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-600">
        <p className="text-lg font-semibold">Loading dashboard statistics...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Grid of Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <h3 className="text-gray-500 text-sm font-semibold uppercase">Total Sales</h3>
          <p className="text-2xl font-bold text-gray-800 mt-2">₹ {stats.totalSales.toFixed(2)}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm font-semibold uppercase">Total Orders</h3>
          <p className="text-2xl font-bold text-gray-800 mt-2">{stats.ordersCount}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm font-semibold uppercase">Products Listed</h3>
          <p className="text-2xl font-bold text-gray-800 mt-2">{stats.productsCount}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
          <h3 className="text-gray-500 text-sm font-semibold uppercase">Active Users</h3>
          <p className="text-2xl font-bold text-gray-800 mt-2">{stats.usersCount}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">System Overview</h2>
        <p className="text-gray-600 text-sm">
          Welcome to your Amazon Clone admin control center. Use the sidebar options to manage listed products, update customer order fulfillments, and review registered accounts.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
