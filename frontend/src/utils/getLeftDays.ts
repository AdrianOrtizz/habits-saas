export const getDaysLeftInWeek = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const dayNormalized = dayOfWeek === 0 ? 7 : dayOfWeek;
  const daysRemaining = 7 - dayNormalized;

  if (daysRemaining === 0) return "Último día";
  if (daysRemaining === 1) return "1 día";
  return `${daysRemaining} días`;
};
