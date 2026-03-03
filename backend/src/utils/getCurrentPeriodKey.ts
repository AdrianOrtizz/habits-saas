export const getCurrentPeriodKey = (frequencyType: string): string => {
  const now = new Date();

  if (frequencyType === "daily") {
    return now.toISOString().split("T")[0]; // YYYY-MM-DD
  }

  if (
    frequencyType === "weekly_specific_days" ||
    frequencyType === "weekly_times"
  ) {
    const date = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
    );

    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);

    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(
      ((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
    );

    return `${date.getUTCFullYear()}-W${weekNo}`;
  }

  throw new Error("Unsupported frequency type");
};
