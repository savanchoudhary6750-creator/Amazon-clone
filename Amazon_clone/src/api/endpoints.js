import apiClient from "./client.js";

/**
 * Authentication API
 */

export const authAPI = {
  register: (userData) => apiClient.post("/auth/register", userData),
  login: (email, password) => apiClient.post("/auth/login", { email, password }),
  logout: () => apiClient.post("/auth/logout", {}),
  getProfile: () => apiClient.get("/auth/profile"),
  updateProfile: (userData) => apiClient.put("/auth/profile", userData),
  changePassword: (oldPassword, newPassword) =>
    apiClient.post("/auth/change-password", { oldPassword, newPassword }),
  deleteAccount: () => apiClient.delete("/auth/account"),
};

/**
 * Product API
 */

export const productAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiClient.get(`/products?${params.toString()}`);
  },
  getById: (id) => apiClient.get(`/products/${id}`),
  search: (query, filters = {}) => {
    const params = new URLSearchParams({ q: query, ...filters });
    return apiClient.get(`/products/search?${params.toString()}`);
  },
  getFeatured: (limit = 10) =>
    apiClient.get(`/products/featured?limit=${limit}`),
  getByCategory: (category, limit = 20) =>
    apiClient.get(`/products/category/${category}?limit=${limit}`),
  create: (productData) => apiClient.post("/products", productData),
  update: (id, productData) => apiClient.put(`/products/${id}`, productData),
  delete: (id) => apiClient.delete(`/products/${id}`),
  addReview: (id, review) => apiClient.post(`/products/${id}/reviews`, review),
};

/**
 * Cart API
 */

export const cartAPI = {
  get: () => apiClient.get("/cart"),
  add: (productId, quantity = 1) =>
    apiClient.post("/cart/add", { productId, quantity }),
  updateQuantity: (productId, quantity) =>
    apiClient.put("/cart/update", { productId, quantity }),
  remove: (productId) => apiClient.delete(`/cart/${productId}`),
  clear: () => apiClient.delete("/cart"),
};

/**
 * Order API
 */

export const orderAPI = {
  create: (orderData) => apiClient.post("/orders", orderData),
  getById: (id) => apiClient.get(`/orders/${id}`),
  getUserOrders: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiClient.get(`/orders/user/orders?${params.toString()}`);
  },
  cancel: (id) => apiClient.put(`/orders/${id}/cancel`, {}),
  requestReturn: (id, reason) =>
    apiClient.post(`/orders/${id}/return`, { reason }),
  updateStatus: (id, status, note) =>
    apiClient.put(`/orders/${id}/status`, { status, note }),
  updatePaymentStatus: (id, paymentStatus, transactionId) =>
    apiClient.put(`/orders/${id}/payment-status`, { paymentStatus, transactionId }),
  getAdminOrders: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiClient.get(`/orders/admin/all?${params.toString()}`);
  },
};

/**
 * Wishlist API
 */

export const wishlistAPI = {
  get: () => apiClient.get("/wishlist"),
  add: (productId) => apiClient.post("/wishlist/add", { productId }),
  remove: (productId) => apiClient.delete(`/wishlist/${productId}`),
  clear: () => apiClient.delete("/wishlist"),
  check: (productId) => apiClient.get(`/wishlist/check/${productId}`),
};
