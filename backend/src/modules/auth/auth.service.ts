import { prisma } from "../../lib/prisma";
import { comparePassword, generateToken } from "../../lib/auth.utils";
import { AppError } from "../../lib/appError";

export async function login(email: string, password: string): Promise<LoginResult> {
  const user = await prisma.user.findUnique({ where: { email: email } });

  if (!user) {
    throw new AppError("Invalid credentials.", 401);
  }

  const checkPassword = await comparePassword(password, user.passwordHash);

  if (!checkPassword) {
    throw new AppError("Invalid credentials.", 401);
  }

  const token = generateToken({ userId: user.id, email: user.email, role: user.role });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
}

export async function getCurrentUser(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}
