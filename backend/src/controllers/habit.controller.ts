import { Response } from "express";

import { AuthRequest } from "../types/auth-request";

import {
  createUserHabit,
  getUserHabits,
  updateUserHabit,
  deleteUserHabit,
} from "../services/habit.service";

import { createHabitSchema, updateHabitSchema } from "../schemas/habit.schema";

import { asyncHandler } from "../utils/asyncHandler";

export const createHabitController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const parsed = createHabitSchema.parse(req.body);

    const habit = await createUserHabit(
      parsed.name,
      parsed.frequency,
      req.userId!,
    );

    res.status(201).json(habit);
  },
);

export const updateHabitController = asyncHandler(
  async (req: AuthRequest & { params: { id: string } }, res: Response) => {
    const parsed = updateHabitSchema.parse(req.body);
    const habit = await updateUserHabit(req.params.id, req.userId!, parsed);
    res.json(habit);
  },
);

export const deleteHabitController = asyncHandler(
  async (req: AuthRequest & { params: { id: string } }, res: Response) => {
    await deleteUserHabit(req.params.id, req.userId!);
    res.status(204).send();
  },
);
