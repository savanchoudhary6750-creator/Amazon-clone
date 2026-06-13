import apiClient from "./api/apiClient.js";

export const wishlistService = {
  get: () => apiClient.get("/wishlist"),
  add: (productId) => apiClient.post("/wishlist/add", { productId }),
  remove: (productId) => apiClient.delete(`/wishlist/${productId}`),
  clear: () => apiClient.delete("/wishlist"),
  check: (productId) => apiClient.get(`/wishlist/check/${productId}`),
};

export default wishlistService;
