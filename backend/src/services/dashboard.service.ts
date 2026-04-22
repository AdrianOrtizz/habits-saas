import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
const TZ = "America/Argentina/Buenos_Aires";

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

  const nowArg = dayjs().tz(TZ);
  const nowDate = nowArg.toDate();
  const startOfToday = nowArg.startOf("day").toDate();

  const context = {
    todayISO: nowArg.format("YYYY-MM-DD"),
    currentWeekKey: getWeekKey(nowDate),
    weekStart: getStartOfWeek(nowDate),
    weekEnd: getEndOfWeek(getStartOfWeek(nowDate)),
    weekDates: getWeekDates(getStartOfWeek(nowDate)),
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
