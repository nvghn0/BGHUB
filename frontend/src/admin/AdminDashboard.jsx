import React, { useEffect, useState } from "react";
import { getDashboardStats } from "../services/adminService";

const AdminDashboard = () => {

    const [stats, setStats] = useState(null);

    const load = async () => {

        try {
            const res = await getDashboardStats();
            setStats(res.data);
        }
        catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {
        load();
    }, []);

    if (!stats) return <h2>Loading...</h2>;

    return (

        <div>

            <h1>Admin Dashboard</h1>

            <p>Total Users: {stats.totalUsers}</p>

            <p>Total Orders: {stats.totalOrders}</p>

            <p>Pending Orders: {stats.pendingOrders}</p>

            <p>Delivered Orders: {stats.deliveredOrders}</p>

            <p>Total Revenue: ₹ {stats.totalRevenue}</p>

        </div>

    );

};

export default AdminDashboard;