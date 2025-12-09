import AxiosScrumForge from "../axios/AxiosScrumForge";
import { LoginInput, LoginResponse, LogoutResponse, MeResponse } from "@/types/auth.type";

export async function login(credentials: LoginInput): Promise<LoginResponse> {
  const res = await AxiosScrumForge.post<LoginResponse>("/auth/login", credentials, {
    withCredentials: true,
  });
  return res.data;
}

export async function logout(): Promise<LogoutResponse> {
  const res = await AxiosScrumForge.post<LogoutResponse>(
    "/auth/logout",
    {},
    {
      withCredentials: true,
    }
  );
  return res.data;
}

export async function getCurrentUser(): Promise<MeResponse> {
  const res = await AxiosScrumForge.get<MeResponse>("/auth/me", {
    withCredentials: true,
  });
  return res.data;
}

export async function refreshToken(): Promise<{ success: boolean }> {
  const res = await AxiosScrumForge.post(
    "/auth/refresh",
    {},
    {
      withCredentials: true,
    }
  );
  return res.data;
}
