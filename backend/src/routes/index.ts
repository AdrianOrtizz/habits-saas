import { Router } from "express";

import authRoutes from "./auth.routes";
import userRoutes from "./users.routes";
import habitRoutes from "./habit.routes";

const router = Router();

router.use("/auth", authRoutes);

router.use("/users", userRoutes);

router.use("/habits", habitRoutes);

export default router;
