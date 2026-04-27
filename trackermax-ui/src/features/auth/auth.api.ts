import { apiFetch } from "../../lib/api";
import { type AuthResponse, type User } from "../../types/auth";

export const authApi = {
  login: (email: string, password: string) =>
    apiFetch<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) =>
    apiFetch<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password }),
    }),

  me: () => apiFetch<{ user: User }>("/auth/me"),
};
