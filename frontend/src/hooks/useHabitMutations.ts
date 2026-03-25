import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createHabit,
  completeHabit,
  updateHabit,
  deleteHabit,
} from "@/services/dashboard.service";
import { App } from "antd";

export const useCreateHabitMutation = () => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: createHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      message.success("Hábito creado con éxito");
    },
    onError: () => {
      message.error("Error al crear el hábito");
    },
  });
};

export const useCompleteHabitMutation = () => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: (habitId: string) => completeHabit(habitId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      message.success("¡Hábito completado!");
    },
    onError: (error: any) => {
      const errorMsg =
        error.response?.data?.message || "Error al completar el hábito";
      message.error(errorMsg);
    },
  });
};

export const useUpdateHabitMutation = () => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: updateHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      message.success("Hábito actualizado");
    },
    onError: () => message.error("Error al actualizar el hábito"),
  });
};

export const useDeleteHabitMutation = () => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();

  return useMutation({
    mutationFn: deleteHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      message.success("Hábito eliminado");
    },
    onError: () => message.error("Error al eliminar el hábito"),
  });
};
