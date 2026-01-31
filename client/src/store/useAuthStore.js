import {
    registerApi,
    loginApi,
    logoutApi,
    getUserApi
} from "../api/authApi";
import { create } from 'zustand';
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
    isAuth: false,
    isLoadind: false,
    authUser: null,
    error: null,

    register: async (userData) => {
        set({ isLoadind: true, error: null });
        try {
            const res = await registerApi(userData);
            set({ isLoadind: false, authUser: res.data.user, isAuth: true })
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || "Register failed";
            set({ isLoadind: false, error: message });
            return null;
        }
    },

    login: async (userData) => {
        set({ isLoadind: true, error: null });
        try {
            const res = await loginApi(userData);
            set({ isLoadind: false, authUser: res.data.user, isAuth: true })
            return res.data;
        } catch (error) {
            set({ isLoadind: false, error: error?.response?.data?.message || "Login failed" })
        }
    },

    getUser: async () => {
        set({ isLoadind: true, error: null });
        try {
            const res = await getUserApi();
            set({ isLoadind: false, authUser: res.data, isAuth: true })
            return res.data;
        } catch (error) {
            set({ isLoadind: false, error: error?.response?.data?.message || "Get User failed" })
        }
    },

    logout: async () => {
        set({ isLoadind: true, error: null });
        try {
            const res = await logoutApi();
            set({ isLoadind: false, authUser: null, isAuth: false })
            return res.data;
        } catch (error) {
            set({ isLoadind: false, error: error?.response?.data?.message || "Logout failed" })
        }
    },
}));

export default useAuthStore;