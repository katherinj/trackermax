import { Request, Response } from "express";
import { projectsQueries } from "./projects.queries";

export const projectsController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const projects = await projectsQueries.getAll();
      res.json({ projects });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const project = await projectsQueries.getById(req.params.id as string);
      if (!project)
        return res.status(404).json({ message: "Project not found" });
      res.json({ project });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const project = await projectsQueries.create({
        ...req.body,
        creator_id: res.locals.userId,
      });
      res.status(201).json({ project });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const project = await projectsQueries.update(
        req.params.id as string,
        req.body,
      );
      res.json({ project });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await projectsQueries.delete(req.params.id as string);
      res.json({ message: "Project deleted" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
};
