import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHabit } from "@/services/dashboard.service";
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
