import {
    registerApi,
    loginApi,
    logoutApi,
    getUserApi,
    getAgentUsersApi
} from "../api/authApi";
import { create } from 'zustand';

const useAuthStore = create((set) => ({
    isAuth: false,
    isCheckingAuth: true,
    isLoading: true,
    isLoadingAgent: false,
    authUser: null,
    error: null,
    authAgent: [],

    register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
            const res = await registerApi(userData);
            console.log("store res", res);

            set({ isLoading: false, authUser: res.data.user, isAuth: true })
            return res.data;
        } catch (error) {
            set({ isLoading: false, error: error?.response?.data?.message || "failed to fetch" });
            throw error;
        }
    },

    login: async (userData) => {
        set({ isLoading: true, error: null });
        try {
            const res = await loginApi(userData);
            set({ isLoading: false, authUser: res.data.user, isAuth: true })
            return res.data;
        } catch (error) {
            set({ isLoading: false, error: error?.response?.data?.message || "failed to fetch" });
            throw error;
        }
    },

    getUser: async () => {
        set({ isLoading: true, error: null , isCheckingAuth: true});
        try {
            const res = await getUserApi();
            set({ isLoading: false, authUser: res.data, isAuth: true, isCheckingAuth: false });
            // console.log(isCheckingAuth.get());
            return res.data;
        } catch (error) {
            set({ isLoading: false, error: error?.response?.data?.message || "failed to fetch", isAuth: false, isCheckingAuth: false });
            throw error;
        }
    },
    getAgentUsers: async () => {
        set({ isLoadingAgent: true, error: null });
        try {
            const res = await getAgentUsersApi();
            set({ authAgent: res.data, isLoadingAgent: false });
            // console.log("store", res.data);
            return res?.data
        } catch (error) {
            set({ isLoadingAgent: false, error: error?.response?.data?.message || "failed to fetch" });
            throw error;
        }
    },
    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            const res = await logoutApi();
            set({ isLoading: false, authUser: null, isAuth: false })
            return res.data;
        } catch (error) {
            set({ isLoading: false, error: error?.response?.data?.message || "failed to fetch" });
            throw error;
        }
    },
}));

export default useAuthStore;