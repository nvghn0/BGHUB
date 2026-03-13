import api from "../api/api";

// LOGIN
export const loginUser = async (email, password) => {

    const res = await api.post("/auth/login", {
        email,
        password
    });

    const data = res.data;

    // save token
    if (data.token) {
        localStorage.setItem("token", data.token);
    }

    return data;

};


// REGISTER
export const registerUser = async (name, email, password) => {

    const res = await api.post("/auth/register", {
        name,
        email,
        password
    });

    return res.data;

};


// LOGOUT
export const logoutUser = () => {

    localStorage.removeItem("token");

};


// GET TOKEN
export const getToken = () => {

    return localStorage.getItem("token");

};