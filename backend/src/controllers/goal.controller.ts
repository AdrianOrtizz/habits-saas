import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest } from "../types/auth-request";
import {
  goalIdSchema,
  updateGoalSchema,
  createGoalSchema,
} from "../schemas/goal.schema";
import {
  getGoalsForCurrentWeek,
  createGoal,
  completeGoal,
  updateGoalName,
  deleteGoal,
  cloneLastWeekGoals,
} from "../services/goal.service";

export const getGoalsController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const goals = await getGoalsForCurrentWeek(req.userId!);
    res.json(goals);
  },
);

export const createGoalController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const parsed = createGoalSchema.parse(req);
    const newGoal = await createGoal(
      req.userId!,
      parsed.body.name,
      parsed.body.icon,
    );
    res.status(201).json(newGoal);
  },
);

export const completeGoalController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const parsed = goalIdSchema.parse(req);
    const updatedGoal = await completeGoal(parsed.body.id, req.userId!);
    res.json(updatedGoal);
  },
);

export const updateGoalNameController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const parsed = updateGoalSchema.parse(req);
    const updatedGoal = await updateGoalName(
      parsed.body.id,
      req.userId!,
      parsed.body.name!,
    );
    res.json(updatedGoal);
  },
);

export const deleteGoalController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const parsed = goalIdSchema.parse(req);
    await deleteGoal(parsed.body.id, req.userId!);
    res.json({ message: "Objetivo eliminado correctamente" });
  },
);

export const cloneGoalsController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const clonedGoals = await cloneLastWeekGoals(req.userId!);
    res.status(201).json(clonedGoals);
  },
);
