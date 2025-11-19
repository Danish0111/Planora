import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";
export const useAuthStore = create((set, get) => ({
    authUser: null,
    loading: false,
    isCheckingAuth: true,
    isAdmin: false,

    checkAuth: async () => {
        try {
            set({ isCheckingAuth: true });
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in checkAuth: ", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (payload) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post("/auth/signup", payload);
            set({ authUser: res.data });
            toast.success("Registered successfully");
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Registration failed");
            throw err;
        } finally {
            set({ loading: false });
        }
    },

    login: async (credentials) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post("/auth/login", credentials);
            set({ authUser: res.data });
            toast.success("Logged in");
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Login failed");
            throw err;
        } finally {
            set({ loading: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out");
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Logout failed");
            throw err;
        }
    },

    checkAdmin: async () => {
        try {
            const res = await axiosInstance.get("/auth/check-admin");
            set({ isAdmin: res.data.isAdmin });
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Admin check failed");
            throw err;
        }
    }
}));

