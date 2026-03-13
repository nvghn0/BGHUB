import React, { useState, useEffect } from "react";
import { placeOrder } from "../services/orderService";
import { useNavigate } from "react-router-dom";

const Checkout = () => {

  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");

  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    city: "",
    state: "",
    pincode: ""
  });

  const [loading, setLoading] = useState(false);

  // Fetch saved addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      const data = await getAddresses();
      setAddresses(data);
    };

    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value
    });
  };

  const handleOrder = async () => {
    try {
      setLoading(true);

      const res = await placeOrder({
        shipping,
        addressId: selectedAddress,
        paymentMethod: "COD"
      });

      alert("Order placed!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>

      <h2>Checkout</h2>

      <input
        name="fullName"
        placeholder="Full Name"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="addressLine1"
        placeholder="Address"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="city"
        placeholder="City"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="state"
        placeholder="State"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="pincode"
        placeholder="Pincode"
        onChange={handleChange}
      />

      <br /><br />

      {/* Address Dropdown */}
      <select onChange={(e) => setSelectedAddress(e.target.value)}>
        <option value="">Select Address</option>

        {addresses.map((addr) => (
          <option key={addr._id} value={addr._id}>
            {addr.addressLine1}
          </option>
        ))}
      </select>

      <br /><br />

      <button
        onClick={handleOrder}
        disabled={loading}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>

    </div>
  );
};

export default Checkout;