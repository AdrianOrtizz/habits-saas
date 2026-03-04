import { Router } from "express";

import authRoutes from "./auth.routes";
import userRoutes from "./users.routes";
import habitRoutes from "./habit.routes";
import dashboardRoutes from "./dashboard.routes";

const router = Router();

router.use("/auth", authRoutes);

router.use("/users", userRoutes);

router.use("/habits", habitRoutes);

router.use("/dashboard", dashboardRoutes);

export default router;
