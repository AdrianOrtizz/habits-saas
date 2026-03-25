import api from "@/api/axios";

import { CreateGoal } from "@/types/goals.types";

export const getGoals = async () => {
  const { data } = await api.get("/goal");
  return data;
};

export const createGoal = async (newGoal: CreateGoal) => {
  const { data } = await api.post("/goal", newGoal);
  return data;
};

export const completeGoal = async (id: string) => {
  const { data } = await api.patch("/goal/complete", { id });
  return data;
};
