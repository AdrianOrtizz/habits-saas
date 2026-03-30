export const currentHabitDay = (frequency: {
  type: "weekly_specific_days";
  daysOfWeek: number[];
  timesPerWeek: number;
}) => {
  const today = new Date();
  const dayOfWeek = today.getDay();

  if (frequency.daysOfWeek.includes(dayOfWeek - 1)) return false;

  return true;
};
