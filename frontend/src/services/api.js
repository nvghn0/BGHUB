import axios from "axios";

const API = axios.create({
  baseURL: "https://curly-computing-machine-r4jrvqwjwgxxfp79-5000.app.github.dev/api",
  });

  // ✅ REQUEST INTERCEPTOR (TOKEN ADD)
  API.interceptors.request.use((req) => {
    try {
        const stored = localStorage.getItem("user");
            const user = stored ? JSON.parse(stored) : null;
                const token = user?.token;

                    if (token) {
                          req.headers.Authorization = `Bearer ${token}`;
                              }
                                } catch (err) {
                                    console.error("Token parse error");
                                        localStorage.removeItem("user");
                                          }

                                            return req;
                                            });

                                            // ✅ RESPONSE INTERCEPTOR (SAFE VERSION)
                                            API.interceptors.response.use(
                                              (res) => res,
                                                (err) => {
                                                    if (err.response?.status === 401) {
                                                          console.warn("401 Unauthorized - token issue or route issue");
                                                                // ❌ NO AUTO LOGOUT
                                                                    }

                                                                        return Promise.reject(err);
                                                                          }
                                                                          );

                                                                          export default API;