import axios from "axios";

const API = axios.create({
  baseURL: "https://curly-computing-machine-r4jrvqwjwgxxfp79-5000.app.github.dev/api",
});

// 🔥 VERY IMPORTANT
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
