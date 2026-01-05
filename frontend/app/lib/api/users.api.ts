import { User, CreateUserInput, UpdateUserInput } from "@/types/user.type";
import AxiosScrumForge from "../axios/AxiosScrumForge";
import { AxiosResponse } from "axios";

export async function create(user: CreateUserInput): Promise<User> {
  const res = await AxiosScrumForge.post<User>("/users", user, {
    withCredentials: true,
  });

  return res.data;
}

export async function getAllUsers(limit?: number, cursor?: string): Promise<{ users: User[] }> {
  let res: AxiosResponse;

  if (!limit) {
    res = await AxiosScrumForge.get<{ users: User[] }>("/users", {
      withCredentials: true,
    });
  } else {
    const params: Record<string, string | number> = {};

    if (limit !== undefined) params.limit = limit;
    if (cursor !== undefined) params.cursor = cursor;

    res = await AxiosScrumForge.get<{ users: User[] }>(`/users`, {
      withCredentials: true,
      params,
    });
  }

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
