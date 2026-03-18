import { useEffect, useState } from "react";
import API from "../services/api";

const Grocery = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/grocery");
        setProducts(res.data.items);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };

    fetchProducts();
  }, []);

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
            <button>Add to Cart</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Grocery;
