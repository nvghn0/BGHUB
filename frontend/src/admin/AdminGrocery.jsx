import React, { useEffect, useState } from "react";
import {
    getAllGroceries,
    deleteGrocery
} from "../services/groceryService";

const AdminGrocery = () => {

    const [items, setItems] = useState([]);

    const loadProducts = async () => {
        const data = await getAllGroceries();
        setItems(data.items || []);
    };

    useEffect(() => {
        loadProducts();
    }, []);


    const handleDelete = async (id) => {

        if (!window.confirm("Delete item?")) return;

        await deleteGrocery(id);

        loadProducts();
    };


    return (

        <div>

            <h1>Admin Grocery Panel</h1>

            {items.map(p => (

                <div key={p._id}>

                    <span>{p.name}</span>

                    <button onClick={() => handleDelete(p._id)}>
                        Delete
                    </button>

                </div>

            ))}

        </div>
    );
};

export default AdminGrocery;