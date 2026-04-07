import React, { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
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

  // ✅ FETCH CART
  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ FETCH ADDRESSES
  const fetchAddresses = async () => {
    try {
      const res = await API.get("/user/address");
      setAddresses(res.data);

      // 🔥 Auto select default address
      const defaultAddr = res.data.find((a) => a.isDefault);
      if (defaultAddr) {
        setSelectedAddress(defaultAddr._id);
      }

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchAddresses();
  }, []);

  // ✅ INPUT HANDLE
  const handleChange = (e) => {
    setShipping({
      ...shipping,
      [e.target.name]: e.target.value
    });
  };

  // ✅ PLACE ORDER (FINAL LOGIC)
  const handleOrder = async () => {
    try {
      setLoading(true);

      let payload = {
        paymentMethod: "COD"
      };

      // 🔥 SMART LOGIC
      if (selectedAddress) {
        payload.addressId = selectedAddress;
      } else {
        // ❗ validation
        const { fullName, phone, addressLine1, city, state, pincode } = shipping;

        if (!fullName || !phone || !addressLine1 || !city || !state || !pincode) {
          alert("Please fill complete address");
          setLoading(false);
          return;
        }

        payload.shipping = shipping;
      }

      await API.post("/orders/place", payload);

      alert("Order placed successfully");
      navigate("/orders");

    } catch (err) {
      alert(err.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  if (!cart) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Checkout</h2>

      {/* ✅ TOTAL */}
      <h3>Selected Total: ₹{cart.selectedTotal}</h3>

      {/* ✅ ADDRESS SELECT */}
      <h4>Select Saved Address</h4>
      <select
        value={selectedAddress}
        onChange={(e) => setSelectedAddress(e.target.value)}
      >
        <option value="">-- Use New Address --</option>

        {addresses.map((addr) => (
          <option key={addr._id} value={addr._id}>
            {addr.addressLine1} ({addr.city})
          </option>
        ))}
      </select>

      <br /><br />

      {/* ❗ MANUAL FORM */}
      <h4>Or Enter New Address</h4>

      <input name="fullName" placeholder="Full Name" onChange={handleChange} />
      <br /><br />

      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <br /><br />

      <input name="addressLine1" placeholder="Address" onChange={handleChange} />
      <br /><br />

      <input name="city" placeholder="City" onChange={handleChange} />
      <br /><br />

      <input name="state" placeholder="State" onChange={handleChange} />
      <br /><br />

      <input name="pincode" placeholder="Pincode" onChange={handleChange} />
      <br /><br />

      {/* ✅ BUTTON */}
      <button onClick={handleOrder} disabled={loading}>
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default Checkout;