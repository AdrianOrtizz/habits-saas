import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { formatZodError } from "../utils/zod-error.utils";

export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(error);

  // ZOD VALIDATION
  if (error instanceof ZodError) {
    return res.status(400).json(formatZodError(error));
  }

  // NOT FOUND
  if (error.message === "Habit not found") {
    return res.status(404).json({ message: error.message });
  }

  // ERROR POR DEFECTO
  return res.status(500).json({
    message: "Internal server error",
  });
};
