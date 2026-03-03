import { Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";
import { AuthRequest } from "../types/auth-request";
import { habitIdParamSchema } from "../schemas/habit.schema";

import { completeHabit, getHabitStatus } from "../services/completion.service";

export const completeHabitController = asyncHandler(
  async (req: AuthRequest & { params: { id: string } }, res: Response) => {
    const { id } = habitIdParamSchema.parse(req.params);

    const completion = await completeHabit(id, req.userId!);

    res.status(201).json(completion);
  },
);

export const getHabitStatusController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = habitIdParamSchema.parse(req.params);

    const result = await getHabitStatus(id, req.userId!);

    return res.json(result);
  },
);
