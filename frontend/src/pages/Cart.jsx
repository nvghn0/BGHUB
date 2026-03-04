import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Cart() {

  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const res = await API.get("/cart");
    setCart(res.data);
  };

  const toggleItem = async (id) => {
    await API.put(`/cart/select/${id}`);
    fetchCart();
  };

  const goCheckout = () => {
    navigate("/checkout");
  };

  if (!cart) return <p>Loading...</p>;

  return (
    <div>
      <h2>Cart</h2>

      {cart.items.map((item) => (
        <div key={item._id}>
          <input
            type="checkbox"
            checked={item.selected}
            onChange={() => toggleItem(item._id)}
          />
          {item.name} - {item.quantity}
        </div>
      ))}

      <h3>Total: {cart.selectedTotal}</h3>

      <button onClick={goCheckout}>
        Checkout
      </button>
    </div>
  );
}