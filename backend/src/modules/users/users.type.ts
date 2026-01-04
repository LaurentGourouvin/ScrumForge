import { Role } from "../../../prisma/generated/prisma/enums";

export interface CreateUserInput {
  email: string;
  password: string;
  name?: string;
  role: Role;
}

export interface UpdateUserInput {
  id: string;
  email?: string;
  name?: string;
  role?: Role;
  newPassword?: string;
}

export interface UpdateUserPasswordInput {
  id: string;
  currentPassword: string;
  newPassword: string;
}

export interface UserResultWithoutPassword {
  id: string;
  email: string;
  name?: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
