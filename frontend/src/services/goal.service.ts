import api from "@/api/axios";

import { CreateGoal, UpdateGoalNameData } from "@/types/goals.types";

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

export const updateGoalName = async (data: UpdateGoalNameData) => {
  const response = await api.patch("/goal/update-name", data);
  return response.data;
};

export const deleteGoal = async (id: string) => {
  const response = await api.delete(`/goal/${id}`);
  return response.data;
};
