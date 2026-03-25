import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "@/services/dashboard.service";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
    staleTime: 1000 * 60 * 5,
  });
};
