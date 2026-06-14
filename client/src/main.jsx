import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import { AuthProvider } from "./app/providers/AuthContext.jsx";
import { CartProvider } from "./app/providers/CartContext.jsx";
import { ProductProvider } from "./app/providers/ProductContext.jsx";
import { WishlistProvider } from "./app/providers/WishlistContext.jsx";
import { OrderProvider } from "./app/providers/OrderContext.jsx";
import { ToastProvider } from "./app/providers/ToastProvider.jsx";
import { ThemeProvider } from "./app/providers/ThemeContext.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
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
    </ThemeProvider>
  </React.StrictMode>
);