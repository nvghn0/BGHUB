import api from "../api/api";

// GET CART
export const getCart = async () => {
    const res = await api.get("/cart");
    return res.data;
};

// ADD ITEM
export const addToCart = async (productId, quantity = 1) => {
    const res = await api.post("/cart/add", {
        productId,
        quantity
    });
    return res.data;
};

// UPDATE QUANTITY
export const updateCartQty = async (itemId, quantity) => {
    const res = await api.put(`/cart/update/${itemId}`, {
        quantity
    });
    return res.data;
};

// REMOVE ITEM
export const removeCartItem = async (itemId) => {
    const res = await api.delete(`/cart/remove/${itemId}`);
    return res.data;
};

// TOGGLE ITEM
export const toggleCartItem = async (itemId) => {
    const res = await api.put(`/cart/toggle/${itemId}`);
    return res.data;
};

// SELECT ALL
export const selectAllCart = async (selected) => {
    const res = await api.put("/cart/select-all", {
        selected
    });
    return res.data;
};