type StepStatus = "done" | "pending" | "missed";

export type HabitStep = {
  status: StepStatus;
  label?: string;
};

const WEEKDAY_LABELS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export const buildDailySteps = (
  habitId: string,
  weekDates: Date[],
  completionDates: Set<string>,
): HabitStep[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return weekDates.map((date, index) => {
    const iso = date.toISOString().split("T")[0];

    let status: StepStatus;

    if (completionDates.has(`${habitId}_${iso}`)) {
      status = "done";
    } else if (date < today) {
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
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const steps: HabitStep[] = [];

  weekDates.forEach((date) => {
    const jsDay = date.getDay(); // 0 domingo
    const mondayBased = jsDay === 0 ? 6 : jsDay - 1;

    if (!habit.frequency.daysOfWeek.includes(mondayBased)) {
      return;
    }

    const iso = date.toISOString().split("T")[0];
    const key = `${habit._id.toString()}_${iso}`;

    let status: StepStatus;

    if (completionDates.has(key)) {
      status = "done";
    } else if (date < today) {
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
  habit: any,
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
