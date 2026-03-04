import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Checkout() {

    const navigate = useNavigate();

    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState("");
    const [useNewAddress, setUseNewAddress] = useState(false);

    const [shipping, setShipping] = useState({
        fullName: "",
        phone: "",
        addressLine1: "",
        city: "",
        state: "",
        pincode: ""
    });

    const [loading, setLoading] = useState(false);

    // ============================
    // FETCH USER ADDRESSES
    // ============================
    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const res = await API.get("/user/me");
            setAddresses(res.data.addresses || []);
        } catch (err) {
            alert("Login required");
            navigate("/login");
        }
    };

    // ============================
    // HANDLE INPUT CHANGE
    // ============================
    const handleChange = (e) => {
        setShipping({
            ...shipping,
            [e.target.name]: e.target.value
        });
    };

    // ============================
    // PLACE ORDER
    // ============================
    const placeOrder = async () => {
        try {
            setLoading(true);

            let payload = {};

            if (useNewAddress) {
                payload.shipping = shipping;
            } else {
                if (!selectedAddressId) {
                    alert("Select address first");
                    setLoading(false);
                    return;
                }
                payload.addressId = selectedAddressId;
            }

            const res = await API.post("/orders/place", payload);

            alert("Order placed successfully 🎉");
            navigate("/");

        } catch (err) {
            alert(err.response?.data?.message || "Order failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px" }}>

            <h2>Checkout</h2>

            {/* SAVED ADDRESSES */}
            {addresses.length > 0 && (
                <>
                    <h3>Select Saved Address</h3>

                    {addresses.map((addr) => (
                        <div key={addr._id}>
                            <input
                                type="radio"
                                name="address"
                                value={addr._id}
                                checked={selectedAddressId === addr._id}
                                onChange={(e) => {
                                    setSelectedAddressId(e.target.value);
                                    setUseNewAddress(false);
                                }}
                            />
                            {addr.fullName}, {addr.addressLine1}, {addr.city}
                        </div>
                    ))}
                </>
            )}

            <hr />

            {/* NEW ADDRESS OPTION */}
            <h3>
                <input
                    type="checkbox"
                    checked={useNewAddress}
                    onChange={() => {
                        setUseNewAddress(!useNewAddress);
                        setSelectedAddressId("");
                    }}
                />
                Use New Address
            </h3>

            {useNewAddress && (
                <div>
                    <input
                        name="fullName"
                        placeholder="Full Name"
                        onChange={handleChange}
                    /><br />

                    <input
                        name="phone"
                        placeholder="Phone"
                        onChange={handleChange}
                    /><br />

                    <input
                        name="addressLine1"
                        placeholder="Address Line"
                        onChange={handleChange}
                    /><br />

                    <input
                        name="city"
                        placeholder="City"
                        onChange={handleChange}
                    /><br />

                    <input
                        name="state"
                        placeholder="State"
                        onChange={handleChange}
                    /><br />

                    <input
                        name="pincode"
                        placeholder="Pincode"
                        onChange={handleChange}
                    /><br />
                </div>
            )}

            <br />

            <button onClick={placeOrder} disabled={loading}>
                {loading ? "Placing..." : "Place Order"}
            </button>

        </div>
    );
}