import { Router } from "express";
import { teamsController } from "./teams.controller";
import { authenticate } from "../../middleware/authenticate";

export const teamsRouter = Router();

teamsRouter.use(authenticate);

teamsRouter.get("/", teamsController.getAll);
teamsRouter.get("/:id", teamsController.getById);
teamsRouter.post("/", teamsController.create);
teamsRouter.post("/:id/members", teamsController.addMember);
teamsRouter.delete("/:id/members/:userId", teamsController.removeMember);
teamsRouter.delete("/:id", teamsController.delete);
