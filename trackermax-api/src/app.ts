import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter } from "./features/auth/auth.router";
import { statisticsRouter } from "./features/statistics/statistics.router";
import { ticketsRouter } from "./features/tickets/tickets.router";
import { projectsRouter } from "./features/projects/projects.router";
import { teamsRouter } from "./features/teams/teams.router";
import { usersRouter } from "./features/users/users.router";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://katherinj.github.io"],
    credentials: true,
  }),
);
app.use(express.json());
app.use("/auth", authRouter);
app.use("/projects", projectsRouter);
app.use("/tickets", ticketsRouter);
app.use("/teams", teamsRouter);
app.use("/users", usersRouter);
app.use("/statistics", statisticsRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
