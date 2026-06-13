import apiClient from "./api/apiClient.js";

export const authService = {
  register: (userData) => apiClient.post("/auth/register", userData),
  login: (email, password) => apiClient.post("/auth/login", { email, password }),
  logout: () => apiClient.post("/auth/logout", {}),
  getProfile: () => apiClient.get("/auth/profile"),
  updateProfile: (userData) => apiClient.put("/auth/profile", userData),
  changePassword: (oldPassword, newPassword) =>
    apiClient.post("/auth/change-password", { oldPassword, newPassword }),
  deleteAccount: () => apiClient.delete("/auth/account"),
  setAuthToken: (token) => apiClient.setAuthToken(token),
  getAdminUsers: () => apiClient.get("/auth/admin/users"),
};

export default authService;
