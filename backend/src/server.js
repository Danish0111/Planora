import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import taskRoutes from "./routes/task.routes.js";
import reportRoutes from "./routes/report.routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true,
}))

app.get("/", (req, res) => {
  res.send("hello");
})

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/reports", reportRoutes);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`);
    connectDB();
})