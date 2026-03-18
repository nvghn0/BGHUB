import React, { useEffect, useState } from "react";
import { getAllGroceries } from "../services/groceryService";
import { addToCart } from "../services/cartService";
import ProductCard from "../components/ProductCard";

const Grocery = () => {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // LOAD PRODUCTS
  useEffect(() => {

    const load = async () => {
      try {
        const data = await getAllGroceries();

        // ✅ handle both possible backend responses
        setItems(data.products || data.items || []);

      } catch (err) {
        console.log("Error loading groceries:", err);
      } finally {
        setLoading(false);
      }
    };

    load();

  }, []);

  // ADD TO CART
  const handleAdd = async (productId) => {

    try {
      await addToCart(productId, 1);
      alert("Added to cart"); // later replace with toast
    } catch (err) {
      console.log("Add to cart error:", err);
      alert("Error adding item");
    }

  };

  // LOADING STATE
  if (loading) return <h2>Loading...</h2>;

  return (

    <div style={{ padding: "20px" }}>

      <h1>Grocery</h1>

      {items.length === 0 ? (

        <h3>No products found</h3>

      ) : (

        items.map(item => (
          <ProductCard
            key={item._id}
            product={item}
            onAdd={handleAdd}
          />
        ))

      )}

    </div>

  );

};

export default Grocery;
