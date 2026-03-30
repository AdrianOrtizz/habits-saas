import { DashboardHabit } from "@/types/habits.types";

export const shouldBeDisabled = (habit: DashboardHabit) => {
  const { frequency } = habit;

  const today = new Date();
  const dayOfWeek = today.getDay();

  if (habit.isCompletedToday || habit.isCompletedThisWeek)
    return {
      disabled: true,
      styles: "bg-primary",
    };

  if (frequency.type === "weekly_specific_days") {
    if (frequency.daysOfWeek.includes(dayOfWeek - 1))
      return {
        disabled: false,
        styles: "bg-gray-400 hover:bg-primary/70 hover:cursor-pointer",
      };
  }

  return {
    disabled: false,
    styles: "bg-gray-400 hover:bg-primary/70 hover:cursor-pointer",
  };
};
