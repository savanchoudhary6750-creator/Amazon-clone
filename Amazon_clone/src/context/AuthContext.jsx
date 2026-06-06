import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { authAPI } from "../api/endpoints.js";
import apiClient from "../api/client.js";

/**
 * Auth Context
 * Manages authentication state and user information
 */

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await authAPI.getProfile();
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (err) {
          localStorage.removeItem("authToken");
          setIsAuthenticated(false);
        }
      }
    };

    checkAuth();
  }, []);

  const register = useCallback(async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authAPI.register(userData);
      apiClient.setAuthToken(response.data.token);
      setUser(response.data.user);
      setIsAuthenticated(true);
      return response.data;
    } catch (err) {
      setError(err.data?.message || err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authAPI.login(email, password);
      apiClient.setAuthToken(response.data.token);
      setUser(response.data.user);
      setIsAuthenticated(true);
      return response.data;
    } catch (err) {
      setError(err.data?.message || err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);

    try {
      await authAPI.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      apiClient.setAuthToken(null);
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authAPI.updateProfile(userData);
      setUser(response.data);
      return response.data;
    } catch (err) {
      setError(err.data?.message || err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const changePassword = useCallback(
    async (oldPassword, newPassword) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await authAPI.changePassword(oldPassword, newPassword);
        return response;
      } catch (err) {
        setError(err.data?.message || err.message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    register,
    login,
    logout,
    updateProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
