import { Response } from "express";
import { AuthRequest } from "../types/auth-request";
import { getCurrentUser } from "../services/users.service";

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await getCurrentUser(req.userId!);
    return res.json(user);
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};
