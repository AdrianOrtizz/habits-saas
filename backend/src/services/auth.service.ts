import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../repositories/user.repository";
import { generateToken } from "../utils/jwt";
import { ConflictError, UnauthorizedError } from "../utils/errorsHandler";

const SALT_ROUNDS = 10;

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new ConflictError("El correo electrónico ya está registrado");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new UnauthorizedError("Credenciales inválidas");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new UnauthorizedError("Credenciales inválidas");
  }

  const token = generateToken(user.id);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};
