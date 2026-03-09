import {
  createHabit,
  findHabitsByUser,
  findHabitById,
  updateHabit,
  deleteHabit,
  deleteAllHabitsByUserId,
} from "../repositories/habit.repository";

import { deleteAllCompletionsByUserId } from "../repositories/completion.repository";

import { HabitFrequency } from "../models/habit.model";

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

export const wipeUserHabitsData = async (userId: string) => {
  await Promise.all([
    deleteAllHabitsByUserId(userId),
    deleteAllCompletionsByUserId(userId),
  ]);

  return { message: "All habits and completions cleared successfully" };
};
