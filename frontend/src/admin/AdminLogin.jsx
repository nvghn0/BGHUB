import React, { useState, useContext } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminLogin = () => {

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();
        setError("");

        try {

            const res = await api.post("/auth/login", {
                email,
                password
            });

            const token = res.data.token;
            const role = res.data.role;

            // admin check
            if (role !== "admin") {
                setError("Not an admin account");
                return;
            }

            // AuthContext login
            login(token, role);

            navigate("/P5K4B7/grocery");

        }
        catch (err) {

            setError(
                err.response?.data?.message ||
                "Invalid email or password"
            );

        }

    };

    return (

        <div style={{ maxWidth: "400px", margin: "auto" }}>

            <h2>Admin Login</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <br /><br />

                <button type="submit">
                    Login
                </button>

            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}

        </div>

    );

};

export default AdminLogin;