import { Router } from "express";
import { ticketsController } from "./tickets.controller";
import { authenticate } from "../../middleware/authenticate";

export const ticketsRouter = Router();

ticketsRouter.use(authenticate);

ticketsRouter.get("/", ticketsController.getAll);
ticketsRouter.get("/:id", ticketsController.getById);
ticketsRouter.post("/", ticketsController.create);
ticketsRouter.put("/:id", ticketsController.update);
ticketsRouter.delete("/:id", ticketsController.delete);
