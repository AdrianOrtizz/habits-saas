import { z } from "zod";

const nameRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]+$/;
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const goalIdSchema = z.object({
  body: z.object({
    id: z.string().regex(objectIdRegex, "ID de objetivo inválido"),
  }),
});

export const createGoalSchema = z.object({
  body: z.object({
    name: z
      .string("El nombre es obligatorio")
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(100, "El nombre es demasiado largo")
      .trim()
      .regex(
        nameRegex,
        "El nombre solo puede contener letras, números y espacios",
      ),
    icon: z.string("El icono es obligatorio"),
  }),
});

export const updateGoalSchema = z.object({
  body: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID de objetivo inválido"),
    name: z
      .string()
      .min(3)
      .max(100)
      .trim()
      .regex(
        nameRegex,
        "El nombre solo puede contener letras, números y espacios",
      )
      .optional(),
  }),
});
