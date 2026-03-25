import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { getMe } from "../controllers/users.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/me", authMiddleware, getMe);

router.post("/register", register);
router.post("/login", login);

export default router;
