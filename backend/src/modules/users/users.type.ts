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
  newPassword: string;
}
