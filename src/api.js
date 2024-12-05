import axios from "axios";

// Cấu hình axios
const api = axios.create({
  baseURL: "http://localhost:9090/api/v1", // Base URL của API
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor xử lý yêu cầu (Request Interceptor)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Lấy token từ localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Gắn token vào headers
    }
    return config; // Trả về config sau khi chỉnh sửa
  },
  (error) => {
    // Xử lý lỗi trước khi gửi yêu cầu
    return Promise.reject(error);
  }
);

// Interceptor xử lý phản hồi (Response Interceptor)
api.interceptors.response.use(
  (response) => {
    // Xử lý phản hồi thành công
    return response.data; // Trả về dữ liệu đã chuẩn hóa (chỉ lấy data)
  },
  (error) => {
    // Xử lý lỗi từ phản hồi của server
    if (error.response) {
      // Nếu lỗi có response từ server
      console.error(error.response);
      console.error("API Error:", error.response.data.message || "Unknown error");
      return Promise.reject(error.response.data); // Trả về lỗi chuẩn hóa
    } else if (error.request) {
      // Nếu yêu cầu đã gửi nhưng không nhận được phản hồi
      console.error("No response from server:", error.request);
      return Promise.reject({ message: "No response from server. Please try again later." });
    } else {
      // Lỗi xảy ra khi cấu hình yêu cầu
      console.error("Request error:", error.message);
      return Promise.reject({ message: error.message });
    }
  }
);

export default api;
