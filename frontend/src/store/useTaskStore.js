import { create } from 'zustand';
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const useTaskStore = create((set, get) => ({
    tasks: [],
    task: null,
    loading: false,
    statusTabs: [],

    fetchTasks: async (filterStatus) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get("/tasks", { params: {status: filterStatus === "All" ? "" : filterStatus}});
            set({ tasks: res.data.tasks });

            const statusSummary = res.data?.statusSummary || [];
            const statusArray = [
                {label: "All", count: statusSummary.all || 0},
                {label: "Pending", count: statusSummary.pendingTasks || 0},
                {label: "In Progress", count: statusSummary.inProgressTasks || 0},
                {label: "Completed", count: statusSummary.completedTasks || 0},
            ];
            set({ statusTabs: statusArray });
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Failed to fetch tasks");
        } finally {
            set({ loading: false });
        }
    },

    fetchTaskById: async (taskId) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get(`/tasks/${taskId}`);
            set({ task: res.data });
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Failed to fetch task");
        } finally {
            set({ loading: false });
        }
    },

    adminDashboardData: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get("/tasks/dashboard-data");
            return res.data;
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Failed to fetch dashboard data");
        } finally {
            set({ loading: false });
        }
    },

    userDashboardData: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get("/tasks/user-dashboard-data");
            return res.data;
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Failed to fetch dashboard data");
        } finally {
            set({ loading: false });
        }
    },

    createTask: async (taskData) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post("/tasks", taskData);
            set((state) => ({ tasks: [...state.tasks, res.data] }));
            toast.success("Task created successfully");
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Failed to create task");
            throw err;
        } finally {
            set({ loading: false });
        }
    },

    updateTask: async (taskId, updatedData) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.put(`/tasks/${taskId}`, updatedData);
            set((state) => ({ tasks: [...state.tasks, res.data] }));
            toast.success("Task updated successfully");
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Failed to update task");
            throw err;
        } finally {
            set({ loading: false });
        }
    },

    deleteTask: async (taskId) => {
        set({ loading: true });
        try {
            await axiosInstance.delete(`/tasks/${taskId}`);
            set((state) => ({ tasks: state.tasks.filter(task => task._id !== taskId) }));
            toast.success("Task deleted successfully");
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Failed to delete task");
            throw err;
        } finally {
            set({ loading: false });
        }
    },

    updateTaskStatus: async (taskId, status) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.put(`/tasks/${taskId}/status`, { status });
            set((state) => ({
                tasks: state.tasks.map(task => task._id === taskId ? res.data : task)
            }));
            toast.success("Task status updated successfully");
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Failed to update task status");
            throw err;
        } finally {
            set({ loading: false });
        }
    },

    updateTaskChecklist: async (taskId, todoItem) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post(`/tasks/${taskId}/todo`, {todoChecklist: todoItem });
            const updatedTask = res.data.task;
            set((state) => ({
                tasks: state.tasks.map(task => task._id === taskId ? updatedTask : task),
                task: state.task?._id === taskId ? updatedTask : state.task,
            }));
            toast.success("Task checklist updated successfully");
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Failed to update task checklist");
            throw err;
        } finally {
            set({ loading: false });
        }
    },
}))