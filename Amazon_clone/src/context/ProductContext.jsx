import React, { createContext, useContext, useState, useCallback } from "react";
import { productAPI } from "../api/endpoints.js";

/**
 * Product Context
 * Manages products and search state
 */

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [filters, setFilters] = useState({});

  const fetchProducts = useCallback(async (filterParams = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await productAPI.getAll(filterParams);
      setProducts(response.data.products);
      setPagination(response.data.pagination);
      setFilters(filterParams);
      return response.data;
    } catch (err) {
      setError(err.data?.message || err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getProductById = useCallback(async (productId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await productAPI.getById(productId);
      return response.data;
    } catch (err) {
      setError(err.data?.message || err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchProducts = useCallback(async (query, filterParams = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await productAPI.search(query, filterParams);
      setProducts(response.data.products);
      setPagination(response.data.pagination);
      setFilters({ ...filterParams, search: query });
      return response.data;
    } catch (err) {
      setError(err.data?.message || err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getFeaturedProducts = useCallback(async (limit = 10) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await productAPI.getFeatured(limit);
      return response.data.products;
    } catch (err) {
      setError(err.data?.message || err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getProductsByCategory = useCallback(async (category, limit = 20) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await productAPI.getByCategory(category, limit);
      setProducts(response.data.products);
      return response.data.products;
    } catch (err) {
      setError(err.data?.message || err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addReview = useCallback(async (productId, review) => {
    setError(null);

    try {
      const response = await productAPI.addReview(productId, review);
      return response.data;
    } catch (err) {
      setError(err.data?.message || err.message);
      throw err;
    }
  }, []);

  const value = {
    products,
    isLoading,
    error,
    pagination,
    filters,
    fetchProducts,
    getProductById,
    searchProducts,
    getFeaturedProducts,
    getProductsByCategory,
    addReview,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within ProductProvider");
  }
  return context;
};
