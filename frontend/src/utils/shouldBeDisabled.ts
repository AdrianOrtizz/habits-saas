import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { DashboardHabit } from "@/types/habits.types";

dayjs.extend(isoWeek);
dayjs.extend(utc);
dayjs.extend(timezone);

const TZ = "America/Argentina/Buenos_Aires";

export const shouldBeDisabled = (habit: DashboardHabit) => {
  const { frequency } = habit;

  const today = dayjs().tz(TZ);

  const currentDayIndex = today.isoWeekday() - 1;

  if (habit.isCompletedToday || habit.isCompletedThisWeek) {
    return {
      disabled: true,
      styles: "bg-primary",
    };
  }

  if (frequency.type === "weekly_specific_days") {
    if (!frequency.daysOfWeek.includes(currentDayIndex)) {
      return {
        disabled: true,
        styles: "bg-gray-200 opacity-50 cursor-not-allowed",
      };
    }
  }

  return {
    disabled: false,
    styles: "bg-gray-400 hover:bg-primary/70 hover:cursor-pointer",
  };
};
