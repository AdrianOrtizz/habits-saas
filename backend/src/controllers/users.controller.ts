import { Response } from "express";
import { AuthRequest } from "../types/auth-request";
import { getCurrentUser } from "../services/users.service";
import { asyncHandler } from "../utils/asyncHandler";

export const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await getCurrentUser(req.userId!);
  return res.json(user);
});
