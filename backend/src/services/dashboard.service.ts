import {
  getStartOfWeek,
  getEndOfWeek,
  getWeekDates,
  getWeekKey,
} from "../utils/getDays";

import { findCompletionsByUser } from "../repositories/completion.repository";
import { findActiveHabitsByUserId } from "../repositories/habit.repository";

import {
  mapHabitToDashboard,
  calculateSummary,
  groupCompletionsByHabit,
} from "../utils/dashboard.utils";

export const getDashboard = async (userId: string) => {
  const habits = await findActiveHabitsByUserId(userId);
  const allCompletions = await findCompletionsByUser(userId);

  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const context = {
    todayISO: now.toISOString().split("T")[0],
    currentWeekKey: getWeekKey(now),
    weekStart: getStartOfWeek(now),
    weekEnd: getEndOfWeek(getStartOfWeek(now)),
    weekDates: getWeekDates(getStartOfWeek(now)),
  };

  const completionsMap = groupCompletionsByHabit(allCompletions);

  const habitsCompletedToday = new Set<string>();

  for (const c of allCompletions) {
    if (new Date(c.createdAt) >= startOfToday) {
      habitsCompletedToday.add(c.habitId.toString());
    }
  }

  let bestGlobalStreak = 0;
  const changeBestStreak = (s: number) => {
    if (s > bestGlobalStreak) {
      bestGlobalStreak = s;
    }
  };

  const dashboardHabits = habits.map((h: any) =>
    mapHabitToDashboard(
      h,
      completionsMap.get(h._id.toString()) || [],
      context,
      changeBestStreak,
      habitsCompletedToday,
    ),
  );

  const summaryData = calculateSummary(dashboardHabits);

  return {
    summary: { ...summaryData, bestStreak: bestGlobalStreak },
    habits: dashboardHabits,
  };
};
