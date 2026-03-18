import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected User Route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <h1>Admin Panel</h1>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
