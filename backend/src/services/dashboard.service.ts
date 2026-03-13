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
  const context = {
    todayISO: now.toISOString().split("T")[0],
    currentWeekKey: getWeekKey(now),
    weekStart: getStartOfWeek(now),
    weekEnd: getEndOfWeek(getStartOfWeek(now)),
    weekDates: getWeekDates(getStartOfWeek(now)),
  };

  const completionsMap = groupCompletionsByHabit(allCompletions);

  const dashboardHabits = habits.map((h: any) =>
    mapHabitToDashboard(h, completionsMap.get(h._id.toString()) || [], context),
  );

  return {
    week: {
      start: context.weekStart.toISOString().split("T")[0],
      end: context.weekEnd.toISOString().split("T")[0],
    },
    summary: calculateSummary(dashboardHabits),
    habits: dashboardHabits,
  };
};
