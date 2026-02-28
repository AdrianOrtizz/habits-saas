import { Response } from "express";

import { AuthRequest } from "../types/auth-request";

import {
  createUserHabit,
  getUserHabits,
  updateUserHabit,
  deleteUserHabit,
} from "../services/habit.service";

import { createHabitSchema, updateHabitSchema } from "../schemas/habit.schema";

import { ZodError } from "zod";
import { formatZodError } from "../utils/zod-error.utils";

export const createHabitController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const parsed = createHabitSchema.parse(req.body);

    const habit = await createUserHabit(
      parsed.name,
      parsed.frequency,
      req.userId!,
    );

    res.status(201).json(habit);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json(formatZodError(error));
    }
    res.status(400).json({ message: error.message });
  }
};

export const getHabitsController = async (req: AuthRequest, res: Response) => {
  try {
    const habits = await getUserHabits(req.userId!);

    res.status(200).json(habits);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json(formatZodError(error));
    }

    res.status(400).json({ message: error.message });
  }
};

export const updateHabitController = async (
  req: AuthRequest & { params: { id: string } },
  res: Response,
) => {
  try {
    const parsed = updateHabitSchema.parse(req.body);

    const habit = await updateUserHabit(req.params.id, req.userId!, parsed);

    res.json(habit);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json(formatZodError(error));
    }

    res.status(400).json({ message: error.message });
  }
};

export const deleteHabitController = async (
  req: AuthRequest & { params: { id: string } },
  res: Response,
) => {
  try {
    await deleteUserHabit(req.params.id, req.userId!);
    res.status(204).send();
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json(formatZodError(error));
    }

    res.status(400).json({ message: error.message });
  }
};
