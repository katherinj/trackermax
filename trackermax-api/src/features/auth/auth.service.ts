import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authQueries } from "./auth.queries";

const SALT_ROUNDS = 10;

export const authService = {
  register: async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    const existing = await authQueries.findByEmail(email);
    if (existing) throw new Error("Email already in use");

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await authQueries.createUser(
      firstName,
      lastName,
      email,
      passwordHash,
    );
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    return { user, token };
  },

  login: async (email: string, password: string) => {
    const user = await authQueries.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) throw new Error("Invalid credentials");

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    const { password_hash, ...safeUser } = user;
    return { user: safeUser, token };
  },

  me: async (userId: string) => {
    const user = await authQueries.findById(userId);
    if (!user) throw new Error("User not found");
    return user;
  },
};
