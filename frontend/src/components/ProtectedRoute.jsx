import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useContext(AuthContext);

  // ✅ Wait until AuthContext loads user
  if (loading) {
    return <p>Loading...</p>; // later spinner laga sakte ho
  }

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Not admin but trying admin route
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // ✅ Access allowed
  return children;
};

export default ProtectedRoute;