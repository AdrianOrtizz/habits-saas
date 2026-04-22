import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { findHabitCompletions } from "../repositories/completion.repository";
import {
  calculateDailyStreak,
  calculateWeeklyStreak,
} from "../utils/streak.utils";
import { findHabitById } from "../repositories/habit.repository";
import { getWeekKey } from "../utils/getDays";
import { NotFoundError, ForbiddenError } from "../utils/errorsHandler";

dayjs.extend(utc);
dayjs.extend(timezone);

const TZ = "America/Argentina/Buenos_Aires";

export const getHabitStreak = async (userId: string, habitId: string) => {
  const habit = await findHabitById(habitId);

  if (!habit) {
    throw new NotFoundError("El hábito no existe");
  }

  if (habit.userId.toString() !== userId) {
    throw new ForbiddenError("No tienes permiso para ver esta racha");
  }

  const completions = await findHabitCompletions(userId, habitId);

  const completionKeys = completions.map((c) => c.periodKey);

  const nowArg = dayjs().tz(TZ);
  const today = nowArg.format("YYYY-MM-DD");

  let streak = 0;
  if (habit.frequency.type === "daily") {
    streak = calculateDailyStreak(completionKeys, today);
  } else {
    const currentWeekKey = getWeekKey(nowArg.toDate());
    streak = calculateWeeklyStreak(
      habit as any,
      completionKeys,
      currentWeekKey,
    );
  }

  return { habitId, streak };
};
