import { findUserById } from "../repositories/user.repository";
import { NotFoundError } from "../utils/errorsHandler";

export const getCurrentUser = async (userId: string) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new NotFoundError("Usuario no encontrado");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};
