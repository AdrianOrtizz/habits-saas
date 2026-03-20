import {
  calculateDailyStreak,
  calculateWeeklyStreak,
} from "../utils/streak.utils";

import {
  buildDailySteps,
  buildSpecificDaysSteps,
  buildWeeklyTimesSteps,
} from "../utils/getSteps";

import { DashboardHabit, Context } from "../types/dashboard.types";

export const mapHabitToDashboard = (
  habit: DashboardHabit,
  habitCompletions: string[],
  context: Context,
) => {
  const habitId = habit._id.toString();

  const habitCompletionSet = buildCompletionSet(habitId, habitCompletions);
  const completionsCount = countWeeklyCompletions(
    habit,
    habitCompletions,
    context,
  );

  const steps = getHabitSteps(
    habit,
    habitId,
    habitCompletionSet,
    completionsCount,
    context,
  );

  const streak = getHabitStreak(habit, habitCompletions, context);

  return {
    id: habitId,
    name: habit.name,
    icon: habit.icon,
    frequency: habit.frequency,
    streak,
    progress: {
      completed: steps.filter((s) => s.status === "done").length,
      target: steps.length,
    },
    steps,
  };
};

const countWeeklyCompletions = (
  habit: DashboardHabit,
  completions: string[],
  ctx: Context,
) => {
  const isoStart = ctx.weekStart.toISOString().split("T")[0];
  const isoEnd = ctx.weekEnd.toISOString().split("T")[0];

  return completions.filter((key) =>
    habit.frequency.type === "weekly_times"
      ? key.startsWith(ctx.currentWeekKey)
      : key >= isoStart && key <= isoEnd,
  ).length;
};

const getHabitSteps = (
  habit: DashboardHabit,
  habitId: string,
  set: Set<string>,
  count: number,
  ctx: Context,
) => {
  switch (habit.frequency.type) {
    case "daily":
      return buildDailySteps(habitId, ctx.weekDates, set);
    case "weekly_specific_days":
      return buildSpecificDaysSteps(habit, ctx.weekDates, set);
    case "weekly_times":
      return buildWeeklyTimesSteps(habit, count);
    default:
      return [];
  }
};

const getHabitStreak = (
  habit: DashboardHabit,
  completions: string[],
  ctx: Context,
) => {
  return habit.frequency.type === "daily"
    ? calculateDailyStreak(completions, ctx.todayISO)
    : calculateWeeklyStreak(habit, completions, ctx.currentWeekKey);
};

const buildCompletionSet = (habitId: string, completions: string[]) => {
  return new Set(completions.map((pk) => `${habitId}_${pk}`));
};

export const groupCompletionsByHabit = (
  allCompletions: any[],
): Map<string, string[]> => {
  const map = new Map<string, string[]>();

  for (const c of allCompletions) {
    const hId = c.habitId.toString();
    if (!map.has(hId)) {
      map.set(hId, []);
    }
    map.get(hId)!.push(c.periodKey);
  }

  return map;
};

export const calculateSummary = (dashboardHabits: any[]) => {
  const totalSteps = dashboardHabits.reduce(
    (acc, h) => acc + h.progress.target,
    0,
  );

  const completedSteps = dashboardHabits.reduce(
    (acc, h) => acc + h.progress.completed,
    0,
  );

  const progressPercentage =
    totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100);

  return {
    totalSteps,
    completedSteps,
    progressPercentage,
  };
};
