import { Router } from "express";
import { projectsController } from "./projects.controller";
import { authenticate } from "../../middleware/authenticate";

export const projectsRouter = Router();

projectsRouter.use(authenticate);

projectsRouter.get("/", projectsController.getAll);
projectsRouter.get("/:id", projectsController.getById);
projectsRouter.post("/", projectsController.create);
projectsRouter.put("/:id", projectsController.update);
projectsRouter.delete("/:id", projectsController.delete);
