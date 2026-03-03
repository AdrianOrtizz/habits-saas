import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { asyncHandler } from "../utils/asyncHandler";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await registerUser(name, email, password);

  res.status(201).json({
    message: "User created successfully",
    user,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await loginUser(email, password);

  res.status(200).json(result);
});
