import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createHabitController,
  updateHabitController,
  deleteHabitController,
} from "../controllers/habit.controller";
import {
  completeHabitController,
  getHabitStatusController,
} from "../controllers/completion.controller";

const router = Router();

router.use(authMiddleware);

router.post("/", createHabitController);
router.post("/:id/complete", completeHabitController);
router.get("/:id/status", getHabitStatusController);

router.put("/:id", updateHabitController);

router.delete("/:id", deleteHabitController);

export default router;
