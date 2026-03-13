import api from "../api/api";

// PROFILE
export const getProfile = async () => {
    const res = await api.get("/user/me");
    return res.data;
};

export const updateProfile = async (data) => {
    const res = await api.put("/user/update", data);
    return res.data;
};

// PASSWORD
export const changePassword = async (data) => {
    const res = await api.put("/user/change-password", data);
    return res.data;
};

// ADDRESS
export const getAddresses = async () => {
    const res = await api.get("/user/address");
    return res.data;
};

export const addAddress = async (data) => {
    const res = await api.post("/user/address", data);
    return res.data;
};

export const updateAddress = async (id, data) => {
    const res = await api.put(`/user/address/${id}`, data);
    return res.data;
};

export const deleteAddress = async (id) => {
    const res = await api.delete(`/user/address/${id}`);
    return res.data;
};

export const setDefaultAddress = async (id) => {
    const res = await api.put(`/user/address/default/${id}`);
    return res.data;
};