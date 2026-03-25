import api from "@/api/axios";

import { ICreateHabit } from "@/types/habits.types";

export const getDashboardData = async () => {
  const { data } = await api.get("/dashboard");
  return data;
};

export const createHabit = async (habit: ICreateHabit) => {
  const { data } = await api.post("/habits", habit);
  return data;
};
