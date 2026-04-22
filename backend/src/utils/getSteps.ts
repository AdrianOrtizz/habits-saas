import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isoWeek from "dayjs/plugin/isoWeek";

import {
  DashboardHabit,
  HabitStep,
  StepStatus,
} from "../types/dashboard.types";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isoWeek);

const TZ = "America/Argentina/Buenos_Aires";

const WEEKDAY_LABELS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export const buildDailySteps = (
  habitId: string,
  weekDates: Date[],
  completionDates: Set<string>,
): HabitStep[] => {
  const today = dayjs().tz(TZ).startOf("day");

  return weekDates.map((date, index) => {
    const currentDay = dayjs(date).tz(TZ);

    const iso = currentDay.format("YYYY-MM-DD");

    let status: StepStatus;

    if (completionDates.has(`${habitId}_${iso}`)) {
      status = "done";
    } else if (currentDay.isBefore(today)) {
      status = "missed";
    } else {
      status = "pending";
    }

    return {
      status,
      label: WEEKDAY_LABELS[index],
    };
  });
};

export const buildSpecificDaysSteps = (
  habit: any,
  weekDates: Date[],
  completionDates: Set<string>,
): HabitStep[] => {
  const today = dayjs().tz(TZ).startOf("day");
  const steps: HabitStep[] = [];

  weekDates.forEach((date) => {
    const currentDay = dayjs(date).tz(TZ);

    const mondayBased = currentDay.isoWeekday() - 1;

    if (!habit.frequency.daysOfWeek.includes(mondayBased)) {
      return;
    }

    const iso = currentDay.format("YYYY-MM-DD");
    const key = `${habit._id.toString()}_${iso}`;

    let status: StepStatus;

    if (completionDates.has(key)) {
      status = "done";
    } else if (currentDay.isBefore(today)) {
      status = "missed";
    } else {
      status = "pending";
    }

    steps.push({
      status,
      label: WEEKDAY_LABELS[mondayBased],
    });
  });

  return steps;
};

export const buildWeeklyTimesSteps = (
  habit: DashboardHabit,
  completionsCount: number,
): HabitStep[] => {
  const target = habit.frequency.timesPerWeek;

  const steps: HabitStep[] = [];

  for (let i = 0; i < target; i++) {
    steps.push({
      status: i < completionsCount ? "done" : "pending",
      label: `${i + 1}`,
    });
  }

  return steps;
};
