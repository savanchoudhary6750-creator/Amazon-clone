import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import cartService from "../../services/cartService.js";
import { useAuth } from "./AuthContext.jsx";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await cartService.get();
      setCart(response.data);
    } catch (err) {
      setError(err.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch cart when user authenticates
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [isAuthenticated, fetchCart]);

  const addToCart = useCallback(async (productId, quantity = 1) => {
    setError(null);

    try {
      const response = await cartService.add(productId, quantity);
      setCart(response.data);
      return response.data;
    } catch (err) {
      setError(err.data?.message || err.message);
      throw err;
    }
  }, []);

  const updateQuantity = useCallback(async (productId, quantity) => {
    setError(null);

    try {
      const response = await cartService.updateQuantity(productId, quantity);
      setCart(response.data);
      return response.data;
    } catch (err) {
      setError(err.data?.message || err.message);
      throw err;
    }
  }, []);

  const removeFromCart = useCallback(async (productId) => {
    setError(null);

    try {
      const response = await cartService.remove(productId);
      setCart(response.data);
      return response.data;
    } catch (err) {
      setError(err.data?.message || err.message);
      throw err;
    }
  }, []);

  const clearCart = useCallback(async () => {
    setError(null);

    try {
      const response = await cartService.clear();
      setCart(response.data);
      return response.data;
    } catch (err) {
      setError(err.data?.message || err.message);
      throw err;
    }
  }, []);

  const getCartStats = useCallback(() => {
    if (!cart) {
      return {
        totalItems: 0,
        totalPrice: 0,
        totalDiscount: 0,
        tax: 0,
        shippingCost: 0,
        finalPrice: 0,
      };
    }

    return {
      totalItems: cart.totalItems || 0,
      totalPrice: cart.totalPrice || 0,
      totalDiscount: cart.totalDiscount || 0,
      tax: cart.tax || 0,
      shippingCost: cart.shippingCost || 0,
      finalPrice: cart.finalPrice || 0,
    };
  }, [cart]);

  const value = {
    cart,
    isLoading,
    error,
    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartStats,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
