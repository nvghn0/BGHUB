import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ FETCH CART
  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ REMOVE ITEM
  const handleRemove = async (itemId) => {
    if (loading) return;

    setLoading(true);
    try {
      await API.delete(`/cart/remove/${itemId}`);
      await fetchCart();
    } catch (err) {
      alert("Error removing item");
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPDATE QUANTITY
  const updateQty = async (itemId, quantity) => {
    if (quantity < 1 || loading) return;

    setLoading(true);
    try {
      await API.put(`/cart/update/${itemId}`, { quantity });
      await fetchCart();
    } catch (err) {
      alert(err.response?.data?.message || "Error updating");
    } finally {
      setLoading(false);
    }
  };

  // ✅ TOGGLE SINGLE ITEM
  const toggleItem = async (itemId) => {
    if (loading) return;

    setLoading(true);
    try {
      await API.put(`/cart/select/${itemId}`);
      await fetchCart();
    } catch (err) {
      alert("Error updating selection");
    } finally {
      setLoading(false);
    }
  };

  // ✅ SELECT / UNSELECT ALL
  const handleSelectAll = async (selected) => {
    if (loading) return;

    setLoading(true);
    try {
      await API.put("/cart/select-all", { selected });
      await fetchCart();
    } catch (err) {
      alert("Error updating all");
    } finally {
      setLoading(false);
    }
  };

  if (!cart) return <p>Loading...</p>;

  return (
    <div>
      <h2>Your Cart</h2>

      {loading && <p>Updating...</p>}

      <button onClick={() => handleSelectAll(true)} disabled={loading}>
        Select All
      </button>

      <button onClick={() => handleSelectAll(false)} disabled={loading}>
        Unselect All
      </button>

      {cart.items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.items.map((item) => (
            <div key={item._id} style={{ marginBottom: "20px" }}>
              <input
                type="checkbox"
                checked={item.selected}
                disabled={loading}
                onChange={() => toggleItem(item._id)}
              />

              <h3>{item.name}</h3>
              <p>₹{item.price}</p>

              <button
                onClick={() => updateQty(item._id, item.quantity - 1)}
                disabled={loading}
              >
                -
              </button>

              <span style={{ margin: "0 10px" }}>{item.quantity}</span>

              <button
                onClick={() => updateQty(item._id, item.quantity + 1)}
                disabled={loading}
              >
                +
              </button>

              <button
                onClick={() => handleRemove(item._id)}
                disabled={loading}
                style={{ marginLeft: "10px" }}
              >
                Remove
              </button>
            </div>
          ))}

          <button onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>

          <h3>Total: ₹{cart.total}</h3>
          <h3>Selected Total: ₹{cart.selectedTotal}</h3>
        </>
      )}
    </div>
  );
};

export default Cart;