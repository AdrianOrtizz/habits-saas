import { Response } from "express";
import { AuthRequest } from "../types/auth-request";
import { asyncHandler } from "../utils/asyncHandler";

import { getDashboard } from "../services/dashboard.service";

export const getDashboardController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const habits = await getDashboard(req.userId!);
    return res.json(habits);
  },
);
