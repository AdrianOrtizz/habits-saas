import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../repositories/user.repository";

const SALT_ROUNDS = 10;

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};
