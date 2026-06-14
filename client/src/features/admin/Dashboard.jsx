import React, { useEffect, useState } from "react";
import apiClient from "../../services/api/apiClient.js";
import { useTheme } from "../../app/providers/ThemeContext.jsx";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

export const AdminDashboard = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get("/admin/dashboard-stats");
        setStats(res.data || {});
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
      <div className="p-8 text-center text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
        <p className="text-lg font-semibold animate-pulse">Loading dashboard statistics...</p>
      </div>
    );
  }

  const totals = stats?.totals || {
    totalSales: 0,
    ordersCount: 0,
    productsCount: 0,
    usersCount: 0,
  };

  const textColor = isDark ? "#cbd5e1" : "#475569";
  const gridColor = isDark ? "#334155" : "#e2e8f0";
  const tooltipBg = isDark ? "#1e293b" : "#ffffff";
  const tooltipBorder = isDark ? "#475569" : "#e2e8f0";

  // Chart styling colors
  const lineColor = "#ff9900"; // Amazon Orange
  const COLORS = ["#ff9900", "#14b8a6", "#3b82f6", "#a855f7", "#ec4899", "#f43f5e"];

  return (
    <div className="p-8 bg-gray-50 dark:bg-slate-900 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Admin Dashboard</h1>

      {error && (
        <div className="mb-6 bg-red-100 dark:bg-red-950/40 border border-red-400 dark:border-red-900/50 text-red-700 dark:text-red-400 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Grid of Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow border dark:border-slate-700 border-l-4 border-l-yellow-500 transition-all duration-300 hover:shadow-md">
          <h3 className="text-gray-500 dark:text-gray-450 text-xs font-semibold uppercase tracking-wider">Total Sales</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-2">₹ {totals.totalSales.toFixed(2)}</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow border dark:border-slate-700 border-l-4 border-l-blue-500 transition-all duration-300 hover:shadow-md">
          <h3 className="text-gray-500 dark:text-gray-450 text-xs font-semibold uppercase tracking-wider">Total Orders</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-2">{totals.ordersCount}</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow border dark:border-slate-700 border-l-4 border-l-green-500 transition-all duration-300 hover:shadow-md">
          <h3 className="text-gray-500 dark:text-gray-450 text-xs font-semibold uppercase tracking-wider">Products Listed</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-2">{totals.productsCount}</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow border dark:border-slate-700 border-l-4 border-l-indigo-500 transition-all duration-300 hover:shadow-md">
          <h3 className="text-gray-500 dark:text-gray-450 text-xs font-semibold uppercase tracking-wider">Active Users</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-2">{totals.usersCount}</p>
        </div>
      </div>

      {/* Recharts Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Line Chart */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow border dark:border-slate-700 transition-all duration-300">
          <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Daily Revenue History</h2>
          <div className="h-80 w-full">
            {stats?.revenueHistory && stats.revenueHistory.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.revenueHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="_id" stroke={textColor} tick={{ fontSize: 11 }} />
                  <YAxis stroke={textColor} tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: tooltipBg,
                      borderColor: tooltipBorder,
                      borderRadius: "6px",
                      color: textColor,
                    }}
                    formatter={(value) => `₹${value.toFixed(2)}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke={lineColor}
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                    name="Revenue (₹)"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                No revenue history available.
              </div>
            )}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow border dark:border-slate-700 transition-all duration-300">
          <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Category Sales Distribution</h2>
          <div className="h-80 w-full">
            {stats?.categorySales && stats.categorySales.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.categorySales}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ _id, percent }) => `${_id} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="sales"
                    nameKey="_id"
                  >
                    {stats.categorySales.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: tooltipBg,
                      borderColor: tooltipBorder,
                      borderRadius: "6px",
                      color: textColor,
                    }}
                    formatter={(value) => `₹${value.toFixed(2)}`}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                No sales category data available.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow border dark:border-slate-700 transition-all duration-300">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">System Overview</h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Welcome to your Amazon Clone admin control center. Use the sidebar options to manage listed products, update customer order fulfillments, and review registered accounts.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
