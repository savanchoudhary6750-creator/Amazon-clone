import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute, AdminRoute, PublicRoute } from "./ProtectedRoute.jsx";

// Layouts
import MainLayout from "../../layouts/MainLayout.jsx";
import AdminLayout from "../../layouts/AdminLayout.jsx";

// Auth Pages
import Login from "../../features/auth/Login.jsx";
import Register from "../../features/auth/Register.jsx";
import Profile from "../../features/auth/Profile.jsx";

// Product Pages
import Home from "../../features/products/Home.jsx";
import ProductList from "../../features/products/ProductList.jsx";
import ProductDetails from "../../features/products/ProductDetails.jsx";

// Cart Page
import Cart from "../../features/cart/Cart.jsx";

// Checkout Page
import Checkout from "../../features/checkout/Checkout.jsx";

// Order Pages
import OrderHistory from "../../features/orders/OrderHistory.jsx";
import OrderDetails from "../../features/orders/OrderDetails.jsx";

// Wishlist Page
import Wishlist from "../../features/wishlist/Wishlist.jsx";

// Common Info Pages
import Contact from "../../components/common/Contact.jsx";
import HelpCenter from "../../components/common/HelpCenter.jsx";
import Returns from "../../components/common/Returns.jsx";
import ShippingInfo from "../../components/common/ShippingInfo.jsx";
import PrivacyPolicy from "../../components/common/PrivacyPolicy.jsx";
import TermsConditions from "../../components/common/TermsConditions.jsx";
import NotFound from "../../components/common/NotFound.jsx";

// Admin Pages
import AdminDashboard from "../../features/admin/Dashboard.jsx";
import AdminProducts from "../../features/admin/Products.jsx";
import AdminOrders from "../../features/admin/Orders.jsx";
import AdminUsers from "../../features/admin/Users.jsx";

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
