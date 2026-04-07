import { useEffect, useState } from "react";
import API from "../services/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/admin");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      alert("Access denied or error");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}`, { status });
      fetchOrders();
    } catch (err) {
      alert("Error updating status");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h2>Admin Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}
          >
            <h3>Order ID: {order._id}</h3>

            {/* ✅ USER */}
            <p><b>User:</b> {order.user?.email || "N/A"}</p>

            {/* ✅ STATUS */}
            <p>
              <b>Status:</b>{" "}
              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(order._id, e.target.value)
                }
              >
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </p>

            {/* ✅ TOTAL */}
            <p><b>Total:</b> ₹{order.totalAmount}</p>

            {/* 🔥 ITEMS (FIXED) */}
            <h4>Items:</h4>
            <div
              style={{
                background: "#f9f9f9",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "10px"
              }}
            >
              {order.items.map((item, index) => (
                <p key={index} style={{ margin: "5px 0" }}>
                  {item.name} × {item.quantity} = ₹{item.price * item.quantity}
                </p>
              ))}
            </div>

            {/* ✅ ADDRESS */}
            <p><b>Address:</b></p>
            <p>{order.shipping?.fullName}</p>
            <p>{order.shipping?.phone}</p>
            <p>{order.shipping?.addressLine1}</p>
            <p>
              {order.shipping?.city}, {order.shipping?.state}
            </p>
            <p>{order.shipping?.pincode}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;