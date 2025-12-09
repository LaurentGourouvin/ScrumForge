"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import * as AuthService from "@/app/lib/api/auth.api";
import { useRouter } from "next/navigation";
import { User } from "@/types/user.type";
import { AuthContextType } from "@/types/authContext.type";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await AuthService.getCurrentUser();
        setUser(user);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await AuthService.login({ email, password });
    setUser(response.user);
  };

  const logout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      setUser(null);
      router.push("/auth//login");
    }
  };

  const refreshUser = async () => {
    try {
      const user = await AuthService.getCurrentUser();
      setUser(user);
    } catch (error) {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, refreshUser }}>{children}</AuthContext.Provider>
  );
}
