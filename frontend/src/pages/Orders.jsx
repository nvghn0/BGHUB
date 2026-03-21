import { useEffect, useState } from "react";
import API from "../services/api";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const res = await API.get("/orders/my-orders");
            setOrders(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            <h2>My Orders</h2>

            {orders.length === 0 ? (
                <p>No orders yet</p>
            ) : (
                orders.map((order) => (
                    <div
                        key={order._id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "15px",
                            marginBottom: "20px",
                            borderRadius: "8px"
                        }}
                    >
                        <h3>Order ID: {order._id}</h3>

                        {/* ✅ Date */}
                        <p>
                            Date: {new Date(order.createdAt).toLocaleString()}
                        </p>

                        {/* ✅ Status */}
                        <p>
                            Status: <b>{order.status.toUpperCase()}</b>
                        </p>

                        {/* ✅ Total */}
                        <p>Total: ₹{order.totalAmount}</p>

                        <h4>Items:</h4>

                        {/* ✅ Items list */}
                        {order.items.map((item) => (
                            <div key={item._id}>
                                <p>
                                    {item.name} × {item.quantity}
                                </p>
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
};

export default Orders;