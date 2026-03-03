import {
  createCompletion,
  findCompletionByHabitAndPeriod,
} from "../repositories/completion.repository";
import { findHabitById } from "../repositories/habit.repository";
import { getCurrentPeriodKey } from "../utils/getCurrentPeriodKey";

export const completeHabit = async (habitId: string, userId: string) => {
  const habit = await findHabitById(habitId);

  if (!habit) {
    const error = new Error("Habit not found");
    error.name = "NotFound";
    throw error;
  }

  if (habit.userId.toString() !== userId) {
    const error = new Error("Forbidden");
    error.name = "Forbidden";
    throw error;
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
      const error = new Error(
        "No podés completar este hábito más de una vez en el mismo período.",
      );
      error.name = "DuplicateCompletion";
      throw error;
    }

    throw err;
  }
};

export const getHabitStatus = async (habitId: string, userId: string) => {
  const habit = await findHabitById(habitId);

  if (!habit) {
    const error = new Error("Habit not found");
    error.name = "NotFound";
    throw error;
  }

  if (habit.userId.toString() !== userId) {
    const error = new Error("Forbidden");
    error.name = "Forbidden";
    throw error;
  }

  const periodKey = getCurrentPeriodKey(habit.frequency.type);

  const completion = await findCompletionByHabitAndPeriod(habitId, periodKey);

  return {
    habitId,
    periodKey,
    completed: !!completion,
  };
};
