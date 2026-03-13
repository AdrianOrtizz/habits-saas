import { findHabitCompletions } from "../repositories/completion.repository";
import {
  calculateDailyStreak,
  calculateWeeklyStreak,
} from "../utils/streak.utils";
import { findHabitById } from "../repositories/habit.repository";
import { getWeekKey } from "../utils/getDays";
import { NotFoundError, ForbiddenError } from "../utils/errorsHandler";

export const getHabitStreak = async (userId: string, habitId: string) => {
  const habit = await findHabitById(habitId);

  if (!habit) {
    throw new NotFoundError("El hábito no existe");
  }

  if (habit.userId.toString() !== userId) {
    throw new ForbiddenError("No tienes permiso para ver esta racha");
  }

  const completions = await findHabitCompletions(userId, habitId);

  const completionKeys = completions.map((c) => c.periodKey);
  const today = new Date().toISOString().split("T")[0];

  let streak = 0;
  if (habit.frequency.type === "daily") {
    streak = calculateDailyStreak(completionKeys, today);
  } else {
    const currentWeekKey = getWeekKey(new Date());
    streak = calculateWeeklyStreak(
      habit as any,
      completionKeys,
      currentWeekKey,
    );
  }

  return { habitId, streak };
};
