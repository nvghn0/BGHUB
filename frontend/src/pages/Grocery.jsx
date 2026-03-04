import { useEffect, useState } from "react";
import API from "../api/api";

export default function Grocery() {

  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetchGroceries();
  }, []);

  const fetchGroceries = async () => {
    try {
      const res = await API.get("/groceries");

      if (res.data.items) {

        const sorted = res.data.items.sort((a, b) => {
          if (a.stock === 0) return 1;
          if (b.stock === 0) return -1;
          return 0;
        });

        setProducts(sorted);

        // default quantity = 1 for each item
        const initialQty = {};
        sorted.forEach(item => {
          initialQty[item._id] = 1;
        });
        setQuantities(initialQty);
      }

      if (res.data.message) {
        setMessage(res.data.message);
      }

    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  // ======================
  // HANDLE QUANTITY CHANGE
  // ======================
  const handleQtyChange = (id, value) => {
    setQuantities({
      ...quantities,
      [id]: Number(value)
    });
  };

  // ======================
  // ADD TO CART
  // ======================
  const addToCart = async (productId) => {
    try {
      await API.post("/cart/add", {
        productId,
        quantity: quantities[productId]
      });

      alert("Added to cart ✅");

    } catch (err) {
      alert(err.response?.data?.message || "Failed to add");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Grocery</h2>

      {message && products.length === 0 && (
        <p>{message}</p>
      )}

      {products.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px",
            opacity: item.stock === 0 ? 0.6 : 1
          }}
        >
          <h4>{item.name}</h4>
          <p>Category: {item.category}</p>
          <p>Price: ₹{item.price}</p>
          <p>
            Stock: {item.stock === 0 ? "Out of Stock ❌" : item.stock}
          </p>

          {item.stock > 0 && (
            <>
              <label>Qty: </label>
              <select
                value={quantities[item._id] || 1}
                onChange={(e) =>
                  handleQtyChange(
                    item._id,
                    Math.min(10, e.target.value)
                  )
                }
              >
                {[...Array(Math.min(10, item.stock))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </>
          )}

          <br /><br />

          <button
            disabled={item.stock === 0}
            onClick={() => addToCart(item._id)}
          >
            {item.stock === 0 ? "Out of Stock" : "Add To Cart"}
          </button>

        </div>
      ))}
    </div>
  );
}
