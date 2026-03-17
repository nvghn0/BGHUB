import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminProtectedRoute = ({ children }) => {
  const { isLoggedIn, role } = useContext(AuthContext);

  if (!isLoggedIn) return <Navigate to="/login" />;
  if (role !== "admin") return <Navigate to="/" />;

  return children;
};

export default AdminProtectedRoute;
