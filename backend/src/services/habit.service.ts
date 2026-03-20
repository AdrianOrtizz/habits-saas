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
import { NotFoundError, ForbiddenError } from "../utils/errorsHandler";

export const createUserHabit = async (
  name: string,
  frequency: HabitFrequency,
  userId: string,
  icon: string,
) => {
  return createHabit(name, frequency, userId, icon);
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

  if (!habit) {
    throw new NotFoundError("El hábito no existe");
  }

  if (habit.userId.toString() !== userId) {
    throw new ForbiddenError("No tienes permiso para editar este hábito");
  }

  return updateHabit(habitId, data);
};

export const deleteUserHabit = async (habitId: string, userId: string) => {
  const habit = await findHabitById(habitId);

  if (!habit) {
    throw new NotFoundError("El hábito no existe");
  }

  if (habit.userId.toString() !== userId) {
    throw new ForbiddenError("No tienes permiso para eliminar este hábito");
  }

  return deleteHabit(habitId);
};

export const wipeUserHabitsData = async (userId: string) => {
  await Promise.all([
    deleteAllHabitsByUserId(userId),
    deleteAllCompletionsByUserId(userId),
  ]);

  return {
    message: "Todos los hábitos y progresos han sido eliminados correctamente",
  };
};
