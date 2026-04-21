import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createGoal,
  completeGoal,
  updateGoalName,
  deleteGoal,
} from "@/services/goal.service";
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

export const useUpdateGoalNameMutation = () => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: updateGoalName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      message.success("¡Nombre del objetivo actualizado!");
    },
    onError: (error: any) => {
      const errorMsg =
        error.response?.data?.message || "Error al actualizar el objetivo";
      message.error(errorMsg);
    },
  });
};

export const useDeleteGoalMutation = () => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: deleteGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      message.success("¡Objetivo eliminado con éxito!");
    },
    onError: (error: any) => {
      const errorMsg =
        error.response?.data?.message || "Error al eliminar el objetivo";
      message.error(errorMsg);
    },
  });
};
