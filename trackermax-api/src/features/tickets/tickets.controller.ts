import { Request, Response } from "express";
import { ticketsQueries } from "./tickets.queries";

export const ticketsController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const tickets = await ticketsQueries.getAll();
      res.json({ tickets });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const ticket = await ticketsQueries.getById(req.params.id as string);
      if (!ticket) return res.status(404).json({ message: "Ticket not found" });
      res.json({ ticket });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const ticket = await ticketsQueries.create({
        ...req.body,
        creator_id: res.locals.userId,
      });
      res.status(201).json({ ticket });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const ticket = await ticketsQueries.update(
        req.params.id as string,
        req.body,
      );
      res.json({ ticket });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await ticketsQueries.delete(req.params.id as string);
      res.json({ message: "Ticket deleted" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
};
