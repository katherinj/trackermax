import { Request, Response } from "express";
import { teamsQueries } from "./teams.queries";

export const teamsController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const teams = await teamsQueries.getAll();
      res.json({ teams });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const team = await teamsQueries.getById(req.params.id as string);
      if (!team) return res.status(404).json({ message: "Team not found" });
      const members = await teamsQueries.getMembers(req.params.id as string);
      res.json({ team, members });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const team = await teamsQueries.create({
        name: req.body.name,
        creator_id: res.locals.userId,
      });
      res.status(201).json({ team });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  addMember: async (req: Request, res: Response) => {
    try {
      await teamsQueries.addMember(req.params.id as string, req.body.userId);
      res.json({ message: "Member added" });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  removeMember: async (req: Request, res: Response) => {
    try {
      await teamsQueries.removeMember(
        req.params.id as string,
        req.params.userId as string,
      );
      res.json({ message: "Member removed" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await teamsQueries.delete(req.params.id as string);
      res.json({ message: "Team deleted" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
};
