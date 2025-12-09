interface LoginResult {
  token: string;
  user: {
    id: string;
    email: string;
    name: string | null;
    role: string;
  };
}
