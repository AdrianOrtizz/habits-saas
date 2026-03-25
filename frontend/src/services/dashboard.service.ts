import api from "@/api/axios";

export const getDashboardData = async () => {
  const { data } = await api.get("/dashboard");
  return data;
};
