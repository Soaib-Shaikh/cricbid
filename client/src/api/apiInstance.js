import axios from "axios";

const apiInstance = axios.create({
  baseURL:
  import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

apiInstance.interceptors.request.use(
  (req) => {
    const token =
      localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  }
);

export default apiInstance;