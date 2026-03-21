import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Grocery = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/groceries");
        setProducts(res.data.items);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Add to Cart Function
  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");

    // ❗ Login check
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await API.post("/cart/add", {
        productId,
        quantity: 1,
      });

      alert("Added to cart");
    } catch (err) {
      alert(err.response?.data?.message || "Error adding to cart");
    }
  };

  return (
    <div>
      <h2>Grocery Products</h2>

      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        products.map((item) => (
          <div key={item._id}>
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>

            {/* ✅ Button connect kiya */}
            <button onClick={() => handleAddToCart(item._id)}>
              Add to Cart
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Grocery;