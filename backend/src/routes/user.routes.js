import express from 'express';
import { adminOnly, protect } from '../middlewares/auth.middleware.js';
import { getUsers } from '../controllers/user.controllers.js';

const userRouter = express.Router();

userRouter.get("/", protect, adminOnly, getUsers);
userRouter.get("/:id", protect);
userRouter.get("/:id", protect);

export default userRouter;
