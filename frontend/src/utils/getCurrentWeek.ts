export const getCurrentWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const monday = new Date(today.setDate(diff));

  return Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);

    return {
      fullDate: date,
      dayName: date
        .toLocaleDateString("es-AR", { weekday: "short" })
        .toUpperCase(),
      dayNumber: date.getDate(),
      isToday: new Date().toDateString() === date.toDateString(),
    };
  });
};
