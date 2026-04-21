import {
  findGoalsByWeek,
  create,
  update,
  remove,
  insertManyGoals,
} from "../repositories/goal.repository";
import { getWeekKey } from "../utils/getCurrentPeriodKey";
import { GoalCreate } from "../types/goal.types";
import { Types } from "mongoose";
import { NotFoundError, BadRequestError } from "../utils/errorsHandler";

const mapGoal = (g: any) => ({
  id: g._id,
  name: g.name,
  icon: g.icon,
  completed: g.completed,
});

export const getGoalsForCurrentWeek = async (userId: string) => {
  const currentWeekKey = getWeekKey();
  const currentGoals = await findGoalsByWeek(userId, currentWeekKey);

  const total = currentGoals.length;
  const completed = currentGoals.filter((g) => g.completed).length;
  const percentage = total === 0 ? 0 : ((completed / total) * 100).toFixed(2);

  return {
    goals: currentGoals.map(mapGoal),
    summary: { total, percentage, completed },
  };
};

export const createGoal = async (
  userId: string,
  name: string,
  icon: string,
) => {
  const currentWeekKey = getWeekKey();

  const goalData: GoalCreate = {
    userId: new Types.ObjectId(userId),
    name,
    icon,
    weekKey: currentWeekKey,
  };

  const newGoal = await create(goalData);
  return mapGoal(newGoal);
};

export const completeGoal = async (goalId: string, userId: string) => {
  const updatedGoal = await update(goalId, userId, { completed: true });

  if (!updatedGoal) {
    throw new NotFoundError(
      "No se encontró el objetivo o no tienes permiso para completarlo",
    );
  }

  return mapGoal(updatedGoal);
};

export const updateGoalName = async (
  goalId: string,
  userId: string,
  newName: string,
) => {
  const updatedGoal = await update(goalId, userId, { name: newName });

  if (!updatedGoal) {
    throw new NotFoundError("No se encontró el objetivo para editar");
  }

  return mapGoal(updatedGoal);
};

export const deleteGoal = async (goalId: string, userId: string) => {
  const deletedGoal = await remove(goalId, userId);

  if (!deletedGoal) {
    throw new NotFoundError("No se encontró el objetivo para eliminar");
  }

  return { success: true };
};

export const cloneLastWeekGoals = async (userId: string) => {
  const now = new Date();
  const currentWeekKey = getWeekKey(now);

  const lastWeekDate = new Date(now);
  lastWeekDate.setDate(now.getDate() - 7);
  const lastWeekKey = getWeekKey(lastWeekDate);

  const lastGoals = await findGoalsByWeek(userId, lastWeekKey);

  if (!lastGoals || lastGoals.length === 0) {
    throw new BadRequestError(
      "No hay objetivos de la semana pasada para clonar",
    );
  }

  const goalsToInsert: GoalCreate[] = lastGoals.map((g) => ({
    userId: new Types.ObjectId(userId),
    name: g.name,
    icon: g.icon,
    weekKey: currentWeekKey,
  }));

  const clonedGoals = await insertManyGoals(goalsToInsert);
  return clonedGoals.map(mapGoal);
};
