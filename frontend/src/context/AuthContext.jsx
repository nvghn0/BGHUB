import React, { createContext, useState } from "react";
import apiClient from "../api/apiClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));
  const [role, setRole] = useState(() => localStorage.getItem("role"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // REGISTER (user only)
  const register = async (name, email, password, phone = "") => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.post("/auth/register", {
        name, email, password, phone
      });

      const { token: newToken, user: userData } = res.data;

      localStorage.setItem("authToken", newToken);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("role", "user");

      setToken(newToken);
      setUser(userData);
      setRole("user");

      return { success: true, data: userData };
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  // LOGIN
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.post("/auth/login", { email, password });
      const { token: newToken, user: userData, role: userRole } = res.data;

      localStorage.setItem("authToken", newToken);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("role", userRole);

      setToken(newToken);
      setUser(userData);
      setRole(userRole);

      return { success: true, data: userData, role: userRole };
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setToken(null);
    setUser(null);
    setRole(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        loading,
        error,
        login,
        logout,
        register,
        isLoggedIn: !!token,
        isAdmin: role === "admin",
        isUser: role === "user"
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
