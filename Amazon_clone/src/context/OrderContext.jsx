import React, { createContext, useContext, useState, useCallback } from "react";
import { orderAPI } from "../api/endpoints.js";

/**
 * Order Context
 * Manages order state
 */

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const createOrder = useCallback(async (orderData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await orderAPI.create(orderData);
      setCurrentOrder(response.data);
      return response.data;
    } catch (err) {
      setError(err.data?.message || err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchUserOrders = useCallback(async (filters = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await orderAPI.getUserOrders(filters);
      setOrders(response.data.orders);
      setPagination(response.data.pagination);
      return response.data;
    } catch (err) {
      setError(err.data?.message || err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getOrderById = useCallback(async (orderId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await orderAPI.getById(orderId);
      setCurrentOrder(response.data);
      return response.data;
    } catch (err) {
      setError(err.data?.message || err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cancelOrder = useCallback(async (orderId) => {
    setError(null);

    try {
      const response = await orderAPI.cancel(orderId);
      setCurrentOrder(response.data);
      return response.data;
    } catch (err) {
      setError(err.data?.message || err.message);
      throw err;
    }
  }, []);

  const requestReturn = useCallback(async (orderId, reason) => {
    setError(null);

    try {
      const response = await orderAPI.requestReturn(orderId, reason);
      setCurrentOrder(response.data);
      return response.data;
    } catch (err) {
      setError(err.data?.message || err.message);
      throw err;
    }
  }, []);

  const value = {
    orders,
    currentOrder,
    isLoading,
    error,
    pagination,
    createOrder,
    fetchUserOrders,
    getOrderById,
    cancelOrder,
    requestReturn,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within OrderProvider");
  }
  return context;
};
