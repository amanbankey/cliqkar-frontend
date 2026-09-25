import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5004/api",
});

//https://cliqkar-backend.onrender.com/api
// ======================================
// AUTOMATICALLY ATTACH TOKEN
// ======================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ==================================
    // FORM DATA
    // ==================================
    // Agar image/file upload ho raha hai,
    // Axios khud multipart/form-data boundary
    // set karega. Isliye JSON header hata do.
    
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);


export default api;