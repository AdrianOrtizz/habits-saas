import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { formatZodError } from "../utils/zod-error.utils";
import { AppError } from "../utils/errorsHandler";

export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(`[ERROR]: ${error.message}`);

  //Error de Zod
  if (error instanceof ZodError) {
    return res.status(400).json(formatZodError(error));
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({ message: "ID con formato inválido" });
  }

  // Error por defecto
  return res.status(500).json({
    message: "Internal server error",
  });
};
