import { Router } from "express";
import { usersController } from "./users.controller";
import { authenticate } from "../../middleware/authenticate";

export const usersRouter = Router();

usersRouter.use(authenticate);

usersRouter.get("/me", usersController.getMe);
usersRouter.put("/me", usersController.updateMe);
usersRouter.put("/me/password", usersController.updatePassword);
