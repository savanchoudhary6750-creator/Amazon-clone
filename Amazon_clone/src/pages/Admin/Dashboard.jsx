import React from "react";

/**
 * Admin Pages
 */

export const AdminDashboard = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
    <p className="text-gray-600">Admin dashboard - to be implemented</p>
  </div>
);

export const AdminProducts = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-8">Manage Products</h1>
    <p className="text-gray-600">Product management - to be implemented</p>
  </div>
);

export const AdminOrders = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-8">Manage Orders</h1>
    <p className="text-gray-600">Order management - to be implemented</p>
  </div>
);

export const AdminUsers = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-8">Manage Users</h1>
    <p className="text-gray-600">User management - to be implemented</p>
  </div>
);

export default {
  AdminDashboard,
  AdminProducts,
  AdminOrders,
  AdminUsers,
};
