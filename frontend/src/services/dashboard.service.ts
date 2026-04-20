import api from "@/api/axios";

import { ICreateHabit, IUpdateHabit } from "@/types/habits.types";

export const getDashboardData = async () => {
  const { data } = await api.get("/dashboard");
  return data;
};

export const createHabit = async (habit: ICreateHabit) => {
  const { data } = await api.post("/habits", habit);
  return data;
};

export const completeHabit = async (habitId: string) => {
  const { data } = await api.post(`/habits/${habitId}/complete`);
  return data;
};

export const updateHabit = async ({
  id,
  data,
}: {
  id: string;
  data: IUpdateHabit;
}) => {
  const response = await api.put(`/habits/${id}`, data);
  return response.data;
};

export const deleteHabit = async (id: string) => {
  const response = await api.delete(`/habits/${id}`);
  return response.data;
};
