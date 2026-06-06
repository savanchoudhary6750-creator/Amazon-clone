import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { wishlistAPI } from "../api/endpoints.js";
import { useAuth } from "./AuthContext.jsx";

/**
 * Wishlist Context
 * Manages wishlist state
 */

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    }
  }, [isAuthenticated]);

  const fetchWishlist = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await wishlistAPI.get();
      setWishlist(response.data);
    } catch (err) {
      setError(err.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addToWishlist = useCallback(async (productId) => {
    setError(null);

    try {
      const response = await wishlistAPI.add(productId);
      setWishlist(response.data);
      return response.data;
    } catch (err) {
      setError(err.data?.message || err.message);
      throw err;
    }
  }, []);

  const removeFromWishlist = useCallback(async (productId) => {
    setError(null);

    try {
      const response = await wishlistAPI.remove(productId);
      setWishlist(response.data);
      return response.data;
    } catch (err) {
      setError(err.data?.message || err.message);
      throw err;
    }
  }, []);

  const isInWishlist = useCallback(
    (productId) => {
      if (!wishlist || !wishlist.products) return false;
      return wishlist.products.some((p) => p.productId === productId);
    },
    [wishlist]
  );

  const value = {
    wishlist,
    isLoading,
    error,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
};
