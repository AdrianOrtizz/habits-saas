import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createHabitController,
  getHabitsController,
  updateHabitController,
  deleteHabitController,
} from "../controllers/habit.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", createHabitController);
router.get("/", getHabitsController);
router.put("/:id", updateHabitController);
router.delete("/:id", deleteHabitController);

export default router;
