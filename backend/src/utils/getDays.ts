export const getStartOfWeek = (date = new Date()) => {
  const d = new Date(date);
  const day = d.getDay(); // 0 domingo

  const mondayBasedDay = day === 0 ? 6 : day - 1; // lunes = 0
  d.setDate(d.getDate() - mondayBasedDay);
  d.setHours(0, 0, 0, 0);

  return d;
};

export const getEndOfWeek = (startOfWeek: Date) => {
  const end = new Date(startOfWeek);
  end.setDate(startOfWeek.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
};

export const getWeekDates = (startOfWeek: Date) => {
  const days: Date[] = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    days.push(d);
  }

  return days;
};
