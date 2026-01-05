import { Role, TeamMember, User } from "../../../prisma/generated/prisma/client";
import { AppError } from "../../lib/appError";
import { hashPassword, comparePassword } from "../../lib/auth.utils";
import { prisma } from "../../lib/prisma";
import { CreateUserInput, UpdateUserInput, UpdateUserPasswordInput, UserResultWithoutPassword } from "./users.type";

export async function getAllUsers(
  limit: number,
  page: number
): Promise<{ users: UserResultWithoutPassword[]; count: number; page?: number; limit?: number }> {
  if (!limit) {
    return await getAllUsersWithNoPagination();
  }

  return await getAllUsersPaginate(limit, page);
}

export async function getAllUsersByRole(role: string): Promise<{ users: UserResultWithoutPassword[]; count: number }> {
  if (!role) {
    throw new AppError("MISSING_ROLE_PARAMETER", 400);
  }

  const users = await prisma.user.findMany({ where: { role: role as Role, isActive: true } });

  const usersWithoutPassword = users.map((user) => {
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });

  return { users: usersWithoutPassword, count: users.length };
}

export async function getUserById(id: string): Promise<UserResultWithoutPassword> {
  if (!id) {
    throw new AppError("MISSING_ID_USER", 400);
  }

  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new AppError("USER_NOT_FOUND", 404);
  }

  const { passwordHash, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function getUsersByTeamId(id: string): Promise<{ users: TeamMember[]; count: number }> {
  if (!id) {
    throw new AppError("MISSING_ID_TEAM", 400);
  }

  const users = await prisma.teamMember.findMany({ where: { teamId: id }, include: { user: true } });

  return {
    users,
    count: users.length,
  };
}

export async function create(user: CreateUserInput): Promise<User> {
  try {
    if (!user.password) {
      throw new AppError("MISSING_PASSWORD", 400);
    }

    const passwordHash: string = await hashPassword(user.password);

    const createUser = await prisma.user.create({
      data: {
        email: user.email,
        passwordHash: passwordHash,
        role: user.role,
        name: user.name!,
      },
    });

    return createUser;
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new AppError("USER_ALREADY_EXIST", 409);
    }
    throw error;
  }
}

export async function update(user: UpdateUserInput): Promise<User> {
  if (!user.id) {
    throw new AppError("USER_ID_MISSING", 400);
  }

  let data: Partial<{
    name: string;
    email: string;
    passwordHash: string;
    role: Role;
  }> = {};

  if (user.email) data.email = user.email;
  if (user.name !== undefined) data.name = user.name;
  if (user.newPassword) {
    data.passwordHash = await hashPassword(user.newPassword);
  }
  if (user.role) data.role = user.role;

  if (Object.keys(data).length === 0) {
    throw new AppError("NO_FIELDS_TO_UPDATE", 400);
  }

  try {
    const userUpdate = await prisma.user.update({ where: { id: user.id }, data });
    return userUpdate;
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new AppError("USER_NOT_FOUND", 404);
    }
    if (error.code === "P2002") {
      throw new AppError("USER_EMAIL_ALREADY_USE", 409);
    }
    throw error;
  }
}

export async function updateCurrentUserPassword(userCredentials: UpdateUserPasswordInput): Promise<void> {
  if (!userCredentials.id) {
    throw new AppError("USER_ID_MISSING", 400);
  }

  const user = await prisma.user.findUnique({
    where: { id: userCredentials.id },
    select: { id: true, passwordHash: true },
  });

  if (!user) {
    throw new AppError("USER_NOT_FOUND", 404);
  }

  const isPasswordValid = await comparePassword(userCredentials.currentPassword, user.passwordHash);

  if (!isPasswordValid) {
    throw new AppError("INVALID_CURRENT_PASSWORD", 401);
  }

  const newPasswordHash = await hashPassword(userCredentials.newPassword);

  try {
    await prisma.user.update({
      where: { id: userCredentials.id },
      data: { passwordHash: newPasswordHash },
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new AppError("USER_NOT_FOUND", 404);
    }
    throw error;
  }
}

export async function updateCurrentUser(user: UpdateUserInput): Promise<User> {
  if (!user.id) {
    throw new AppError("USER_ID_MISSING", 400);
  }

  let data: Partial<{
    name: string;
    email: string;
    passwordHash: string;
  }> = {};

  if (user.email) data.email = user.email;
  if (user.name !== undefined) data.name = user.name;
  if (user.newPassword) {
    data.passwordHash = await hashPassword(user.newPassword);
  }

  if (Object.keys(data).length === 0) {
    throw new AppError("NO_FIELDS_TO_UPDATE", 400);
  }

  try {
    const userUpdate = await prisma.user.update({ where: { id: user.id }, data });
    return userUpdate;
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new AppError("USER_NOT_FOUND", 404);
    }
    if (error.code === "P2002") {
      throw new AppError("USER_EMAIL_ALREADY_USE", 409);
    }
    throw error;
  }
}

export async function deleteUser(id: string): Promise<{ success: boolean }> {
  if (!id) {
    throw new AppError("MISSING_USER_ID", 400);
  }

  try {
    await prisma.user.delete({ where: { id } });
    return {
      success: true,
    };
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new AppError("USER_NOT_FOUND", 404);
    }

    throw error;
  }
}

async function getAllUsersWithNoPagination(): Promise<{ users: UserResultWithoutPassword[]; count: number }> {
  const users = await prisma.user.findMany();

  const usersWithoutPassword = users.map((user) => {
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });

  return { users: usersWithoutPassword, count: users.length };
}

async function getAllUsersPaginate(
  limit: number,
  page: number
): Promise<{
  users: UserResultWithoutPassword[];
  count: number;
  page: number;
  limit: number;
}> {
  // Implement pagination logic here
  // This is a placeholder implementation
  const users = await prisma.user.findMany({
    // Add pagination parameters here
  });

  const usersWithoutPassword = users.map((user) => {
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });

  return { users: usersWithoutPassword, count: users.length, page: 1, limit: 10 };
}
