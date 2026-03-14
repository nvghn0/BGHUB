import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Grocery from "./pages/Grocery";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Addresses from "./pages/Addresses";

import AdminProtectedRoute from "./components/AdminProtectedRoute";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminGrocery from "./admin/AdminGrocery";
import AdminOrders from "./admin/AdminOrders";
import AdminProducts from "./admin/AdminProducts";

function App() {
  return (

    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/grocery" element={<Grocery />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/addresses" element={<Addresses />} />

      <Route path="/P5K4B7" element={<AdminLogin />} />

      <Route
        path="/P5K4B7/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/P5K4B7/grocery"
        element={
          <AdminProtectedRoute>
            <AdminGrocery />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/P5K4B7/orders"
        element={
          <AdminProtectedRoute>
            <AdminOrders />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/P5K4B7/products"
        element={
          <AdminProtectedRoute>
            <AdminProducts />
          </AdminProtectedRoute>
        }
      />

    </Routes>

  );
}

export default App;
