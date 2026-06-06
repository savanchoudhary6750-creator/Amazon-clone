import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";
import { ToastProvider } from "./Components/Toast.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <ProductProvider>
              <WishlistProvider>
                <OrderProvider>
                  <App />
                </OrderProvider>
              </WishlistProvider>
            </ProductProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </ToastProvider>
  </React.StrictMode>
);