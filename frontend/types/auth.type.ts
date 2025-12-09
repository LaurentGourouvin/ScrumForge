export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    email: string;
    role: string;
    name?: string;
  };
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface MeResponse {
  id: string;
  email: string;
  role: string;
  name?: string;
}
