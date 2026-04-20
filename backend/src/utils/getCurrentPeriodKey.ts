export const getWeekKey = (date: Date = new Date()): string => {
  const d = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );

  return `${d.getUTCFullYear()}-W${weekNo.toString().padStart(2, "0")}`;
};

export const getCurrentPeriodKey = (
  frequencyType: string,
  currentCount: number = 0,
): string => {
  const now = new Date();

  if (frequencyType === "daily" || frequencyType === "weekly_specific_days") {
    return now.toISOString().split("T")[0];
  }

  if (frequencyType === "weekly_times") {
    const weekKey = getWeekKey(now);
    return `${weekKey}-${currentCount + 1}`;
  }

  throw new Error("Unsupported frequency type");
};
