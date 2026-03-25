import { useQuery } from "@tanstack/react-query";
import { getGoals } from "@/services/goal.service";

export const useGoals = () => {
  return useQuery({
    queryKey: ["goals"],
    queryFn: getGoals,
    staleTime: 1000 * 60 * 5,
  });
};
