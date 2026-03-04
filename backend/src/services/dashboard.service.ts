import { getStartOfWeek, getEndOfWeek, getWeekDates } from "../utils/getDays";
import {
  buildDailySteps,
  buildSpecificDaysSteps,
  buildWeeklyTimesSteps,
  HabitStep,
} from "../utils/getSteps";

import { findCompletionsForWeek } from "../repositories/completion.repository";
import { findActiveHabitsByUserId } from "../repositories/habit.repository";

export const getDashboard = async (userId: string) => {
  const habits = await findActiveHabitsByUserId(userId);

  const weekStart = getStartOfWeek();
  const weekEnd = getEndOfWeek(weekStart);
  const weekDates = getWeekDates(weekStart);

  const completions = await findCompletionsForWeek(userId, weekStart, weekEnd);

  const completionDateSet = new Set(
    completions.map((c) => {
      const iso = c.createdAt.toISOString().split("T")[0];
      return `${c.habitId.toString()}_${iso}`;
    }),
  );

  const completionCountByHabit = new Map<string, number>();

  for (const c of completions) {
    const id = c.habitId.toString();
    completionCountByHabit.set(id, (completionCountByHabit.get(id) || 0) + 1);
  }

  const dashboardHabits = habits.map((habit) => {
    const habitId = habit._id.toString();
    const completionsCount = completionCountByHabit.get(habitId) || 0;

    let steps: HabitStep[] = [];

    switch (habit.frequency.type) {
      case "daily":
        steps = buildDailySteps(habitId, weekDates, completionDateSet);
        break;

      case "weekly_specific_days":
        steps = buildSpecificDaysSteps(habit, weekDates, completionDateSet);
        break;

      case "weekly_times":
        steps = buildWeeklyTimesSteps(habit, completionsCount);
        break;

      default:
        steps = [];
    }

    const completed = steps.filter((s) => s.status === "done").length;
    const target = steps.length;

    return {
      id: habitId,
      name: habit.name,
      frequency: habit.frequency,
      progress: {
        completed,
        target,
      },
      steps,
    };
  });

  // SUMMARY

  const totalSteps = dashboardHabits.reduce(
    (acc, habit) => acc + habit.progress.target,
    0,
  );

  const completedSteps = dashboardHabits.reduce(
    (acc, habit) => acc + habit.progress.completed,
    0,
  );

  const progressPercentage =
    totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100);

  return {
    week: {
      start: weekStart.toISOString().split("T")[0],
      end: weekEnd.toISOString().split("T")[0],
    },
    summary: {
      totalSteps,
      completedSteps,
      progressPercentage,
    },
    habits: dashboardHabits,
  };
};
