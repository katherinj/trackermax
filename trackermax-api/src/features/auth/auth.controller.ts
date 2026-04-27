import { Request, Response } from "express";
import { authService } from "./auth.service";

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const result = await authService.register(
        firstName,
        lastName,
        email,
        password,
      );
      res.status(201).json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json(result);
    } catch (err: any) {
      res.status(401).json({ message: err.message });
    }
  },

  me: async (req: Request, res: Response) => {
    try {
      const user = await authService.me(res.locals.userId); // read from res.locals
      res.json({ user });
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  },
};
