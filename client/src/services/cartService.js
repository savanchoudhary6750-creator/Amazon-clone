import apiClient from "./api/apiClient.js";

export const cartService = {
  get: () => apiClient.get("/cart"),
  add: (productId, quantity = 1) =>
    apiClient.post("/cart/add", { productId, quantity }),
  updateQuantity: (productId, quantity) =>
    apiClient.put("/cart/update", { productId, quantity }),
  remove: (productId) => apiClient.delete(`/cart/${productId}`),
  clear: () => apiClient.delete("/cart"),
};

export default cartService;
