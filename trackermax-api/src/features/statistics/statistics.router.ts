import { Router } from "express";
import { statisticsController } from "./statistics.controller";
import { authenticate } from "../../middleware/authenticate";

export const statisticsRouter = Router();

statisticsRouter.get("/", authenticate, statisticsController.getSummary);
