import {
  calculateDailyStreak,
  calculateWeeklyStreak,
} from "../utils/streak.utils";

import {
  buildDailySteps,
  buildSpecificDaysSteps,
  buildWeeklyTimesSteps,
  HabitStep,
} from "../utils/getSteps";

export const mapHabitToDashboard = (
  habit: any,
  habitCompletions: string[],
  context: {
    todayISO: string;
    currentWeekKey: string;
    weekDates: Date[];
    weekStart: Date;
    weekEnd: Date;
  },
) => {
  const habitId = habit._id.toString();

  const habitCompletionSet = new Set(
    habitCompletions.map((pk) => `${habitId}_${pk}`),
  );
  const currentWeekCount = habitCompletions.filter(
    (key) =>
      key >= context.weekStart.toISOString().split("T")[0] &&
      key <= context.weekEnd.toISOString().split("T")[0],
  ).length;

  let steps: HabitStep[] = [];
  switch (habit.frequency.type) {
    case "daily":
      steps = buildDailySteps(habitId, context.weekDates, habitCompletionSet);
      break;
    case "weekly_specific_days":
      steps = buildSpecificDaysSteps(
        habit,
        context.weekDates,
        habitCompletionSet,
      );
      break;
    case "weekly_times":
      steps = buildWeeklyTimesSteps(habit, currentWeekCount);
      break;
  }

  // Lógica de Racha
  const streak =
    habit.frequency.type === "daily"
      ? calculateDailyStreak(habitCompletions, context.todayISO)
      : calculateWeeklyStreak(habit, habitCompletions, context.currentWeekKey);

  return {
    id: habitId,
    name: habit.name,
    frequency: habit.frequency,
    streak,
    progress: {
      completed: steps.filter((s) => s.status === "done").length,
      target: steps.length,
    },
    steps,
  };
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
