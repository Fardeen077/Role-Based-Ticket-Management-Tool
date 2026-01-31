import axiosInstance from "./axiosInstance";

const registerApi = async (userData) => {
    const res = await axiosInstance.post("/auth/register", userData);
    return res.data;
}

const loginApi = async (userData) => {
    const res = await axiosInstance.post("/auth/login", userData);
    return res.data;
}

const logoutApi = async () => {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
}

const getUserApi = async () => {
    const res = await axiosInstance.get("/auth/me");
    return res.data
}

export {
    registerApi,
    loginApi,
    logoutApi,
    getUserApi
}