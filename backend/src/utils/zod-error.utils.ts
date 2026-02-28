import { ZodError } from "zod";

export const formatZodError = (error: ZodError) => {
  return {
    message: "Validation error",
    errors: error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    })),
  };
};
