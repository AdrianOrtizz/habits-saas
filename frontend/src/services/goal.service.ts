import api from "@/api/axios";

export const getGoals = async () => {
  const { data } = await api.get("/goal");
  return data;
};
