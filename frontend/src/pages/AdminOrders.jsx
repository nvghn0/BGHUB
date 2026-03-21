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

  return (
    <div>
      <h2>Admin Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order._id}>
            <h3>{order._id}</h3>
            <p>Status: {order.status}</p>
            <p>Total: ₹{order.totalAmount}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;