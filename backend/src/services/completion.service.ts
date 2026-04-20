import {
  createCompletion,
  findCompletionByHabitAndPeriod,
} from "../repositories/completion.repository";
import { findHabitById } from "../repositories/habit.repository";
import { getCurrentPeriodKey } from "../utils/getCurrentPeriodKey";
import {
  NotFoundError,
  ForbiddenError,
  BadRequestError,
} from "../utils/errorsHandler";

export const completeHabit = async (habitId: string, userId: string) => {
  const habit = await findHabitById(habitId);

  if (!habit) {
    throw new NotFoundError("El hábito no existe");
  }

  if (habit.userId.toString() !== userId) {
    throw new ForbiddenError("No tienes permiso para completar este hábito");
  }

  const periodKey = getCurrentPeriodKey(habit.frequency.type);

  try {
    const completion = await createCompletion({
      habitId,
      userId,
      periodKey,
    });

    return completion;
  } catch (err: any) {
    if (err.code === 11000) {
      throw new BadRequestError(
        "No podés completar este hábito más de una vez en el mismo período.",
      );
    }

    throw err;
  }
};

export const getHabitStatus = async (habitId: string, userId: string) => {
  const habit = await findHabitById(habitId);

  if (!habit) {
    throw new NotFoundError("El hábito no existe");
  }

  if (habit.userId.toString() !== userId) {
    throw new ForbiddenError("No tienes permiso para ver este hábito");
  }

  const periodKey = getCurrentPeriodKey(habit.frequency.type);

  const completion = await findCompletionByHabitAndPeriod(habitId, periodKey);

  return {
    habitId,
    periodKey,
    completed: !!completion,
  };
};
