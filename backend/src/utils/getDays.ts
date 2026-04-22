import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(isoWeek);
dayjs.extend(utc);
dayjs.extend(timezone);

const TZ = "America/Argentina/Buenos_Aires";

export const getStartOfWeek = (date?: Date | string | number): Date => {
  const d = date ? dayjs(date).tz(TZ) : dayjs().tz(TZ);
  return d.startOf("isoWeek").toDate();
};

export const getEndOfWeek = (startOfWeek: Date | string | number): Date => {
  return dayjs(startOfWeek).tz(TZ).endOf("isoWeek").toDate();
};

export const getWeekDates = (startOfWeek: Date | string | number): Date[] => {
  const start = dayjs(startOfWeek).tz(TZ).startOf("isoWeek");
  const days: Date[] = [];

  for (let i = 0; i < 7; i++) {
    days.push(start.add(i, "day").toDate());
  }

  return days;
};

export const getWeekKey = (date: Date | string | number): string => {
  const d = dayjs(date).tz(TZ);

  const year = d.isoWeekYear();
  const week = d.isoWeek().toString().padStart(2, "0");

  return `${year}-W${week}`;
};
