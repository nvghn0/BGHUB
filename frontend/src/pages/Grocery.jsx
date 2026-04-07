import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Grocery = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/groceries");

        // 🔥 Safe handling (items ya direct array dono handle)
        setProducts(res.data.items || res.data);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Add to Cart
  const handleAddToCart = async (productId) => {
    if (loading) return;

    setLoading(true);
    try {
      await API.post("/cart/add", {
        productId,
        quantity: 1,
      });

      alert("Added to cart");
    } catch (err) {
      // 🔥 Better UX handling
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        alert(err.response?.data?.message || "Error adding to cart");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Grocery Products</h2>

      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        products.map((item) => (
          <div key={item._id} style={{ marginBottom: "20px" }}>

            <h3>{item.name}</h3>
            <p>₹{item.price}</p>

            {/* 🔥 Extra useful info */}
            <p>Stock: {item.stock}</p>
            <img src={item.imageUrl} alt={item.name} width="100" />

            <button
              onClick={() => handleAddToCart(item._id)}
              disabled={loading || item.stock === 0}
            >
              {item.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>

          </div>
        ))
      )}
    </div>
  );
};

export default Grocery;