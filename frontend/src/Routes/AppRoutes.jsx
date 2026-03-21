import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Grocery from "../pages/Grocery";
import Cart from "../pages/Cart";
import ProtectedRoute from "../components/ProtectedRoute";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import AdminOrders from "../pages/AdminOrders";


const AppRoutes = () => {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/grocery" element={<Grocery />} />

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

      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminOrders />
          </ProtectedRoute>
        }
      />

      {/* cart route */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      {/* Checkout  */}
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      {/*order Route */}
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default AppRoutes;
