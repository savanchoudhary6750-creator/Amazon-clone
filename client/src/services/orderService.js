import apiClient from "./api/apiClient.js";

export const orderService = {
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

export default orderService;
