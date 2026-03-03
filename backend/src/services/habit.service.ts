import {
  createHabit,
  findHabitsByUser,
  findHabitById,
  updateHabit,
  deleteHabit,
  findHabitsByUserId,
} from "../repositories/habit.repository";
import { findCompletionsByUserAndPeriod } from "../repositories/completion.repository";

import { HabitFrequency } from "../models/habit.model";

import { getCurrentPeriodKey } from "../utils/getCurrentPeriodKey";

export const createUserHabit = async (
  name: string,
  frequency: HabitFrequency,
  userId: string,
) => {
  return createHabit(name, frequency, userId);
};

export const getUserHabits = async (userId: string) => {
  return findHabitsByUser(userId);
};

export const updateUserHabit = async (
  habitId: string,
  userId: string,
  data: { name?: string; frequency?: HabitFrequency },
) => {
  const habit = await findHabitById(habitId);

  if (!habit) throw new Error("Habit not found");
  if (habit.userId.toString() !== userId) {
    throw new Error("Unauthorized");
  }
  return updateHabit(habitId, data);
};

export const deleteUserHabit = async (habitId: string, userId: string) => {
  const habit = await findHabitById(habitId);

  if (!habit) throw new Error("Habit not found");
  if (habit.userId.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  return deleteHabit(habitId);
};

export const getHabitsWithStatus = async (userId: string) => {
  const habits = await findHabitsByUserId(userId);

  if (habits.length === 0) {
    return [];
  }

  const frequencyTypes = new Set(habits.map((habit) => habit.frequency.type));

  const periodKeyByType = new Map<string, string>();

  for (const type of frequencyTypes) {
    periodKeyByType.set(type, getCurrentPeriodKey(type));
  }

  const completionsByPeriod = new Map<string, Set<string>>();

  for (const periodKey of periodKeyByType.values()) {
    const completions = await findCompletionsByUserAndPeriod(userId, periodKey);

    completionsByPeriod.set(
      periodKey,
      new Set(completions.map((c) => c.habitId.toString())),
    );
  }

  return habits.map((habit) => {
    const periodKey = periodKeyByType.get(habit.frequency.type)!;
    const completedSet = completionsByPeriod.get(periodKey);

    return {
      ...habit.toObject(),
      completed: completedSet?.has(habit._id.toString()) ?? false,
    };
  });
};
