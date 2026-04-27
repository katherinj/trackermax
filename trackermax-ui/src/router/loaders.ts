import { redirect } from "react-router-dom";
import { authApi } from "../features/auth/auth.api";
import { useAuthStore } from "../store/authStore";

export async function requireAuth() {
  const token = localStorage.getItem("trackermax_token");
  console.log("requireAuth token:", token);

  if (!token) return redirect("/login");

  try {
    const { user } = await authApi.me();
    useAuthStore.getState().setAuth(user, token);
    return null; // all good, render the route
  } catch {
    useAuthStore.getState().logout();
    return redirect("/login");
  }
}

export async function redirectIfAuthed() {
  const token = localStorage.getItem("trackermax_token");
  if (token) return redirect("/dashboard");
  return null;
}
