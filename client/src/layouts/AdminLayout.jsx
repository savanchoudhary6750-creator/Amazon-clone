import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../features/admin/Sidebar.jsx";

/**
 * Admin Layout
 * Layout wrapper for admin pages
 */
const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
