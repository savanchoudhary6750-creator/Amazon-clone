import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";

/**
 * Main Layout
 * Layout wrapper for all main pages
 */
const MainLayout = () => {
  return (
   <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
