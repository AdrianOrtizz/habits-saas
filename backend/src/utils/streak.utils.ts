import { HabitDocument } from "../models/habit.model";
import { getWeekKey } from "./getDays";

const getDiffInDays = (dateStr1: string, dateStr2: string) => {
  const d1 = new Date(dateStr1).getTime();
  const d2 = new Date(dateStr2).getTime();
  return Math.floor((d1 - d2) / (1000 * 60 * 60 * 24));
};

export const calculateDailyStreak = (
  completionDates: string[],
  today: string,
): number => {
  if (!completionDates.length) return 0;

  // Justificación A: Usar strings ISO directamente es más rápido que instanciar Date()
  const sortedDates = [...new Set(completionDates)].sort().reverse();

  const lastCompletion = sortedDates[0];
  const diffInDays = getDiffInDays(today, lastCompletion);

  // Justificación B: Si la última vez fue hace más de 1 día (ayer), la racha se rompió.
  // Si fue ayer o es hoy, la racha sigue viva.
  if (diffInDays > 1) return 0;

  let streak = 1;
  for (let i = 0; i < sortedDates.length - 1; i++) {
    const diff = getDiffInDays(sortedDates[i], sortedDates[i + 1]);

    if (diff === 1) {
      streak++;
    } else if (diff > 1) {
      break;
    }
  }

  return streak;
};

export const calculateWeeklyStreak = (
  habit: HabitDocument,
  completionDates: string[], // "YYYY-MM-DD"
  currentWeekKey: string, // "YYYY-Wxx"
): number => {
  const weeks = new Map<string, number>();

  completionDates.forEach((date) => {
    const weekKey = getWeekKey(new Date(date));
    weeks.set(weekKey, (weeks.get(weekKey) || 0) + 1);
  });

  const sortedWeeks = Array.from(weeks.keys()).sort().reverse();

  if (sortedWeeks.length === 0) return 0;

  let streak = 0;
  for (const weekKey of sortedWeeks) {
    const count = weeks.get(weekKey) || 0;
    if (count >= (habit.frequency.timesPerWeek || 0)) {
      streak++;
    } else if (weekKey !== currentWeekKey) {
      break;
    }
  }

  return streak;
};

const getWeekNumber = (date: Date) => {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  const dayNum = d.getUTCDay() || 7;

  d.setUTCDate(d.getUTCDate() + 4 - dayNum);

  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};
