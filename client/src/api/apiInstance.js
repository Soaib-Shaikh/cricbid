import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

apiInstance.interceptors.request.use(
  (req) => {
    const token =
      localStorage.getItem("tokens");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  }
);

export default apiInstance;