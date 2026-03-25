import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGoal, completeGoal } from "@/services/goal.service";
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

export const useCompleteGoalMutation = () => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: completeGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      message.success("¡Objetivo completado con éxito!");
    },
    onError: (error: any) => {
      const errorMsg =
        error.response?.data?.message || "Error al crear el objetivo";
      message.error(errorMsg);
    },
  });
};
