import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute, AdminRoute, PublicRoute } from "./ProtectedRoute.jsx";

// Layouts
import MainLayout from "../layouts/MainLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";

// Pages
import Home from "../pages/Home.jsx";
import ProductList from "../pages/ProductList.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";
import Cart from "../pages/Cart.jsx";
import Checkout from "../pages/Checkout.jsx";
import OrderHistory from "../pages/OrderHistory.jsx";
import OrderDetails from "../pages/OrderDetails.jsx";
import Wishlist from "../pages/Wishlist.jsx";
import Profile from "../pages/Profile.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Contact from "../pages/Contact.jsx";
import HelpCenter from "../pages/HelpCenter.jsx";
import Returns from "../pages/Returns.jsx";
import ShippingInfo from "../pages/ShippingInfo.jsx";
import PrivacyPolicy from "../pages/PrivacyPolicy.jsx";
import TermsConditions from "../pages/TermsConditions.jsx";
import NotFound from "../pages/NotFound.jsx";

// Admin Pages
import AdminDashboard from "../pages/Admin/Dashboard.jsx";
import AdminProducts from "../pages/Admin/Products.jsx";
import AdminOrders from "../pages/Admin/Orders.jsx";
import AdminUsers from "../pages/Admin/Users.jsx";

/**
 * Route Configuration
 * Centralized routing setup for the application
 */
export const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Layout Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/category/:category" element={<ProductList />} />
        <Route path="/search" element={<ProductList />} />

        {/* Protected Routes - User */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Public Routes - Auth */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Public Routes - Info Pages */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/shipping" element={<ShippingInfo />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
      </Route>

      {/* Admin Layout Routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
