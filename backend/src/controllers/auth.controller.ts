import { Request, Response } from "express";
import { registerUser } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const user = await registerUser(name, email, password);

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
