import { findHabitCompletions } from "../repositories/completion.repository";
import {
  calculateDailyStreak,
  calculateWeeklyStreak,
} from "../utils/streak.utils";
import { findHabitById } from "../repositories/habit.repository";
import { getWeekKey } from "../utils/getDays";

export const getHabitStreak = async (userId: string, habitId: string) => {
  const habit = await findHabitById(habitId);
  if (!habit) {
    throw new Error("Habit not found");
  }

  const completions = await findHabitCompletions(userId, habitId);

  const completionKeys = completions.map((c) => c.periodKey);
  const today = new Date().toISOString().split("T")[0];

  let streak = 0;
  if (habit.frequency.type === "daily") {
    streak = calculateDailyStreak(completionKeys, today);
  } else {
    const currentWeekKey = getWeekKey(new Date());
    streak = calculateWeeklyStreak(habit, completionKeys, currentWeekKey);
  }

  return { habitId, streak };
};
