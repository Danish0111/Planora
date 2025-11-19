import express from "express";
import { createTasks, deleteTask, getDashboardData, getTaskById, getTasks, getUserDashboardData, updateTask, updateTaskChecklist, updateTaskStatus } from "../controllers/task.controllers.js";
import { adminOnly, protect } from "../middlewares/auth.middleware.js";

const taskRoutes = express.Router();

taskRoutes.get("/dashboard-data", protect, getDashboardData);
taskRoutes.get("/user-dashboard-data", protect, getUserDashboardData);
taskRoutes.get("/", protect, getTasks);
taskRoutes.post("/", protect, adminOnly, createTasks);
taskRoutes.get("/:id", protect, getTaskById);
taskRoutes.put("/:id", protect, updateTask);
taskRoutes.delete("/:id", protect, adminOnly, deleteTask);
taskRoutes.put("/:id/status", protect, updateTaskStatus);
taskRoutes.post("/:id/todo", protect, updateTaskChecklist);

export default taskRoutes;