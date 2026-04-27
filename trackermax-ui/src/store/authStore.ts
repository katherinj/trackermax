import { create } from "zustand";
import { type User } from "../types/auth";

interface AuthStore {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: localStorage.getItem("trackermax_token"),

  setAuth: (user, token) => {
    localStorage.setItem("trackermax_token", token);
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem("trackermax_token");
    set({ user: null, token: null });
  },

  isAuthenticated: () => !!get().token,
}));
