import apiClient from "./api/apiClient.js";

export const productService = {
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

export default productService;
