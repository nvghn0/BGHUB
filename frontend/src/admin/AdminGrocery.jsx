import { useEffect, useState } from "react";
import {
  getAllGroceries,
  addGrocery,
  updateGrocery,
  deleteGrocery,
} from "../services/groceryService";

const AdminGrocery = () => {
  const [items, setItems] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    imageUrl: "",
  });

  const [editId, setEditId] = useState(null);

  // 🔥 LOAD PRODUCTS
  const loadProducts = async () => {
    const data = await getAllGroceries();
    setItems(data.items || data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // 🔥 HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await updateGrocery(editId, form);
        alert("Updated successfully");
      } else {
        await addGrocery(form);
        alert("Added successfully");
      }

      setForm({
        name: "",
        price: "",
        stock: "",
        category: "",
        imageUrl: "",
      });

      setEditId(null);
      loadProducts();

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  // 🔥 DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete item?")) return;

    await deleteGrocery(id);
    loadProducts();
  };

  // 🔥 EDIT
  const handleEdit = (item) => {
    setForm({
      name: item.name,
      price: item.price,
      stock: item.stock,
      category: item.category,
      imageUrl: item.imageUrl,
    });

    setEditId(item._id);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h1>Admin Grocery Panel</h1>

      {/* 🔥 FORM */}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <br /><br />

        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <br /><br />

        <input name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} required />
        <br /><br />

        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <br /><br />

        <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />
        <br /><br />

        <button type="submit">
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <hr />

      {/* 🔥 PRODUCT LIST */}
      {items.map((p) => (
        <div key={p._id} style={{ marginBottom: "20px" }}>
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
          <p>Stock: {p.stock}</p>

          <button onClick={() => handleEdit(p)}>Edit</button>
          <button onClick={() => handleDelete(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminGrocery;