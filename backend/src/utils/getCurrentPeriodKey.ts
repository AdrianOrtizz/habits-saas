import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isoWeek);

const TZ = "America/Argentina/Buenos_Aires";

export const getWeekKey = (date?: Date | string | number): string => {
  const d = date ? dayjs(date).tz(TZ) : dayjs().tz(TZ);

  const year = d.isoWeekYear();
  const week = d.isoWeek().toString().padStart(2, "0");

  return `${year}-W${week}`;
};

export const getCurrentPeriodKey = (
  frequencyType: string,
  currentCount: number = 0,
): string => {
  const now = dayjs().tz(TZ);

  if (frequencyType === "daily" || frequencyType === "weekly_specific_days") {
    return now.format("YYYY-MM-DD");
  }

  if (frequencyType === "weekly_times") {
    const weekKey = getWeekKey(now.toDate());
    return `${weekKey}-${currentCount + 1}`;
  }

  throw new Error("Unsupported frequency type");
};
