import { User, CreateUserInput, UpdateUserInput } from "@/types/user.type";
import AxiosScrumForge from "../axios/AxiosScrumForge";

export async function create(user: CreateUserInput): Promise<User> {
  const res = await AxiosScrumForge.post<User>("/users", user, {
    withCredentials: true,
  });

  return res.data;
}

export async function getAllUsers(): Promise<{ users: User[] }> {
  const res = await AxiosScrumForge.get<{ users: User[] }>("/users", {
    withCredentials: true,
  });

  return res.data;
}

export async function getAllUsersPaginate(
  page: number = 1,
  limit: number = 10
): Promise<{ users: User[]; count: number; page: number; limit: number; totalPage: number }> {
  const res = await AxiosScrumForge.get<{
    users: User[];
    count: number;
    page: number;
    limit: number;
    totalPage: number;
  }>("/users", {
    params: { page, limit },
    withCredentials: true,
  });

  return res.data;
}

export async function deleteUser(id: string | null) {
  const res = await AxiosScrumForge.delete<{ success: boolean }>(`/users/${id}`, { withCredentials: true });
  return res.data;
}

export async function updateUser(id: string, user: UpdateUserInput): Promise<User> {
  const res = await AxiosScrumForge.patch<User>(`/users/${id}`, user, { withCredentials: true });
  return res.data;
}
