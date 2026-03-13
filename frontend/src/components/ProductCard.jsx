import React from "react";

const ProductCard = ({ product, onAdd }) => {

    return (

        <div style={{ border: "1px solid #ccc", padding: "10px" }}>

            <img
                src={product.imageUrl}
                alt={product.name}
                width="120"
            />

            <h3>{product.name}</h3>

            <p>₹ {product.price}</p>

            <p>Stock: {product.stock}</p>

            <button
                disabled={product.stock === 0}
                onClick={() => onAdd(product._id)}
            >
                Add to Cart
            </button>

        </div>

    );

};

export default ProductCard;