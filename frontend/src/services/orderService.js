import api from "../api/api";

// PLACE ORDER
export const placeOrder = async (data) => {
  const res = await api.post("/order/place", data);
    return res.data;
    };