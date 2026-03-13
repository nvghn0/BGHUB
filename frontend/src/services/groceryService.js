import api from "../api/api";

// USER
export const getAllGroceries = async () => {
    const res = await api.get("/grocery");
    return res.data;
};

export const getGroceryById = async (id) => {
    const res = await api.get(`/grocery/${id}`);
    return res.data;
};

export const getGroceriesByCategory = async (type) => {
    const res = await api.get(`/grocery/category/${type}`);
    return res.data;
};


// ADMIN
export const addGrocery = async (data) => {
    const res = await api.post("/grocery/add", data);
    return res.data;
};

export const updateGrocery = async (id, data) => {
    const res = await api.put(`/grocery/${id}`, data);
    return res.data;
};

export const deleteGrocery = async (id) => {
    const res = await api.delete(`/grocery/${id}`);
    return res.data;
};