import {
    registerApi,
    loginApi,
    logoutApi,
    getUserApi
} from "../api/authApi";
import { create } from 'zustand';

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
            const message = error?.response?.data?.message || "Login failed";
            set({ isLoadind: false, error: message });
            return null;
        }
    },

    getUser: async () => {
        set({ isLoadind: true, error: null });
        try {
            const res = await getUserApi();
            set({ isLoadind: false, authUser: res.data, isAuth: true })
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || "Fetched failed";
            set({ isLoadind: false, error: message });
            return null;
        }
    },

    logout: async () => {
        set({ isLoadind: true, error: null });
        try {
            const res = await logoutApi();
            set({ isLoadind: false, authUser: null, isAuth: false })
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || "Logout failed";
            set({ isLoadind: false, error: message });
            return null;
        }
    },
}));

export default useAuthStore;