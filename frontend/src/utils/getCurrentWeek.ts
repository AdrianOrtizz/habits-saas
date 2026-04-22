import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(isoWeek);
dayjs.extend(utc);
dayjs.extend(timezone);

const TZ = "America/Argentina/Buenos_Aires";

const WEEKDAY_LABELS = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"];

export const getCurrentWeek = () => {
  const today = dayjs().tz(TZ);

  const startOfWeek = today.startOf("isoWeek");

  return Array.from({ length: 7 }).map((_, i) => {
    const date = startOfWeek.add(i, "day");

    return {
      fullDate: date.toDate(),
      dayName: WEEKDAY_LABELS[i],
      dayNumber: date.date(),

      isToday: date.isSame(today, "day"),
    };
  });
};
