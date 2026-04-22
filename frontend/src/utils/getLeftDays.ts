import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(isoWeek);
dayjs.extend(utc);
dayjs.extend(timezone);

const TZ = "America/Argentina/Buenos_Aires";

export const getDaysLeftInWeek = () => {
  const today = dayjs().tz(TZ);
  const currentDay = today.isoWeekday();
  const daysRemaining = 7 - currentDay;

  if (daysRemaining === 0) return "Último día";
  if (daysRemaining === 1) return "1 día";
  return `${daysRemaining} días`;
};
