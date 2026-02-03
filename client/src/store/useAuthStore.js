import {
    registerApi,
    loginApi,
    logoutApi,
    getUserApi
} from "../api/authApi";
import { create } from 'zustand';

const useAuthStore = create((set) => ({
    isAuth: false,
    isLoading: false,
    authUser: null,
    error: null,

    register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
            const res = await registerApi(userData);
            set({ isLoading: false, authUser: res.data.user, isAuth: true })
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || "Register failed";
            set({ isLoading: false, error: message });
          throw new Error(message);
        }
    },

    login: async (userData) => {
        set({ isLoading: true, error: null });
        try {
            const res = await loginApi(userData);
            set({ isLoading: false, authUser: res.data.user, isAuth: true })
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || "Login failed";
            set({ isLoading: false, error: message });
            throw new Error(message);
        }
    },

    getUser: async () => {
        set({ isLoading: true, error: null });
        try {
            const res = await getUserApi();
            set({ isLoading: false, authUser: res.data, isAuth: true })
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || "Fetched failed";
            set({ isLoading: false, error: message });
            throw new Error(message);
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            const res = await logoutApi();
            set({ isLoading: false, authUser: null, isAuth: false })
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || "Logout failed";
            set({ isLoading: false, error: message });
            throw new Error(message);
        }
    },
}));

export default useAuthStore;