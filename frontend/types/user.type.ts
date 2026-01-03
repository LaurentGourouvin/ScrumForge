export interface User {
  id: string;
  name: string | null;
  email: string;
  passwordHash: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  email: string;
  password: string;
  name?: string;
  role: string;
}

export interface UpdateUserInput {
  email?: string;
  name?: string;
  role?: string;
  newPassword?: string;
}
