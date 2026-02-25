import jwt from "jsonwebtoken";
import { env } from "../config/env";

const { JWT_SECRET, JWT_EXPIRES_IN } = env;

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
};
