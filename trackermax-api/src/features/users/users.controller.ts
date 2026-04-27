import { Request, Response } from "express";
import { usersQueries } from "./users.queries";
import bcrypt from "bcrypt";

export const usersController = {
  getMe: async (req: Request, res: Response) => {
    try {
      const user = await usersQueries.getById(res.locals.userId);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json({ user });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  updateMe: async (req: Request, res: Response) => {
    try {
      const { first_name, last_name, image_url } = req.body;
      const user = await usersQueries.update(res.locals.userId, {
        first_name,
        last_name,
        image_url,
      });
      res.json({ user });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  updatePassword: async (req: Request, res: Response) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const existing = await usersQueries.getById(res.locals.userId);
      if (!existing) return res.status(404).json({ message: "User not found" });

      const valid = await bcrypt.compare(
        currentPassword,
        existing.password_hash,
      );
      if (!valid)
        return res
          .status(400)
          .json({ message: "Current password is incorrect" });

      const hash = await bcrypt.hash(newPassword, 10);
      await usersQueries.updatePassword(res.locals.userId, hash);
      res.json({ message: "Password updated" });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },
};
