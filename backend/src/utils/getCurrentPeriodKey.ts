export const getCurrentPeriodKey = (
  frequencyType: string,
  currentCount: number = 0, // Justificación A
): string => {
  const now = new Date();

  if (frequencyType === "daily" || frequencyType === "weekly_specific_days") {
    // Para estos dos, necesitamos la fecha exacta para saber QUÉ día se completó.
    return now.toISOString().split("T")[0];
  }

  if (frequencyType === "weekly_times") {
    // 1. Calculamos la semana ISO
    const date = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
    );
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(
      ((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
    );

    // 2. Justificación B: Agregamos el sufijo del intento actual
    const weekKey = `${date.getUTCFullYear()}-W${weekNo.toString().padStart(2, "0")}`;
    return `${weekKey}-${currentCount + 1}`;
  }

  throw new Error("Unsupported frequency type");
};
