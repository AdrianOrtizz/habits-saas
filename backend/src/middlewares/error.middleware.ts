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

  if (error instanceof ZodError) {
    return res.status(400).json(formatZodError(error));
  }

  if (error.name === "Invalid credentials") {
    return res.status(401).json({ message: error.message });
  }

  if (error.name === "NotFound") {
    return res.status(404).json({ message: error.message });
  }

  if (error.name === "Forbidden") {
    return res.status(403).json({ message: error.message });
  }

  if (error.name === "DuplicateCompletion") {
    return res.status(400).json({ message: error.message });
  }

  // ERROR POR DEFECTO
  return res.status(500).json({
    message: "Internal server error",
  });
};
