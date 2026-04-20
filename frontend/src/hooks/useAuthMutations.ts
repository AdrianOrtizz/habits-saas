"use client";
import api from "@/api/axios";
import { useAuth } from "@/providers/AuthProvider";

import { useMutation } from "@tanstack/react-query";

import { App } from "antd";

export const useAuthMutations = () => {
  const { login: saveAuth } = useAuth();
  const { message } = App.useApp();

  const loginMutation = useMutation({
    mutationFn: async (credentials: any) => {
      const { data } = await api.post("/auth/login", credentials);
      return data;
    },
    onSuccess: (data) => {
      saveAuth(data);
      message.success("¡Bienvenido de nuevo!");
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || "Error al iniciar sesión");
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: any) => {
      const { data } = await api.post("/auth/register", userData);
      return data;
    },
    onSuccess: (data) => {
      saveAuth(data);
      message.success("Cuenta creada con éxito");
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || "Error en el registro");
    },
  });

  return { loginMutation, registerMutation };
};
