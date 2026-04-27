import { Request, Response } from "express";
import { statisticsQueries } from "./statistics.queries";

export const statisticsController = {
  getSummary: async (req: Request, res: Response) => {
    try {
      const summary = await statisticsQueries.getSummary();
      const byStatus = await statisticsQueries.getTicketsByStatus();
      const byPriority = await statisticsQueries.getTicketsByPriority();
      const recentTickets = await statisticsQueries.getRecentTickets();
      res.json({ summary, byStatus, byPriority, recentTickets });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
};
