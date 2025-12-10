import { User, CreateUserInput } from "@/types/user.type";
import AxiosScrumForge from "../axios/AxiosScrumForge";

export async function create(user: CreateUserInput): Promise<User> {
  const res = await AxiosScrumForge.post<User>("/users/", user, {
    withCredentials: true,
  });

  return res.data;
}
