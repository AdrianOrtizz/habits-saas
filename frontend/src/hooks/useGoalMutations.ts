// src/hooks/useGoalMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGoal } from "@/services/goal.service";
import { App } from "antd";

export const useCreateGoalMutation = () => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      message.success("¡Objetivo creado con éxito!");
    },
    onError: (error: any) => {
      const errorMsg =
        error.response?.data?.message || "Error al crear el objetivo";
      message.error(errorMsg);
    },
  });
};
