import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  getGoalsController,
  createGoalController,
  completeGoalController,
  updateGoalNameController,
  deleteGoalController,
  cloneGoalsController,
} from "../controllers/goal.controller";

const router = Router();

router.use(authMiddleware);

router.get("/", getGoalsController);

router.post("/", createGoalController);
router.post("/clone", cloneGoalsController);

router.patch("/complete", completeGoalController);
router.patch("/update-name", updateGoalNameController);

router.delete("/:id", deleteGoalController);

export default router;
