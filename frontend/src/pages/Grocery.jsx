import React, { useEffect, useState } from "react";
import { getAllGroceries } from "../services/groceryService";
import { addToCart } from "../services/cartService";
import ProductCard from "../components/ProductCard";

const Grocery = () => {

  const [items,setItems] = useState([]);

  useEffect(()=>{

    const load = async () => {
      const data = await getAllGroceries();
      setItems(data.items || []);
    };

    load();

  },[]);


  const handleAdd = async (productId) => {

    try{

      await addToCart(productId,1);

      alert("Added to cart");

    }catch(err){

      alert("Error adding item");

    }

  };


  return (

    <div>

      <h1>Grocery</h1>

      {items.map(item => (

        <ProductCard
          key={item._id}
          product={item}
          onAdd={handleAdd}
        />

      ))}

    </div>

  );

};

export default Grocery;
