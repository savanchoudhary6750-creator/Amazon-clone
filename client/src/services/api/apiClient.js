import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to automatically attach authorization token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to format responses and handle 401/403/500 errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const data = error.response?.data;
    const errorMessage = data?.message || error.message || "API request failed";
    const customError = new Error(errorMessage);
    customError.status = error.response?.status;
    customError.data = data;

    // Handle 401/403/500 errors globally
    if (error.response) {
      const { status } = error.response;
      if (status === 401 || status === 403) {
        console.warn(`Auth error (${status}) encountered. Clearing token.`);
        localStorage.removeItem("authToken");
      } else if (status >= 500) {
        console.error("Server error (500+) encountered:", errorMessage);
      }
    } else {
      console.error("Network error or server unreachable:", error.message);
    }

    // Dispatch global custom event for toast notifications
    const event = new CustomEvent("api-error", { detail: errorMessage });
    window.dispatchEvent(event);
    
    return Promise.reject(customError);
  }
);

class ApiClient {
  setAuthToken(token) {
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  }

  get(endpoint, options = {}) {
    return axiosInstance.get(endpoint, options);
  }

  post(endpoint, body, options = {}) {
    return axiosInstance.post(endpoint, body, options);
  }

  put(endpoint, body, options = {}) {
    return axiosInstance.put(endpoint, body, options);
  }

  delete(endpoint, options = {}) {
    return axiosInstance.delete(endpoint, options);
  }

  patch(endpoint, body, options = {}) {
    return axiosInstance.patch(endpoint, body, options);
  }
}

export default new ApiClient();

