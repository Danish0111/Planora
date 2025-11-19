import express from "express";
import { adminOnly, protect } from "../middlewares/auth.middleware.js";
import { check, getUserProfile, isAdmin, login, logout, signup, updateProfile, updateProfileImage } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateProfile);
router.put("/update-profile-img", protect, updateProfileImage);
router.get("/check", protect, check);
router.get("/check-admin", protect, isAdmin);

export default router;