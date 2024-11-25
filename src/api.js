import axios from "axios";

// Cấu hình axios
const api = axios.create({
  baseURL: "http://localhost:9090/api/v1", // Base URL của API
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm token vào headers Authorization nếu có
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;
