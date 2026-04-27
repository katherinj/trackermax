import { apiFetch } from "../../lib/api";
import { type User } from "../../types/auth";

export const usersApi = {
  getMe: () => apiFetch<{ user: User }>("/users/me"),
  updateMe: (
    data: Partial<{ first_name: string; last_name: string; image_url: string }>,
  ) =>
    apiFetch<{ user: User }>("/users/me", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  updatePassword: (currentPassword: string, newPassword: string) =>
    apiFetch<{ message: string }>("/users/me/password", {
      method: "PUT",
      body: JSON.stringify({ currentPassword, newPassword }),
    }),
};
