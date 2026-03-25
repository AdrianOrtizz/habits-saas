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
