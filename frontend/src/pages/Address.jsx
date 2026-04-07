import { useEffect, useState } from "react"; import API from "../services/api";

const Address = () => {
    const [addresses, setAddresses] = useState([]); const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({ fullName: "", phone: "", addressLine1: "", city: "", state: "", pincode: "", landmark: "", deliveryInstructions: "", });

    const fetchAddresses = async () => { try { const res = await API.get("/user/address"); setAddresses(res.data); } catch (err) { if (err.response?.status === 401) { alert("Please login first"); } else { console.error(err); } } };

    useEffect(() => { fetchAddresses(); }, []);

    const validate = () => {
        const { fullName, phone, addressLine1, city, state, pincode } = form;

        if (!fullName || !phone || !addressLine1 || !city || !state || !pincode) {
            alert("Please fill all required fields");
            return false;
        }

        if (phone.length !== 10) {
            alert("Invalid phone number");
            return false;
        }

        if (pincode.length !== 6) {
            alert("Invalid pincode");
            return false;
        }

        return true;

    };

    const handleAdd = async () => {
        if (!validate() || loading) return;

        setLoading(true);
        try {
            await API.post("/user/address", form);
            setForm({
                fullName: "",
                phone: "",
                addressLine1: "",
                city: "",
                state: "",
                pincode: "",
                landmark: "",
                deliveryInstructions: "",
            });
            fetchAddresses();
        } catch (err) {
            alert(err.response?.data?.message || "Error adding address");
        }
        setLoading(false);

    };

    const handleDelete = async (id) => { if (loading) return; setLoading(true); try { await API.delete(`/user/address/${id}`); fetchAddresses(); } catch (err) { alert("Error deleting"); } setLoading(false); };

    const handleDefault = async (id) => { if (loading) return; setLoading(true); try { await API.put(`/user/address/default/${id}`); fetchAddresses(); } catch (err) { alert("Error setting default"); } setLoading(false); };

    return (<div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}> <h2 style={{ textAlign: "center" }}>Your Addresses</h2>

        {addresses.length === 0 ? (
            <p style={{ textAlign: "center" }}>No addresses found</p>
        ) : (
            addresses.map((addr) => (
                <div
                    key={addr._id}
                    style={{
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        padding: "15px",
                        marginBottom: "15px",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    }}
                >
                    <p><strong>{addr.fullName}</strong></p>
                    <p>{addr.addressLine1}</p>
                    <p>{addr.city}, {addr.state} - {addr.pincode}</p>

                    {addr.landmark && <p>📍 {addr.landmark}</p>}
                    {addr.deliveryInstructions && <p>📝 {addr.deliveryInstructions}</p>}

                    {addr.isDefault && (
                        <span style={{ color: "green", fontWeight: "bold" }}>
                            ⭐ Default Address
                        </span>
                    )}

                    <div style={{ marginTop: "10px" }}>
                        <button onClick={() => handleDelete(addr._id)} disabled={loading}>
                            Delete
                        </button>

                        {!addr.isDefault && (
                            <button
                                onClick={() => handleDefault(addr._id)}
                                disabled={loading}
                                style={{ marginLeft: "10px" }}
                            >
                                Set Default
                            </button>
                        )}
                    </div>
                </div>
            ))
        )}

        <hr />

        <h3>Add New Address</h3>

        {Object.keys(form).map((key) => (
            <input
                key={key}
                value={form[key]}
                placeholder={key}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                }}
            />
        ))}

        <button
            onClick={handleAdd}
            disabled={loading}
            style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "black",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
            }}
        >
            {loading ? "Saving..." : "Add Address"}
        </button>
    </div>

    );
};

export default Address;